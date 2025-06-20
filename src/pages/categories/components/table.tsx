import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Category } from "@/types/product.type";

export interface TableCateProps {
  categories: Category[];
}

export const TableCategory = ({ categories }: TableCateProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category: Category, index: number) => (
            <TableRow key={category.id}>
              <TableCell className="font-mono text-xs">#{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-W69-7j4WkHGUDo9V8Ltc5Smly_28rhQYTw&s"
                    alt={category.categoryName}
                    className="w-20 h-20 rounded-md object-cover flex-shrink-0 border border-gray-300"
                  />
                  <div>
                    <div className="font-medium text-gray-900 truncate line-clamp-1 text-sm">
                      {category.categoryName.slice(0, 40)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-500 truncate line-clamp-2">
                  {category.description.slice(0, 30)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
