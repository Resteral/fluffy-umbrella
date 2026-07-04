"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const plan = searchParams.get("plan") || "starter";
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getPlanDetails = () => {
    switch (plan) {
      case "starter": return { name: "Starter Site Bundle", price: "$29.00", interval: "/ month" };
      case "pro": return { name: "Pro Business Bundle", price: "$79.00", interval: "/ month" };
      case "enterprise": return { name: "Enterprise Hosting", price: "$199.00", interval: "/ month" };
      case "ad-space": return { name: "DevSpace Featured Ad", price: "$49.00", interval: "/ week" };
      default: return { name: "Custom Purchase", price: "$0.00", interval: "" };
    }
  };

  const details = getPlanDetails();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to Stripe
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push(plan === "ad-space" ? "/devspace" : "/dashboard");
      }, 2000);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8 text-lg">Your {details.name} is now active.</p>
        <p className="text-sm text-muted-foreground animate-pulse">Redirecting you back...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Order Summary */}
      <div className="w-full md:w-1/2">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to plans
        </Link>
        <h1 className="text-2xl font-bold mb-6">Complete your purchase</h1>
        
        <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50 mb-6">
          <div className="flex justify-between items-start mb-6 border-b border-border/50 pb-6">
            <div>
              <h3 className="font-bold text-lg mb-1">{details.name}</h3>
              <p className="text-sm text-muted-foreground">Billed automatically. Cancel anytime.</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-xl">{details.price}</span>
              <span className="text-sm text-muted-foreground">{details.interval}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total due today</span>
            <span>{details.price}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          Payments are secure and encrypted.
        </div>
      </div>

      {/* Mock Payment Form */}
      <div className="w-full md:w-1/2">
        <div className="bg-background rounded-3xl p-8 border border-border/50 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Payment Details
          </h2>
          
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
              <input type="email" required placeholder="you@example.com" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Card Information</label>
              <div className="flex flex-col gap-px bg-secondary/50 rounded-xl border border-border/50 overflow-hidden focus-within:border-primary/50 transition-colors">
                <input type="text" required placeholder="Card number" maxLength={19} className="w-full bg-transparent px-4 py-3 focus:outline-none" />
                <div className="flex gap-px border-t border-border/50">
                  <input type="text" required placeholder="MM / YY" maxLength={5} className="w-1/2 bg-transparent px-4 py-3 focus:outline-none border-r border-border/50" />
                  <input type="text" required placeholder="CVC" maxLength={4} className="w-1/2 bg-transparent px-4 py-3 focus:outline-none" />
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-primary text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay {details.price}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6">
      <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
