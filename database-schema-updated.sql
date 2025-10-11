-- Supabase SQL Schema for Exhibition Registration System (Updated for Multiple Events)
-- Run these commands in your Supabase SQL editor to create the necessary tables

-- Create exhibition_registrations table (Updated with additional fields)
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
    
    -- Additional fields for Trade Expo 2026
    event_type VARCHAR(50) DEFAULT 'gem_exhibition', -- 'gem_exhibition' or 'trade_expo_2026'
    company_size VARCHAR(100), -- For Trade Expo
    years_in_business INTEGER, -- For Trade Expo
    products_services TEXT, -- For Trade Expo
    target_markets TEXT, -- For Trade Expo
    exhibition_goals TEXT, -- For Trade Expo
    
    -- System fields
    entry_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'registered',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_exhibition_registrations_entry_code ON exhibition_registrations(entry_code);
CREATE INDEX idx_exhibition_registrations_created_at ON exhibition_registrations(created_at);
CREATE INDEX idx_exhibition_registrations_status ON exhibition_registrations(status);
CREATE INDEX idx_exhibition_registrations_phone ON exhibition_registrations(phone_number); -- Phone as alternate contact
CREATE INDEX idx_exhibition_registrations_event_type ON exhibition_registrations(event_type); -- New index for event type

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_exhibition_registrations_updated_at
    BEFORE UPDATE ON exhibition_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS) policies
ALTER TABLE exhibition_registrations ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous inserts (for public registration)
CREATE POLICY "Allow public insert" ON exhibition_registrations
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy to allow authenticated users to read all registrations (for admin)
CREATE POLICY "Allow authenticated read" ON exhibition_registrations
    FOR SELECT TO authenticated
    USING (true);

-- Policy to allow authenticated users to update registrations (for admin)
CREATE POLICY "Allow authenticated update" ON exhibition_registrations
    FOR UPDATE TO authenticated
    USING (true);

-- Optional: Create a view for admin dashboard with formatted data
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
    email, -- Optional field
    business_type,
    event_type,
    company_size,
    years_in_business,
    products_services,
    target_markets,
    exhibition_goals,
    entry_code,
    status,
    created_at,
    updated_at
FROM exhibition_registrations
ORDER BY created_at DESC;

-- Grant select permission on the view to authenticated users
GRANT SELECT ON exhibition_registrations_view TO authenticated;

-- Optional: Create function to get registration statistics
CREATE OR REPLACE FUNCTION get_registration_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_registrations', COUNT(*),
        'registrations_today', COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE),
        'registrations_this_week', COUNT(*) FILTER (WHERE created_at >= date_trunc('week', NOW())),
        'registrations_this_month', COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW())),
        'by_event_type', (
            SELECT json_object_agg(event_type, count)
            FROM (
                SELECT event_type, COUNT(*) as count
                FROM exhibition_registrations
                WHERE status = 'registered'
                GROUP BY event_type
            ) et
        ),
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_registration_stats() TO authenticated;

-- Comments for documentation
COMMENT ON TABLE exhibition_registrations IS 'Stores visitor registrations for exhibitions and trade shows';
COMMENT ON COLUMN exhibition_registrations.entry_code IS 'Unique QR code for exhibition entry';
COMMENT ON COLUMN exhibition_registrations.status IS 'Registration status: registered, checked_in, cancelled';
COMMENT ON COLUMN exhibition_registrations.event_type IS 'Type of event: gem_exhibition or trade_expo_2026';
COMMENT ON COLUMN exhibition_registrations.company_size IS 'Size of the company (for Trade Expo)';
COMMENT ON COLUMN exhibition_registrations.years_in_business IS 'Years the company has been in business (for Trade Expo)';
COMMENT ON COLUMN exhibition_registrations.products_services IS 'Description of products/services (for Trade Expo)';
COMMENT ON COLUMN exhibition_registrations.target_markets IS 'Target markets for the business (for Trade Expo)';
COMMENT ON COLUMN exhibition_registrations.exhibition_goals IS 'Goals for participating in the exhibition (for Trade Expo)';

-- Migration script to add new columns to existing table (if table already exists)
-- Uncomment and run these if you already have the exhibition_registrations table:

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS event_type VARCHAR(50) DEFAULT 'gem_exhibition';

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS company_size VARCHAR(100);

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS years_in_business INTEGER;

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS products_services TEXT;

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS target_markets TEXT;

-- ALTER TABLE exhibition_registrations 
-- ADD COLUMN IF NOT EXISTS exhibition_goals TEXT;

-- CREATE INDEX IF NOT EXISTS idx_exhibition_registrations_event_type ON exhibition_registrations(event_type);

-- DROP VIEW IF EXISTS exhibition_registrations_view;
-- CREATE VIEW exhibition_registrations_view AS
-- SELECT 
--     id,
--     CONCAT(first_name, ' ', last_name) as full_name,
--     first_name,
--     last_name,
--     company,
--     division,
--     job_title,
--     nationality,
--     country,
--     address,
--     CONCAT('+', country_code, ' ', phone_number) as phone,
--     email,
--     business_type,
--     event_type,
--     company_size,
--     years_in_business,
--     products_services,
--     target_markets,
--     exhibition_goals,
--     entry_code,
--     status,
--     created_at,
--     updated_at
-- FROM exhibition_registrations
-- ORDER BY created_at DESC;

-- GRANT SELECT ON exhibition_registrations_view TO authenticated;
