import Form from "@/components/User/Form/update";
import { getUserById } from "@/repositories/users.repository";
import React from "react";

export default async function UsersIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUserById(Number(id));
  return (
    <div>
      <h1>Update User</h1>
      <Form user={user} />
    </div>
  );
}
