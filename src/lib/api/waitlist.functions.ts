import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getSupabaseAdmin } from "../supabase.server";

// ─── In-memory OTP store (sufficient for waitlist; swap for Redis/DB in production) ───
const otpStore = new Map<string, { code: string; name: string; expiresAt: number }>();

// ─── Generate a random 6-digit OTP ───
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── Send OTP Email ───
export const sendWaitlistOtp = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
    }),
  )
  .handler(async ({ data }) => {
    // Dynamic import keeps Resend out of the client bundle
    const { Resend } = await import("resend");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const otp = generateOtp();

    // Store OTP with 10-minute expiry
    otpStore.set(data.email.toLowerCase(), {
      code: otp,
      name: data.name,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Send the OTP email via Resend
    const { error } = await resend.emails.send({
      from: "Wisps <onboarding@resend.dev>",
      to: data.email,
      subject: "Your Wisps Waitlist Verification Code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px;">
            Join the Wisps Waitlist
          </h1>
          <p style="font-size: 15px; color: #666; margin-bottom: 32px;">
            Hi ${data.name}, here's your verification code:
          </p>
          <div style="background: #f8f8f8; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #1a1a1a; font-family: monospace;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 13px; color: #999; margin-bottom: 4px;">
            This code expires in 10 minutes.
          </p>
          <p style="font-size: 13px; color: #999;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send verification email");
    }

    return { success: true };
  });

// ─── Verify OTP & Save to Supabase Waitlist ───
export const verifyWaitlistOtp = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email("Invalid email address"),
      code: z.string().length(6, "Code must be 6 digits"),
    }),
  )
  .handler(async ({ data }) => {
    const key = data.email.toLowerCase();
    const stored = otpStore.get(key);

    if (!stored) {
      return {
        success: false as const,
        error: "No verification code found. Please request a new one.",
      };
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(key);
      return { success: false as const, error: "Code has expired. Please request a new one." };
    }

    if (stored.code !== data.code) {
      return { success: false as const, error: "Invalid code. Please try again." };
    }

    // OTP verified — clean up
    otpStore.delete(key);

    // ─── Save to Supabase waitlist table ───
    const supabase = getSupabaseAdmin();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id, position")
      .eq("email", key)
      .maybeSingle();

    if (existing) {
      // Already on the waitlist — return their existing position
      return {
        success: true as const,
        name: stored.name,
        position: existing.position as number,
        alreadyJoined: true,
      };
    }

    // Get next position (count existing + 1)
    const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });

    const position = (count ?? 0) + 1;

    // Insert into waitlist
    const { error: insertError } = await supabase.from("waitlist").insert({
      name: stored.name,
      email: key,
      position,
      verified: true,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error("Failed to join waitlist. Please try again.");
    }

    console.log(`✅ Waitlist #${position}: ${stored.name} <${key}>`);

    return {
      success: true as const,
      name: stored.name,
      position,
      alreadyJoined: false,
    };
  });
