# Database Connection Test

## Issue: Registration form submits but gets 500 errors

Since the table exists, the most likely issue is Row Level Security (RLS) blocking inserts.

## Quick Fix - Disable RLS Temporarily

Run this in your Supabase SQL Editor:

```sql
-- Temporarily disable RLS to test if that's the issue
ALTER TABLE exhibition_registrations DISABLE ROW LEVEL SECURITY;
```

## Test the Registration Form

1. Go to http://localhost:3001/register
2. Fill out all required fields:
   - First Name, Last Name
   - Company 
   - Nationality
   - Country, Address
   - Country Code, Phone Number
   - Business Type

3. Submit and see if it works

## If It Works

The issue was RLS. You can re-enable it with proper policies:

```sql
-- Re-enable RLS
ALTER TABLE exhibition_registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Allow public insert" ON exhibition_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create a policy for reading (for admins)
CREATE POLICY "Allow authenticated read" ON exhibition_registrations
  FOR SELECT TO authenticated
  USING (true);
```

## If It Still Doesn't Work

Check the browser dev tools console (F12) for the exact error message.

## Alternative Test - Manual Insert

Try inserting a test record directly in Supabase SQL Editor:

```sql
INSERT INTO exhibition_registrations (
  first_name, 
  last_name, 
  company, 
  nationality, 
  country, 
  address, 
  country_code, 
  phone_number, 
  business_type, 
  entry_code, 
  status
) VALUES (
  'Test', 
  'User', 
  'Test Company', 
  'Canada', 
  'Canada', 
  '123 Test St', 
  '+1', 
  '1234567890', 
  'Other', 
  'GEM123TEST', 
  'registered'
);
```

If this fails, there's a schema issue. If it works, there's an API issue.
