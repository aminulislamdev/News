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

This project uses [Better Auth](https://www.better-auth.com/) with the MongoDB adapter for email-and-password authentication. Passwords are hashed with scrypt by Better Auth; plaintext passwords are never stored. Sessions are stored in MongoDB and sent to the browser in an HttpOnly cookie.

### Required environment variables

Copy `.env.example` to `.env` and configure:

| Variable | Purpose |
|---|---|
| `BETTER_AUTH_SECRET` | Secret used to sign/encrypt auth data. Use at least 32 random characters. |
| `BETTER_AUTH_URL` | Public origin of the app. Use `http://localhost:3000` locally and your HTTPS origin in production. |
| `MONGODB_URI` | MongoDB connection string, including the database name. |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

If you cannot use `MONGODB_URI`, the app also supports the split settings `DB_USER`, `DB_PASSWORD`, `MONGODB_HOST`, and `MONGODB_DB`. A database name is required either in the URI or through `MONGODB_DB`; the app will not silently fall back to MongoDB's `test` database.

The MongoDB user needs read/write access to the configured database. Better Auth creates its collections and indexes automatically; no migration step is required.

### Routes

| Route | Purpose |
|---|---|
| `/sign-up` | Create an email-and-password account. |
| `/sign-in` | Sign in with an existing account. |
| `/account` | Protected account page; unauthenticated visitors are redirected to sign in. |
| `/api/auth/[...all]` | Better Auth route handler. |

### Authentication behaviour

- Registration automatically signs the user in and redirects to the home page or a safe `callbackUrl`.
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
