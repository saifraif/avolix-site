"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Project = {
  id: string;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
};

export default function ProjectsPage() {
  const { id } = useParams();
  const clientId = id as string;

  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("client_id", clientId);

    if (!error && data) setProjects(data);
  };

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("client_id", clientId);

      if (!error && data) setProjects(data);
    }

    if (clientId) fetchProjects();
  }, [clientId]); // only clientId is a dependency now

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting Project:", { ...form, client_id: clientId });

    const { error } = await supabase.from("projects").insert([
      {
        client_id: clientId,
        name: form.name,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      },
    ]);

    if (!error) {
      fetchProjects(); // refresh list
      setForm({ name: "", start_date: "", end_date: "" }); // reset form
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Projects for Client</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <div className="flex gap-2">
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Project
        </button>
      </form>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded">
            <strong>{project.name}</strong> — {project.status} <br />
            {project.start_date} → {project.end_date}
          </li>
        ))}
      </ul>
    </main>
  );
}
