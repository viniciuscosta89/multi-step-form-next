import { AdvancedIcon, ArcadeIcon, ProIcon } from '@/components/Icons'
import type { IPlanCategory } from '@/types/form'

export const planCategories: IPlanCategory[] = [
  {
    icon: <ArcadeIcon />,
    label: 'Arcade',
    price: {
      monthly: 9,
      yearly: 90,
    },
    value: 'ARCADE',
  },
  {
    icon: <AdvancedIcon />,
    label: 'Advanced',
    price: {
      monthly: 12,
      yearly: 120,
    },
    value: 'ADVANCED',
  },
  {
    icon: <ProIcon />,
    label: 'Pro',
    price: {
      monthly: 15,
      yearly: 150,
    },
    value: 'PRO',
  },
]
