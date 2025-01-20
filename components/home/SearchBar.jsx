"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams.toString());
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}

		router.replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className="flex justify-between">
			<h1 className="font-bold text-3xl">Discover Events</h1>

			<div>
				<input
					type="text"
					placeholder="Search..."
					className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
				/>
			</div>
		</div>
	);
}
