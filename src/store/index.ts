import type { FormSchema } from '@/types/form';
import { create } from 'zustand';

interface FormState {
  formState: FormSchema;
  updateFormState: (newData: FormSchema) => void;
}

const useStore = create<FormState>()(set => ({
  formState: {
    name: '',
    email: '',
    phone: '',
    plan: {
      category: 'ARCADE',
      recurrency: 'MONTHLY',
    },
    addons: [],
  },
  updateFormState: (newData: FormSchema) => {    
    return set((state: FormState) => ({
      formState: {
        ...state.formState,
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        plan: {
          ...state.formState.plan,
          category: newData.plan.category,
          recurrency: newData.plan.recurrency,
        },
        addons: [...newData.addons],
      },
    }));
  },
}));

export { useStore };
