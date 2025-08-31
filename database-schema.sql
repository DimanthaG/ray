-- Supabase SQL Schema for Exhibition Registration System
-- Run these commands in your Supabase SQL editor to create the necessary tables

-- Create exhibition_registrations table
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

-- Create indexes for better performance
CREATE INDEX idx_exhibition_registrations_entry_code ON exhibition_registrations(entry_code);
CREATE INDEX idx_exhibition_registrations_created_at ON exhibition_registrations(created_at);
CREATE INDEX idx_exhibition_registrations_status ON exhibition_registrations(status);
CREATE INDEX idx_exhibition_registrations_phone ON exhibition_registrations(phone_number); -- Phone as alternate contact

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
COMMENT ON TABLE exhibition_registrations IS 'Stores visitor registrations for the Lanka Gems & Jewels Canada Exhibition';
COMMENT ON COLUMN exhibition_registrations.entry_code IS 'Unique QR code for exhibition entry';
COMMENT ON COLUMN exhibition_registrations.status IS 'Registration status: registered, checked_in, cancelled';

