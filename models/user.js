import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A user must have a name"],
			trim: true,
			minLength: [3, "Name must be at least 3 characters long"],
			maxLength: [50, "Name cannot exceed 50 characters"],
		},
		email: {
			type: String,
			required: [true, "A user must have an email"],
			unique: true,
			lowercase: true,
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				"Please provide a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "A user must have a password"],
			minlength: [8, "Password must be at least 8 characters long"],
			select: false,
		},
		phone: {
			type: Number,
			required: [true, "A user must have a phone number"],
			min: [10, "Phone number must be at least 10 digits long"],
		},
		bio: {
			type: String,
			trim: true,
			maxlength: [200, "Bio cannot exceed 200 characters"],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		methods: {
			async correctPassword(candidatePassword, userPassword) {
				return await bcrypt.compare(candidatePassword, userPassword);
			},
		},
	}
);

// * Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export default User;
