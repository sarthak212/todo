# TODO APP with NODEJS, NEXTJS, POSTGRES, ZUSTAND, TYPESCRIPT

## Installation

# Backend

npm install

Create a postgres database
create a .env file and add the following variables

DATABASE_URL="postgresql://username:password@host:5432/dbname?schema=public"
JWT_SECRET="anystring"
REFRESH_SECRET="anystring"

for creating the table or schema run the following command

npx prisma generate
npm prisma db push

Start server with
npm Start

# Frontend

npm install

That's it. You are good to go.
