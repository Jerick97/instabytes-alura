import fs from "fs";
import {
	criarPost,
	getTodosPosts,
	actualizarPost,
} from "../models/postsModel.js";
import generarDescripcionConGemini from "../services/geminiService.js";

/**
 * Lista todos los posts existentes.
 *
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export async function listarPosts(req, res) {
	try {
		const posts = await getTodosPosts();
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error al obtener los posts:", error.message);
		res.status(500).json({ error: "Error al obtener los posts" });
	}
}

/**
 * Crea un nuevo post.
 *
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
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

/**
 * Sube una imagen y crea un nuevo post con la URL de la imagen.
 *
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export async function uploadImage(req, res) {
	const novoPost = {
		descricao: "",
		imageUrl: req.file.originalname,
		alt: "",
	};

	try {
		const postCriado = await criarPost(novoPost);
		const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

		// Renombra el archivo subido a la ruta deseada
		fs.renameSync(req.file.path, imagemAtualizada);

		res.status(200).json(postCriado);
	} catch (error) {
		console.error("Error al cargar la imagen:", error.message);
		res.status(500).json({ error: "Error al cargar la imagen" });
	}
}

export async function actualizarNovoPost(req, res) {
	const id = req.params.id;
	const urlImagen = `http://localhost:3000/${id}.png`;

	try {
		const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
		const descricao = await generarDescripcionConGemini(imageBuffer);
		const post = {
			imageUrl: urlImagen,
			descricao: descricao,
			alt: req.body.alt,
		};
		const postCriado = await actualizarPost(id, post);
		res.status(201).json(postCriado);
	} catch (error) {
		console.error("Error al crear la publicación:", error.message);
		res.status(500).json({ error: "Error al crear la publicación" });
	}
}
