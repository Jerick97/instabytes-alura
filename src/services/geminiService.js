import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generarDescripcionConGemini(imageBuffer) {
	const prompt =
		"Describe brevemente la siguiente imagen en español, sin introducciones ni frases adicionales, solo la descripción concisa de su contenido.";

	try {
		const image = {
			inlineData: {
				data: imageBuffer.toString("base64"),
				mimeType: "image/png",
			},
		};
		const res = await model.generateContent([prompt, image]);
		return res.response.text() || "Texto alternativo no disponible.";
	} catch (error) {
		console.error(
			"Error al obtener el texto alternativo:",
			error.message,
			error
		);
		throw new Error("Error al obtener el texto alternativo de Gemini.");
	}
}
