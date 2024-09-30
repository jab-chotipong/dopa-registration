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
    default:
      return "กรุณากรอกข้อมูลให้ถูกต้อง";
  }
};
