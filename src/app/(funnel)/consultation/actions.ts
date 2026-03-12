"use server";

import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Zod schema for lead data                                          */
/* ------------------------------------------------------------------ */
const LeadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().min(1, "Company is required"),
    email: z.string().email("Please enter a valid email"),
    projectType: z
        .array(z.string())
        .min(1, "Select at least one project type"),
    budget: z.string().min(1, "Please select a budget range"),
});

export type LeadFormData = z.infer<typeof LeadSchema>;

/* ------------------------------------------------------------------ */
/*  C#-style DTO mapping                                              */
/* ------------------------------------------------------------------ */
interface LeadDto {
    FullName: string;
    CompanyName: string;
    EmailAddress: string;
    ProjectTypes: string[];
    BudgetRange: string;
    SubmittedAtUtc: string;
}

function mapToDto(data: LeadFormData): LeadDto {
    return {
        FullName: data.name,
        CompanyName: data.company,
        EmailAddress: data.email,
        ProjectTypes: data.projectType,
        BudgetRange: data.budget,
        SubmittedAtUtc: new Date().toISOString(),
    };
}

/* ------------------------------------------------------------------ */
/*  Server Action                                                     */
/* ------------------------------------------------------------------ */
export async function submitLeadData(
    formData: LeadFormData
): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
    // 1. Validate
    const result = LeadSchema.safeParse(formData);
    if (!result.success) {
        const fieldErrors: Record<string, string[]> = {};
        for (const [key, value] of Object.entries(
            result.error.flatten().fieldErrors
        )) {
            fieldErrors[key] = value as string[];
        }
        return { success: false, errors: fieldErrors };
    }

    // 2. Map to DTO
    const dto = mapToDto(result.data);

    // 3. Send to C# API (future endpoint)
    // -------------------------------------------------
    // const response = await fetch(
    //     process.env.CSHARP_API_URL + "/api/leads",
    //     {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(dto),
    //     }
    // );
    //
    // if (!response.ok) {
    //     return { success: false, errors: { _form: ["Failed to submit. Please try again."] } };
    // }
    // -------------------------------------------------

    // For now, log and succeed
    console.log("[Lead Submitted]", dto);

    return { success: true };
}
