-- Migration script to add missing columns to agents table
-- Run this if your agents table is missing columns

-- Add missing columns (only if they don't exist)
DO $$ 
BEGIN
    -- Add title column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='title') THEN
        ALTER TABLE agents ADD COLUMN title VARCHAR(200);
    END IF;

    -- Add bio column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='bio') THEN
        ALTER TABLE agents ADD COLUMN bio TEXT;
    END IF;

    -- Add profile_image_url column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='profile_image_url') THEN
        ALTER TABLE agents ADD COLUMN profile_image_url TEXT;
    END IF;

    -- Add qr_code column (CRITICAL - this is required!)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='qr_code') THEN
        ALTER TABLE agents ADD COLUMN qr_code VARCHAR(100) UNIQUE;
    END IF;

    -- Add location column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='location') THEN
        ALTER TABLE agents ADD COLUMN location VARCHAR(200);
    END IF;

    -- Add website column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='website') THEN
        ALTER TABLE agents ADD COLUMN website VARCHAR(255);
    END IF;

    -- Add linkedin_url column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='linkedin_url') THEN
        ALTER TABLE agents ADD COLUMN linkedin_url VARCHAR(255);
    END IF;

    -- Add whatsapp_number column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='whatsapp_number') THEN
        ALTER TABLE agents ADD COLUMN whatsapp_number VARCHAR(50);
    END IF;

    -- Add is_active column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='is_active') THEN
        ALTER TABLE agents ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;

    -- Add is_verified column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='is_verified') THEN
        ALTER TABLE agents ADD COLUMN is_verified BOOLEAN DEFAULT true;
    END IF;

    -- Add created_at column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='created_at') THEN
        ALTER TABLE agents ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- Add updated_at column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='agents' AND column_name='updated_at') THEN
        ALTER TABLE agents ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Make qr_code NOT NULL if it's not already (only if table is empty)
DO $$
BEGIN
    IF (SELECT COUNT(*) FROM agents) = 0 THEN
        ALTER TABLE agents ALTER COLUMN qr_code SET NOT NULL;
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_agents_qr_code ON agents(qr_code);
CREATE INDEX IF NOT EXISTS idx_agents_email ON agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_is_active ON agents(is_active);
CREATE INDEX IF NOT EXISTS idx_agents_is_verified ON agents(is_verified);
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at);

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_agents_updated_at ON agents;
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_agents_updated_at();

-- Create or replace the QR code generation function
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

-- Ensure RLS is enabled
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow public read by qr code" ON agents;
DROP POLICY IF EXISTS "Allow authenticated read all agents" ON agents;
DROP POLICY IF EXISTS "Allow authenticated insert agents" ON agents;
DROP POLICY IF EXISTS "Allow authenticated update agents" ON agents;
DROP POLICY IF EXISTS "Allow authenticated delete agents" ON agents;

-- Recreate RLS policies
CREATE POLICY "Allow public read by qr code" ON agents
    FOR SELECT TO anon
    USING (is_active = true AND is_verified = true);

CREATE POLICY "Allow authenticated read all agents" ON agents
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated insert agents" ON agents
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update agents" ON agents
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete agents" ON agents
    FOR DELETE TO authenticated
    USING (true);

