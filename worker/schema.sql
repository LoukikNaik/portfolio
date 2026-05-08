CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  project_name TEXT,
  link_type TEXT,
  page_path TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  latitude REAL,
  longitude REAL,
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_events_project ON events(project_name) WHERE project_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_events_country ON events(country);
