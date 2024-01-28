import { IFormSettings } from "./type";

export const FormSettings: IFormSettings[] = [
  {
    section: "Customer Information",
    columns: [
      {
        rows: [
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "customer_number",
            label: "Customer Number",
            placeholder: "Ex: 123456",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "work_order_number",
            label: "Work Order #",
            placeholder: "Ex: A12032",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "customer_name",
            label: "Customer Name",
            placeholder: "Ex: John Smith",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "email",
            label: "Email",
            placeholder: "Ex:",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "phone_number",
            label: "Phone Number",
            placeholder: "Ex: 604-123-4567",
          },
        ],
      },
      {
        rows: [
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "street_address",
            label: "Street Address",
            placeholder: "Ex: 123 Main St",
          },

          {
            type: "text",
            rules: {
              required: true,
            },
            name: "province",
            label: " Province",
            placeholder: "Ex: BC",
          },

          {
            type: "text",
            rules: {
              required: true,
            },
            name: "city",
            label: "City",
            placeholder: "Ex: Langley",
          },

          {
            type: "text",
            name: "postal_code",
            label: "Postal Code",
            rules: {
              required: true,
            },
            placeholder: "Ex: A1A1A1",
          },
        ],
      },
    ],
  },
  {
    section: "Order Details",
    columns: [
      {
        rows: [
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "branch",
            label: "Branch",
            options: [
              {
                label: "Select Branch",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Branch 1", value: "1" },
              { label: "Branch 2", value: "2" },
            ],
          },
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "order_type",
            label: "Order Type",
            options: [
              {
                label: "Supply & Install",
                value: "supply_and_install",
                disabled: true,
                selected: true,
              },
              { label: "Supply", value: "supply" },
            ],
          },
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "home_depot_order",
            label: "Home Depot Order",
            options: [
              {
                label: "Select Option",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "lead_source",
            label: "Lead Source",
            placeholder: "Lead Name",
          },
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "estimator",
            label: "Estimator",
            options: [
              {
                label: "Select Estimator",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "marketer",
            label: "Marketer",
            placeholder: "Marketer Name",
          },
        ],
      },
      {
        rows: [
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "remeasure_required",
            label: "Remesure Required?",
            options: [
              {
                label: "Yes",
                value: "Yes",
                disabled: true,
                selected: true,
              },
              { label: "No", value: "No" },
            ],
          },
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "delivery_zone",
            label: "Delivery Zone",
            options: [
              {
                label: "Select Deliver Zone",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "payment_type",
            label: "Payment Type",
            options: [
              {
                label: "Select Payment Type",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "sell_price_before_tax",
            label: "Sell Price (Before Tax)",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "list_price",
            label: "List Price",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "deposit_value",
            label: "Deposit Value",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "discount_percent",
            label: "Discount %",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "commission_percent",
            label: "Commission %",
            placeholder: "0",
          },
        ],
      },
    ],
  },
  {
    section: "Product Summary",
    columns: [
      {
        rows: [
          {
            type: "number",
            rules: {
              required: true,
            },
            name: "windows_number",
            label: "Windows",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "patio_doors_number",
            label: "Patio Doors",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "doors_number",
            label: "Doors",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "sealed_units_number",
            label: "Sealed Units",
            placeholder: "0",
          },
          {
            type: "text",
            rules: {
              required: true,
            },
            name: "others",
            label: "Others",
            placeholder: "0",
          },
          {
            type: "email",
            rules: {
              required: true,
            },
            name: "submitter_email",
            label: "Submitter Email",
            placeholder: "Ex: hello@gmail.com",
          },
        ],
      },
      {
        rows: [
          {
            type: "select",
            rules: {
              required: true,
            },
            name: "clean_bc",
            label: "CleanBC IQP Code Required Before Ordering Products?",
            options: [
              {
                label: "Select Option",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },

          {
            type: "select",
            rules: {
              required: true,
            },
            name: "doors_saved",
            label: "Doors Saved in Codel Programs?",
            options: [
              {
                label: "N/A",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
            ],
          },

          {
            type: "select",
            rules: {
              required: true,
            },
            name: "future_opportunity",
            label: "Was A Future Opportunity Created?",
            options: [
              {
                label: "Select Option",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },

          {
            type: "select",
            rules: {
              required: true,
            },
            name: "alteration_drawing",
            label: "Alteration Drawing & Price Breakdown Submitted?",
            options: [
              {
                label: "Select Option",
                value: "",
                disabled: true,
                selected: true,
              },
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          },
        ],
      },
    ],
  },
  {
    section: "Attachments",
    columns: [],
  },
];
