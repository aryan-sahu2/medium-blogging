import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { bufferToString } from "hono/utils/buffer";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from 'hono/cors'

// postgresql://aryanwin0609:1aNwD0yfMREo@ep-polished-firefly-77283283.us-east-2.aws.neon.tech/test1?sslmode=require
//the above is the connection string that we have got from neondb from that one free db plan

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDA4ZDZlZjMtYTllOS00OWRjLWJhYzMtN2UxNjg2NDg1YTE0IiwidGVuYW50X2lkIjoiZGUyMTYxZjc2ZmRhZGRlMWI2ZTJmYjFmZTVjNGMzNTA0NGNhY2RkZmJhYmYxZmUwZTNmMzIwMzVlM2ZjNmZlMSIsImludGVybmFsX3NlY3JldCI6IjI1MWMzNWNlLTBlNWEtNGM4My05N2U5LWI3OWEwMjEyMTdiYSJ9.KQQ_IyRm0j45ECgaqEwKO0PMPkm8b6SCyzoitRA6NZA"
// the prisma CLI can only connect to the postgres db via the actual connection link string that will be mentioned in the .env file.
// The connection pool that this cloudfare worker/this backend code will be accessing will be present in the .toml file.

// this code could have been made more secure by adding a 'salt' column in the User table in DB. That would have been a unique randomly generated salt that would have been different for every user that would have been used for verifying the user password everytime they login

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    HASHING_KEY: string;
  };
}>();

app.use('/*', cors())

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);



app.get("/", (c) => {
  return c.text("Hello Hono!");
});




export default app;
