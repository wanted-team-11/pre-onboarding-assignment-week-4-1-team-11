import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sider from './Sider';

const { Header, Content, Footer } = Layout;

const AdminPageLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout style={{ background: '#fff' }}>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright © December and Company Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPageLayout;
