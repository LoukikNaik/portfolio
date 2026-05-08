import { unstable_dev } from 'wrangler';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';

let worker;

beforeAll(async () => {
  // Apply schema to local D1 before starting the worker
  execSync('npx wrangler d1 execute portfolio-analytics --local --file=./schema.sql', {
    cwd: process.cwd(),
    stdio: 'pipe',
  });

  worker = await unstable_dev('src/index.js', {
    experimental: { disableExperimentalWarning: true },
    vars: {
      ANALYTICS_USERNAME: 'testuser',
      ANALYTICS_PASSWORD: 'testpass',
      AUTH_SECRET: 'test-secret-key-for-hmac-signing',
    },
  });
});

afterAll(async () => {
  if (worker) await worker.stop();
});

// --- Helper ---

async function login() {
  const res = await worker.fetch('/api/analytics/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
  });
  const json = await res.json();
  return json.token;
}

// --- CORS ---

describe('CORS', () => {
  it('responds to OPTIONS preflight', async () => {
    const res = await worker.fetch('/api/github-stats', { method: 'OPTIONS' });
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    expect(res.headers.get('Access-Control-Allow-Headers')).toContain('Authorization');
  });
});

// --- 404 ---

describe('Unknown routes', () => {
  it('returns 404 for unknown paths', async () => {
    const res = await worker.fetch('/api/nonexistent');
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe('Not found');
  });
});

// --- Analytics Event Tracking ---

describe('POST /api/analytics/event', () => {
  it('accepts a valid page_view event', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({ type: 'page_view', pagePath: '/' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('accepts a valid project_click event', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({
        type: 'project_click',
        projectName: 'Tool-Call Tactics',
        linkType: 'github',
        pagePath: '/',
      }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('rejects events with missing type', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({ pagePath: '/' }),
    });
    expect(res.status).toBe(400);
  });

  it('rejects events with invalid type', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({ type: 'invalid_type', pagePath: '/' }),
    });
    expect(res.status).toBe(400);
  });

  it('rejects events with missing pagePath', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Test Browser',
      },
      body: JSON.stringify({ type: 'page_view' }),
    });
    expect(res.status).toBe(400);
  });

  it('silently accepts bot requests without inserting', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Googlebot/2.1',
      },
      body: JSON.stringify({ type: 'page_view', pagePath: '/' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('silently accepts requests with empty User-Agent', async () => {
    const res = await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'page_view', pagePath: '/' }),
    });
    // Empty UA is treated as bot
    expect(res.status).toBe(200);
  });
});

// --- Authentication ---

describe('POST /api/analytics/login', () => {
  it('returns a token for valid credentials', async () => {
    const res = await worker.fetch('/api/analytics/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.token).toBeDefined();
    expect(json.token).toContain('.');
  });

  it('rejects invalid username', async () => {
    const res = await worker.fetch('/api/analytics/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'wrong', password: 'testpass' }),
    });
    expect(res.status).toBe(401);
  });

  it('rejects invalid password', async () => {
    const res = await worker.fetch('/api/analytics/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'wrong' }),
    });
    expect(res.status).toBe(401);
  });
});

// --- Analytics Data (Authenticated) ---

describe('GET /api/analytics/data', () => {
  it('rejects requests without auth token', async () => {
    const res = await worker.fetch('/api/analytics/data');
    expect(res.status).toBe(401);
  });

  it('rejects requests with invalid token', async () => {
    const res = await worker.fetch('/api/analytics/data', {
      headers: { Authorization: 'Bearer invalid.token' },
    });
    expect(res.status).toBe(401);
  });

  it('returns analytics data with valid token', async () => {
    const token = await login();
    const res = await worker.fetch('/api/analytics/data', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    const json = await res.json();

    // Check structure
    expect(json.visitors).toBeDefined();
    expect(json.visitors.allTime).toBeTypeOf('number');
    expect(json.visitors.lastWeek).toBeTypeOf('number');
    expect(json.visitors.lastMonth).toBeTypeOf('number');
    expect(json.projectClicks).toBeInstanceOf(Array);
    expect(json.countries).toBeInstanceOf(Array);
    expect(json.dailyVisitors).toBeInstanceOf(Array);
    expect(json.recentEvents).toBeInstanceOf(Array);
    expect(json.totalEvents).toBeTypeOf('number');
    expect(json.visitorLocations).toBeInstanceOf(Array);
    expect(json.page).toBe(1);
    expect(json.pageSize).toBe(10);
  });

  it('respects pagination params', async () => {
    const token = await login();
    const res = await worker.fetch('/api/analytics/data?page=2&pageSize=25', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.page).toBe(2);
    expect(json.pageSize).toBe(25);
  });

  it('clamps pageSize to max 50', async () => {
    const token = await login();
    const res = await worker.fetch('/api/analytics/data?pageSize=100', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.pageSize).toBe(50);
  });

  it('clamps page to min 1', async () => {
    const token = await login();
    const res = await worker.fetch('/api/analytics/data?page=0', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.page).toBe(1);
  });
});

// --- Integration: Event → Dashboard ---

describe('Integration: events appear in dashboard data', () => {
  it('tracked events show up in analytics data', async () => {
    // Track some events
    for (let i = 0; i < 3; i++) {
      await worker.fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 Integration Test',
        },
        body: JSON.stringify({ type: 'page_view', pagePath: '/test' }),
      });
    }

    await worker.fetch('/api/analytics/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Integration Test',
      },
      body: JSON.stringify({
        type: 'project_click',
        projectName: 'Surfstore',
        linkType: 'github',
        pagePath: '/',
      }),
    });

    // Fetch dashboard data
    const token = await login();
    const res = await worker.fetch('/api/analytics/data?pageSize=50', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();

    expect(json.totalEvents).toBeGreaterThan(0);
    expect(json.recentEvents.length).toBeGreaterThan(0);

    // Check that project click was recorded
    const clickEvents = json.recentEvents.filter(
      (e) => e.type === 'project_click' && e.project_name === 'Surfstore'
    );
    expect(clickEvents.length).toBeGreaterThan(0);
  });
});
