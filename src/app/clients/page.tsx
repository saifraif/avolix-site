"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Client = {
  id: string;
  name: string;
  industry?: string;
  contact_email?: string;
  contact_phone?: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clients").select("*");
      if (!error) setClients(data || []);
      setLoading(false);
    }

    fetchClients();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <Link
        href="/clients/new"
        className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add New Client
      </Link>

      {loading ? (
        <p>Loading clients...</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table className="w-full border mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Industry</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.industry}</td>
                <td className="p-2">
                  <div>{client.contact_email}</div>
                  <div>{client.contact_phone}</div>
                </td>
                <td className="p-2 text-center space-x-4">
                  <Link
                    href={`/clients/${client.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      const confirm = window.confirm(
                        `Are you sure you want to delete "${client.name}"?`
                      );
                      if (!confirm) return;

                      const { error } = await supabase
                        .from("clients")
                        .delete()
                        .eq("id", client.id);

                      if (error) {
                        alert("Failed to delete client: " + error.message);
                      } else {
                        // Refresh the list
                        setClients((prev) =>
                          prev.filter((c) => c.id !== client.id)
                        );
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
