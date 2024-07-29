"use client";

import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import Loading from "../loading";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (res.status !== 201) {
      setIsLoading(false);
      alert(
        "Unfortunately we were unable to sign you up! Please try again later."
      );
      return;
    }

    setIsLoading(false);
    setEmail("");
    alert("You successfully joined the waiting list!");
  };

  return (
    <main className="max-h-content overflow-auto h-content px-8 flex flex-col gap-6 sm:items-center justify-center">
      {/* Loading Mechanism */}
      {isLoading && (
        <Loading className="fixed bg-black opacity-40 top-0 left-0 right-0 bottom-0 z-30" />
      )}
      <div className="flex flex-col sm:items-center sm:justify-center">
        <h1 className="text-6xl font-bold">Coming soon</h1>
        <h2 className="font-thin">Sign up for my waitlist</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row gap-4 max-w-[250px] sm:max-w-[600px]"
      >
        <input
          className="border basis-2/3 border-slate-400 px-8 py-4 rounded-full"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className={`basis-1/3 shadow-neon sm:justify-center bg-emerald-500 text-white border-emerald-200`}
          disabled={isLoading}
          type="submit"
        >
          Join Waitlist
        </Button>
      </form>

      <section className="flex flex-col items-start justify-center gap-4">
        <h2 className="text-3xl font-bold sm:self-center">
          Things I&apos;ll talk about
        </h2>
        <p className="bg-emerald-500 font-semibold rounded-3xl px-4 py-2 text-white">
          My unique personal life and challenges
        </p>
        <p className="bg-emerald-500 font-semibold rounded-3xl px-4 py-2 text-white">
          I&apos;m a lifelong eczema survivor and alopecia fighter
        </p>
        <p className="bg-emerald-500 font-semibold rounded-3xl px-4 py-2 text-white">
          I&apos;m extremely passionate talking about healthcare and tech
        </p>
      </section>
    </main>
  );
}
