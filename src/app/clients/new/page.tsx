"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    industry: "",
    contact_email: "",
    contact_phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.from("clients").insert([form]);

    if (error) {
      setError(error.message);
    } else {
      router.push("/clients");
    }

    setLoading(false);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={form.industry}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email"
          value={form.contact_email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact_phone"
          placeholder="Contact Phone"
          value={form.contact_phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Client"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </main>
  );
}
