const convertBroker = (brokerId: string) => {
  if (brokerId === "209") {
    return "유안타증권";
  } else if (brokerId === "218") {
    return "현대증권";
  } else if (brokerId === "230") {
    return "미래에셋증권";
  } else if (brokerId === "238") {
    return "대우증권";
  } else if (brokerId === "240") {
    return "삼성증권";
  } else if (brokerId === "243") {
    return "한국투자증권";
  } else if (brokerId === "247") {
    return "우리투자증권";
  } else if (brokerId === "261") {
    return "교보증권";
  } else if (brokerId === "262") {
    return "하이투자증권";
  } else if (brokerId === "263") {
    return "HMC투자증권";
  } else if (brokerId === "264") {
    return "키움증권";
  } else if (brokerId === "265") {
    return "이베스트투자증권";
  } else if (brokerId === "266") {
    return "SK증권";
  } else if (brokerId === "267") {
    return "대신증권";
  } else if (brokerId === "268") {
    return "아이엠투자증권";
  } else if (brokerId === "269") {
    return "한화투자증권";
  } else if (brokerId === "270") {
    return "하나대투자증권";
  } else if (brokerId === "279") {
    return "동부증권";
  } else if (brokerId === "280") {
    return "유진투자증권";
  } else if (brokerId === "288") {
    return "카카오페이증권";
  } else if (brokerId === "287") {
    return "메리츠종합금융증권";
  } else if (brokerId === "290") {
    return "부국증권";
  } else if (brokerId === "291") {
    return "신영증권";
  } else if (brokerId === "292") {
    return "LIG투자증권";
  } else if (brokerId === "271") {
    return "토스증권";
  }
};

const convertStatus = (status: number) => {
  if (status === 9999) {
    return "관리자확인필요";
  } else if (status === 1) {
    return "입금대기";
  } else if (status === 2) {
    return "운용중";
  } else if (status === 3) {
    return "투자중지";
  } else if (status === 4) {
    return "해지";
  }
};

export { convertBroker, convertStatus };
