export interface IFormData {
  //Customer Information
  customer_string: string;
  work_order_string: string;
  work_order_number: string;
  customer_name: string;
  email: string;
  phone_string: string;
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
  windows_string: string;
  patio_doors_string: string;
  doors_string: string;
  sealed_units_string: string;
  others: string;
  submitter_email: string;
  clean_bc: string;
  doors_saved: string;
  future_opportunity: string;
  alteration_drawing: string;
  //Attachments
  file?: FileList | null;
}
