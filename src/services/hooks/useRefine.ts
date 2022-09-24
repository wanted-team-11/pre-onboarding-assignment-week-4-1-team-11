import brokers from "../static/brokers.json";
import brokerFormat from "../static/brokerFormat.json";
import accountStatus from "../static/accountStatus.json";
import {
  AccountStatusKeyType,
  BrokerFormatType,
  BrokerKeyType,
} from "../models/statics";

const useRefine = () => {
  const refineName = (name?: string) => {
    return name
      ? name
          .split("")
          .map((e, i) =>
            i === 0 || (name.length !== 2 && i === name.length - 1) ? e : "*"
          )
          .join("")
      : "";
  };

  const refineDate = (date?: string) => {
    const dateObj = new Date(date || "");
    const yyyy = dateObj.getFullYear();
    const mm = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const dd = dateObj.getDate().toString().padStart(2, "0");
    return date ? `${yyyy}-${mm}-${dd}` : "";
  };

  const refineAccountNumberFormat = (
    accountNumber: string | undefined,
    id: BrokerFormatType
  ) => {
    if (accountNumber === undefined) return "--";
    const accountFormat = brokerFormat[id];
    const splitAccountFormat = accountFormat.split("");
    const splitAccountNumber = accountNumber.split("");

    for (let i = 0; i < splitAccountFormat.length; i++) {
      if (splitAccountNumber.length === 0) break;
      if (splitAccountFormat[i] !== "-") {
        splitAccountFormat[i] = splitAccountNumber.shift() ?? "";
      }
    }
    const result = splitAccountFormat.join("");
    return result;
  };

  const refineAccountNumberMask = (accountNumber?: string) => {
    if (accountNumber === undefined) return undefined;
    return (
      accountNumber.slice(0, 2) +
      "*".repeat(accountNumber.length - 4) +
      accountNumber.slice(-2)
    );
  };

  const refineTel = (tel?: string) => {
    return tel
      ? tel
          .split("-")
          .map((e, i) => (i === 1 ? e.replaceAll(/\d/g, "*") : e))
          .join("-")
      : "";
  };

  const refineBrokerId = (id: BrokerKeyType) => {
    return brokers[id];
  };

  const refineAccountStatus = (status: AccountStatusKeyType) => {
    return accountStatus[status];
  };

  const refineMoney = (money: string) => {
    return parseInt(money).toLocaleString();
  };

  const refineIsActive = (is_active: boolean) => {
    return is_active ? "O" : "X";
  };

  return {
    refineName,
    refineAccountNumberFormat,
    refineAccountNumberMask,
    refineDate,
    refineTel,
    refineBrokerId,
    refineAccountStatus,
    refineMoney,
    refineIsActive,
  };
};

export default useRefine;
