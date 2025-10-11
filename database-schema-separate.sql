-- Supabase SQL Schema for Multiple Exhibition Registration Systems
-- Run these commands in your Supabase SQL editor to create the necessary tables

-- Keep the existing exhibition_registrations table for Gem Exhibition (unchanged)
CREATE TABLE exhibition_registrations (
    id BIGSERIAL PRIMARY KEY,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(200) NOT NULL,
    division VARCHAR(200),
    job_title VARCHAR(200),
    nationality VARCHAR(100) NOT NULL,
    
    -- Address Information
    country VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    
    -- Contact Information
    country_code VARCHAR(10) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255), -- Made optional since no email system
    
    -- Business Information
    business_type VARCHAR(100) NOT NULL,
    
    -- System fields
    entry_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'registered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create new table specifically for Trade Expo 2026 registrations
CREATE TABLE trade_expo_registrations (
    id BIGSERIAL PRIMARY KEY,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(200) NOT NULL,
    division VARCHAR(200),
    job_title VARCHAR(200),
    nationality VARCHAR(100) NOT NULL,
    
    -- Address Information
    country VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    
    -- Contact Information
    country_code VARCHAR(10) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    
    -- Business Information
    business_type VARCHAR(100) NOT NULL,
    company_size VARCHAR(100) NOT NULL,
    years_in_business INTEGER NOT NULL,
    products_services TEXT NOT NULL,
    target_markets TEXT,
    exhibition_goals TEXT NOT NULL,
    
    -- System fields
    entry_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'registered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for exhibition_registrations table
CREATE INDEX idx_exhibition_registrations_entry_code ON exhibition_registrations(entry_code);
CREATE INDEX idx_exhibition_registrations_created_at ON exhibition_registrations(created_at);
CREATE INDEX idx_exhibition_registrations_status ON exhibition_registrations(status);
CREATE INDEX idx_exhibition_registrations_phone ON exhibition_registrations(phone_number);

-- Create indexes for trade_expo_registrations table
CREATE INDEX idx_trade_expo_registrations_entry_code ON trade_expo_registrations(entry_code);
CREATE INDEX idx_trade_expo_registrations_created_at ON trade_expo_registrations(created_at);
CREATE INDEX idx_trade_expo_registrations_status ON trade_expo_registrations(status);
CREATE INDEX idx_trade_expo_registrations_phone ON trade_expo_registrations(phone_number);
CREATE INDEX idx_trade_expo_registrations_business_type ON trade_expo_registrations(business_type);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_exhibition_registrations_updated_at
    BEFORE UPDATE ON exhibition_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trade_expo_registrations_updated_at
    BEFORE UPDATE ON trade_expo_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS) policies for exhibition_registrations
ALTER TABLE exhibition_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert exhibition" ON exhibition_registrations
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read exhibition" ON exhibition_registrations
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated update exhibition" ON exhibition_registrations
    FOR UPDATE TO authenticated
    USING (true);

-- Add Row Level Security (RLS) policies for trade_expo_registrations
ALTER TABLE trade_expo_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert trade expo" ON trade_expo_registrations
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read trade expo" ON trade_expo_registrations
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated update trade expo" ON trade_expo_registrations
    FOR UPDATE TO authenticated
    USING (true);

-- Create view for Gem Exhibition admin dashboard
CREATE VIEW exhibition_registrations_view AS
SELECT 
    id,
    CONCAT(first_name, ' ', last_name) as full_name,
    first_name,
    last_name,
    company,
    division,
    job_title,
    nationality,
    country,
    address,
    CONCAT('+', country_code, ' ', phone_number) as phone,
    email,
    business_type,
    entry_code,
    status,
    created_at,
    updated_at
FROM exhibition_registrations
ORDER BY created_at DESC;

-- Create view for Trade Expo admin dashboard
CREATE VIEW trade_expo_registrations_view AS
SELECT 
    id,
    CONCAT(first_name, ' ', last_name) as full_name,
    first_name,
    last_name,
    company,
    division,
    job_title,
    nationality,
    country,
    address,
    CONCAT('+', country_code, ' ', phone_number) as phone,
    email,
    business_type,
    company_size,
    years_in_business,
    products_services,
    target_markets,
    exhibition_goals,
    entry_code,
    status,
    created_at,
    updated_at
FROM trade_expo_registrations
ORDER BY created_at DESC;

-- Grant select permissions on views
GRANT SELECT ON exhibition_registrations_view TO authenticated;
GRANT SELECT ON trade_expo_registrations_view TO authenticated;

-- Create function to get Gem Exhibition registration statistics
CREATE OR REPLACE FUNCTION get_exhibition_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_registrations', COUNT(*),
        'registrations_today', COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE),
        'registrations_this_week', COUNT(*) FILTER (WHERE created_at >= date_trunc('week', NOW())),
        'registrations_this_month', COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW())),
        'by_business_type', (
            SELECT json_object_agg(business_type, count)
            FROM (
                SELECT business_type, COUNT(*) as count
                FROM exhibition_registrations
                WHERE status = 'registered'
                GROUP BY business_type
            ) bt
        ),
        'by_country', (
            SELECT json_object_agg(country, count)
            FROM (
                SELECT country, COUNT(*) as count
                FROM exhibition_registrations
                WHERE status = 'registered'
                GROUP BY country
                ORDER BY count DESC
                LIMIT 10
            ) c
        )
    ) INTO result
    FROM exhibition_registrations
    WHERE status = 'registered';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get Trade Expo registration statistics
CREATE OR REPLACE FUNCTION get_trade_expo_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_registrations', COUNT(*),
        'registrations_today', COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE),
        'registrations_this_week', COUNT(*) FILTER (WHERE created_at >= date_trunc('week', NOW())),
        'registrations_this_month', COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW())),
        'by_business_type', (
            SELECT json_object_agg(business_type, count)
            FROM (
                SELECT business_type, COUNT(*) as count
                FROM trade_expo_registrations
                WHERE status = 'registered'
                GROUP BY business_type
            ) bt
        ),
        'by_company_size', (
            SELECT json_object_agg(company_size, count)
            FROM (
                SELECT company_size, COUNT(*) as count
                FROM trade_expo_registrations
                WHERE status = 'registered'
                GROUP BY company_size
            ) cs
        ),
        'by_country', (
            SELECT json_object_agg(country, count)
            FROM (
                SELECT country, COUNT(*) as count
                FROM trade_expo_registrations
                WHERE status = 'registered'
                GROUP BY country
                ORDER BY count DESC
                LIMIT 10
            ) c
        )
    ) INTO result
    FROM trade_expo_registrations
    WHERE status = 'registered';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_exhibition_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_trade_expo_stats() TO authenticated;

-- Comments for documentation
COMMENT ON TABLE exhibition_registrations IS 'Stores visitor registrations for the Lanka Gems & Jewels Canada Exhibition';
COMMENT ON TABLE trade_expo_registrations IS 'Stores registrations for the Lanka Trade Expo 2026 in Toronto, Canada';
COMMENT ON COLUMN exhibition_registrations.entry_code IS 'Unique QR code for Gem Exhibition entry';
COMMENT ON COLUMN trade_expo_registrations.entry_code IS 'Unique QR code for Trade Expo entry';
COMMENT ON COLUMN exhibition_registrations.status IS 'Registration status: registered, checked_in, cancelled';
COMMENT ON COLUMN trade_expo_registrations.status IS 'Registration status: registered, checked_in, cancelled';
