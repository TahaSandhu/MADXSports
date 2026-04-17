import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Size: ${item.size || "N/A"} | Color: ${item.color || "N/A"}`,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.json({ url: session.url });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};