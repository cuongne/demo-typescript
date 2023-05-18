import {
  ContainerOutlined,
  LinkedinOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './style.scss';


type Props = {}

const { Header, Sider, Content } = Layout

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    navigate('/users')
  }, [])
  const handleSelected = (e: any) => {
    const { key } = e
    navigate(`/${key}`)
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Button
          type="text"
          icon={<LinkedinOutlined />}
          className='button__link'
          href="https://www.linkedin.com/in/tr%C6%B0%C6%A1ng-vi%E1%BA%BFt-c%C6%B0%E1%BB%9Dng-8086311aa/"
          target="_blank"
        />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['users']}
          onClick={handleSelected}
          items={[
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'User management',
            },
            {
              key: 'article',
              icon: <ContainerOutlined />,
              label: 'Article',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <div className="button__header">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>

  )
}

export default Home