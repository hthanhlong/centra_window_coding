import { IsEmail, Length } from "class-validator";

export class FormInputDto {
  //Customer Information
  @Length(1, 64)
  customer_number: string;

  @Length(1, 64)
  work_order_number: string;

  @Length(1, 64)
  customer_name: string;

  @Length(1, 64)
  @IsEmail()
  email: string;

  @Length(1, 64)
  phone_number: string;

  @Length(1, 64)
  street_address: string;

  @Length(1, 64)
  province: string;

  @Length(1, 64)
  city: string;

  @Length(1, 64)
  postal_code: string;

  // Order Details
  @Length(1, 64)
  branch: string;

  @Length(1, 64)
  order_type: string;

  @Length(1, 64)
  home_depot_order: string;

  @Length(1, 64)
  lead_source: string;

  @Length(1, 64)
  estimator: string;

  @Length(1, 64)
  marketer: string;

  @Length(1, 64)
  remeasure_required: string;

  @Length(1, 64)
  delivery_zone: string;

  @Length(1, 64)
  payment_type: string;

  @Length(1, 64)
  sell_price_before_tax: string;

  @Length(1, 64)
  list_price: string;

  @Length(1, 64)
  deposit_value: string;

  @Length(1, 64)
  discount_percent: string;

  @Length(1, 64)
  commission_percent: string;

  // Product Summary
  @Length(1, 64)
  windows_number: string;

  @Length(1, 64)
  patio_doors_number: string;

  @Length(1, 64)
  doors_number: string;

  @Length(1, 64)
  sealed_units_number: string;

  @Length(1, 64)
  others: string;

  @Length(1, 64)
  submitter_email: string;

  @Length(1, 64)
  clean_bc: string;

  @Length(1, 64)
  doors_saved: string;

  @Length(1, 64)
  future_opportunity: string;

  @Length(1, 64)
  alteration_drawing: string;
}
