# Win Dumpster

Personal website and writing archive by Winaldo Manurung. Built with Next.js App Router and Notion as the article CMS.

## Setup

Install dependencies with `npm ci`. Copy `.env.example` to `.env.local`, then configure:

- `NEXT_PUBLIC_SITE_URL`: your canonical public website origin, without a trailing slash.
- `NOTION_API_KEY`: a Notion integration with access to the articles data source.
- `NOTION_DATA_SOURCE_ID`: the Notion data source ID for blog articles.
- `NOTION_WEBHOOK_VERIFICATION_TOKEN`: webhook verification secret from Notion, for validating incoming events.

Start with `npm run dev`. Before deploying, run `npm run lint` and `npm run build`.

## Notion properties

Required properties: `Name` (title), `Slug` (rich text), `Status` (select with `Published` option), `Date` (date), `Description` (rich text), and `Author` (rich text).

Optional properties: `Category` (select), `Tags` (multi-select), `Cover` (files & media; external image URL for social previews), and `Featured` (checkbox). Existing articles work without these optional properties. Slugs must be unique.

Only rows with `Status = Published` appear on the website. For uploaded Notion images, URLs are fetched by the application media proxy because Notion's original file URLs expire. Large videos/files use streaming; uploaded images above 25 MB are not supported by the image proxy.

## Publishing and indexing

`/articles` provides search, category filtering, and pagination. `/sitemap.xml`, `/robots.txt`, and `/feed.xml` are generated from the CMS. Article pages include canonical, Open Graph, and structured article metadata.

The Notion webhook endpoint is `/api/notion-webhook`. Configure the verification token privately as an environment variable. A valid webhook invalidates homepage and article routes. Pages also revalidate on a five-minute interval.

## Notes

Newsletter collection is intentionally disabled until a real email subscription service is configured. No addresses are collected by the template's former thank-you form. The original template's fictional speaking engagements have been removed from public navigation.

The GitHub Actions workflow runs static checks. A full deployment/build additionally requires the real Notion environment variables; do not commit API keys to this repository.
