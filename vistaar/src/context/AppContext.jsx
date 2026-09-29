import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { initialEnrollments } from "../data/enrollments";
import { notifications as initialNotifications } from "../data/misc";
import { courses as allCourses } from "../data/courses";

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
};

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [enrollments, setEnrollments] = useState(() => load("cc.enrollments", initialEnrollments));
  const [notifs, setNotifs] = useState(initialNotifications);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(() => load("cc.results", {}));
  const [trainerCourses, setTrainerCourses] = useState(() =>
    load("cc.trainerCourses", allCourses.filter((c) => c.trainerId === "tr-01").map((c) => ({ ...c, published: true })))
  );
  const timers = useRef(new Set());

  useEffect(() => save("cc.enrollments", enrollments), [enrollments]);
  useEffect(() => save("cc.results", assessmentResults), [assessmentResults]);
  useEffect(() => save("cc.trainerCourses", trainerCourses), [trainerCourses]);
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((toast) => toast.id !== id)), []);

  const showToast = useCallback((message, variant = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-3), { id, message, variant }]);
    const h = setTimeout(() => {
      dismissToast(id);
      timers.current.delete(h);
    }, 3400);
    timers.current.add(h);
  }, [dismissToast]);

  const enrollInCourse = (courseId) => {
    setEnrollments((prev) => {
      if (prev.find((e) => e.courseId === courseId)) return prev;
      return [...prev, { courseId, progress: 0, lastAccessed: "Just now", completedLessons: [], status: "In Progress" }];
    });
    showToast("You're enrolled! Course added to My Learning.");
  };

  // Called only after a (simulated) payment succeeds. Stores non-sensitive receipt data only —
  // never card numbers, CVV, UPI IDs or bank details.
  const purchaseCourse = (courseId, receipt) => {
    setEnrollments((prev) => {
      if (prev.find((e) => e.courseId === courseId)) return prev;
      return [...prev, { courseId, progress: 0, lastAccessed: "Just now", completedLessons: [], status: "In Progress", purchase: receipt }];
    });
  };

  const isEnrolled = (courseId) => enrollments.some((e) => e.courseId === courseId);
  const getEnrollment = (courseId) => enrollments.find((e) => e.courseId === courseId);

  const markLessonComplete = (courseId, lessonTitle, totalLessons) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.courseId !== courseId) return e;
        const completed = e.completedLessons.includes(lessonTitle) ? e.completedLessons : [...e.completedLessons, lessonTitle];
        const progress = Math.min(100, Math.round((completed.length / totalLessons) * 100));
        return { ...e, completedLessons: completed, progress, lastAccessed: "Just now", status: progress >= 100 ? "Completed" : "In Progress" };
      })
    );
  };

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const unreadCount = notifs.filter((n) => n.unread).length;

  const recordAssessment = (id, result) => setAssessmentResults((r) => ({ ...r, [id]: result }));

  const addTrainerCourse = (course) => setTrainerCourses((l) => [course, ...l]);
  const updateTrainerCourse = (id, patch) => setTrainerCourses((l) => l.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const removeTrainerCourse = (id) => setTrainerCourses((l) => l.filter((c) => c.id !== id));

  return (
    <AppContext.Provider
      value={{
        toasts, showToast, dismissToast,
        enrollments, enrollInCourse, purchaseCourse, isEnrolled, getEnrollment, markLessonComplete,
        sidebarCollapsed, setSidebarCollapsed,
        notifs, markAllRead, markRead, unreadCount,
        assessmentResults, recordAssessment,
        trainerCourses, addTrainerCourse, updateTrainerCourse, removeTrainerCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
