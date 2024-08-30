import { create } from "zustand";
import prisma from "../lib/prisma";

type UserProps = {
  id: number;
  name: string;
  email: string;
  users: Array<{   id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;}>;
  getAction: () => Promise<void>;
  createAction: (name: string, email: string) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
};

export const useManageUser = create<UserProps>((set) => ({
  id: 0,
  name: "",
  email: "",
  users: [],
  createAction: async (name, email) => {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        updatedAt: new Date(),
      },
    });
  },
  deleteAction: async (id) => {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
  },
  getAction: async () => {
    const users = await prisma.user.findMany();
    set({ users });
  },
}));
