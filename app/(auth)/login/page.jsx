import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
	return (
		<section className="grid place-items-center h-[calc(100vh-64px)]">
			<div className="max-w-[450px] w-full mx-auto p-6 border border-gray-400/20 rounded-md">
				<h4 className="font-bold text-2xl">Sign in</h4>
				<LoginForm />
				<span className="text-center text-xs text-gray-500">
					Don't have an account?{" "}
					<Link className="underline hover:text-indigo-600" href="/register">
						Register
					</Link>
				</span>
			</div>
		</section>
	);
}
