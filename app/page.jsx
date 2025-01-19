import EventList from "@/components/home/EventList";
import SearchBar from "@/components/home/SearchBar";
import Image from "next/image";

export default function HomePage() {
	return (
		<section className="container">
			<SearchBar />
			<EventList />
		</section>
	);
}
