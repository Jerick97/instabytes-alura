import express from "express";
import multer from "multer";
import {
	listarPosts,
	postarPost,
	uploadImage,
} from "../controllers/postsController.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ dest: "./uploads", storage });

// Linux and Mac
/* const upload = multer({ dest: "./uploads" }); */

export default function routes(app) {
	app.use(express.json());
	app.get("/posts", listarPosts);
	app.post("/posts", postarPost);
	app.post("/upload", upload.single("images"), uploadImage);
}
