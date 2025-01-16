import { TUser } from "../types/user.types";
import { initialUsers } from "../database/initialUsers.data";

type TUserModel = {
    getAll: () => Promise<TUser[] | null>;
    getById: (id: number) => Promise<TUser | null>;
    create: (user: TUser) => Promise<TUser | null>;
    updateById: (id: number, user: TUser) => Promise<TUser | null>;
    deleteById: (id: number) => Promise<TUser | null>;
};

const getAll = async (): Promise<TUser[] | null> => {
    try {
        return users;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getById = async (id: number): Promise<TUser | null> => {
    try {
        return users.find((user) => user.id === id) || null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const create = async (user: TUser): Promise<TUser | null> => {
    try {
        const newUser = {
            ...user,
            id: users.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        users.push(newUser);
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateById = async (
    id: number,
    user: TUser
): Promise<TUser | null> => {
    try {
        const index = users.findIndex((user) => user.id === id);

        if (index === -1) return null;

        const updatedUser = {
            ...users[index],
            ...user,
            updatedAt: new Date(),
        };
        users[index] = updatedUser;

        return updatedUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteById = async (id: number): Promise<TUser | null> => {
    try {
        const index = users.findIndex((user) => user.id === id);

        if (index === -1) return null;

        const deletedUser = users.splice(index, 1)[0];

        return deletedUser;
        
    } catch (error) {
        console.log(error);
        return null;
    }
};

const users: TUser[] = initialUsers;

export const userModel: TUserModel = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
