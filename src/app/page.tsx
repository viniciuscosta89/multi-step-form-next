import StepOne from '@/components/Pages/step-1'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Step 1 | Multi-step Form',
}

export default function Home() {
  return <StepOne />
}
