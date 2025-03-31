"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Basic",
    price: 9999, 
    features: ["10 videos/month", "720p resolution", "Basic templates", "Email support"],
    planId: "basic_monthly",
  },
  {
    name: "Pro",
    price: 19999, 
    features: ["50 videos/month", "1080p resolution", "Advanced templates", "Priority support"],
    planId: "pro_monthly",
  },
  {
    name: "Elite",
    price: 49999, 
    features: ["Unlimited videos", "4K resolution", "All templates", "24/7 support"],
    planId: "elite_monthly",
  },
];

function Upgrade() {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleCheckout = async (plan) => {
    setLoadingPlan(plan.planId);
    try {
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          planId: plan.planId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: "rzp_test_ytaiZehKZZhSra",
        amount: order.amount,
        currency: "INR",
        name: "AUVI",
        description: `Subscription for ${plan.name} Plan`,
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          window.location.href = "/dashboard?success=true";
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#8B5CF6",
        },
        notes: {
          plan: plan.planId,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        console.error(response.error);
      });
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      className="p-8 max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-white text-center bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Upgrade Your Plan
      </motion.h1>
      <motion.p
        className="text-gray-400 text-center text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Unlock premium features and take your creations to the next level
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <motion.div
            key={plan.name}
            className="bg-gradient-to-br from-gray-900/90 to-indigo-900/80 border border-indigo-500/30 rounded-xl p-6 shadow-xl hover:shadow-indigo-500/20 transition-all"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              <Crown className="text-yellow-400 h-6 w-6" />
            </div>
            <p className="text-4xl font-bold text-white mb-6">
              ₹{plan.price / 100}
              <span className="text-sm font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-indigo-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCheckout(plan)}
              disabled={loadingPlan === plan.planId}
              className={`w-full py-3 rounded-lg font-medium text-white ${
                loadingPlan === plan.planId
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800"
              }`}
            >
              {loadingPlan === plan.planId ? "Processing..." : "Upgrade Now"}
              <ArrowRight className="ml-2 inline h-5 w-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Upgrade;