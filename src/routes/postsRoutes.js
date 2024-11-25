import express from "express";
import listarPosts from "../controllers/postsController.js";

export default function routes(app) {
	app.use(express.json());
	app.get("/posts", listarPosts);
}
