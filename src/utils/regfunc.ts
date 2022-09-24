export const nameMask = (name: string) => {
  const nameSlice = name.split(" ");
  if (nameSlice.length === 2) return nameSlice[0] + " *";
  if (nameSlice.length === 3) return nameSlice[0] + " * " + nameSlice[2];
  if (nameSlice.length >= 4)
    return (
      nameSlice[0] +
      " " +
      "*".repeat(nameSlice.length - 2) +
      " " +
      nameSlice[nameSlice.length - 1]
    );
};

export const phoneMask = (phone: string) => {
  const sliceNum = phone.split("-");
  return sliceNum[0] + "-****-" + sliceNum[2];
};

export const dayConverter = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};
