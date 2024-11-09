'use client'

import Form from '@/components/Form'
import Heading from '@/components/Heading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { planCategories } from '@/data/plans'
import { transitionContainer, transitionItem } from '@/lib/utils'
import { useStore } from '@/store'
import { type FormSchema, formSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

export default function StepTwo() {
  const { formState, updateFormState } = useStore()
  const router = useRouter()
  const [isRecurrencyYearly, setisRecurrencyYearly] = useState(
    formState.plan.recurrency === 'YEARLY',
  )

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

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    (values: FormSchema) => {
      updateFormState(values)
      if (isValid) {
        router.push('/step-3')
      }
    },
    [isValid, router, updateFormState],
  )

  const handleRecurrency = useCallback(
    () => setisRecurrencyYearly(!isRecurrencyYearly),
    [isRecurrencyYearly],
  )

  useEffect(() => {
    if (!formState.name) router.push('/')
  }, [])

  return (
    <>
      <Heading
        id="select-plan-title"
        title="Select your plan"
        paragraph="You have the option of monthly or yearly billing."
      />

      <Form>
        <FormField
          name="plan.category"
          control={control}
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-4"
                      value={field.value}
                      name={field.name}
                      onValueChange={field.onChange}
                    >
                      <motion.div
                        variants={transitionContainer}
                        initial="hidden"
                        animate="show"
                        className="contents"
                      >
                        {planCategories.map(({ label, icon, price }, index) => (
                          <motion.div
                            variants={transitionItem}
                            key={label + index}
                          >
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value={label.toUpperCase()}
                                  className="hidden"
                                />
                              </FormControl>
                              <FormLabel
                                className={`flex lg:flex-col gap-4 lg:gap-10 border rounded-md py-5 px-4 transition duration-300 ${
                                  field.value === label.toUpperCase()
                                    ? 'border-purpleBlue bg-alabaster'
                                    : 'border-[#D6D9E6]'
                                } hover:cursor-pointer hover:border-purpleBlue`}
                                data-cy={`plan-${label.toLowerCase()}`}
                              >
                                <span className="w-10">{icon}</span>

                                <div className="flex flex-col gap-2">
                                  <span className="font-medium">{label}</span>
                                  <span className="font-normal text-sm text-coolGray leading-none">
                                    <AnimatePresence mode="popLayout">
                                      {isRecurrencyYearly ? (
                                        <motion.span
                                          key="yearly"
                                          initial={{ opacity: 0, x: 16 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 16 }}
                                        >
                                          {price.yearly}/yr
                                        </motion.span>
                                      ) : (
                                        <motion.span
                                          key="monthly"
                                          initial={{ opacity: 0, x: -16 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -16 }}
                                        >
                                          {price.monthly}/mo
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </span>
                                </div>
                              </FormLabel>
                              {errors?.plan?.category?.message}
                            </FormItem>
                          </motion.div>
                        ))}
                      </motion.div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>

                {errors.plan?.category ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errors.plan?.category?.message}
                    </AlertDescription>
                  </Alert>
                ) : null}
              </>
            )
          }}
        />

        <FormField
          control={control}
          name="plan.recurrency"
          render={({ field }) => {
            return (
              <motion.div
                initial={{ x: 16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.75 }}
              >
                <FormItem className="flex flex-row gap-6 items-center justify-center rounded-lg p-4 bg-alabaster">
                  <FormLabel
                    className={`transition duration-300 ${
                      isRecurrencyYearly ? 'text-coolGray' : ''
                    }`}
                    data-cy="recurrency-monthly"
                  >
                    Monthly
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === 'YEARLY'}
                      value={field.value ? 'YEARLY' : 'MONTHLY'}
                      onCheckedChange={e => {
                        field.onChange(e ? 'YEARLY' : 'MONTHLY')
                        handleRecurrency()
                      }}
                      className="data-[state=unchecked]:bg-primary"
                      data-cy="recurrency-switch"
                    />
                  </FormControl>
                  <FormLabel
                    className={`transition duration-300 ${
                      isRecurrencyYearly ? '' : 'text-coolGray'
                    }`}
                    data-cy="recurrency-yearly"
                  >
                    Yearly
                  </FormLabel>
                </FormItem>

                {errors.plan?.recurrency ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {errors.plan?.recurrency?.message}
                    </AlertDescription>
                  </Alert>
                ) : null}
              </motion.div>
            )
          }}
        />

        <div className="flex justify-between items-center fixed lg:static bottom-0 left-0 w-full bg-white p-4 lg:p-0 lg:mt-auto">
          <Button
            type="button"
            variant="link"
            size="link"
            className="text-coolGray"
            onClick={() => router.push('/')}
            data-cy="step-2-back"
          >
            Go back
          </Button>

          <Button type="submit" onClick={handleSubmit(onSubmit)} data-cy="step-2-submit">
            Next Step
          </Button>
        </div>
      </Form>
    </>
  )
}
