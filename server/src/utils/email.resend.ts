import { Resend } from "resend";
import { IReminder } from "../models/reminder.model";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  details: IReminder;
}

export const sendRemindEmail = async (data: EmailData) => {
  try {
    const { to, details } = data;

    const dateStr = new Date(details.remindAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const { data: response, error } = await resend.emails.send({
      from: "Remind Me <noreply@armandev.space>",
      to: [to],
      subject: `REMINDER // ${details.title.toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 0; background-color: #ffffff; -webkit-font-smoothing: antialiased; }
            .container { max-width: 480px; margin: 60px auto; padding: 0 20px; }
            
            /* Typography */
            .system-text { font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace; }
            
            .label { 
              font-size: 10px; 
              color: #a1a1a1; 
              text-transform: uppercase; 
              letter-spacing: 0.2em; 
              margin-bottom: 8px; 
            }
            
            .title { 
              font-family: Inter, -apple-system, sans-serif;
              font-size: 28px; 
              font-weight: 700; 
              color: #000000; 
              line-height: 1.1; 
              letter-spacing: -0.03em;
              margin: 0 0 24px 0; 
            }
            
            .meta-box { 
              border-top: 1px solid #000000; 
              padding-top: 16px;
              margin-top: 40px;
            }
            
            .meta-item {
              font-size: 12px;
              color: #000000;
              margin-bottom: 4px;
            }

            .footer {
              margin-top: 100px;
              font-size: 10px;
              color: #d4d4d4;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="label system-text">Active Notification</div>
            <h1 class="title">${details.title}</h1>
            
            <div class="meta-box system-text">
              <div class="meta-item"><strong>SCHEDULED:</strong> ${dateStr}</div>
              ${details.repeat && details.repeat !== "none" 
                ? `<div class="meta-item"><strong>RECURRING:</strong> ${details.repeat.toUpperCase()}</div>` 
                : ""
              }
            </div>

            <div class="footer system-text">
              Automated Dispatch // RemindMe // ${new Date().getFullYear()}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;
    return { success: true, data: response };
  } catch (err) {
    console.error("[Email_Error]:", err);
    return { success: false, error: err instanceof Error ? err.message : "Internal Error" };
  }
};