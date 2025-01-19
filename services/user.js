import User from "@/models/user";

export async function createUser(user) {
	try {
		const createdUser = await User.create(user);
		return createdUser;
	} catch (error) {
		console.log(error.message);
	}
}
