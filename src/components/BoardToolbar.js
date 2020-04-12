import React from "react";

import { gql, useQuery } from "@apollo/client";
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

  const handleTheme = (e) => {
    localStorage.setItem("theme", e.target.value);
    updateSettings([
      {
        name: "theme",
        value: e.target.value,
      },
    ]);
  };

  return (
    <div className={`board-toolbar`}>
      <div className="section">
        <select
          className="form-control"
          onChange={handleTheme}
          defaultValue={settings.theme}
        >
          {themes.map((t) => (
            <option>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BoardToolbar;
