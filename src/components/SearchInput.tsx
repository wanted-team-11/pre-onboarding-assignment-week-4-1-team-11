import { Input, Space } from "antd";
import React from "react";

const { Search } = Input;

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => (
  <Space direction="vertical">
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
  </Space>
);

export default SearchInput;
