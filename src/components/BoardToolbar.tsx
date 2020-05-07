import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { updateSettings } from "../common/utils";

const BoardToolbar = () => {
  const GET_FILTER_DATA = gql`
    {
      themes @client
      settings @client
    }
  `;
  const query = useQuery(GET_FILTER_DATA);
  const { themes, settings } = query.data;

  const handleTheme = (e: any) => {
    localStorage.setItem("theme", e.key);
    updateSettings({ theme: e.key });
  };

  const menu = (
    <Menu onClick={handleTheme}>
      {themes.map((t: string) => (
        <Menu.Item key={t}>{t}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button>
        {settings.theme} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default BoardToolbar;
