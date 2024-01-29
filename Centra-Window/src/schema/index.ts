import * as yup from "yup";
import { IFormInput } from "../type";

export const schema: yup.ObjectSchema<IFormInput> = yup
  .object({
    customer_number: yup.string().required("This field is required"),
    work_order_number: yup.string().required("This field is required"),
    customer_name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("This field is required"),
    phone_number: yup
      .string()
      .matches(/^\(\d{3}\)-\d{3}-\d{4}$/, "Phone number is not valid")
      .required("This field is required"),
    street_address: yup.string().required("This field is required"),
    province: yup.string().required("This field is required"),
    city: yup.string().required("This field is required"),
    postal_code: yup
      .string()
      .required("This field is required")
      .matches(/^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/, {
        message: "Invalid postal code",
      }),
    branch: yup.string().required("This field is required"),
    order_type: yup.string().required("This field is required"),
    home_depot_order: yup.string().required("This field is required"),
    lead_source: yup.string().required("This field is required"),
    estimator: yup.string().required("This field is required"),
    marketer: yup.string().required("This field is required"),
    remeasure_required: yup.string().required("This field is required"),
    delivery_zone: yup.string().required("This field is required"),
    payment_type: yup.string().required("This field is required"),
    sell_price_before_tax: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    list_price: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    deposit_value: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    discount_percent: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    commission_percent: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    windows_number: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    patio_doors_number: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    doors_number: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    sealed_units_number: yup
      .number()
      .typeError("This field must be a number")
      .integer()
      .required("This field is required"),
    others: yup.string().required("This field is required"),
    submitter_email: yup.string().email().required("This field is required"),
    clean_bc: yup.string().required("This field is required"),
    doors_saved: yup.string().required("This field is required"),
    future_opportunity: yup.string().required("This field is required"),
    alteration_drawing: yup.string().required("This field is required"),
    file: yup.mixed(),
  })
  .required();
