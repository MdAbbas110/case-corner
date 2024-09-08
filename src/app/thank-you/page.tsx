"use client";

import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

const Page = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true));

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            We've received your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-500">{23490192427984}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="900 font-semibold">You made a great choice!</h4>
            <p className="mt-1 text-sm text-zinc-600">
              We at CaseCobra believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If you case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
          <div>
            <p className="font-medium text-zinc-900">Payment status:</p>
            <p className="mt-2 text-primary">Cash on delivery</p>
          </div>

          <div>
            <p className="font-medium text-zinc-900">Shipping Method:</p>
            <p className="mt-2 text-primary">DHL, takes up to 3 working days</p>
          </div>
        </div>
        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Subtotal</p>
            <p className="text-zinc-700">{formatPrice(49.9)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">{formatPrice(25)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatPrice(47.9)}</p>
          </div>
        </div>

        <div className="ml-64">
          <Confetti
            active={showConfetti}
            config={{ elementCount: 200, spread: 90 }}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
