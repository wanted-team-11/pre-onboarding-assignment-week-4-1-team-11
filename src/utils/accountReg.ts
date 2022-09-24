export const accountReg = (format: string, account: string) => {
  const splittedFormat = format.split("");
  const splittedAccount = account.split("");
  for (let i = 0; i < splittedFormat.length; i++) {
    if (splittedAccount.length === 0) break;

    if (splittedFormat[i] !== "-") {
      splittedFormat[i] = splittedAccount.shift() ?? "";
    }
  }

  const result = splittedFormat.join("");
  return result;
};

export const accountMask = (account: string) => {
  return (
    account.slice(0, 2) + "*".repeat(account.length - 4) + account.slice(-2)
  );
};
