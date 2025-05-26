import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Sample employee data
const initialEmployees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@etiraj.com",
    phone: "+1 (555) 111-2222",
    position: "Store Manager",
    hireDate: "2022-01-15",
    salary: 65000,
    permissions: ["admin", "pos", "inventory", "reports"],
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@etiraj.com",
    phone: "+1 (555) 222-3333",
    position: "Sales Associate",
    hireDate: "2022-03-10",
    salary: 42000,
    permissions: ["pos", "inventory"],
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@etiraj.com",
    phone: "+1 (555) 333-4444",
    position: "Inventory Specialist",
    hireDate: "2022-05-20",
    salary: 48000,
    permissions: ["inventory", "reports"],
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@etiraj.com",
    phone: "+1 (555) 444-5555",
    position: "Sales Associate",
    hireDate: "2022-07-05",
    salary: 42000,
    permissions: ["pos"],
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@etiraj.com",
    phone: "+1 (555) 555-6666",
    position: "Assistant Manager",
    hireDate: "2022-02-10",
    salary: 55000,
    permissions: ["pos", "inventory", "reports"],
  },
]

export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  hireDate: string
  salary: number
  permissions: string[]
}

interface EmployeesState {
  items: Employee[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: EmployeesState = {
  items: initialEmployees,
  status: "idle",
  error: null,
}

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.items.push(action.payload)
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.items.findIndex((employee) => employee.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((employee) => employee.id !== action.payload)
    },
  },
})

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions
export default employeesSlice.reducer
