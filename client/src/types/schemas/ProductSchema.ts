import { z } from "zod";

// export const productSchema=z.object({
//     // Id: z.string(),
//     Name: z.string({message:"Product Name is required"}),
//     Product_Price__c: z.number({message:"Number should be greater than 1"}).nonnegative(),
// })

export const productSchema = z.object({
  name: z
    .string( { message: "*This field is required" })
    .min(3, { message: "*Minimum 3 Characters required" }),
  Product_Price__c: z
    .number({message:"*This field is required"})
});
