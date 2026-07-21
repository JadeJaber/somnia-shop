import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const ORDER_FROM_EMAIL =
  process.env.ORDER_FROM_EMAIL ?? "Somnia <onboarding@resend.dev>";
