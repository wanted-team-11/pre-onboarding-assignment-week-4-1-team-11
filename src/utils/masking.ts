const maskingName = (name: string) => {
  if (name === "관리자") {
    return "관리자";
  } else {
    return (
      name.substring(0, 1) +
      "*".repeat(name.length - 2) +
      name.substring(name.length - 1, name.length)
    );
  }
};

const maskingPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber)
    return (
      phoneNumber.substring(0, 3) +
      "-****-" +
      phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length)
    );
};

const maskingAccountNumber = (acccountNumber: string) => {
  return (
    acccountNumber.substring(0, 2) +
    "*".repeat(acccountNumber.length - 4) +
    acccountNumber.substring(acccountNumber.length - 2, acccountNumber.length)
  );
};

export { maskingName, maskingPhoneNumber, maskingAccountNumber };
