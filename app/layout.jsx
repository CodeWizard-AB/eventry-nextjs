import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import connectToDatabase from "@/services/mongo";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Eventry - Home",
	description: "An event management platform",
};

export default async function RootLayout({ children }) {
	await connectToDatabase();

	return (
		<html lang="en">
			<body
				data-new-gr-c-s-check-loaded="14.1217.0"
				data-gr-ext-installed=""
				cz-shortcut-listen="true"
				className={`${inter.className} antialiased`}
			>
				<AuthProvider>
					<Header />
					<main className="py-8">{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}
