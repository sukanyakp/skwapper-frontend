
import { Button } from "@/components/ui/button";

type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onBlockToggle?: (id: string, block: boolean) => void;
  showBlockButton?: boolean;
  isBlocked?: (item: T) => boolean;
  getId: (item: T) => string;
}

const AdminTable = <T,>({
  data,
  columns,
  onBlockToggle,
  showBlockButton = false,
  isBlocked,
  getId,
}: AdminTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3">{col.header}</th>
            ))}
            {showBlockButton && <th className="px-6 py-3 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 border-t">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4">{col.render(item)}</td>
                ))}
                {showBlockButton && onBlockToggle && isBlocked && (
                  <td className="px-6 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() =>
                        onBlockToggle(getId(item), !isBlocked(item))
                      }
                      className={
                        isBlocked(item)
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {isBlocked(item) ? "Unblock" : "Block"}
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (showBlockButton ? 1 : 0)} className="text-center px-6 py-6 text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
