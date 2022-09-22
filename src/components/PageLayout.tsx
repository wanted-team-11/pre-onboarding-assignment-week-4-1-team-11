import React from "react";
import { Layout } from "antd";
import Footer from "./Footer";
import Sider from "./Sider";
import Header from "./Header";

type PageLayoutProps = {
  children: JSX.Element;
};

function PageLayout({ children }: PageLayoutProps) {
  const { Content } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default PageLayout;
