export interface IFormData {
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
  sell_price_before_tax: string;
  list_price: string;
  deposit_value: string;
  discount_percent: string;
  commission_percent: string;
  // Product Summary
  windows_number: string;
  patio_doors_number: string;
  doors_number: string;
  sealed_units_number: string;
  others: string;
  submitter_email: string;
  clean_bc: string;
  doors_saved: string;
  future_opportunity: string;
  alteration_drawing: string;
  //Attachments
  file?: FileList | null;
}

export interface Attachments {
  filename: string;
  path: string;
  contentType: string;
  cid?: string;
}
