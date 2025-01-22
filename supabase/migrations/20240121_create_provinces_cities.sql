-- Create provinces table
CREATE TABLE provinces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cities table with province reference
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  province_id INTEGER REFERENCES provinces(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, province_id)
);

-- Insert provinces
INSERT INTO provinces (name) VALUES
  ('Drenthe'),
  ('Flevoland'),
  ('Friesland'),
  ('Gelderland'),
  ('Groningen'),
  ('Limburg'),
  ('Noord-Brabant'),
  ('Noord-Holland'),
  ('Overijssel'),
  ('Utrecht'),
  ('Zeeland'),
  ('Zuid-Holland');

-- Create indexes
CREATE INDEX idx_cities_province_id ON cities(province_id);
CREATE INDEX idx_cities_name ON cities(name);

