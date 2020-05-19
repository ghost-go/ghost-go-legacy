import React, { useContext, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import ThemeContext from "../contexts/theme-context";

const BoardToolbar = () => {
  const themeContext = useContext(ThemeContext);

  const handleTheme = (e: any) => {
    themeContext.changeTheme(e.key);
  };

  const menu = (
    <Menu onClick={handleTheme}>
      {themeContext.themes.map((t: string) => (
        <Menu.Item key={t}>{t}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button>
        {themeContext.theme} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default BoardToolbar;
