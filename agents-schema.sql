-- Supabase SQL Schema for Raytronics Agents System
-- Run these commands in your Supabase SQL editor to create the necessary tables

-- Create agents table
CREATE TABLE agents (
    id BIGSERIAL PRIMARY KEY,
    
    -- Agent Information
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    title VARCHAR(200),
    bio TEXT,
    profile_image_url TEXT,
    
    -- QR Code Information
    qr_code VARCHAR(100) NOT NULL UNIQUE,
    
    -- Contact Information
    location VARCHAR(200),
    website VARCHAR(255),
    linkedin_url VARCHAR(255),
    whatsapp_number VARCHAR(50),
    
    -- Status and Metadata
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_agents_qr_code ON agents(qr_code);
CREATE INDEX idx_agents_email ON agents(email);
CREATE INDEX idx_agents_is_active ON agents(is_active);
CREATE INDEX idx_agents_is_verified ON agents(is_verified);
CREATE INDEX idx_agents_created_at ON agents(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_agents_updated_at();

-- Add Row Level Security (RLS) policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous reads (for public agent pages via QR code)
CREATE POLICY "Allow public read by qr code" ON agents
    FOR SELECT TO anon
    USING (is_active = true AND is_verified = true);

-- Policy to allow authenticated users to read all agents (for admin)
CREATE POLICY "Allow authenticated read all agents" ON agents
    FOR SELECT TO authenticated
    USING (true);

-- Policy to allow authenticated users to insert agents (for admin)
CREATE POLICY "Allow authenticated insert agents" ON agents
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Policy to allow authenticated users to update agents (for admin)
CREATE POLICY "Allow authenticated update agents" ON agents
    FOR UPDATE TO authenticated
    USING (true);

-- Policy to allow authenticated users to delete agents (for admin)
CREATE POLICY "Allow authenticated delete agents" ON agents
    FOR DELETE TO authenticated
    USING (true);

-- Function to generate unique QR code
CREATE OR REPLACE FUNCTION generate_agent_qr_code()
RETURNS TEXT AS $$
DECLARE
    new_qr_code TEXT;
    exists_check INTEGER;
BEGIN
    LOOP
        -- Generate a random QR code (8 characters alphanumeric)
        new_qr_code := UPPER(
            SUBSTRING(
                MD5(RANDOM()::TEXT || NOW()::TEXT) 
                FROM 1 FOR 8
            )
        );
        
        -- Check if it already exists
        SELECT COUNT(*) INTO exists_check
        FROM agents
        WHERE qr_code = new_qr_code;
        
        -- Exit loop if unique
        EXIT WHEN exists_check = 0;
    END LOOP;
    
    RETURN new_qr_code;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE agents IS 'Stores verified agents of the Raytronics Group';
COMMENT ON COLUMN agents.qr_code IS 'Unique QR code identifier for agent profile page';
COMMENT ON COLUMN agents.is_active IS 'Whether the agent profile is currently active';
COMMENT ON COLUMN agents.is_verified IS 'Whether the agent is verified by Raytronics Group';

