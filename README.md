# Chatbot Project - Environment Configuration

This document provides detailed information about the environment variables required for this Next.js chatbot application using Vercel AI SDK, Drizzle ORM, and Neon Database.

## Environment Variables

Create a `.env` or `.env.local` file in the root of your project with the following variables:

### Weather Integration
```bash
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
```
- **Description**: API key for OpenWeatherMap service
- **Purpose**: Enables weather-related features in the chatbot
- **Get your key**: [OpenWeatherMap API Keys](https://home.openweathermap.org/api_keys)

### AI Gateway
```bash
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```
- **Description**: API key for AI Gateway service
- **Purpose**: Routes and manages AI model requests
- **Get your key**: Contact your AI Gateway provider or check their dashboard

### Stock Market Data
```bash
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
```
- **Description**: API key for Alpha Vantage financial data service
- **Purpose**: Provides stock market and financial data to the chatbot
- **Get your key**: [Alpha Vantage API](https://www.alphavantage.co/support/#api-key)

### Database Configuration
```bash
DATABASE_URL=postgresql://user:password@project-id.region.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- **Description**: PostgreSQL connection string for Neon database
- **Purpose**: Database connection for storing chat history, user data, and application state
- **Format**: `postgresql://[user]:[password]@[host]/[database]?sslmode=require&channel_binding=require`
- **Get your URL**: [Neon Console](https://console.neon.tech) → Your Project → Connection Details

### Authentication - Google OAuth
```bash
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
- **Description**: Google OAuth 2.0 credentials
- **Purpose**: Enables "Sign in with Google" functionality
- **Setup**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing one
  3. Navigate to "APIs & Services" → "Credentials"
  4. Create OAuth 2.0 Client ID
  5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (development) and your production URL

### Authentication - GitHub OAuth
```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```
- **Description**: GitHub OAuth application credentials
- **Purpose**: Enables "Sign in with GitHub" functionality
- **Setup**:
  1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
  2. Click "New OAuth App"
  3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (development) and your production URL
  4. Copy Client ID and generate a new Client Secret

### NextAuth Configuration
```bash
AUTH_SECRET=your_random_secret_string_here
NEXTAUTH_SECRET=your_random_secret_string_here
NEXTAUTH_URL=http://localhost:3000
```
- **AUTH_SECRET / NEXTAUTH_SECRET**: Random string used to encrypt tokens and sessions
  - **Generate**: Run `openssl rand -base64 32` in your terminal
  - **Note**: Both variables may be used for compatibility; ensure they match
- **NEXTAUTH_URL**: The canonical URL of your site
  - Development: `http://localhost:3000`
  - Production: Your actual domain (e.g., `https://yourdomain.com`)

## Database Setup with Drizzle ORM

### Install Dependencies
```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

### Drizzle Commands

#### Generate Migrations
Generate SQL migration files based on your schema changes:
```bash
npx drizzle-kit generate
```
or add to `package.json`:
```json
"scripts": {
  "db:generate": "drizzle-kit generate"
}
```
Then run: `npm run db:generate`

#### Push Schema to Database
Push your schema changes directly to the database without generating migration files:
```bash
npx drizzle-kit push
```
or add to `package.json`:
```json
"scripts": {
  "db:push": "drizzle-kit push"
}
```
Then run: `npm run db:push`

#### Run Migrations
Apply generated migrations to your database:
```bash
npx drizzle-kit migrate
```
or add to `package.json`:
```json
"scripts": {
  "db:migrate": "drizzle-kit migrate"
}
```
Then run: `npm run db:migrate`

### Recommended package.json Scripts
Add these to your `package.json` for convenience:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in all required values

4. **Set up the database**
   ```bash
   npm run db:push
   # or
   npm run db:generate && npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Security Notes

- ⚠️ **Never commit your `.env` or `.env.local` file to version control**
- Add `.env*.local` to your `.gitignore` file
- Use different secrets for development and production
- Rotate secrets regularly, especially after team member changes
- For production, use environment variable management from your hosting provider (Vercel, Railway, etc.)

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Ensure your IP is allowed in Neon's connection settings
- Check that SSL mode is properly configured

### Authentication Issues
- Verify redirect URIs match exactly in OAuth provider settings
- Ensure `NEXTAUTH_URL` matches your current domain
- Check that secrets are properly generated and consistent

### API Integration Issues
- Verify all API keys are active and have proper permissions
- Review API documentation for any recent changes

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Database Documentation](https://neon.tech/docs/introduction)
- [NextAuth.js Documentation](https://next-auth.js.org/)