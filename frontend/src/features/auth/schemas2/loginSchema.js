import {z} from "zod";

export const loginSchema2 = z.object({
    email:z.string().trim().toLowerCase().email("Please input a valid email"),
    password:z.string().min(1,"password is required")
});
