"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clients").select("*");
      console.log("Client data:", data);
      if (error) console.error("Supabase error:", error.message);
    }

    fetchClients();
  }, []);

  return (
    <main className="p-6 text-xl font-semibold">
      Welcome to Avolix — Client Management System
    </main>
  );
}
