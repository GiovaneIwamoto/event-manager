import { z } from 'zod';

export class CreateEventDTO {
    description?: string;
    dateTime?: Date;
    createdAt?: Date;


    static validateData = (obj: CreateEventDTO) => {
        obj.dateTime = CreateEventDTO.parseDateTime(obj.dateTime);
        const result = CreateEventSchema.safeParse(obj);
        return result;
    } 

    static parseDateTime = (dateTime: any): Date => {
        if (typeof dateTime === 'string') {
            return new Date(dateTime);
        }
        return dateTime;
    }
}

export const CreateEventSchema = z.object({
    description: z.string(),
    dateTime: z.date()
});