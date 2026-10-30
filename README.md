This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Authentication

This project uses [Better Auth](https://www.better-auth.com/) with the MongoDB adapter for email-and-password and Google authentication. Passwords are hashed with scrypt by Better Auth; plaintext passwords are never stored. Sessions are stored in MongoDB and sent to the browser in an HttpOnly cookie.

### Required environment variables

Copy `.env.example` to `.env` and configure:

| Variable               | Purpose                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | Secret used to sign/encrypt auth data. Use at least 32 random characters.                    |
| `BETTER_AUTH_URL`      | Public origin of the app. Use `http://localhost:3000` locally and your HTTPS origin in production.    |
| `MONGODB_URI`          | MongoDB connection string, including the database name.                                      |
| `GOOGLE_CLIENT_ID`     | OAuth 2.0 Web application client ID from Google Cloud. Required for Google sign-in.          |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 client secret from Google Cloud. Server-side only; never expose it to the browser. |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

If you cannot use `MONGODB_URI`, the app also supports the split settings `DB_USER`, `DB_PASSWORD`, `MONGODB_HOST`, and `MONGODB_DB`. A database name is required either in the URI or through `MONGODB_DB`; the app will not silently fall back to MongoDB's `test` database.

The MongoDB user needs read/write access to the configured database. Better Auth creates its collections and indexes automatically; no migration step is required.

### Google OAuth setup (local development)

Google sign-in uses the same Better Auth instance and session system as email-and-password authentication. The button only appears when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create a project (or select an existing one).
2. Go to **APIs & Services → OAuth consent screen**. Choose the user type, then fill in the app name, user support email, and developer contact email. While the app is in **Testing**, add your Google account under **Test users**.
3. Go to **APIs & Services → Credentials → Create credentials → OAuth client ID**.
4. Set **Application type** to **Web application**.
5. Add the authorized JavaScript origin for this app:
   ```
   http://localhost:3000
   ```
6. Add the authorized redirect URI. Better Auth serves the Google callback at `/api/auth/callback/google` under `BETTER_AUTH_URL`, which is `http://localhost:3000` locally:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Create the client and copy its values into `.env`:
   ```bash
   GOOGLE_CLIENT_ID="<client-id>.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="<client-secret>"
   ```
8. Restart `npm run dev` so the new environment variables are loaded.

The redirect URI is derived from `BETTER_AUTH_URL` plus Better Auth's `/api/auth/callback/google` path. If you change the port or origin, update `BETTER_AUTH_URL` and add the matching origin and redirect URI in Google Cloud. Never commit `.env`, and never send `GOOGLE_CLIENT_SECRET` to the browser.

No Google password is requested or stored. Google returns a verified identity, and Better Auth creates a local user and links a Google account record on first sign-in. If an email-and-password account already exists with the same email, Better Auth's secure default does not link it automatically because local emails are not verified; sign in with the password instead.

### Routes

| Route                | Purpose                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `/sign-up`           | Create an email-and-password account.                                       |
| `/sign-in`           | Sign in with an existing account.                                           |
| `/account`           | Protected account page; unauthenticated visitors are redirected to sign in. |
| `/api/auth/[...all]` | Better Auth route handler.                                                  |

### Authentication behaviour

- Registration automatically signs the user in and redirects to the home page or a safe `callbackUrl`.
- Google sign-in creates an account on first use and signs returning users into their existing account.
- Cancelled Google sign-in and provider/callback errors redirect back to the auth page with a safe, translated error message.
- Duplicate email addresses and invalid credentials are rejected by the server.
- Visiting `/sign-in` or `/sign-up` while signed in redirects to the safe callback destination.
- The header shows the signed-in user's name and a sign-out action.
- Email verification and password reset are not enabled because no mail provider is configured. New accounts are active immediately.

### Testing authentication

1. Start the app with `npm run dev`.
2. Open `/sign-up`, register with a new email, and confirm the success message and redirect.
3. Try registering the same email again; the duplicate-email error should be shown.
4. Try an invalid email, a short password, and a mismatched confirmation; each should show a field error.
5. Sign out, then sign in with the correct password.
6. Sign in with an incorrect password; the credentials error should be shown.
7. Refresh the page and confirm the session is retained.
8. Sign out and confirm the header returns to the signed-out state.
9. Open `/account` while signed out; confirm the redirect to `/sign-in?callbackUrl=%2Faccount`.
10. Sign in and confirm `/account` renders your name and email.
11. Confirm the "Continue with Google" button appears on `/sign-in` and `/sign-up` when Google credentials are configured.
12. Click it, choose a Google test account, and confirm you are redirected back and signed in.
13. Click it again and cancel on Google's screen; confirm you return to the same auth page with a cancellation message.
14. Sign out, sign in with Google again, and confirm the same account is reused rather than duplicated.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
