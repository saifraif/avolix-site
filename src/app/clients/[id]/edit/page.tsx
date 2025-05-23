"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditClientPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    industry: "",
    contact_email: "",
    contact_phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClient() {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Client not found.");
      } else {
        setForm(data);
      }

      setLoading(false);
    }

    if (id) fetchClient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.from("clients").update(form).eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      router.push("/clients");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Client</h1>
      {loading ? (
        <p>Loading client...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder="Industry"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="contact_email"
            value={form.contact_email}
            onChange={handleChange}
            placeholder="Contact Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact_phone"
            value={form.contact_phone}
            onChange={handleChange}
            placeholder="Contact Phone"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Client
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}
    </main>
  );
}
