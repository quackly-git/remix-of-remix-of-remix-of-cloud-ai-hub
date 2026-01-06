import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: "text" | "number" | "badge" | "date";
}

interface InteractiveTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  title?: string;
  searchable?: boolean;
  className?: string;
}

export function InteractiveTable({
  columns,
  data,
  title,
  searchable = true,
  className = "",
}: InteractiveTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    const column = columns.find((col) => col.key === sortColumn);

    if (column?.type === "number") {
      const aNum = parseFloat(aValue) || 0;
      const bNum = parseFloat(bValue) || 0;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    if (column?.type === "date") {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      return sortDirection === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }

    const aStr = aValue?.toString() || "";
    const bStr = bValue?.toString() || "";

    return sortDirection === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const renderCell = (value: any, column: TableColumn) => {
    switch (column.type) {
      case "badge":
        return <Badge variant="secondary">{value}</Badge>;
      case "number":
        return <span className="font-mono">{value}</span>;
      case "date":
        return new Date(value).toLocaleDateString();
      default:
        return value;
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="h-3 w-3 text-muted-foreground" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 text-primary" />
    );
  };

  return (
    <div
      className={`bg-muted/30 border rounded-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center justify-between gap-4">
          {title && <h4 className="font-semibold text-primary">{title}</h4>}

          {searchable && (
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
        </div>

        {searchTerm && (
          <p className="text-sm text-muted-foreground mt-2">
            Showing {sortedData.length} of {data.length} rows
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="text-left p-4 font-medium">
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column.key)}
                      className="h-auto p-0 gap-2 hover:bg-transparent"
                    >
                      {column.label}
                      {getSortIcon(column.key)}
                    </Button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                className="border-t hover:bg-muted/50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="p-4">
                    {renderCell(row[column.key], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {sortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? "No results found" : "No data available"}
          </div>
        )}
      </div>
    </div>
  );
}
