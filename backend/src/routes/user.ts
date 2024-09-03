import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { bufferToString } from "hono/utils/buffer";
import { signupInput, signinInput } from "@aryansahu/medium-common";



export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        HASHING_KEY: string;
        JWT_SECRET: string;
    }
}>()

userRouter.get("/allusers",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany();
    return c.json(users)
})

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "Inputs not correct"
      })
    }
  
    const hashPassword = async (password: string, secret: string) => {
      const enc = new TextEncoder();
      const data = enc.encode(password + secret);
      const hashedBuffer = await crypto.subtle.digest("SHA-256", data);
      // Convert ArrayBuffer to Base64 string directly
      return btoa(String.fromCharCode(...new Uint8Array(hashedBuffer)));
    };
    const hashedPassword = await hashPassword(body.password, c.env.HASHING_KEY);
  
    const userId = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        password: true,
      },
    });
  
    const token = await sign({ id: userId.id }, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token,
    });
  });
  
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "Inputs not correct"
      })
    }
  
    const userId = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
  
    if (!userId) {
      c.status(403);
      return c.json({ error: "User not found." });
    }
  
    const hashPassword = async (password: string, secret: string) => {
      const enc = new TextEncoder();
      const data = enc.encode(password + secret);
      const hashedBuffer = await crypto.subtle.digest("SHA-256", data);
      // Convert ArrayBuffer to Base64 string directly
      return btoa(String.fromCharCode(...new Uint8Array(hashedBuffer)));
    };
    const hashedPassword = await hashPassword(body.password, c.env.HASHING_KEY);
  
    if (hashedPassword !== userId.password) {
      c.status(403);
      return c.json({ error: "invalid password" });
    }
  
    const jwt: string = await sign({ id: userId.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  });
  