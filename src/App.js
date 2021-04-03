import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './Assets/css/HomePage.css';
import Routes from './Routes/Routes';


const { Header, Content, Footer } = Layout;

function App() {

  return (
    <div className="App">

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Router>
              <Routes />
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Masters India Pvt Ltd.</Footer>
      </Layout>,



    </div>
  );
}

export default App;
