import mongoose from "mongoose";

export default async function connectToDatabase() {
	try {
		const connection = mongoose.connect(process.env.MONGO_URI);
		return connection;
	} catch (error) {
		console.log(error.message);
	}
}
