"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const userCookie = Cookies.get("user");
	const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);

	useEffect(() => {
		if (userCookie) setUser(JSON.parse(userCookie));
	}, [userCookie]);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
