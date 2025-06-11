"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();

  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-gray-100 text-black">
      <section className="flex flex-col items-center justify-center p-8 bg-white rounded shadow-md">
        <input
          type="text"
          placeholder="Enter room name"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
        />

        <button
          className="bg-blue-500 text-white rounded p-2 w-full max-w-md hover:bg-blue-600 transition-colors"
          onClick={() => {
            if (slug.trim()) {
              router.push(`/room/${slug}`);
            } else {
              alert("Please enter a valid room ID.");
            }
          }}
        >
          Join Room
        </button>
      </section>
    </main>
  );
}