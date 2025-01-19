"use server";

import Event from "@/models/event";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function addInterested(eventId, userId) {
	try {
		const event = await Event.findById(eventId);

		if (event) {
			const userObjectId = new mongoose.Types.ObjectId(userId);
			const isInterested = event.interested_ids.includes(userObjectId);

			if (isInterested) {
				event.interested_ids.pull(userObjectId);
			} else {
				event.interested_ids.push(userObjectId);
			}

			await event.save();
			revalidatePath("/");
		}
	} catch (error) {
		console.log(error.message);
	}
}
