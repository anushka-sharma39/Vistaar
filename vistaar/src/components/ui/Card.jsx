export function Card({ children, className = "", hover = false, padded = true, ...props }) {
  return (
    <div
      className={`glass-card ${padded ? "p-5 sm:p-6" : ""} ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-indigo-200" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export default Card;
