import { Schema, model } from "mongoose";

export interface IUser {
  // Identity
  discordId: string;          // Discord user ID (primary identity)
  calendarRefreshToken?: string;

  // Contact
  email: string;              // Email for reminders (trusted as-is)
  

  // Preferences
  timezone: string;           // e.g. "Asia/Kolkata"
  remindersEnabled: boolean;
  calendarEventsEnabled?: boolean;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    discordId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    calendarRefreshToken:{
      type: String,
      default: null,
      index: true,
    },

    calendarEventsEnabled:{
      type: Boolean,
      default: false,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    remindersEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);
export default User;
