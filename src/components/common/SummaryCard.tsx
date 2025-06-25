export const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-black/80 p-6 rounded-xl border border-gray-700 shadow-lg">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-2xl font-bold text-cyan-400">{value}</p>
  </div>
);
