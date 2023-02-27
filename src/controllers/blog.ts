import { addBlog, getAllBlogs, getBlogById } from "@/services/blog";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from "fastify";
import fp from "fastify-plugin";
import { Db } from "../connection";
import { BlogAttrs } from "../models/blog";

// Declaration merging
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}

interface blogParams {
  id: string;
}

const BlogController: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get("/blogs", {}, async (request, reply) => {
    try {
      const blogs = await getAllBlogs(server);
      return reply.code(200).send(blogs);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });

  server.post<{ Body: BlogAttrs }>("/blogs", {}, async (request, reply) => {
    try {
      const response = await addBlog(server, request.body);
      return reply.code(201).send(response);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });

  server.get<{ Params: blogParams }>(
    "/blogs/:id",
    {},
    async (request, reply) => {
      try {
        const blog = await getBlogById(server, request.params.id);
        return reply.code(200).send(blog);
      } catch (error) {
        request.log.error(error);
        return reply.send(400);
      }
    }
  );
};
export default fp(BlogController);
