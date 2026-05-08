const API_BASE = "https://portfolio-api.loukik.workers.dev";

export function trackPageView(pagePath) {
  const key = `tracked_${pagePath}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  setTimeout(() => sessionStorage.removeItem(key), 5000);

  fetch(`${API_BASE}/api/analytics/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "page_view", pagePath }),
    keepalive: true,
  }).catch(() => {});
}

export function trackProjectClick(projectName, linkType) {
  fetch(`${API_BASE}/api/analytics/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "project_click",
      projectName,
      linkType,
      pagePath: window.location.pathname,
    }),
    keepalive: true,
  }).catch(() => {});
}
