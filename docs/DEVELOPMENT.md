# Development Documentation

## Authentication Setup

This application uses NextAuth.js for authentication with Google OAuth provider.

### Environment Variables

To enable Google authentication, add the following to your `.env.local` file:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Database Schema for Users

The authentication system uses the following database tables (see DB-SCHEMA.md for full schema):

#### users table
- id: UUID (Primary Key)
- name: String
- email: String (Unique)
- email_verified: Timestamp
- image: String (URL to profile picture)
- created_at: Timestamp
- updated_at: Timestamp

#### accounts table (for OAuth)
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to users.id)
- type: String (oauth)
- provider: String (google)
- provider_account_id: String
- refresh_token: String
- access_token: String
- expires_at: Integer
- token_type: String
- scope: String
- id_token: String
- session_state: String

### API Routes

Authentication endpoints are handled by NextAuth.js:

- `GET /api/auth/signin` - Display sign-in page
- `POST /api/auth/signin` - Handle sign-in form submission
- `GET /api/auth/signin/google` - Initiate Google OAuth flow
- `GET /api/auth/callback/google` - Handle Google OAuth callback
- `POST /api/auth/signup` - Handle sign-up form submission
- `GET /api/auth/signup/google` - Initiate Google OAuth sign-up
- `GET /api/auth/session` - Get current session data
- `POST /api/auth/signout` - Sign out user

### Protected Routes

To protect pages or API routes, use the `getServerSession` helper:

```typescript
// In page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
```

For API routes:
```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  
  // Protected route logic here
}
```

### Components

Reusable authentication components are located in `src/components/auth/`:
- `SignInWithGoogle` - Button for Google authentication
- `AuthForm` - Base form component for sign-in/sign-up
- `ProtectedRoute` - Wrapper component for protecting routes

### Development Guidelines

1. **Environment Setup**
   - Install dependencies: `npm install`
   - Set up environment variables as described above
   - Run development server: `npm run dev`

2. **Database Migrations**
   - Supabase migrations are stored in `supabase/migrations/`
   - To apply new migrations: `supabase db push`

3. **Testing Authentication**
   - Test accounts can be created via the sign-up page
   - Google OAuth requires valid Google Cloud credentials
   - Use mock OAuth providers for unit testing

4. **Security Considerations**
   - Always use HTTPS in production
   - Set secure cookies in production
   - Implement rate limiting on auth endpoints
   - Regularly rotate NEXTAUTH_SECRET