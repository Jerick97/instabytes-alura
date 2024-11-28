// Importamos el cliente de MongoDB desde la biblioteca oficial
import { MongoClient } from "mongodb";

// Función asíncrona para conectar a la base de datos
export default async function conectarAoBanco(stringConexao) {
	let mongoClient; // Variable para almacenar la instancia del cliente de MongoDB

	try {
		// Creamos una nueva instancia del cliente de MongoDB con la cadena de conexión proporcionada
		mongoClient = new MongoClient(stringConexao);
		console.log("Estableciendo conexión con el clúster de la base de datos...");

		// Intentamos establecer la conexión con el clúster de MongoDB
		await mongoClient.connect();
		console.log("Conexión exitosa con MongoDB Atlas.");

		// Retornamos la instancia del cliente conectado para su uso posterior
		return mongoClient;
	} catch (erro) {
		// En caso de error, mostramos un mensaje en la consola y los detalles del error
		console.error("Error al conectar con la base de datos:", erro);

		// Finalizamos el proceso debido al fallo en la conexión
		process.exit();
	}
}
