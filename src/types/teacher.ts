export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  department: string
  experience: number
  qualification: string
  joinDate: string
  status: "active" | "inactive"
  avatar?: string
  salary: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

export interface TeacherFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  department: string
  experience: number
  qualification: string
  joinDate: string
  status: "active" | "inactive"
  salary: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

export interface FilterOptions {
  department: string
  subject: string
  status: "all" | "active" | "inactive"
  experience: string
}
