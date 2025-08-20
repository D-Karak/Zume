
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
    linkedIn: optionalString,
    personalWebsite: optionalString,
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
        university: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
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
  skills: z
    .union([
      z.string(),
      z.array(z.string()),
    ])
    .transform((val) => {
      if (Array.isArray(val)) {
        return val.map((s) => s.trim()).filter(Boolean);
      }
      return val
        ? val.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    })
    .optional(),
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

export const emptyResume: ResumeValues = {
  title: "",
  description: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  city: "",
  country: "",
  email: "",
  phone: "",
  summary: "",
  linkedIn: "",
  personalWebsite: "",
  workExperiences: [],
  educations: [],
  skills: [],  
  id: undefined,
  photo: undefined,
};


//job application schema
export const jobSchema = z.object({
  jobTitle: z.string().trim().min(1, "Job title is required"),
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  applyDate: optionalString,
  lastUpdate: optionalString,
  status: z.enum(["applied", "interview", "offer", "rejected"]).default("applied").optional(),
  resumeId: optionalString,
})

export type JobFormData = z.infer<typeof jobSchema>
