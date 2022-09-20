# POC Background jobs
Run a container with redis:

`docker run --rm --name redis -p 6379:6379 redis`

Start server(at http://localhost:3000):

`npm install`

`npm run start`

Routes:

`POST - /` with body `{ "name": "", "email": "" }`
