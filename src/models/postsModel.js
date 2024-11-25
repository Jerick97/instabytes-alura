import conectarAoBanco from "../config/dbConfig.js";
const conexion = await conectarAoBanco(process.env.MONGO_URI);

export default async function getTodosPosts() {
	const db = conexion.db("imersao-instabytes");
	const collection = db.collection("posts");
	const posts = await collection.find().toArray();
	return posts;
}
