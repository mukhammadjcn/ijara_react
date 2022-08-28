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
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back Home
            </Button>
          }
        />
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
