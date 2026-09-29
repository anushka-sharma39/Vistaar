// Course pricing (INR). Courses not listed here are free and keep the existing one-click enroll flow.
// To make a course paid, add: "<course id>": { original: <list price>, price: <payable price> }.
const pricing = {
  "c-101": { original: 6999, price: 4999 },
  "c-103": { original: 5499, price: 3999 },
  "c-104": { original: 4999, price: 3499 },
  "c-105": { original: 5499, price: 3999 },
  "c-106": { original: 3999, price: 2999 },
  "c-107": { original: 5999, price: 4499 },
  "c-108": { original: 5499, price: 3999 },
  "c-109": { original: 8499, price: 5999 },
  "c-111": { original: 7999, price: 5499 },
};

export function getCoursePricing(course) {
  const p = course && pricing[course.id];
  if (!p) return { isPaid: false, original: 0, price: 0, discount: 0, discountPct: 0 };
  const discount = Math.max(0, p.original - p.price);
  return {
    isPaid: p.price > 0,
    original: p.original,
    price: p.price,
    discount,
    discountPct: p.original ? Math.round((discount / p.original) * 100) : 0,
  };
}

export const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
