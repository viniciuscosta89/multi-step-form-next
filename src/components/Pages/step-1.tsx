'use client'

import Form from '@/components/Form'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { useStore } from '@/store'
import { type FormSchema, formSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

export default function StepOne() {
  const { formState, updateFormState } = useStore()
  const router = useRouter()

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

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form

  const onSubmit: SubmitHandler<FormSchema> = (values: FormSchema) => {
    updateFormState(values)
    if (isValid) {
      router.push('/step-2')
    }
  }

  return (
    <Fragment>
      <Heading
        title="Personal info"
        paragraph="Please provide your name, email address, and phone number."
      />

      <Form {...form}>
        <div className="flex flex-col gap-4 lg:gap-6">
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id={field.name}
                {...field}
                label="Name"
                type="text"
                error={errors.name?.message}
                placeholder="e.g. Stephen King"
              />
            )}
          />

          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id={field.name}
                {...field}
                label="E-mail Address"
                type="email"
                error={errors.email?.message}
                placeholder="e.g. stephenking@lorem.com"
              />
            )}
          />

          <FormField
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                id={field.name}
                {...field}
                label="Phone Number"
                type="tel"
                inputMode="tel"
                error={errors.phone?.message}
                placeholder="e.g. +1 234 567 890"
              />
            )}
          />
        </div>
        <motion.div
          className="flex justify-end items-center fixed bottom-0 left-0 w-full bg-white p-4 lg:static lg:p-0 lg:mt-auto"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Next Step
          </Button>
        </motion.div>
      </Form>
    </Fragment>
  )
}
