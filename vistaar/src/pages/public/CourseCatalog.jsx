import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, BarChart3, Clock, Star } from "lucide-react";
import { courses, categories } from "../../data/courses";
import CourseCard from "../../components/courses/CourseCard";
import { Input, Select } from "../../components/ui/Input";
import { EmptyState, Pagination } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";
import heroArt from "../../assets/catalog-hero.png";

const PAGE_SIZE = 8;

export default function CourseCatalog() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [duration, setDuration] = useState("All");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const { isEnrolled } = useApp();

  const filtered = useMemo(() => {
    let list = courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.trainer.toLowerCase().includes(q.toLowerCase()));
    if (category !== "All") list = list.filter((c) => c.category === category);
    if (level !== "All") list = list.filter((c) => c.level === level);
    if (duration !== "All") {
      list = list.filter((c) => {
        const weeks = parseInt(c.duration);
        if (duration === "short") return weeks <= 4;
        if (duration === "medium") return weeks > 4 && weeks <= 6;
        return weeks > 6;
      });
    }
    if (sort === "popular") list = [...list].sort((a, b) => b.students - a.students);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => b.id.localeCompare(a.id));
    return list;
  }, [q, category, level, duration, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-10 pb-12">
      <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="flex items-center gap-4 text-xs font-semibold tracking-[0.3em] uppercase text-indigo-800">
            <span className="h-0.5 w-11 rounded-full bg-indigo-700" aria-hidden="true" /> Course Catalog
          </p>
          <h1 className="font-serif-display mt-5 text-[2.9rem] sm:text-6xl lg:text-[4.4rem] font-bold leading-[1.02] tracking-tight text-ink-900">
            Explore Courses
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#6D28D9 0%,#9333EA 100%)" }}>
              for Your Growth
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
            Explore training programs across technical, leadership and digital skill tracks.
          </p>
        </div>
        <div className="relative hidden lg:block" aria-hidden="true">
          <img
            src={heroArt}
            alt=""
            className="ml-auto w-full max-w-[600px] mix-blend-multiply"
            style={{ WebkitMaskImage: "radial-gradient(closest-side, #000 72%, transparent 100%)", maskImage: "radial-gradient(closest-side, #000 72%, transparent 100%)" }}
          />
        </div>
      </div>

      <div className="mt-8 rounded-[26px] border border-white bg-white/90 p-3 shadow-[0_1px_2px_rgba(11,16,32,0.04),0_18px_40px_-24px_rgba(60,40,140,0.3)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1.05fr]">
          <Input variant="soft" icon={Search} placeholder="Search courses or trainers…" aria-label="Search courses or trainers" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} className="sm:col-span-2 lg:col-span-1" />
          <Select variant="soft" icon={SlidersHorizontal} aria-label="Category" label={null} value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <option value="All">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select variant="soft" icon={BarChart3} aria-label="Level" label={null} value={level} onChange={(e) => { setLevel(e.target.value); setPage(1); }}>
            <option value="All">All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Select>
          <Select variant="soft" icon={Clock} aria-label="Duration" label={null} value={duration} onChange={(e) => { setDuration(e.target.value); setPage(1); }}>
            <option value="All">Any Duration</option>
            <option value="short">Short (≤ 4 weeks)</option>
            <option value="medium">Medium (5–6 weeks)</option>
            <option value="long">Long (7+ weeks)</option>
          </Select>
          <Select variant="soft" icon={Star} aria-label="Sort" label={null} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Sort: Most Popular</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="newest">Sort: Newest</option>
          </Select>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3 text-ink-600" aria-live="polite">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-600" aria-hidden="true">
          <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" />
          <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="11.5" width="6" height="6" rx="1.5" />
        </svg>
        {filtered.length} course{filtered.length !== 1 && "s"} found
      </div>

      {pageItems.length === 0 ? (
        <EmptyState title="No courses match your filters" message="Try adjusting your search or filters." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {pageItems.map((c) => (
            <CourseCard key={c.id} course={c} enrolled={isEnrolled(c.id)} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
