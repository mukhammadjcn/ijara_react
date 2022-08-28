import { Tabs } from "antd";
import React, { useState } from "react";
import ResetPassword from "./ResetPassword";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import VerifyPassword from "./VerifyPassword";
import Header from "src/components/header";
import Footer from "src/components/footer";

function LoginPage() {
  const { TabPane } = Tabs;
  const [tab, setTab] = useState("sign");
  const [phone, setPhone] = useState(null);
  const [section, setSection] = useState("resetPassword");

  return (
    <>
      <Header />
      <div className="login">
        <Tabs activeKey={tab} className="top-tabs" animated>
          {/* Sign in and up tabs */}
          <TabPane tab={null} key="sign">
            <Tabs defaultActiveKey="signIn" centered animated>
              <TabPane tab="Tizimga kirish" key="signIn">
                <SigninForm setTab={setTab} setSection={setSection} />
              </TabPane>
              <TabPane
                tab="Ro'yxatdan o'tish"
                key="signUp"
                className="singup-tab"
              >
                <SignupForm />
              </TabPane>
            </Tabs>
          </TabPane>

          {/* Password reset tabs */}
          <TabPane tab={null} key="reset" className="reset-tabs">
            <Tabs activeKey={section} className="singup-tab" animated>
              <TabPane tab={null} key="resetPassword">
                <ResetPassword
                  setTab={setTab}
                  setSection={setSection}
                  setPhone={setPhone}
                />
              </TabPane>
              <TabPane tab={null} key="confirm">
                <VerifyPassword setSection={setSection} phone={phone} />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
