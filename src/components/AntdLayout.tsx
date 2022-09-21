import { ReactNode } from "react";
import { Layout } from "antd";
import Footer from "./Footer";
import Sider from "./Sider";
import Header from "./Header";

function AntdLayout({ children }: { children: ReactNode }) {
  const { Content } = Layout;
  return (
    <>
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export default AntdLayout;
