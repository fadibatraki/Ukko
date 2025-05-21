"use server";

import nodemailer from "nodemailer";
import type { CartItem } from "@/lib/types";

interface OrderConfirmationEmailProps {
  to: string;
  name: string;
  orderId: string;
  items: CartItem[];
  total: number;
}

export async function sendOrderConfirmationEmail({
  to,
  name,
  orderId,
  items,
  total,
}: OrderConfirmationEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const itemList = items
    .map(
      (item) =>
        `- ${item.name} x ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n");

  const text = `
Hello ${name},

Thank you for your order!

Order ID: ${orderId}

Items:
${itemList}

Total: $${total.toFixed(2)}

We'll notify you when your order ships.

Thank you for shopping with us!

ModernShop Team
`;

  const mailOptions = {
    from: `"ModernShop" <${process.env.SMTP_FROM}>`,
    to,
    subject: "Your Order Confirmation",
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
