-- Create ai_models table
CREATE TABLE ai_models (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  model_id VARCHAR(255) NOT NULL,
  api_key VARCHAR(255),
  is_free BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some initial data
INSERT INTO ai_models (name, provider, model_id, is_free, is_active) VALUES
('GPT-3.5 Turbo', 'OpenAI', 'gpt-3.5-turbo', false, false),
('GPT-4', 'OpenAI', 'gpt-4', false, false),
('DALL-E 2', 'OpenAI', 'dall-e-2', false, false),
('Stable Diffusion', 'Stability AI', 'stable-diffusion', true, false),
('GPT-J-6B', 'EleutherAI', 'gpt-j-6b', true, false);

-- Create an index on the is_active column
CREATE INDEX idx_ai_models_is_active ON ai_models(is_active);

