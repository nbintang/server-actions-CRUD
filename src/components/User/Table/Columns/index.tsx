"use client";
import { ColumnDef } from "@tanstack/react-table";
import { UserProps } from "../../../../../types/user";
import { formatDate } from "@/helpers/format-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { deleteUser } from "../../Actions";
import Link from "next/link";

export const columns: ColumnDef<UserProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = formatDate(getValue() as string);
      return date;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => {
      const date = formatDate(getValue() as string);
      return date;
    },
  },
  {
    accessorKey: "id",
    header: " ",
    cell: ({ row }) => {
      const handleDelete = async () => {
        const res = await deleteUser(row.getValue("id") as number);
        if (res?.success) {
          toast.success("User Deleted");
        }
      };
      const handleCopy = () => (
        navigator.clipboard.writeText(row.getValue("id") as string),
        toast.success("User ID copied to clipboard")
      );
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/users/${row.getValue("id")}`}>
              <DropdownMenuItem>View user details</DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Delete user
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopy}>
              Copy User ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
