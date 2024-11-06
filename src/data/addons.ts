import { IAddon } from "@/types/form";

export const addons: IAddon[] = [
  {
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: {
      monthly: 1,
      yearly: 10,
    },
    value: 'ONLINE_SERVICE',
  },
  {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: {
      monthly: 2,
      yearly: 20,
    },
    value: 'LARGER_STORAGE',
  },
  {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: {
      monthly: 2,
      yearly: 20,
    },
    value: 'CUSTOMIZABLE_PROFILE',
  },
];
