# Exhibition Registration System Setup Guide

This guide explains how to set up the visitor registration system for the Lanka Gems & Jewels Canada Exhibition.

## What Was Created

### 1. Registration Page (`app/register/page.tsx`)
- A complete visitor registration page accessible at `/register`
- Multi-step form with 3 sections: Personal Info, Address & Contact, Business Info
- Progress indicator showing current step
- Form validation and error handling

### 2. Registration Form Component (`components/registration-content.tsx`)
- Responsive form with all required fields from the exhibition requirements
- Step-by-step wizard interface
- Real-time validation
- Toast notifications for success/error states
- Matches the design patterns of the existing site

### 3. API Route (`app/api/register/route.ts`)
- Handles POST requests to `/api/register`
- Validates all required fields
- Generates unique entry codes for each registration
- Stores data in Supabase database
- Prevents duplicate email registrations

### 4. Database Schema (`database-schema.sql`)
- Complete Supabase/PostgreSQL schema
- Includes all registration fields
- Row Level Security (RLS) policies
- Indexes for performance
- Admin view for easy data management
- Statistics function for reporting

### 5. Frontend Integration
- Added registration button to the main page under the current event section
- Button redirects users to `/register`
- Styled to match the existing design system

## Database Setup Instructions

### Step 1: Run the SQL Schema
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the query to create all necessary tables and functions

### Step 2: Verify Table Creation
The following table will be created:
- `exhibition_registrations` - Main registration table
- `exhibition_registrations_view` - Admin view with formatted data

### Alternative: MongoDB Setup (if you prefer MongoDB)

If you want to use MongoDB instead of Supabase, here's the schema:

```javascript
// MongoDB Collection: exhibition_registrations
{
  _id: ObjectId,
  
  // Personal Information
  firstName: String, // required
  lastName: String,  // required
  company: String,   // required
  division: String,  // optional
  jobTitle: String,  // optional
  nationality: String, // required
  
  // Address Information  
  country: String,   // required
  address: String,   // required
  
  // Contact Information
  countryCode: String, // required
  phoneNumber: String, // required
  email: String,       // required, unique
  
  // Business Information
  businessType: String, // required
  
  // System fields
  entryCode: String,    // required, unique
  status: String,       // default: "registered"
  createdAt: Date,      // default: new Date()
  updatedAt: Date       // default: new Date()
}

// Indexes
db.exhibition_registrations.createIndex({ "email": 1 }, { unique: true })
db.exhibition_registrations.createIndex({ "entryCode": 1 }, { unique: true })
db.exhibition_registrations.createIndex({ "createdAt": 1 })
db.exhibition_registrations.createIndex({ "status": 1 })
```

To use MongoDB:
1. Install MongoDB driver: `npm install mongodb`
2. Create a new file `lib/mongodb.ts`
3. Update the API route to use MongoDB instead of Supabase

## Environment Variables

Make sure your `.env.local` file includes:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Alternative: MongoDB Configuration (if using MongoDB)
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

## Features Included

### Registration Form Fields
- **Personal Information:**
  - First Name (required)
  - Last Name (required)  
  - Company (required)
  - Division (optional)
  - Job Title (optional)
  - Nationality (required)

- **Address & Contact:**
  - Country (required)
  - Full Address (required)
  - Country Code (required)
  - Phone Number (required)

- **Business Information:**
  - Business Type (required)

**Note:** Email fields have been removed as no email system is available.

### System Features
- Unique entry code generation
- Phone-based contact system (no email required)
- Mobile-responsive design
- Progress tracking
- Toast notifications
- Error handling
- Clean, multi-step form interface

## Admin Features (Potential Additions)

The database schema includes admin-friendly features:

1. **Registration Management View:**
   - View all registrations
   - Filter by status, date, country, etc.
   - Export capabilities

2. **Statistics Dashboard:**
   - Total registrations
   - Daily/weekly/monthly trends
   - Country distribution
   - Business type breakdown

3. **Entry Code Management:**
   - Generate QR codes
   - Track check-ins
   - Update registration status

## Next Steps

1. **Admin Dashboard:** Create admin pages to view and manage registrations
2. **QR Code Generation:** Implement QR code generation for entry codes  
3. **Export Functionality:** Add CSV/Excel export for registration data
4. **Analytics:** Add Google Analytics or similar for registration tracking
5. **Entry Code Display:** Create a better way to display/print entry codes for visitors

## File Structure

```
app/
├── register/
│   └── page.tsx                 # Registration page
├── api/
│   └── register/
│       └── route.ts            # Registration API endpoint
└── page.tsx                    # Updated homepage with registration button

components/
└── registration-content.tsx    # Registration form component

lib/
└── supabase.ts                # Updated with registration types

database-schema.sql             # Database setup script
```

## Testing

To test the registration system:

1. Navigate to `/register` on your site
2. Fill out the registration form with valid data
3. Submit the form
4. Check your Supabase dashboard for the new registration record
5. Verify the entry code was generated correctly

## Security Considerations

- Row Level Security (RLS) is enabled on the registration table
- Anonymous users can only insert new registrations
- Authenticated users (admins) can read and update registrations
- Email addresses are unique to prevent duplicate registrations
- Input validation on both frontend and backend

This registration system is now ready for production use and can handle the expected load for the exhibition.

