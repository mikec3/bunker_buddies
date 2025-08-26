# Standard RedwoodSDK Starter

This "standard starter" is the recommended implementation for RedwoodSDK. You get a Typescript project with:

- Vite
- database (Prisma via D1)
- Session Management (via DurableObjects)
- Passkey authentication (Webauthn)
- Storage (via R2)

## Creating your project

```shell
npx create-rwsdk my-project-name
cd my-project-name
npm install
```

## Running the dev server

```shell
pnpm run dev
```

Point your browser to the URL displayed in the terminal (e.g. `http://localhost:5173/`). You should see a "Hello World" message in your browser.

# Starting Out
## Styling
```
npm i tailwindcss @tailwindcss/vite
```
1. Modify vite.config.mts
2. import @import "tailwindcss"; in styles.css
3. Add style tags to document.tsx
```
import styles from "./styles.css?url";
<head>
<link rel="stylesheet" href={styles} />
</head>
```
4. import fonts into styles.css
5. update headers.ts Content-Security-Policy to allow googleapis for fonts import.
6. install shadcn/ui
```
npx shadcn@latest init
```
7. modify aliases in components.json so shadcn installs in right location.
8. install shadcn components
```
npx shadcn@latest add
```
9. move lib->utils.ts into @app folder
10. created custom datepicker.tsx in components->ui




# Deploying your app

### Wrangler Setup

Within your project's `wrangler.jsonc`:

- Replace the `__change_me__` placeholders with a name for your application

- Create a new D1 database:

```shell
npx wrangler d1 create my-project-db
```

Copy the database ID provided and paste it into your project's `wrangler.jsonc` file:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-project-db",
      "database_id": "your-database-id",
    },
  ],
}
```

## Deploy
```
npm run release
```

### Authentication Setup

For authentication setup and configuration, including optional bot protection, see the [Authentication Documentation](https://docs.rwsdk.com/core/authentication).

## Further Reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Secrets](https://developers.cloudflare.com/workers/runtime-apis/secrets/)

