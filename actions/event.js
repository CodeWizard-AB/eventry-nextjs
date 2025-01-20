"use server";

import Event from "@/models/event";
import User from "@/models/user";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function addGoing(eventId, userId) {
	try {
		const event = await Event.findById(eventId);
		const user = await User.findById(userId);

		if (event) {
			const userObjectId = new mongoose.Types.ObjectId(userId);
			const isGoing = event.going_ids.includes(userObjectId);

			if (!isGoing) event.going_ids.push(userObjectId);

			await event.save();
			revalidatePath("/");

			const message = `You are going to ${event.name} on ${event.location}`;

			const { data } = await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: [user?.email],
				subject: message,
			});
			console.log(data);
		}
	} catch (error) {
		console.log(error.message);
	}

	redirect("/");
}
