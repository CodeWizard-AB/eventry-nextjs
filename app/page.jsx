import EventList from "@/components/home/EventList";
import SearchBar from "@/components/home/SearchBar";
import { Suspense } from "react";

export default async function HomePage({ searchParams }) {
	const query = (await searchParams).query || "";

	return (
		<section className="container">
			<SearchBar />
			<Suspense fallback={<div>Event Loading...</div>}>
				<EventList query={query} />
			</Suspense>
		</section>
	);
}
