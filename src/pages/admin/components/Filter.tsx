import { Select } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../../router/Router";

const { Option } = Select;

const Filter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filtersParams = [
    searchParams.get("at") || "",
    searchParams.get("af") || "",
    searchParams.get("st") || "",
    searchParams.get("sf") || "",
  ];

  const FILTERS = {
    is_active_true: "활성화된 사용자만 보기",
    is_active_false: "활성화되지 않은 사용자만 보기",
    is_staff_true: "임직원인 사용자만만 보기",
    is_staff_false: "임직원이 아닌 사용자만 보기",
  };

  const getFilterQuery = (filters: string[]) => {
    const is_active_true = filters.some((e) => e === FILTERS.is_active_true)
      ? "&at=on"
      : "";
    const is_active_false = filters.some((e) => e === FILTERS.is_active_false)
      ? "&af=on"
      : "";
    const is_staff_true = filters.some((e) => e === FILTERS.is_staff_true)
      ? "&st=on"
      : "";
    const is_staff_false = filters.some((e) => e === FILTERS.is_staff_false)
      ? "&sf=on"
      : "";
    return is_active_true + is_active_false + is_staff_true + is_staff_false;
  };

  const onFilter = (value: string[]) => {
    navigate(`${PATH.FILTER_USER_LIST()}?${getFilterQuery(value)}`);
  };

  const defaultValue = filtersParams.reduce<string[]>((acc, cur, i) => {
    const getValue = (cur: string) =>
      i === 0 && cur === "on"
        ? FILTERS.is_active_true
        : i === 1 && cur === "on"
        ? FILTERS.is_active_false
        : i === 2 && cur === "on"
        ? FILTERS.is_staff_true
        : i === 3 && cur === "on"
        ? FILTERS.is_staff_false
        : "";
    return getValue(cur).length ? [...acc, getValue(cur)] : [...acc];
  }, []);

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="조건 필터링"
      onChange={onFilter}
      defaultValue={defaultValue}
    >
      <Option value={FILTERS.is_active_true}>{FILTERS.is_active_true}</Option>
      <Option value={FILTERS.is_active_false}>{FILTERS.is_active_false}</Option>
      <Option value={FILTERS.is_staff_true}>{FILTERS.is_staff_true}</Option>
      <Option value={FILTERS.is_staff_false}>{FILTERS.is_staff_false}</Option>
    </Select>
  );
};

export default Filter;
