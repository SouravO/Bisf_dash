export interface FormData {
  name: string;
  phone: string;
  email: string;
  place: string;
  city: string;
  is_interested: boolean | null;
  ecosystem: boolean | null;
}

export interface StepProps {
  formData: FormData;
  updateData: (data: Partial<FormData>) => void;
}