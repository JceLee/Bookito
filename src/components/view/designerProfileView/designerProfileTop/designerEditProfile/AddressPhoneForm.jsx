import React from "react";
import { Input, Form } from "antd";

export default function AddressPhoneForm() {
  const formFields = [
    { label: "Street", fieldName: "street", required: true },
    { label: "Unit", fieldName: "unit", required: false },
    { label: "City", fieldName: "city", required: true },
    { label: "Province", fieldName: "province", required: true },
    { label: "Postal Code", fieldName: "postalCode", required: false },
    { label: "Phone", fieldName: "phone", required: false },
  ];
  return (
    <div className="addressPhoneForm">
      {formFields.map((formField) => {
        return (
          <Form.Item
            key={formField.fieldName}
            name={["addressPhone", formField.fieldName]}
            className="addressPhoneFormItem"
            label={formField.label}
            rules={[{ required: formField.required }]}
          >
            <Input allowClear placeholder={formField.label} />
          </Form.Item>
        );
      })}
    </div>
  );
}
