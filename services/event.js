import Event from "@/models/event";

export async function getEvents(query) {
	try {
		const events = await Event.find({
			$or: [
				{ name: { $regex: new RegExp(query, "i") } },
				{ details: { $regex: new RegExp(query, "i") } },
			],
		}).lean();
		return events.map((event) => {
			const eventObj = { id: event._id.toString(), ...event };
			eventObj.interested_ids = event.interested_ids.map((id) => id.toString());
			eventObj.going_ids = event.going_ids.map((id) => id.toString());
			delete eventObj._id;
			return eventObj;
		});
	} catch (error) {
		console.log(error.message);
	}
}

export async function getEvent(id) {
	try {
		const event = await Event.findById(id).lean();
		return { id: event._id.toString(), ...event };
	} catch (error) {
		console.log(error.message);
	}
}
