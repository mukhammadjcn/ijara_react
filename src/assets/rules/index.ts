export const phone = [
  {
    required: true,
    message: "Telifon raqamni kiriting!",
  },
  {
    validator: (_: any, value: any) =>
      Number(value)
        ? Promise.resolve()
        : Promise.reject(new Error("Iltimos faqat son kiriting !")),
  },
  {
    min: 9,
    max: 9,
    message: "Iltimos raqamni to'liq kiriting",
  },
];
export const phoneMask = [
  { required: true, message: "Iltimos telifon raqamni kiriting !" },
  {
    pattern: /^\(\d{2}\)-\d{3}-\d{2}-\d{2}$/,
    message: "Iltimos raqamni (XX)-XXX-XX-XX formatda kiriting !",
  },
];

export const passport_date = [
  {
    required: true,
    message: "Pasport berilgan sanani kiriting!",
  },
];

export const jshshr = [
  { required: true, message: "Iltimos JSHSHIR ni kiriting !" },
  {
    pattern: /^\d{14}$/,
    message: "JSHSHIR 14 raqamdan iborat !",
  },
];

export const appelatsiya = [
  {
    required: true,
    message: "Iltimos maydonni to'ldiring !",
  },
  {
    min: 10,
    message: "Kamida 10 ta har bo'lishi kerak",
  },
];

export const otm = [
  {
    required: true,
    message: "Iltimos OTM nomi tanlang !",
  },
];

export const yonalish = [
  {
    required: true,
    message: "Iltimos OTM yo'nalishini tanlang !",
  },
];

export const lang = [
  {
    required: true,
    message: "Iltimos yo'nalish tilini tanlang !",
  },
];

export const turi = [
  {
    required: true,
    message: "Iltimos yo'nalish shaklini tanlang !",
  },
];
