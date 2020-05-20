import React, { useContext, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ThemeContext from "../contexts/theme-context";

const BoardToolbar = () => {
  const { theme, themes, changeTheme } = useContext(ThemeContext);

  const menu = (
    <Menu onClick={changeTheme}>
      {themes.map((t: string) => (
        <Menu.Item key={t}>{t}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button>
        {theme} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default BoardToolbar;
