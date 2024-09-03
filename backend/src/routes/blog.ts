import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { bufferToString } from "hono/utils/buffer";
import { createBlogInput, updateBlogInput } from "@aryansahu/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  //get header, verify header, if header correct, proceed. if not, return 403 status code
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  try {
    const response: any = await verify(token, c.env.JWT_SECRET);
    if (response) {
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
      return c.json({ error: error, message: "Error in middleware authorization." });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      message: "inputs incorrect"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const updatedData = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({ id: updatedData.id });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      message: "inputs incorrect"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const updatedData = await prisma.blog.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: updatedData.id });
});

//Todo: add pagination here
blogRouter.get("/bulk/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const data = await prisma.blog.findMany({
      select:{
        id: true,
        title:true,
        content:true,
        author: {
          select:{
            name: true
          }
        }
      }
    });
    return c.json(data);
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog data." });
  }
});

// {
// 	"email":"aryan2@email.com",
//     "name":"aryan",
//     "password":"password"
// }
//70fbe08d-a6e4-4946-924d-c0d6bc68fd80 - user      //e0a7530d-da43-4cf2-9ea0-feb9edce6c41 - blog
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogData = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select:{
        title: true,
        content: true,
        id:true,
        author: {
          select:{
            name:true
          }
        }
      }
    });
    return c.json({ data: blogData });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog post." });
  }
});

//Todo: add pagination here
blogRouter.get("/bulk/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const data = await prisma.blog.findMany({
      where: {
        authorId: c.req.param("id"),
      },
    });
    return c.json(data);
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog data." });
  }
});
