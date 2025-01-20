import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroEvent from "@/components/details/HeroEvent";
import { getEvent } from "@/services/event";

export async function generateMetadata({ params }) {
	const { id } = await params;
	const event = await getEvent(id);

	return {
		title: `Eventry - ${event.name}`,
		description: `Event details for ${event.name}`,
	};
}

export default async function DetailsPage({ params }) {
	const { id } = await params;
	const event = await getEvent(id);

	return (
		<>
			<HeroEvent event={event} />
			<section className="container">
				<div className="grid grid-cols-5 gap-12 my-12">
					<EventDetails event={event} />
					<EventVenue event={event} />
				</div>
			</section>
		</>
	);
}
