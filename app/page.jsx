import EventList from "@/components/home/EventList";
import SearchBar from "@/components/home/SearchBar";
import Image from "next/image";

export default async function HomePage({ searchParams }) {
	const query = (await searchParams).query || "";

	return (
		<section className="container">
			<SearchBar />
			<EventList query={query} />
		</section>
	);
}
