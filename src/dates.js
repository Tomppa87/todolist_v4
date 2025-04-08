import { differenceInDays } from "date-fns";

export const date = new Date();

export function daysBetweenDueDate(dueDate, date) {
    return differenceInDays(dueDate, date);
}