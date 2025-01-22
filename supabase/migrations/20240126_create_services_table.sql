-- Create services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial services
INSERT INTO services (name, description, icon) VALUES
('Loodgieterswerk', 'Algemene loodgietersdiensten voor al uw sanitaire behoeften.', 'Wrench'),
('Rioolservice', 'Professionele ontstopping en reparatie van rioleringen.', 'Droplet'),
('Verwarming', 'Installatie en onderhoud van verwarmingssystemen.', 'Thermometer'),
('Dakwerk', 'Reparatie en onderhoud van dakgoten en regenpijpen.', 'Home'),
('Badkamerrenovatie', 'Complete renovatie en modernisering van badkamers.', 'Shower'),
('Keukeninstallaties', 'Installatie van keukenkranen en andere sanitaire voorzieningen.', 'PenTool'),
('Waterlekkage', 'Snelle detectie en reparatie van waterlekkages.', 'Droplet'),
('Boilerservice', 'Installatie, reparatie en onderhoud van boilers.', 'Thermometer');

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

