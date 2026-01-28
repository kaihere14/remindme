import { Schema, model } from "mongoose";

export type RepeatType = "none" | "daily" | "weekly";

export interface IReminder {
  _id?:string;
  // Identity
  discordId: string;     // Discord user ID (input identity)
  email: string;         // Where reminder will be sent

  // Reminder content
  title: string;
  remindAt: Date;        // Exact UTC time

  // Repeat logic
  repeat: RepeatType;

  // State tracking
  reminderSent: boolean;
  archived: boolean;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>(
  {
    discordId: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: 200,
    },

    remindAt: {
      type: Date,
      required: true,
      index: true,
    },

    repeat: {
      type: String,
      enum: ["none", "daily", "weekly"],
      default: "none",
    },

    reminderSent: {
      type: Boolean,
      default: false,
      index: true,
    },

    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

 const Reminder = model<IReminder>("Reminder", ReminderSchema);
export default Reminder;