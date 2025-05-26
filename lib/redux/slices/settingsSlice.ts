import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
  businessName: string
  address: string
  phone: string
  email: string
  taxRate: number
  currency: string
  theme: "light" | "dark" | "system"
  receiptFooter: string
  logoUrl: string
  profileImage: string | null
  userProfile: {
    firstName: string
    lastName: string
    email: string
    phone: string
    bio: string
    avatar: string | null
  }
}

const initialState: SettingsState = {
  businessName: "Etiraj Store",
  address: "123 Main Street, Suite 101, Anytown, USA",
  phone: "+1 (555) 123-4567",
  email: "info@etiraj.com",
  taxRate: 7.5,
  currency: "USD",
  theme: "system",
  receiptFooter: "Thank you for shopping with us!",
  logoUrl: "",
  profileImage: null,
  userProfile: {
    firstName: "Admin",
    lastName: "User",
    email: "admin@etiraj.com",
    phone: "+1 (555) 123-4567",
    bio: "",
    avatar: null,
  },
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    updateProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload
    },
    updateUserProfile: (state, action: PayloadAction<Partial<SettingsState["userProfile"]>>) => {
      state.userProfile = { ...state.userProfile, ...action.payload }
    },
  },
})

export const { updateSettings, setTheme, updateProfileImage, updateUserProfile } = settingsSlice.actions
export default settingsSlice.reducer
