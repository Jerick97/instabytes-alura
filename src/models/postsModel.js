import conectarAoBanco from "../config/dbConfig.js";
const conexion = await conectarAoBanco(process.env.MONGO_URI);

const db = conexion.db("imersao-instabytes");
const collection = db.collection("posts");

/**
 * Recupera todas las publicaciones de la base de datos.
 *
 * @return {Promise<Array>} Una promesa que se resuelve en una matriz de todas las publicaciones.
 */
export async function getTodosPosts() {
	return await collection.find().toArray();
}

/**
 * Crea un nuevo post en la base de datos.
 *
 * @param {Object} novoPost Objeto con los datos del post a crear.
 *
 * @return {Promise} Promesa que se resuelve con el resultado de la operación
 *                   de creación del post.
 */
export async function criarPost(novoPost) {
	return collection.insertOne(novoPost);
}
