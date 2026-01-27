import "dotenv/config"; // Must be first to ensure env vars are loaded
import cron from "node-cron";
import connectDB from "./connectDb";
import Reminder, { IReminder } from "../models/reminder.model";
import { sendRemindEmail } from "./email.resend";

// Connect to Database
 connectDB();
 console.log("started jobs")

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const dueReminders = await Reminder.find({
      remindAt: { $lte: now },
    });

    if (!dueReminders.length) return;

    const bulkOps: any[] = [];

    await Promise.all(
      dueReminders.map(async (reminder) => {
        try {
          await sendRemindEmail({
            to: reminder.email,
            details: reminder,
          });

          if (reminder.repeat === "none") {
            bulkOps.push({
              deleteOne: { filter: { _id: reminder._id } },
            });
          } else {
            const nextDate = new Date(reminder.remindAt);
            
            if (reminder.repeat === "daily") {
              nextDate.setDate(nextDate.getDate() + 1);
            } else if (reminder.repeat === "weekly") {
              nextDate.setDate(nextDate.getDate() + 7);
            }

            while (nextDate <= now) {
              if (reminder.repeat === "daily")
                nextDate.setDate(nextDate.getDate() + 1);
              else if (reminder.repeat === "weekly")
                nextDate.setDate(nextDate.getDate() + 7);
            }

            bulkOps.push({
              updateOne: {
                filter: { _id: reminder._id },
                update: { $set: { remindAt: nextDate } },
              },
            });
          }
        } catch (error) {
          console.error(`Failed to process reminder ${reminder._id}:`, error);
        }
      }),
    );

    if (bulkOps.length > 0) {
      await Reminder.bulkWrite(bulkOps);
    }
  } catch (error) {
    console.error("Cron Job Error:", error);
  }
});
