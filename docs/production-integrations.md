# Production integrations

## Source and deployment

`main` is the production source branch. GitHub Actions validates every push and
the `Deploy Vercel Production` workflow publishes the prebuilt artifact to the
linked Vercel project.

Before the first automatic deployment, add one GitHub repository secret and two
repository variables:

| GitHub setting | Value source | Exposure |
| --- | --- | --- |
| `VERCEL_TOKEN` secret | Vercel account token with access to the `web` project | Secret |
| `VERCEL_ORG_ID` variable | Linked Vercel project metadata | Non-secret |
| `VERCEL_PROJECT_ID` variable | Linked Vercel project metadata | Non-secret |

Vercel remains the runtime owner. The workflow retrieves its production
environment variables at build time; no application credential is stored in
GitHub.

## InsForge

InsForge is the production database and authentication provider. The Vercel
production environment must provide the following server-only settings:

- `AUTH_MODE=insforge`
- `INSFORGE_BASE_URL`
- `INSFORGE_ANON_KEY`
- `DATABASE_URL`
- `CORS_ORIGIN`, set to the canonical production app origin

The web process validates these values at startup. InsForge credentials are
never committed and must not use a `NEXT_PUBLIC_` prefix.

## Cloudinary

Cloudinary stores voucher images; InsForge stores the financial and voucher
metadata. Vercel must provide one of these server-only configurations:

- Preferred: `CLOUDINARY_URL`
- Alternative: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
  `CLOUDINARY_API_SECRET`

Voucher uploads use a short-lived server-generated signature. The Cloudinary
API secret never reaches the browser or the repository.
