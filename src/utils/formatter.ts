/**
 * @param account "298365426221"
 * @returns "29********21"
 */
export const maskAccount = (account: string) => {
  const firstTwo = [account[0], account[1]];
  const lastTwo = [account[account.length - 2], account[account.length - 1]];
  const stars = new Array(account.length - 4).fill("*");
  const splitted = [...firstTwo, ...stars, ...lastTwo];
  const result = splitted.join("");
  return result;
};

/**
 *
 * @param format "00-000000000-0"
 * @param account "298365426221"
 * @returns '29-836542622-1'
 */
export const accountFormatter = (format: string, account: string) => {
  const splittedFormat = format.split("");
  const splittedAccount = account.split("");
  for (let i = 0; i < splittedFormat.length; i++) {
    if (splittedAccount.length === 0) break;

    if (splittedFormat[i] !== "-") {
      splittedFormat[i] = splittedAccount.shift() ?? splittedFormat[i];
    }
  }

  const result = splittedFormat.join("");
  return result;
};

/**
 * @param name "홍길동"
 * @returns "홍\*동"
 * - 홍\*
 * - 홍\*동
 * - 홍\**동
 * - 홍\***동
 * - ...
 */
export const userNameFormatter = (name: string) => {
  const splittedName = name.split("");
  for (let i = 1; i < splittedName.length; i++) {
    splittedName[i] = "*";
    if (splittedName.length - i <= 2) break;
  }
  const result = splittedName.join("");
  return result;
};

/**
 * @param phoneNumber "010-1111-2222"
 * @returns "010-****-2222"
 */
export const phoneNumberFormatter = (phoneNumber: string) => {
  const splitted = phoneNumber.split("");
  splitted.splice(4, 4, "****");
  const result = splitted.join("");
  return result;
};
