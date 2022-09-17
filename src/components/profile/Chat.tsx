import { Statistic } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackSVG, DeleteSVG } from "src/assets/icons";
import {
  ChatIDConfig,
  ChatFromChatConfig,
  MyChatsConfig,
} from "src/server/config/Urls";
import { prettyDate } from "src/utils/index";

function Chat() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const secretInput = useRef<HTMLInputElement>(null);
  const [advert, setAdvert] = useState<any>({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleMakeParams = (key: any, value: any) => {
    if (value) {
      if (searchParams.has(key)) searchParams.set(key, value);
      else searchParams.append(key, value);
    } else searchParams.delete(key);
    setSearchParams(searchParams);
  };
  const handleChat = (id: any, user_id: any) => {
    handleMakeParams("chat_id", id);
    handleMakeParams("user_id", user_id);
    ScrollToBottom();
  };
  const GetMessages = async () => {
    if (searchParams.get("chat_id")) {
      const { data } = await ChatIDConfig(searchParams.get("chat_id"));
      setAdvert(data.ad_detail);

      let newMessages = [];
      let date = prettyDate(data.messages[0].updated_at, false);
      for (let message of data.messages) {
        if (date !== prettyDate(message.updated_at, false)) {
          newMessages.unshift({ is_own: "day", day: date });
          date = prettyDate(message.updated_at, false);
        }
        newMessages.unshift(message);
      }

      newMessages.unshift({
        is_own: "day",
        day: prettyDate(
          data.messages[data.messages.length - 1].updated_at,
          false
        ),
      });
      setMessages(newMessages);
    }
  };
  const SendMessage = async () => {
    if (message.trim().length > 0) {
      await ChatFromChatConfig({
        chat: searchParams.get("chat_id"),
        to_user: searchParams.get("user_id"),
        message: message.trim(),
      });
    }
    GetUsers();
    GetMessages();
    setMessage("");
    ScrollToBottom();
  };
  const ScrollToBottom = () => {
    secretInput.current?.focus();
  };
  const GetUsers = async () => {
    const { data } = await MyChatsConfig();
    setUsers(data);
  };

  useEffect(() => {
    GetUsers();
    ScrollToBottom();
  }, []);

  useEffect(() => {
    GetMessages();
  }, [searchParams]);

  return (
    <div
      className={
        searchParams.get("chat_id")
          ? "profile__chat profile__chatmobile"
          : "profile__chat"
      }
    >
      <div className="profile__chat--sidebar">
        <h2>Yozishmalar</h2>
        <div className="box">
          {users.map((user: any) => (
            <div
              className={
                searchParams.get("chat_id") == user.id
                  ? "user user__active"
                  : "user"
              }
              key={user.id}
              onClick={() => handleChat(user.id, user.user.id)}
            >
              <div className="user__img">
                <div>
                  {user.user.name.slice(0, 1) ||
                    String(user.user.id).slice(0, 1)}
                </div>
                {new Date().getTime() - new Date(user.updated_at).getTime() <
                  3600000 && <span></span>}
              </div>
              <div className="user__info">
                <div className="flex">
                  <h2>{user.user.name || user.user.id}</h2>
                  <p>
                    {new Date(user.updated_at).getHours()}:
                    {new Date(user.updated_at).getMinutes()}
                  </p>
                </div>
                <p className="info__mobile">
                  {user.last_message.length <= 36
                    ? user.last_message
                    : `${user.last_message.slice(0, 36)}...`}
                </p>
                <p className="info__desktop">
                  {user.last_message.length <= 24
                    ? user.last_message
                    : `${user.last_message.slice(0, 24)}...`}
                </p>
                {user.have_unread_messages && <div className="badge"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {searchParams.get("chat_id") ? (
        <div className="profile__chat--main">
          <div className="profile__chat--name">
            <div className="profile__chat--name-user">
              <div onClick={() => handleChat("", "")} style={{ height: 24 }}>
                <BackSVG />
              </div>
              <span>{searchParams.get("user_id")?.slice(0, 1)}</span>
              <div>
                <h2>{searchParams.get("user_id")}</h2>
                {new Date().getTime() -
                  new Date(
                    messages.findLast(
                      (elem: any) => elem.is_own == false
                    )?.updated_at
                  ).getTime() <
                3600000 ? (
                  <span>online</span>
                ) : (
                  <span>
                    {prettyDate(messages[messages.length - 1]?.updated_at)}
                  </span>
                )}
              </div>
            </div>
            <DeleteSVG />
          </div>
          <div
            className="profile__chat--advert"
            onClick={() => navigate(`/search/${advert.deep_link}`)}
          >
            <img src={advert.image1} alt="" />
            <div>
              <h2>
                Ijaraga {advert.number_of_rooms}-xonali kvartira,{" "}
                {advert.full_area} м²
              </h2>
              <div className="flex">
                <span>
                  {" "}
                  <Statistic
                    title=""
                    groupSeparator={" "}
                    value={advert.cost_per_month}
                    style={{ display: "inline-block" }}
                  />{" "}
                  so‘m
                </span>
                <b>ID {searchParams.get("user_id")}</b>
              </div>
            </div>
          </div>
          <div className="profile__chat--chat" id="messages">
            {messages.map((item: any, index: number) =>
              item.is_own == true ? (
                <div className="message message-own" key={index}>
                  {item.message}
                  <span className="date">
                    {new Date(item.updated_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ) : item.is_own == false ? (
                <div className="message" key={index}>
                  {item.message}
                  <span className="date">
                    {new Date(item.updated_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ) : (
                <div className="day" key={index}>
                  {item.day}
                </div>
              )
            )}
            <input type="text" className="secret" ref={secretInput} />
          </div>
          <div className="profile__chat--input">
            <input
              value={message}
              type="text"
              placeholder="Xabaringizni yozing"
              onChange={(val) => setMessage(val.target.value)}
              onKeyDown={(val) =>
                val.key == "Enter" && val.ctrlKey && SendMessage()
              }
            />
            <button onClick={SendMessage}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.72113 2.05149L18.0756 9.61746C18.3233 9.73952 18.4252 10.0393 18.3031 10.287C18.2544 10.3858 18.1744 10.4658 18.0756 10.5145L2.72144 18.0803C2.47374 18.2023 2.17399 18.1005 2.05193 17.8528C1.99856 17.7445 1.98619 17.6205 2.0171 17.5038L3.9858 10.0701L2.01676 2.62789C1.94612 2.36093 2.10528 2.08726 2.37224 2.01663C2.48893 1.98576 2.61285 1.99814 2.72113 2.05149ZM3.26445 3.43403L4.87357 9.51612L4.93555 9.50412L5 9.5H12C12.2761 9.5 12.5 9.72386 12.5 10C12.5 10.2455 12.3231 10.4496 12.0899 10.4919L12 10.5H5C4.9686 10.5 4.93787 10.4971 4.90807 10.4916L3.26508 16.6976L16.7234 10.066L3.26445 3.43403Z"
                  fill="#252A31"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="profile__chat--main"></div>
      )}
    </div>
  );
}

export default Chat;
