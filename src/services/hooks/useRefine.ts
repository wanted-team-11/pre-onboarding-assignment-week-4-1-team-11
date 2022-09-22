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

  const refineTel = (tel?: string) => {
    return tel
      ? tel
          .split("-")
          .map((e, i) => (i === 1 ? e.replaceAll(/\d/g, "*") : e))
          .join("-")
      : "";
  };

  return { refineName, refineDate, refineTel };
};

export default useRefine;
