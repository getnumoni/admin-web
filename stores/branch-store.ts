import { BranchFormData } from '@/lib/schemas/branch-schema'
import { create } from 'zustand'

interface BranchStore {
  currentStep: number
  formData: Partial<BranchFormData>
  isOpen: boolean
  managerId: string | null

  // Actions
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<BranchFormData>) => void
  setLogo: (logo: string | null) => void
  setBusinessPhotos: (photos: string[]) => void
  setManagerPhoto: (photo: string | null) => void
  setManagerId: (id: string | null) => void
  openDialog: () => void
  closeDialog: () => void
  resetForm: () => void
  submitForm: (data: BranchFormData) => void
}

const initialFormData: Partial<BranchFormData> = {
  logo: undefined,
  branchName: '',
  branchRegion: '',
  branchState: '',
  lga: '',
  openingTime: '',
  closingTime: '',
  description: '',
  phone: '',
  email: '',
  businessPhoto: undefined,
  businessPhotos: undefined,
  address: '',
  city: '',
  state: '',
  zipCode: '',
  latitude: undefined,
  longitude: undefined,
  managerPhoto: undefined,
  managerName: '',
  managerPhone: '',
  managerEmail: '',
  website: '',
  whatsapp: '',
  linkedin: '',
  instagram: '',
  twitter: '',
  snapchat: '',
  bank: '',
  accountNumber: '',
  bankAccountName: '',
  minPayment: '',
}

export const useBranchStore = create<BranchStore>((set, get) => ({
  currentStep: 1,
  formData: initialFormData,
  isOpen: false,
  managerId: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get()
    if (currentStep < 5) {
      set({ currentStep: currentStep + 1 })
    }
  },

  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 })
    }
  },

  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  setLogo: (logo) => set((state) => ({
    formData: { ...state.formData, logo: logo || undefined }
  })),

  setBusinessPhotos: (photos) => set((state) => ({
    formData: { ...state.formData, businessPhotos: photos }
  })),

  setManagerPhoto: (photo) => set((state) => ({
    formData: { ...state.formData, managerPhoto: photo || undefined }
  })),

  setManagerId: (id) => set({ managerId: id }),

  openDialog: () => set({ isOpen: true }),

  closeDialog: () => set({ isOpen: false }),

  resetForm: () => set({
    currentStep: 1,
    formData: initialFormData,
    isOpen: false,
    managerId: null
  }),

  submitForm: (data) => {
    console.log('=== BRANCH FORM SUBMISSION ===')
    console.log('Complete Payload:', JSON.stringify(data, null, 2))
    console.log('Form Data Keys:', Object.keys(data))
    console.log('Total Fields:', Object.keys(data).length)
    console.log('==============================')

    // Here you would typically send the data to your API
    // Example API call:
    // fetch('/api/branches', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })

    get().resetForm()
  }
}))
