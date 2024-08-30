"use client"
import { Input } from "@/components/ui/input";
import React from "react";
import { useUpdateUser } from "../hooks";
import SubmitButton from "../submit-button";

export default function Form({
  user,
}: {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}) {
  const { handleSubmit, pending, error } = useUpdateUser(user?.id as number);
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Input your name"
        defaultValue={user?.name}
      />
      <Input
        type="text"
        name="email"
        placeholder="Input your email"
        defaultValue={user?.email}
      />
      <SubmitButton pending={pending} error={error} />
    </form>
  );
}
