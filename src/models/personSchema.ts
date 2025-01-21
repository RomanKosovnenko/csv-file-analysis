import { z } from "zod";

export const PersonSchema = z.object({
  ID: z.number().int(),
  Name: z.string(),
  Age: z.number().int().min(0),
  Salary: z.number().min(0),
});

export type Person = z.infer<typeof PersonSchema>;
