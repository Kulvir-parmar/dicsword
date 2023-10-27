# DICSWORD

<video hieght="600px" width="full" controls>
  <source src="./public/dicsword-working.mov" type="video/mp4">
</video>

This is a repository for a Discord Clone: <b>DICSWORD</b> a gaming chat application.


Features:

- Real-time messaging using Socket.io
- Websocket fallback: Polling with alerts
- Authentication with Clerk
- MySQL database using Planetscale
- ORM using Prisma

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Kulvir-parmar/dicsword.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=


DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

Add MySQL Database

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
