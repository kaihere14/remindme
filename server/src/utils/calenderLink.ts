import { google } from "googleapis";
import { Request, Response } from "express";
import User from "../models/user.models";
import type { OAuth2Client } from "google-auth-library";

function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!
  );
}

export const googleAuth = (req:Request, res:Response) => {
  const { userId } = req.query;
  console.log(userId)
  const url = createOAuthClient().generateAuthUrl({
    access_type: "offline", 
    prompt: "consent",      
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    state: userId as string          
  });

  res.redirect(url);
};





export function getAuthClient(refreshToken: string): OAuth2Client {
  if (!refreshToken) {
    throw new Error("Missing Google Calendar refresh token");
  }

  const oauth2Client = createOAuthClient();

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return oauth2Client;
}


export const googleCallback = async (req: Request, res: Response) => {
  const { code, state: userId } = req.query;

  const oauth2Client = createOAuthClient();

  const { tokens } = await oauth2Client.getToken(code as string);

  if (!tokens.refresh_token) {
    return res.send("Google Calendar already connected.");
  }

  await User.findOneAndUpdate(
    { discordId: userId },
    {
      calendarEventsEnabled: true,
      calendarRefreshToken: tokens.refresh_token, // encrypt later
    }
  );

  res.send("Google Calendar connected successfully. You can close this tab.");
};
