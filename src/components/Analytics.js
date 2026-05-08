import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaSignOutAlt, FaGlobe, FaUsers, FaMousePointer, FaGithub, FaExternalLinkAlt, FaMapMarkerAlt } from 'react-icons/fa';

const API_BASE = 'https://portfolio-api.loukik.workers.dev';

function VisitorMap({ locations }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    function initMap() {
      const L = window.L;
      if (!L || mapRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;
      addMarkers(L, map);
    }

    function addMarkers(L, map) {
      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      const maxCount = Math.max(...locations.map((l) => l.count), 1);

      locations.forEach((loc) => {
        if (!loc.latitude || !loc.longitude) return;
        const r = 5 + (loc.count / maxCount) * 15;

        const marker = L.circleMarker([loc.latitude, loc.longitude], {
          radius: r,
          fillColor: '#0ea5e9',
          fillOpacity: 0.5,
          color: '#0ea5e9',
          weight: 1,
          opacity: 0.8,
        }).addTo(map);

        const popupDiv = document.createElement('div');
        popupDiv.style.cssText = 'font-family:sans-serif;font-size:13px;line-height:1.5';
        const strong = document.createElement('strong');
        strong.textContent = `${countryFlag(loc.country)} ${loc.city || 'Unknown'}${loc.region ? `, ${loc.region}` : ''}`;
        const detail = document.createElement('span');
        detail.textContent = `${loc.country} \u00B7 ${loc.count} visit${loc.count !== 1 ? 's' : ''}`;
        popupDiv.appendChild(strong);
        popupDiv.appendChild(document.createElement('br'));
        popupDiv.appendChild(detail);
        marker.bindPopup(popupDiv, { className: 'leaflet-dark-popup' });

        markersRef.current.push(marker);
      });
    }

    // Load Leaflet dynamically
    if (window.L) {
      initMap();
    } else {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div
      ref={mapContainerRef}
      className="rounded-xl overflow-hidden"
      style={{ height: 380, background: '#1a1a2e' }}
    />
  );
}

function countryFlag(code) {
  if (!code || code === 'XX') return '';
  try {
    return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
  } catch {
    return '';
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTimestamp(ts) {
  const d = new Date(ts + 'Z');
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

const Analytics = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem('analytics_token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [eventsPage, setEventsPage] = useState(1);
  const [eventsPageSize, setEventsPageSize] = useState(10);

  const fetchData = useCallback(async (t, page = 1, pageSize = 10) => {
    setDataLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/analytics/data?page=${page}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem('analytics_token');
        setToken(null);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      // silently fail
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchData(token, eventsPage, eventsPageSize);
    const interval = setInterval(() => fetchData(token, eventsPage, eventsPageSize), 60000);
    return () => clearInterval(interval);
  }, [token, eventsPage, eventsPageSize, fetchData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/api/analytics/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (json.token) {
        sessionStorage.setItem('analytics_token', json.token);
        setToken(json.token);
      } else {
        setLoginError('Invalid credentials');
      }
    } catch {
      setLoginError('Connection failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('analytics_token');
    setToken(null);
    setData(null);
  };

  // --- Login Form ---
  if (!token) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          className="glass-strong rounded-3xl p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaLock className="text-sky-400" size={20} />
            <h1 className="text-2xl font-bold text-on-glass">Analytics</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full glass rounded-xl px-4 py-3 text-on-glass text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 placeholder:text-gray-400 dark:placeholder:text-gray-600"
              autoComplete="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full glass rounded-xl px-4 py-3 text-on-glass text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 placeholder:text-gray-400 dark:placeholder:text-gray-600"
              autoComplete="current-password"
            />
            {loginError && (
              <p className="text-red-500 dark:text-red-400 text-sm text-center">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 rounded-xl font-semibold transition-all duration-300 border border-sky-500/30 hover:border-sky-500/50 disabled:opacity-50"
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  // --- Dashboard ---
  const maxDaily = data ? Math.max(...data.dailyVisitors.map((d) => d.visitors), 1) : 1;
  const maxCountry = data ? Math.max(...data.countries.map((c) => c.count), 1) : 1;

  // Group project clicks by project name
  const projectGroups = {};
  if (data) {
    for (const click of data.projectClicks) {
      if (!projectGroups[click.project_name]) {
        projectGroups[click.project_name] = { github: 0, live: 0, total: 0 };
      }
      projectGroups[click.project_name][click.link_type] = click.count;
      projectGroups[click.project_name].total += click.count;
    }
  }
  const sortedProjects = Object.entries(projectGroups).sort((a, b) => b[1].total - a[1].total);
  const maxProjectTotal = sortedProjects.length > 0 ? sortedProjects[0][1].total : 1;

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-on-glass">Analytics</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-on-glass-muted hover:text-on-glass text-sm transition-all duration-300"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </motion.div>

        {dataLoading && !data ? (
          <div className="flex justify-center py-20">
            <div className="text-on-glass-muted animate-pulse">Loading analytics...</div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Last 7 days', value: data.visitors.lastWeek },
                { label: 'Last 30 days', value: data.visitors.lastMonth },
                { label: 'All time', value: data.visitors.allTime },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass-strong rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaUsers className="text-sky-400" size={14} />
                    <span className="text-on-glass-muted text-sm">{stat.label}</span>
                  </div>
                  <div className="text-4xl font-bold text-on-glass">{stat.value}</div>
                  <div className="text-on-glass-muted text-xs mt-1">unique visitors</div>
                </motion.div>
              ))}
            </div>

            {/* Visitor Map */}
            {data.visitorLocations && data.visitorLocations.length > 0 && (
              <motion.div
                className="glass-strong rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-sky-400" size={14} />
                  <h2 className="text-lg font-semibold text-on-glass">Visitor Map</h2>
                  <span className="text-on-glass-muted text-xs ml-auto">
                    {data.visitorLocations.length} location{data.visitorLocations.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <VisitorMap locations={data.visitorLocations} />
              </motion.div>
            )}

            {/* Daily Visitors Chart */}
            <motion.div
              className="glass-strong rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold text-on-glass mb-4">Daily Visitors (30 days)</h2>
              {data.dailyVisitors.length > 0 ? (
                <div className="flex items-end gap-[2px] h-48">
                  {data.dailyVisitors.map((day) => (
                    <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="text-[10px] text-on-glass-muted mb-1">{day.visitors}</div>
                      <div
                        className="w-full bg-gradient-to-t from-sky-500 to-cyan-400 rounded-t-sm min-h-[2px] transition-all duration-500"
                        style={{ height: `${(day.visitors / maxDaily) * 80}%` }}
                        title={`${formatDate(day.date)}: ${day.visitors} visitors`}
                      />
                      <div className="text-[8px] text-on-glass-muted mt-1 -rotate-45 origin-top-left w-0 whitespace-nowrap">
                        {formatDate(day.date)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-on-glass-muted text-sm text-center py-8">No data yet</div>
              )}
            </motion.div>

            {/* Two column: Project Clicks + Geography */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Clicks */}
              <motion.div
                className="glass-strong rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaMousePointer className="text-sky-400" size={14} />
                  <h2 className="text-lg font-semibold text-on-glass">Project Clicks</h2>
                </div>
                {sortedProjects.length > 0 ? (
                  <div className="space-y-4">
                    {sortedProjects.map(([name, counts]) => (
                      <div key={name}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-on-glass font-medium truncate mr-2">{name}</span>
                          <span className="text-on-glass-muted text-xs whitespace-nowrap">
                            {counts.github > 0 && (
                              <span className="inline-flex items-center gap-1 mr-2">
                                <FaGithub size={10} /> {counts.github}
                              </span>
                            )}
                            {counts.live > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <FaExternalLinkAlt size={9} /> {counts.live}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="h-2.5 glass rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${(counts.total / maxProjectTotal) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-on-glass-muted text-sm text-center py-8">No clicks yet</div>
                )}
              </motion.div>

              {/* Geographic Distribution */}
              <motion.div
                className="glass-strong rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaGlobe className="text-sky-400" size={14} />
                  <h2 className="text-lg font-semibold text-on-glass">Visitors by City</h2>
                </div>
                {data.visitorLocations && data.visitorLocations.length > 0 ? (
                  <div className="space-y-3">
                    {data.visitorLocations.map((loc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-lg w-8 text-center">{countryFlag(loc.country)}</span>
                        <span className="text-on-glass text-sm font-medium truncate flex-1">
                          {loc.city || 'Unknown'}{loc.region ? `, ${loc.region}` : ''}
                        </span>
                        <div className="flex-1 h-2.5 glass rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${(loc.count / Math.max(...data.visitorLocations.map((l) => l.count), 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-on-glass-muted text-sm w-8 text-right">{loc.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-on-glass-muted text-sm text-center py-8">No data yet</div>
                )}
              </motion.div>
            </div>

            {/* Recent Events */}
            {(() => {
              const totalPages = Math.ceil((data.totalEvents || 0) / eventsPageSize);
              return (
                <motion.div
                  className="glass-strong rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h2 className="text-lg font-semibold text-on-glass">
                      Events
                      <span className="text-on-glass-muted text-sm font-normal ml-2">
                        ({data.totalEvents || 0} total)
                      </span>
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-on-glass-muted text-xs">Show</span>
                      {[10, 25, 50].map((size) => (
                        <button
                          key={size}
                          onClick={() => { setEventsPageSize(size); setEventsPage(1); }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                            eventsPageSize === size
                              ? 'bg-sky-400/20 text-sky-400 border border-sky-400/30'
                              : 'glass text-on-glass-muted hover:text-on-glass'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  {data.recentEvents.length > 0 ? (
                    <>
                      <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-on-glass-muted text-xs text-left">
                              <th className="pb-3 pr-4 font-medium">Time</th>
                              <th className="pb-3 pr-4 font-medium">Type</th>
                              <th className="pb-3 pr-4 font-medium">Details</th>
                              <th className="pb-3 font-medium">Country</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {data.recentEvents.map((event, i) => (
                              <tr key={i} className="text-on-glass-muted">
                                <td className="py-2.5 pr-4 whitespace-nowrap text-xs">
                                  {formatTimestamp(event.created_at)}
                                </td>
                                <td className="py-2.5 pr-4">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                      event.type === 'page_view'
                                        ? 'bg-sky-400/10 text-sky-400'
                                        : 'bg-cyan-400/10 text-cyan-400'
                                    }`}
                                  >
                                    {event.type === 'page_view' ? 'view' : 'click'}
                                  </span>
                                </td>
                                <td className="py-2.5 pr-4 text-xs">
                                  {event.type === 'project_click' ? (
                                    <span>
                                      {event.project_name}{' '}
                                      <span className="text-on-glass-muted/50">({event.link_type})</span>
                                    </span>
                                  ) : (
                                    <span>{event.page_path}</span>
                                  )}
                                </td>
                                <td className="py-2.5 text-center">
                                  {countryFlag(event.country)} {event.country}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                          <span className="text-on-glass-muted text-xs">
                            Page {eventsPage} of {totalPages}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEventsPage(1)}
                              disabled={eventsPage === 1}
                              className="px-2.5 py-1.5 glass rounded-lg text-xs text-on-glass-muted hover:text-on-glass disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                              First
                            </button>
                            <button
                              onClick={() => setEventsPage((p) => Math.max(1, p - 1))}
                              disabled={eventsPage === 1}
                              className="px-2.5 py-1.5 glass rounded-lg text-xs text-on-glass-muted hover:text-on-glass disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                              Prev
                            </button>
                            <button
                              onClick={() => setEventsPage((p) => Math.min(totalPages, p + 1))}
                              disabled={eventsPage === totalPages}
                              className="px-2.5 py-1.5 glass rounded-lg text-xs text-on-glass-muted hover:text-on-glass disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                              Next
                            </button>
                            <button
                              onClick={() => setEventsPage(totalPages)}
                              disabled={eventsPage === totalPages}
                              className="px-2.5 py-1.5 glass rounded-lg text-xs text-on-glass-muted hover:text-on-glass disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                              Last
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-on-glass-muted text-sm text-center py-8">No events yet</div>
                  )}
                </motion.div>
              );
            })()}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Analytics;
