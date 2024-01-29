/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

export interface IFormInput {
  //Customer Information
  customer_number: string;
  work_order_number: string;
  customer_name: string;
  email: string;
  phone_number: string;
  street_address: string;
  province: string;
  city: string;
  postal_code: string;
  // Order Details
  branch: string;
  order_type: string;
  home_depot_order: string;
  lead_source: string;
  estimator: string;
  marketer: string;
  remeasure_required: string;
  delivery_zone: string;
  payment_type: string;
  sell_price_before_tax: number;
  list_price: number;
  deposit_value: number;
  discount_percent: number;
  commission_percent: number;
  // Product Summary
  windows_number: number;
  patio_doors_number: number;
  doors_number: number;
  sealed_units_number: number;
  others: string;
  submitter_email: string;
  clean_bc: string;
  doors_saved: string;
  future_opportunity: string;
  alteration_drawing: string;
  //Attachments
  file?: FileList | null;
}

export interface ISelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface IChildForm {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: ISelectOption[];
  rules: IInputRules;
}

export interface IFormSettings {
  section: string;
  columns: {
    rows: IChildForm[];
  }[];
}

export interface IFormSection extends IFormSettings {
  register: UseFormRegister<IFormInput>;
  errors?: any;
}

export interface ICustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rules: IInputRules;
  placeholder?: string;
  type: string;
  name: string;
  register: UseFormRegister<IFormInput>;
  error: any;
}

export interface ICustomSelectProps {
  label: string;
  rules: IInputRules;
  name: string;
  options: ISelectOption[];
  register: UseFormRegister<IFormInput>;
  error: any;
}

export interface IInputRules {
  required: boolean;
  pattern?: RegExp;
  message?: string;
}
