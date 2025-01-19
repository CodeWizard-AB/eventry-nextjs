"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(login, {});

	return (
		<form className="login-form" action={formAction}>
			<div>
				<label htmlFor="email">Email Address</label>
				<input type="email" name="email" id="email" />
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
			</div>

			<button
				type="submit"
				className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
				disabled={isPending}
			>
				{isPending ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
