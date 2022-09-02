import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import Footer from "src/components/footer";
import Header from "src/components/header";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Kechirasiz, siz mavjud bo'lmagan sahifaga kirib qoldingiz !"
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Asosiy sahifaga qaytish
            </Button>
          }
        />
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
