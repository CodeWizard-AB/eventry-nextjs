import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "An event must have a name"],
			trim: true,
		},
		details: {
			type: String,
			required: [true, "An event must have details"],
			trim: true,
		},
		location: {
			type: String,
			required: [true, "An event must have a location"],
			trim: true,
		},
		imageUrl: {
			type: String,
			required: [true, "An event must have an image URL"],
			validate: {
				validator: function (value) {
					return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff|ico)$/.test(
						value
					);
				},
				message: "Please provide a valid image URL",
			},
		},
		interested_ids: {
			type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds for users interested
			ref: "User", // Assuming you have a User model
			default: [],
		},
		going_ids: {
			type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds for users going
			ref: "User",
			default: [],
		},
		swags: {
			type: [String], // Array of swag items
			default: [],
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Event = mongoose.models.Event ?? mongoose.model("Event", eventSchema);

export default Event;
