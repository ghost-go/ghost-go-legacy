import React from "react";
import { Select } from "antd";
const { Option } = Select;

export default (props: any) => {
  let menuItems = [];
  for (let i = 18; i > 0; i--) {
    menuItems.push(
      <Option key={`${i}k-${Date.now()}`} value={`${i}k`}>{`${i}k`}</Option>
    );
  }

  for (let i = 1; i < 7; i++) {
    menuItems.push(
      <Option key={`${i}d-${Date.now()}`} value={`${i}d`}>{`${i}d`}</Option>
    );
  }

  return (
    <Select
      defaultValue="18k"
      style={{ width: 100 }}
      placeholder={props.placeholder}
      value={props.rank}
      onChange={props.onChange}
    >
      {menuItems}
    </Select>
  );
};
