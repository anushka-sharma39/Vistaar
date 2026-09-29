import { useState } from "react";
import { Search } from "lucide-react";
import { trainers } from "../../data/trainers";
import TrainerCard from "../../components/courses/TrainerCard";
import { Input } from "../../components/ui/Input";
import { EmptyState } from "../../components/ui/States";

export default function TrainersPage() {
  const [q, setQ] = useState("");
  const filtered = trainers.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) || t.expertise.some((e) => e.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
      <div className="max-w-2xl">
        <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">
          Expert faculty <span className="h-px w-14 bg-ink-300" aria-hidden />
        </p>
        <h1 className="mt-3 font-serif text-5xl lg:text-[3.6rem] font-bold leading-[1.05] tracking-tight text-ink-900">
          Meet our <em className="pr-1 italic bg-gradient-to-r from-[#4F35D6] to-[#8B6CF6] bg-clip-text text-transparent">trainers</em>
        </h1>
        <p className="text-ink-400 mt-4 text-xl">Practitioners and subject experts leading Vistaar's training programs.</p>
      </div>
      <Input
        icon={Search}
        placeholder="Search by name or expertise…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="max-w-md mt-8"
      />
      {filtered.length === 0 ? (
        <EmptyState title="No trainers found" message="Try a different name or expertise area." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map((t) => (
            <TrainerCard key={t.id} trainer={t} />
          ))}
        </div>
      )}
    </div>
  );
}
