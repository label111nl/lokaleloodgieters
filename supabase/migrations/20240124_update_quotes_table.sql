-- Update quotes table
ALTER TABLE quotes
ADD COLUMN max_responses INTEGER NOT NULL DEFAULT 3,
ADD COLUMN response_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'open',
ADD COLUMN accepted_quote_id INTEGER REFERENCES quotes(id);

-- Create quote_responses table
CREATE TABLE quote_responses (
  id SERIAL PRIMARY KEY,
  quote_id INTEGER REFERENCES quotes(id),
  plumber_id INTEGER REFERENCES plumbers(id),
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

-- Add indexes
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quote_responses_quote_id ON quote_responses(quote_id);
CREATE INDEX idx_quote_responses_plumber_id ON quote_responses(plumber_id);

