'use client'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input as InputShad } from '@/components/ui/input'
import type { InputHTMLAttributes } from 'react'
import { useHookFormMask, withMask } from 'use-mask-input';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
  placeholder: string
  mask?: string
}

export default function Input({
  id,
  label,
  error,
  placeholder,
  mask,
  ...props
}: InputProps) {
  return (
    <FormItem className="flex flex-col gap-1 lg:gap-2">
      <div className="flex justify-between">
        <FormLabel data-cy={`${id}-label`} className="text-xs lg:text-base font-normal">
          {label}
        </FormLabel>

        <FormDescription
          className={`text-red-400 text-sm transition duration-300 h-5 ${
            error ? 'opacity' : 'opacity-0'
          }`}
          data-cy={`${id}-error`}
        >
          {error || ''}
        </FormDescription>
      </div>
      <FormControl>
        <InputShad
          data-cy={id}
          className={`border border-[#D6D9E6] rounded-lg px-4 py-3 h-auto focus:border-purpleBlue duration-300 text-primary font-medium placeholder:text-coolGray ${
            error && 'border-strawberryRed'
          }`}
          placeholder={placeholder}
          {...props}
          ref={mask && withMask(mask)}
        />
      </FormControl>
    </FormItem>
  )
}
