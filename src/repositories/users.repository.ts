import prisma from "@/lib/prisma";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (name: string, email: string) => {
  return await prisma.user.create({
    data: {
      name,
      email,
    },
  });
};

export const deleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};


export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export const updateUser = async (id: number, name: string, email: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });
}

export const getUsers = async () => {
  return await prisma.user.findMany();
}