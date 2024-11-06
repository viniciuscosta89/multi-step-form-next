'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const steps = [
  {
    label: 'Your info',
    number: 1,
    url: '/',
  },
  {
    label: 'Select plan',
    number: 2,
    url: '/step-2',
  },
  {
    label: 'Add-ons',
    number: 3,
    url: '/step-3',
  },
  {
    label: 'Summary',
    number: 4,
    url: '/step-4',
  },
]

const activeClasses = 'bg-pastelBlue text-primary border-pastelBlue'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-[url('/images/bg-sidebar-mobile.svg')] lg:bg-[url('/images/bg-sidebar-desktop.svg')] bg-bottom lg:bg-top bg-no-repeat bg-cover lg:rounded-lg py-10 px-8 text-white min-h-[172px]">
      <div>
        <ul className="flex lg:flex-col gap-4 lg:gap-8 justify-center">
          {steps.map(({ label, number, url }) => (
            <li key={label}>
              <Link href={url} className="flex gap-4 items-center group">
                <span
                  className={`w-8 h-8 flex items-center justify-center font-bold text-sm rounded-full border-[1px] transition duration-300 ease-in-out group-hover:bg-pastelBlue group-hover:text-primary group-hover:border-pastelBlue ${
                    pathname === url ? activeClasses : 'border-white'
                  }`}
                >
                  {number}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="hidden lg:block text-lightBlue text-xs uppercase">
                    Step {number}
                  </span>
                  <span className="hidden lg:block text-sm font-bold uppercase">
                    {label}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
