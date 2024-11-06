import { z } from 'zod';

export enum PlanCategories {
  Arcade = 'ARCADE',
  Advanced = 'ADVANCED',
  Pro = 'PRO',
}

export const planCategoriesKeys = Object.keys(PlanCategories) as string[];
export const planCategoriesValues = Object.values(PlanCategories) as string[];

const PlanCategorySchema = z.enum(['ARCADE', 'ADVANCED', 'PRO']);
const PlanRecurrencySchema = z.enum(['MONTHLY', 'YEARLY']);

export const formSchema = z.object({
  name: z.coerce.string().min(1, { message: 'This field is required' }),
  email: z.coerce.string().min(1, { message: 'This field is required' }),
  phone: z.coerce.string().min(1, { message: 'This field is required' }),
  plan: z.object({
    category: PlanCategorySchema,
    recurrency: PlanRecurrencySchema,
  }),
  addons: z.array(z.string()).min(0),
});

export type FormSchema = z.infer<typeof formSchema>;

export type TPlanCategories = 'ARCADE' | 'ADVANCED' | 'PRO'
export type TPlanRecurrency = 'MONTHLY' | 'YEARLY'

export interface IPlanCategory {
  icon: JSX.Element
  label: string
  price: {
    monthly: number
    yearly: number
  }
  value: string
}

export interface IAddon {
  name: string;
  description: string;
  price: {
      monthly: number;
      yearly: number;
  };
  value: string;
}