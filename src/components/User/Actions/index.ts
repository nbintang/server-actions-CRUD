"use server";
import z from "zod";
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  updateUser,
} from "@/repositories/users.repository";
import { revalidatePath } from "next/cache";
import { schema } from "@/components/User/schemas";
import { redirect } from "next/navigation";

export async function postUser(formData: FormData) {
  try {
    const { name, email } = Object.fromEntries(formData) as z.infer<
      typeof schema
    >;
    const validated = schema.parse({
      name,
      email,
    });
    const existedUser = await findUserByEmail(validated.email);
    if (existedUser) {
      return { error: "User already exists" };
    }
    await createUser(validated.name, validated.email);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return { error: firstIssue.message, path: firstIssue.path };
    }
    return { error: "Something went wrong" };
  }
}

export async function deleteUser(id: number) {
  try {
    await deleteUserById(id);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function patchUser(id: number, formData: FormData) {
  let redirectPath;
  try {
    const { name, email } = Object.fromEntries(formData);
    const validated = schema.parse({
      name,
      email,
    });
    const existedUser = await findUserByEmail(validated.email);
    if (existedUser && existedUser.id !== id) {
      return { error: "User already exists" };
    }
    await updateUser(id, validated.name, validated.email);
    revalidatePath("/");
    redirectPath = `/`;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return { error: firstIssue.message, path: firstIssue.path };
    }
    redirectPath = `/user/${id}`;
    return { error: "Something went wrong" };
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
