export const handleErrors = (type: any, options: any = {}) => {
  switch (type) {
    case "required":
      return "กรุณากรอกข้อมูล";
    case "minLength":
      return `ขั้นต่ำ 8 ตัวอักษร`;
    case "invalid":
      return "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    case "duplicated":
      return "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว";
    case "tryAgain":
      return "กรุณาลองใหม่อีกครั้ง";
    case "notMatch":
      return "รหัสผ่านไม่ตรงกัน";
    default:
      return "กรุณากรอกข้อมูลให้ถูกต้อง";
  }
};

export const handleFormType = (type: string) => {
  switch (type) {
    case "first-time":
      return "ขอมีบัตรครั้งแรก";
    case "new-card":
      return "ขอบัตรใหม่";
    case "change-card":
      return "ขอเปลี่ยนบัตร";
    default:
      return "-";
  }
};

export const handleStatus = (status: string) => {
  switch (status) {
    case "submit":
      return "คำร้องใหม่";
    case "re-submit":
      return "ขอข้อมูลเพิ่มเติม";
    case "waiting-print":
      return "อยู่ระหว่างรอพิมพ์";
    case "deliveried":
      return "จัดส่งแล้ว";
    case "reject":
      return "ปฏิเสธคำร้อง";
    case "expired":
      return "หมดอายุ";
    default:
      return "-";
  }
};

export const formatSearchDate = (date: any) => {
  if (!date || !date.startDate || !date.endDate) return null;
  return {
    startDate: date.startDate.toISOString().split("T")[0] + "T00:00:00",
    endDate: date.endDate.toISOString().split("T")[0] + "T23:59:59",
  };
};
