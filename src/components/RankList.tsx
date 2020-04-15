import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

export default (props: any) => {
  let menuItems = [];
  for (let i = 18; i > 0; i--) {
    menuItems.push(<MenuItem value={`${i}k`} primaryText={`${i}k`} />);
  }

  for (let i = 1; i < 7; i++) {
    menuItems.push(<MenuItem value={`${i}d`} primaryText={`${i}d`} />);
  }

  return (
    <SelectField
      style={{ width: 100 }}
      floatingLabelText={props.floatingLabelText}
      value={props.rank}
      onChange={props.onChange}
    >
      {menuItems}
    </SelectField>
  );
};
