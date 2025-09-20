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

## Database (local)
1. make changes to prisma/schema.prisma file
2. CLI command migration (can tell what changed in the schema file and makes a migration)
```
npm run migrate:new "setup social models"
```
3. input 'copy relative path' of .wranger/state/v3/d1/sqlite file into .env file as DATABASE_URL = "file:../.wrangler....."
4. inspect DB with prisma
```
npx prisma studio
```
5. any seed scripts (I think) in /scripts will run during migration, call also call out
```
npm run seed
```

#### DB Notes
* You can always delete the .wranger folder and re-run 'npm run migrate:dev' to regenerate. - will need to update DATABASE_URL in .env with new sqlite file location.

after running npm run release I had two main issues
local dev no longer worked due to db issues and remote db never seeded (applicationStatus empty).
for local fix I deleted .wrangler folder and re-ran npm run dev, then updated schema.prisma file with sqlite file location.

test with - should show you application statuses from local db
npx wrangler d1 execute tutorial_v2-reluctant-planarian --local --command="SELECT * FROM ApplicationStatus"

npx prisma studio should also show you local db again and site should work.

remote db seeding issue notes
npx wrangler d1 execute tutorial_v2-reluctant-planarian --remote --command="SELECT * FROM User"
didn't work, can't access error. Checking id of db from error.
RAN IT AGAIN AND IT WORKED
try seeding with a sql script - see .src/scripts/ProdSeed.sql
-run it using
npx wrangler d1 execute tutorial_v2-reluctant-planarian --remote --file="./src/scripts/ProdSeed.sql"
-Check it worked by querying
npx wrangler d1 execute tutorial_v2-reluctant-planarian --remote --command="SELECT * FROM ApplicationStatus"



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

# Version Control
## Github
1. Create repo in github, used following commands from CLI after
```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mikec3/bunker_buddies.git
git push -u origin main
```