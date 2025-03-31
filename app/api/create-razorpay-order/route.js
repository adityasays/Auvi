import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,     
    key_secret: process.env.RAZORPAY_KEY_SECRET, 
  });

export async function POST(req) {
  try {
    const { amount, planId } = await req.json();

    if (!amount || !planId) {
      return new Response(JSON.stringify({ error: "Missing amount or planId" }), { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount, 
      currency: "INR",
      receipt: `receipt_${planId}_${Date.now()}`,
      notes: {
        plan: planId,
      },
    });

    return new Response(JSON.stringify({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    }), { status: 200 });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}