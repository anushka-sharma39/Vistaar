export default function DataTable({ columns, data, keyField = "id", renderRow }) {
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-ink-100">
            {columns.map((col) => (
              <th key={col.key} className="text-left font-semibold text-ink-500 text-xs uppercase tracking-wide py-3 px-3 first:pl-0">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[keyField]} className="border-b border-ink-100/70 last:border-0 hover:bg-indigo-50/40 transition-colors">
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`py-3.5 px-3 first:pl-0 align-middle ${className}`}>{children}</td>;
}
