"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

export default function Header() {
	const pathname = usePathname();
	const { user, setUser } = useAuth();

	const logout = () => {
		setUser(null);
		Cookies.remove("user");
	};

	if (pathname === "/login" || pathname === "/register") return null;

	return (
		<header>
			<nav>
				<div className="container flex justify-between items-center py-4">
					<div className="nav-brand">
						<Link href="/">
							<Image src={Logo} alt="Eventry Logo" className="h-[45px]" />
						</Link>
					</div>

					<ul className="flex gap-4 text-[#9C9C9C] *:cursor-pointer">
						{user ? (
							<Link href={"/login"} onClick={logout}>
								Logout
							</Link>
						) : (
							<>
								<Link href="/login">Login</Link>
								<Link href="/register">Register</Link>
							</>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
}
