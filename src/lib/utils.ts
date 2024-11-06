import type { FormSchema, IAddon } from '@/types/form'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isAddonRecurrencyMonthly = (form: FormSchema, addon: IAddon) =>
  form.plan.recurrency === 'MONTHLY'
    ? `${addon.price.monthly}/mo`
    : `${addon.price.yearly}/yr`

export const transitionContainer = {
  hidden: { opacity: 0, x: 10 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3,
      type: 'spring',
    },
  },
}

export const transitionItem = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0 },
}
