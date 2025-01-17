import z from "zod";


const create = z.object({
    name: z.string().min(3).max(100),
    surname: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    isAdmin: z.boolean().optional(),
});

const update = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    surname: z.string().min(3).max(100).optional(),
    password: z.string().min(8).max(100).optional(),
    isAdmin: z.boolean().optional(),
});

export const userValidation = {
    create,
    update,
};