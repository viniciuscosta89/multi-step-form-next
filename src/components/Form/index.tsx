'use client'

import { Form as FormShad } from '@/components/ui/form'
import { useStore } from '@/store'
import { type FormSchema, formSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface FormProps {
  children: ReactNode
}

export default function Form({ children }: FormProps) {
  const { formState, updateFormState } = useStore()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      plan: {
        category: formState.plan.category,
        recurrency: formState.plan.recurrency,
      },
      addons: formState.addons,
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<FormSchema> = (values: FormSchema) =>
    updateFormState(values)

  return (
    <FormShad {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 lg:w-[450px] h-full"
      >
        {children}
      </form>
    </FormShad>
  )
}
