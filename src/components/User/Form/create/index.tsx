"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SubmitButton from "../submit-button";
import { usePostUser } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Form() {
  const { handleSubmit, pending, error } = usePostUser();
  const [isOpen, setIsOpen] = useState(false);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const success = await handleSubmit(formData);
    if (success) {
      setIsOpen(false); // Only close if submission is successful
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Create user +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit} className="grid gap-4 py-4">
          <Input type="text" name="name" placeholder="Input your name" />
          <Input type="text" name="email" placeholder="Input your email" />
          <DialogFooter>
            <SubmitButton pending={pending} error={error} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
