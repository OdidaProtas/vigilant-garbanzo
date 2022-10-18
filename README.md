## Sitemap generator lambda function.

#### To run this application

##### Requirements

- Node.js installed
- Terminal
- Typescript

##### Steps

- Run `git clone {{repositoryurl.git}}` to clone the repository.
- Run `npm install` in the project root directories.
- Rum `npm run test` to ensure .env is created and all env config vars are preset


##### To Deploy

- To production `npm run deploy-prod`
- To stage `npm run deploy-stage`

> Pull requests on main and development automatically deploys to main and stage respectively if tets pass.

#### Available sitemaps
- {{baseUrl}}/products/sitemap.xml
- {{baseUrl}}/main-categories/sitemap.xml
- {{baseUrl}}/sub-categories/sitemap.xml
- {{baseUrl}}/brands/sitemap.xml
- {{baseUrl}}/collections/sitemap.xml
- {{baseUrl}}/child-categories/sitemap.xml

#### Application
- Entry `src/index.ts`
- Environment variable `.env`
    1. AWS_REGION
    2. S3_BUCKET 
    3. BASE_SITEMAP_URL
    4. BASE_API_URL
- Constants i.e strings, urls `src/constants`
- Util `src/util`
    1. handleException.ts - Takes a promise argument and returns an array with the resolved promise and error as first and second items respectively.
    2. storage - formats sitemap directories and stores xml files to s3
    3. urls - formats urls for sitemap
    4. xml - generates xml file strings