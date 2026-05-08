const GITHUB_USERNAME = "LoukikNaik";
const CACHE_KEY = "github-stats";
const CACHE_TTL_SECONDS = 3600; // 1 hour

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

// --- Helpers ---

async function hashIP(ip) {
  const data = new TextEncoder().encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").substring(0, 16);
}

function isBot(userAgent) {
  if (!userAgent) return true;
  return /bot|crawl|spider|slurp|facebook|whatsapp|telegram|discord|preview|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot/i.test(userAgent);
}

async function createToken(username, secret) {
  const payload = JSON.stringify({ user: username, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return btoa(payload) + "." + btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function verifyToken(token, secret) {
  try {
    const [payloadB64, sigB64] = token.split(".");
    const payload = atob(payloadB64);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const signature = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, signature, encoder.encode(payload));
    if (!valid) return null;
    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

// --- GitHub Stats ---

async function fetchGitHubStats(env) {
  const headers = {
    "User-Agent": "portfolio-api",
    "Content-Type": "application/json",
  };

  if (env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${env.GITHUB_TOKEN}`;
  }

  const [userRes, reposRes, graphqlRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }`,
      }),
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API error: user=${userRes.status}, repos=${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

  const langCounts = {};
  for (const repo of repos) {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  }
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang);

  let contributions = null;
  if (graphqlRes.ok) {
    const graphqlData = await graphqlRes.json();
    const calendar = graphqlData?.data?.user?.contributionsCollection?.contributionCalendar;
    if (calendar) {
      contributions = {
        total: calendar.totalContributions,
        weeks: calendar.weeks,
      };
    }
  }

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    totalForks,
    topLanguages,
    contributions,
    updatedAt: new Date().toISOString(),
  };
}

// --- Main Handler ---

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // GitHub stats (existing)
    if (url.pathname === "/api/github-stats") {
      try {
        if (env.CACHE) {
          const cached = await env.CACHE.get(CACHE_KEY);
          if (cached) {
            return new Response(cached, { headers: CORS_HEADERS });
          }
        }

        const stats = await fetchGitHubStats(env);
        const json = JSON.stringify(stats);

        if (env.CACHE) {
          await env.CACHE.put(CACHE_KEY, json, { expirationTtl: CACHE_TTL_SECONDS });
        }

        return new Response(json, { headers: CORS_HEADERS });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: CORS_HEADERS });
      }
    }

    // Analytics: track event (public)
    if (url.pathname === "/api/analytics/event" && request.method === "POST") {
      try {
        const ua = request.headers.get("User-Agent") || "";
        if (isBot(ua)) {
          return new Response(JSON.stringify({ ok: true }), { headers: CORS_HEADERS });
        }

        const body = await request.json();
        const { type, projectName, linkType, pagePath } = body;

        if (!type || !pagePath || !["page_view", "project_click"].includes(type)) {
          return new Response(JSON.stringify({ error: "Invalid event" }), { status: 400, headers: CORS_HEADERS });
        }

        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const ipHash = await hashIP(ip);
        const country = request.cf?.country || "XX";
        const city = request.cf?.city || null;
        const region = request.cf?.region || null;
        const latitude = request.cf?.latitude || null;
        const longitude = request.cf?.longitude || null;
        const referrer = request.headers.get("Referer") || null;

        await env.DB.prepare(
          "INSERT INTO events (type, project_name, link_type, page_path, country, city, region, latitude, longitude, ip_hash, user_agent, referrer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
          .bind(type, projectName || null, linkType || null, pagePath, country, city, region, latitude, longitude, ipHash, ua, referrer)
          .run();

        return new Response(JSON.stringify({ ok: true }), { headers: CORS_HEADERS });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
      }
    }

    // Analytics: login
    if (url.pathname === "/api/analytics/login" && request.method === "POST") {
      try {
        const { username, password } = await request.json();
        if (username === env.ANALYTICS_USERNAME && password === env.ANALYTICS_PASSWORD) {
          const token = await createToken(username, env.AUTH_SECRET);
          return new Response(JSON.stringify({ token }), { headers: CORS_HEADERS });
        }
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: CORS_HEADERS });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
      }
    }

    // Analytics: dashboard data (authenticated)
    if (url.pathname === "/api/analytics/data" && request.method === "GET") {
      const authHeader = request.headers.get("Authorization");
      const token = authHeader?.replace("Bearer ", "");
      const user = token ? await verifyToken(token, env.AUTH_SECRET) : null;
      if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS_HEADERS });
      }

      try {
        const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
        const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString();

        const pageSize = Math.min(parseInt(url.searchParams.get("pageSize")) || 10, 50);
        const page = Math.max(parseInt(url.searchParams.get("page")) || 1, 1);
        const offset = (page - 1) * pageSize;

        const [totalAll, totalWeek, totalMonth, projectClicks, countryBreakdown, dailyVisitors, recentEvents, totalEvents, visitorLocations] = await Promise.all([
          env.DB.prepare("SELECT COUNT(DISTINCT ip_hash) as count FROM events WHERE type='page_view'").first(),
          env.DB.prepare("SELECT COUNT(DISTINCT ip_hash) as count FROM events WHERE type='page_view' AND created_at >= ?").bind(weekAgo).first(),
          env.DB.prepare("SELECT COUNT(DISTINCT ip_hash) as count FROM events WHERE type='page_view' AND created_at >= ?").bind(monthAgo).first(),
          env.DB.prepare("SELECT project_name, link_type, COUNT(*) as count FROM events WHERE type='project_click' GROUP BY project_name, link_type ORDER BY count DESC").all(),
          env.DB.prepare("SELECT country, COUNT(DISTINCT ip_hash) as count FROM events WHERE type='page_view' GROUP BY country ORDER BY count DESC LIMIT 20").all(),
          env.DB.prepare("SELECT DATE(created_at) as date, COUNT(DISTINCT ip_hash) as visitors, COUNT(*) as events FROM events WHERE created_at >= ? GROUP BY DATE(created_at) ORDER BY date").bind(monthAgo).all(),
          env.DB.prepare("SELECT type, project_name, link_type, page_path, country, city, region, created_at FROM events ORDER BY created_at DESC LIMIT ? OFFSET ?").bind(pageSize, offset).all(),
          env.DB.prepare("SELECT COUNT(*) as count FROM events").first(),
          env.DB.prepare("SELECT city, region, country, latitude, longitude, COUNT(*) as count FROM events WHERE latitude IS NOT NULL GROUP BY city, region, country ORDER BY count DESC LIMIT 200").all(),
        ]);

        return new Response(
          JSON.stringify({
            visitors: {
              allTime: totalAll?.count || 0,
              lastWeek: totalWeek?.count || 0,
              lastMonth: totalMonth?.count || 0,
            },
            projectClicks: projectClicks?.results || [],
            countries: countryBreakdown?.results || [],
            dailyVisitors: dailyVisitors?.results || [],
            recentEvents: recentEvents?.results || [],
            totalEvents: totalEvents?.count || 0,
            visitorLocations: visitorLocations?.results || [],
            page,
            pageSize,
          }),
          { headers: CORS_HEADERS }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
      }
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: CORS_HEADERS });
  },
};
