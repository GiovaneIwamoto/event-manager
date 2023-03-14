import { z } from 'zod';

export class CreateUserDTO {
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    city?: string;
    country?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;

    static validateData = (obj: CreateUserDTO) => {
        obj.birthDate = CreateUserDTO.parseBirthDate(obj.birthDate);
        const result = CreateUserSchema.safeParse(obj);
        return result;
    }

    static parseBirthDate = (birthDate: any): Date => {
        if (typeof birthDate === 'string') {
            return new Date(birthDate);
        }
        return birthDate;
    }
}

export const CreateUserSchema = z.object({
    firstName: z.string().regex(/^[a-zA-Z]+$/),
    lastName: z.string().regex(/^[a-zA-Z]+$/),
    birthDate: z.date(),
    city: z.string().regex(/^[a-zA-Z]+$/),
    country: z.string().regex(/^[a-zA-Z]+$/),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string()
});