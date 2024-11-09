'use client'

import Form from '@/components/Form'
import Heading from '@/components/Heading'
import { ThankYouIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { addons } from '@/data/addons'
import { planCategories } from '@/data/plans'
import { isAddonRecurrencyMonthly } from '@/lib/utils'
import { useStore } from '@/store'
import {
  type FormSchema,
  type TPlanCategories,
  type TPlanRecurrency,
  formSchema,
} from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const StepFive: FC = () => {
  return (
    <motion.section
      className="w-full h-full pb-6 grid place-items-center place-content-center max-w-[450px]"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: 'spring' }}
    >
      <span className="w-16 mb-8">
        <ThankYouIcon />
      </span>
      <h1 className="text-[2rem] font-bold mb-4" data-cy="thank-you-title">Thank you</h1>
      <p className="text-coolGray text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at{' '}
        <a
          className="hover:text-purpleBlue transition duration-300"
          href="mailto:support@loremgaming.com"
          title=""
        >
          support@loremgaming.com
        </a>
        .
      </p>
    </motion.section>
  )
}

export default function StepFour() {
  const { formState, updateFormState } = useStore()
  const [isFinishedState, setIsFinishedState] = useState(false)
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
    formState: { isValid },
  } = form

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    (values: FormSchema) => {
      updateFormState(values)
      if (isValid) {
        setIsFinishedState(true)
      }
    },
    [isValid, router, updateFormState],
  )

  useEffect(() => {
    if (!formState.name) router.push('/')
  }, [])

  const planCategory = (category: TPlanCategories): string => {
    const categories = {
      ARCADE: 'Arcade',
      ADVANCED: 'Advanced',
      PRO: 'Pro',
    }

    return categories[category] || categories.ARCADE
  }

  const planRecurrency = (recurrency: TPlanRecurrency): string => {
    const recurrencies = {
      MONTHLY: 'Monthly',
      YEARLY: 'Yearly',
    }

    return recurrencies[recurrency] || recurrencies.MONTHLY
  }

  const planCategoryPrice = (): number => {
    const { plan } = formState
    const categoryPlan = planCategories.find(
      category => category.value === plan.category,
    )

    const price =
      categoryPlan?.price[
        plan.recurrency.toLowerCase() as keyof typeof categoryPlan.price
      ]

    return price || 0
  }

  const addedAddons = formState.addons
    ? addons.filter(addon => formState.addons.some(a => a === addon.value))
    : []

  const isPlanRecurrencyMonthly = formState.plan.recurrency === 'MONTHLY'

  const addedAddonsTotalPrice = addedAddons.reduce((prev, curr) => {
    console.log({ curr, prev })
    return isPlanRecurrencyMonthly
      ? curr.price.monthly + prev
      : curr.price.yearly + prev
  }, 0)

  console.log({ addedAddons })

  return isFinishedState ? (
    <StepFive />
  ) : (
    <>
      <Heading
        id="finishing-up-title"
        title="Finishing up"
        paragraph="Double-check everything looks OK before confirming."
      />

      <Form>
        <motion.div
          className="bg-alabaster rounded-md py-4 px-6 flex flex-col gap-4"
          initial={{ x: 16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <span className="font-medium">
                {planCategory(formState.plan.category)} (
                {planRecurrency(formState.plan.recurrency)})
              </span>

              <Button
                variant="link"
                size="link"
                onClick={() => router.push('/step-2')}
                className="font-normal text-sm text-coolGray p-0 underline hover:text-purpleBlue"
                data-cy="change-plan"
              >
                Change
              </Button>
            </div>

            <div>
              <span className="font-bold">
                ${planCategoryPrice()}/{isPlanRecurrencyMonthly ? 'mo' : 'yr'}
              </span>
            </div>
          </div>

          <Separator />

          <ul className="flex flex-col gap-4">
            {addedAddons.map(addon => (
              <li
                key={addon.value}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-coolGray">{addon.name}</span>

                <span>{isAddonRecurrencyMonthly(formState, addon)}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex justify-between px-6"
          initial={{ x: 16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <span className="text-sm text-coolGray">
            Total (per {isPlanRecurrencyMonthly ? 'month' : 'year'})
          </span>

          <span className="font-bold text-xl text-purpleBlue">
            +$
            {planCategoryPrice() + addedAddonsTotalPrice}/{isPlanRecurrencyMonthly ? 'mo' : 'yr'}
          </span>
        </motion.div>

        <div className="flex justify-between items-center fixed lg:static bottom-0 left-0 w-full bg-white p-4 lg:p-0 lg:mt-auto">
          <Button
            type="button"
            variant="ghost"
            size="link"
            className="text-coolGray"
            onClick={() => router.push('/step-3')}
            data-cy="step-4-back"
          >
            Go back
          </Button>

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className="bg-purpleBlue hover:bg-purpleBlueHover"
            data-cy="step-4-submit"
          >
            Confirm
          </Button>
        </div>
      </Form>
    </>
  )
}
