import fs from "fs";
import { criarPost, getTodosPosts } from "../models/postsModel.js";

export async function listarPosts(req, res) {
	const posts = await getTodosPosts();
	res.status(200).json(posts);
}

export async function postarPost(req, res) {
	const novoPost = req.body;
	try {
		const postCriado = await criarPost(novoPost);
		res.status(201).json(postCriado);
	} catch (error) {
		console.error("Error al crear la publicación:", error.message);
		res.status(500).json({ error: "Error al crear la publicación" });
	}
}

export async function uploadImage(req, res) {
	const novoPost = {
		descricao: "",
		imageUrl: req.file.originalname,
		alt: "",
	};

	try {
		const postCriado = await criarPost(novoPost);
		const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
		fs.renameSync(req.file.path, imagemAtualizada);
		res.status(200).json(postCriado);
	} catch (error) {
		console.error("Error al cargar la imagen:", error.message);
		res.status(500).json({ error: "Error al cargar la imagen" });
	}
}
