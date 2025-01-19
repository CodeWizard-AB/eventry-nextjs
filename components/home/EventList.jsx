import { getEvents } from "@/services/event";
import EventCard from "./EventCard";

export default async function EventList() {
	const events = await getEvents();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</div>
	);
}
