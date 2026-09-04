import {z} from "zod";

export const forgotPasswordSchema2 = z.object({
    email:z.string().trim().lowercase().email("Please Enter a valid email")
});