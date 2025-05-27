 export const Input = ({name,type = "text",placeholder,onChange,}: {
  name: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    required
    className="w-full px-4 py-2.5 bg-gray-800 text-white placeholder-gray-500 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all"
  />
);