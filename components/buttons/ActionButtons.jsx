"use client";

import { addInterested } from "@/actions/event";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ActionButtons({
	eventId,
	interestedUserIds,
	goingUserIds,
	fromDetails,
}) {
	const router = useRouter();
	const { user } = useAuth();
	const isInterested = interestedUserIds.includes(user?.id);
	const isGoing = goingUserIds.includes(user?.id);

	return (
		<div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
			<button
				className={`w-full ${
					isInterested && "bg-indigo-600 hover:bg-indigo-800"
				}`}
				onClick={() => {
					if (!user) return router.push("/login");
					addInterested.bind(this, eventId, user?.id);
				}}
			>
				Interested
			</button>
			<button
				className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1 disabled:bg-green-600 disabled:cursor-not-allowed"
				onClick={() => {
					router.push(user ? `/payment/${eventId}` : "/login");
				}}
				disabled={isGoing}
			>
				Going
			</button>
		</div>
	);
}
