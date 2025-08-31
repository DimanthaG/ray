# Registration Debug Guide

## Issue: Database Not Populating & 400 Errors

Based on the screenshots, the registration is failing with 400 errors. Here's how to debug and fix:

## Step 1: Check if Database Table Exists

**The most likely issue is that the `exhibition_registrations` table hasn't been created yet.**

### To Fix:
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the entire content from `database-schema.sql`
4. Run the query to create the table

## Step 2: Verify Environment Variables

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Test the Registration

1. Fill out the registration form completely
2. Check the browser console for detailed error messages
3. Check the terminal where you're running `npm run dev` for server logs

## Step 4: Check Console Logs

I've added debugging to the API route. You should see:
- "Received registration data:" - Shows what data is being sent
- "Field values:" - Shows each field value
- "Inserting data to Supabase:" - Shows data being inserted
- "Supabase error details:" - Shows any database errors

## Common Issues & Solutions:

### 1. Table Doesn't Exist
**Error:** "relation 'exhibition_registrations' does not exist"
**Solution:** Run the SQL schema from `database-schema.sql`

### 2. Missing Required Fields
**Error:** "Missing required fields"
**Solution:** Make sure all required fields are filled:
- First Name
- Last Name
- Company
- Nationality
- Country
- Address
- Country Code
- Phone Number
- Business Type

### 3. Supabase Connection Issues
**Error:** Various connection errors
**Solution:** Check your Supabase URL and anon key in `.env.local`

### 4. RLS (Row Level Security) Issues
**Error:** "insufficient privileges" or "policy violation"
**Solution:** The SQL schema includes RLS policies, but if there are issues, you can temporarily disable RLS:
```sql
ALTER TABLE exhibition_registrations DISABLE ROW LEVEL SECURITY;
```

## Quick Test:

1. Open browser dev tools (F12)
2. Go to `/register`
3. Fill out the form
4. Submit and watch the console/network tabs for errors
5. Check your terminal for server-side logs

## If Still Not Working:

1. Check Supabase dashboard logs
2. Verify the table structure matches the schema
3. Test the Supabase connection directly
4. Check if there are any firewall/network issues

## Manual Database Test:

You can test if the table exists by running this in Supabase SQL editor:
```sql
SELECT * FROM exhibition_registrations LIMIT 1;
```

If this gives an error, the table doesn't exist and you need to run the schema.
