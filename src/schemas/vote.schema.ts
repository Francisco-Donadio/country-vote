import { z } from "zod";

/**
 * Vote submission schema with validation rules
 */
export const voteSubmissionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  country: z.string().min(1, "Please select a country"),
});

/**
 * Infer TypeScript type from schema
 * This ensures type safety between schema and form data
 */
export type VoteSubmissionInput = z.infer<typeof voteSubmissionSchema>;

/**
 * Validate form data and return typed errors
 */
export const validateVoteSubmission = (data: unknown) => {
  return voteSubmissionSchema.safeParse(data);
};

