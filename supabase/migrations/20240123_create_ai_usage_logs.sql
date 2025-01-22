-- Create ai_usage_logs table
CREATE TABLE ai_usage_logs (
  id SERIAL PRIMARY KEY,
  model_id INTEGER REFERENCES ai_models(id),
  user_id UUID REFERENCES auth.users(id),
  usage_type VARCHAR(255) NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_ai_usage_logs_model_id ON ai_usage_logs(model_id);
CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);
CREATE INDEX idx_ai_usage_logs_created_at ON ai_usage_logs(created_at);

