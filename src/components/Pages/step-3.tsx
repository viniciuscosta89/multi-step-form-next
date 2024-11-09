'use client'

import Form from '@/components/Form'
import Heading from '@/components/Heading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { addons } from '@/data/addons'
import {
  isAddonRecurrencyMonthly,
  transitionContainer,
  transitionItem,
} from '@/lib/utils'
import { useStore } from '@/store'
import { type FormSchema, IAddon, formSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import {
  ControllerRenderProps,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'

export default function StepThree() {
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

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    (values: FormSchema) => {
      updateFormState(values)
      if (isValid) {
        router.push('/step-4')
      }
    },
    [isValid, router, updateFormState],
  )

  const isRecurrencyMonthly = useMemo(
    () => (addon: IAddon) => {
      return isAddonRecurrencyMonthly(formState, addon)
    },
    [formState],
  )

  const isAddonSelected = useMemo(
    () =>
      (
        field: ControllerRenderProps<
          {
            name: string
            email: string
            phone: string
            plan: {
              category: 'ARCADE' | 'ADVANCED' | 'PRO'
              recurrency: 'MONTHLY' | 'YEARLY'
            }
            addons: string[]
          },
          'addons'
        >,
        item: IAddon,
      ) =>
        field.value.some(addon => addon === item.value)
          ? 'border-purpleBlue bg-alabaster'
          : '',
    [formState],
  )

  useEffect(() => {
    if (!formState.name) router.push('/')
  }, [])

  return (
    <>
      <Heading
        id="pick-addons-title"
        title="Pick add-ons"
        paragraph="Add-ons help enhance your gaming experience."
      />

      <Form>
        <FormField
          control={control}
          name="addons"
          render={() => {
            return (
              <FormItem className="flex flex-col gap-3 lg:gap-4">
                <motion.div
                  variants={transitionContainer}
                  initial="hidden"
                  animate="show"
                  className="contents"
                >
                  {addons.map(addonItem => (
                    <motion.div variants={transitionItem} key={addonItem.value}>
                      <FormField
                        key={addonItem.value}
                        control={control}
                        name="addons"
                        render={({ field }) => {
                          return (
                            <FormItem key={addonItem.name}>
                              <FormControl>
                                <Fragment>
                                  <FormLabel
                                    htmlFor={addonItem.value}
                                    className={`px-4 py-3 lg:py-5 rounded-lg flex flex-row items-center gap-4 lg:gap-6 border transition duration-300 hover:cursor-pointer hover:border-purpleBlue ${isAddonSelected(field, addonItem)}`}                                    
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(
                                        addonItem.value,
                                      )}
                                      id={addonItem.value}
                                      className="data-[state=unchecked]:border-coolGray data-[state=checked]:bg-purpleBlue data-[state=checked]:border-purpleBlue w-5 h-5 transition duration-300"
                                      onCheckedChange={checked => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              addonItem.value,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                value =>
                                                  value !== addonItem.value,
                                              ),
                                            )
                                      }}                                      
                                    />
                                    <div className="flex gap-2 justify-between items-center w-full hover:cursor-pointer">
                                      <div className="flex flex-col gap-1">
                                        <span className="text-sm lg:text-base font-medium">
                                          {addonItem.name}
                                        </span>

                                        <span className="font-normal text-xs lg:text-sm text-coolGray leading-none">
                                          {addonItem.description}
                                        </span>
                                      </div>

                                      <div className="font-normal text-sm text-purpleBlue">
                                        <span>+$</span>
                                        <span>
                                          {isRecurrencyMonthly(addonItem)}
                                        </span>
                                      </div>
                                    </div>
                                  </FormLabel>

                                  {errors.addons ? (
                                    <Alert variant="destructive">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Error</AlertTitle>
                                      <AlertDescription>
                                        {errors.addons?.message}
                                      </AlertDescription>
                                    </Alert>
                                  ) : null}
                                </Fragment>
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="flex justify-between items-center fixed lg:static bottom-0 left-0 w-full bg-white p-4 lg:p-0 lg:mt-auto">
          <Button
            type="button"
            variant="ghost"
            size="link"
            className="text-coolGray"
            onClick={() => router.push('/step-2')}
            data-cy="step-3-back"
          >
            Go back
          </Button>

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            data-cy="step-3-submit"
          >
            Next Step
          </Button>
        </div>
      </Form>
    </>
  )
}
