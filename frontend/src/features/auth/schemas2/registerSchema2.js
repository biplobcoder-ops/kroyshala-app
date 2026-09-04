
import {z} from "zod";

export const registerSchema2 = z.object({
    name:z
        .string()
        .trim()
        .min(2,"Name must at least 2 character")
        .max(50,"Name less than 50 character"),
    email:z
         .string()
         .trim()
         .toLowerCase()
         .email("Invalid email"),
    password:z
             .string()
             .trim()
             .min(8,'password langth 8 character')
             .max(100,'Password length is so long'),
    confirmPassword:z
                 .string()
                 .trim()
                 .min(8,"confirmPassword must be 8 character"),
    phone:z
         .string()
         .trim()
         .regex(/^01[3-9]\d{8}$/,"Invalid Bangladesh Mobile number"),
    address:z.object({
        street:z.string().min(1,"street address is require"),
        city:z.string().trim().min(1,"City name is required"),
        postalCode:z.string().trim().min(1,"PostalCode is required"),
        country:z.string().trim().min(1,"Country name is requrired")

    })
}).refine((data) => data.password === data.confirmPassword,{
    message:"Confirm password is not match",
    path:["confirmPassword"]
});

