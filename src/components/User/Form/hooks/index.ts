import { patchUser, postUser } from "@/components/User/Actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export function usePostUser() {
  const { pending } = useFormStatus();
  const [error, setError] = useState("");
  const handleSubmit = async (FormData: FormData) => {
    const res = await postUser(FormData);
    if (res.error) {
      setError(res.error);
      return false;
    } else {
      toast.success("User Created Successfully");
      return true;
    }
  };
  return {
    handleSubmit,
    pending,
    error,
  };
}

export function useUpdateUser(id: number) {
  const { pending } = useFormStatus();
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await patchUser(id, formData);
    if (res && res.error) {
      setError(res.error);
    } else {
      toast.success("User Updated Successfully");
    }
  };
  return {
    handleSubmit,
    pending,
    error,
  };
}
