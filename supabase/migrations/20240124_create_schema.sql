-- Create the schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS loodgieters;

-- Set the search path for subsequent operations
SET search_path TO loodgieters;

-- Create quotes table in the loodgieters schema
CREATE TABLE IF NOT EXISTS loodgieters.quotes (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES loodgieters.services(id),
    description TEXT NOT NULL,
    urgency urgency_level NOT NULL,
    images TEXT[],
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    province VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    city VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    max_responses INTEGER NOT NULL DEFAULT 3,
    response_count INTEGER NOT NULL DEFAULT 0,
    accepted_quote_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create quote_responses table in the loodgieters schema
CREATE TABLE IF NOT EXISTS loodgieters.quote_responses (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER REFERENCES loodgieters.quotes(id),
    plumber_id INTEGER REFERENCES loodgieters.plumbers(id),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_quotes_status ON loodgieters.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quote_responses_quote_id ON loodgieters.quote_responses(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_responses_plumber_id ON loodgieters.quote_responses(plumber_id);

