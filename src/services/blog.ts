import { BlogAttrs } from '@/models/blog';
import { FastifyInstance } from 'fastify';

const getAllBlogs = async (server: FastifyInstance) => {
	const { Blog } = server.db.models;
	const blogs = await Blog.find({});
	if (!blogs) return null;

	return blogs;
};

const addBlog = async (server: FastifyInstance, data: BlogAttrs) => {
	try {
		const { Blog } = server.db.models;
		const blog = await Blog.addOne(data);
		await blog.save();
		return 1;
	} catch (error) {
		return 0;
	}
};
const getBlogById = async (server: FastifyInstance, ID: string) => {
	try {
		const { Blog } = server.db.models;
		const blog = await Blog.findById(ID);
		return blog;
	} catch (error) {
		return 0;
	}
};
export { getAllBlogs, addBlog, getBlogById };
