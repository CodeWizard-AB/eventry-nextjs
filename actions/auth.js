"use server";

import User from "@/models/user";
import { createUser } from "@/services/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(state, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	if (!email || !password) {
		return { ...state, error: "Email and password are required" };
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return { ...state, error: "User not found" };
	}

	if (!(await user.correctPassword(password, user.password))) {
		return { ...state, error: "Incorrect password" };
	}

	const userData = {
		id: user._id.toString(),
		email: user.email,
		name: user.name,
		bio: user.bio,
	};

	(await cookies()).set("user", JSON.stringify(userData));
	redirect("/");
}

export async function register(state, formData) {
	try {
		const userData = Object.fromEntries(formData);
		await createUser(userData);
	} catch (error) {
		console.log(error);
	}

	return redirect("/login");
}
