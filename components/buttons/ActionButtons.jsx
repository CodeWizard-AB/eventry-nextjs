"use client";

import { addInterested } from "@/actions/event";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ActionButtons({
	eventId,
	interestedUserIds,
	fromDetails,
}) {
	const { user } = useAuth();
	const isInterested = interestedUserIds.includes(user.id);

	return (
		<div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
			<button
				className={`w-full ${
					isInterested && "bg-indigo-600 hover:bg-indigo-800"
				}`}
				onClick={addInterested.bind(this, eventId, user.id)}
			>
				Interested
			</button>
			<Link
				href="/payment"
				className="text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
			>
				Going
			</Link>
		</div>
	);
}
