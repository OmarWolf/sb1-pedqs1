export interface UserFormData {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VerificationData {
  emailCode: string;
  phoneCode: string;
}