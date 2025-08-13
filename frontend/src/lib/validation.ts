import {file, z} from "zod";
const optionalString = z.string().trim().optional().or(z.literal(""));
export const generateInfoScema=z.object({
    title: optionalString,
    description: optionalString,
})

export type GenerateInfo = z.infer<typeof generateInfoScema>;

export const personalInfoSchema = z.object({
    photo: z.custom<File | undefined>()
    .refine((file) => !file || file instanceof File && file.type.startsWith('image/'),
     "must be an image file"
)
     .refine((file) => !file || file.size <= 5 * 1024 * 1024, "File size must be less than 5MB"),
    firstName: optionalString,
    lastName: optionalString,
    jobTitle: optionalString,
    city: optionalString,
    country: optionalString,
    email: optionalString,
    phone: optionalString,
    summary: optionalString,
    linkedinUrl: optionalString,
    personalSite: optionalString,
})
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;



export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export type WorkExperience = NonNullable<
z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        fieldOfStudy: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        grade: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

export type Education = NonNullable<
z.infer<typeof educationSchema>["educations"]
>[number];

// Skills schema
export const skillsSchema = z.object({
  skills: optionalString, // Comma-separated skills
});

export type SkillsValues = z.infer<typeof skillsSchema>;
export type Skill = NonNullable<z.infer<typeof skillsSchema>["skills"]>[number];

export const resumeSchema = z.object({
    ...generateInfoScema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>,"photo"> & {
    id?: string
    photo?: File | string | undefined
};