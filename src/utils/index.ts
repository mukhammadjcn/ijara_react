import { message } from "antd";
import { ACCESS, REFRESH, ROLE } from "../server/Host";

// Catch all error
export const CatchError = async (error: any) => {
  if (typeof window !== "undefined") {
    if (error.response) {
      let obj = error.response.data;
      if (error.response.status === 401) {
        if (
          obj?.detail == "No active account found with the given credentials"
        ) {
          message.error("Parolingiz xato, qaytadan kiriting !");
        } else {
          localStorage.removeItem(ACCESS);
          localStorage.removeItem(REFRESH);
          localStorage.removeItem(ROLE);
          window.location.href = "/";
        }
      } else {
        if (obj?.code == "token_not_valid") {
          localStorage.removeItem(ROLE);
          localStorage.removeItem(ACCESS);
          localStorage.removeItem(REFRESH);
          message.info("Kirish vaqti tugadi, qaytadan kiring !");
          await new Promise((r: any) => setTimeout(r, 2000));
          window.location.href = "/";
        } else {
          for (let key in obj) {
            if (key !== "status") {
              if (obj[key] === "Not found.") {
                message.warning(
                  `Sizning raqamingiz bazada yo'q. Iltimos ro'yhatdan o'ting !`
                );
              } else {
                if (key === "error") {
                  message.error(obj.error.detail);
                }
                if (obj[key].length > 0 && typeof obj[key] === "string") {
                  message.error(obj[key]);
                }
                if (Array.isArray(obj[key])) {
                  obj[key]?.forEach((item: any) => {
                    item.length > 0 && message.error(item);
                  });
                }
              }
            }
          }
        }
      }
    }
  }
};

// Pretty date
export const prettyDate = (time = "29-10-2022 15:20:38") => {
  const date = new Date(time);
  const monthes: { [id: number]: string } = {
    0: "Yanvar",
    1: "Fevral",
    2: "Mart",
    3: "Aprel",
    4: "May",
    5: "Iyun",
    6: "Iyul",
    7: "Avgust",
    8: "Sentyabr",
    9: "Oktyabr",
    10: "Noyabr",
    11: "Dekabr",
  };
  return `${date.getDate()} ${monthes[date.getMonth()]}, ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;
};

// Pretty phone
export const PrettyPhone = (phone: string) => {
  return `998${phone.replace("(", "").replace(")", "").replaceAll(" ", "")}`;
};
