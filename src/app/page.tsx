import { Tables } from "@/components/User/Table";
import Image from "next/image";
import prisma from "../lib/prisma";
import { columns } from "@/components/User/Table/Columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useManageUser } from "@/store";
import { useEffect } from "react";
import Form from "@/components/User/Form/create";

export default async  function Home() {
  const users = await prisma.user.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4 items-end">
        <Tables data={users} columns={columns} />
        <Form /> 
      </div>
    </main>
  );
}
