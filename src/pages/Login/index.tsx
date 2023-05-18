import { Button, Form, Input, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from './loginSlice'
import { useAppDispatch, useAppSelector } from '@/stores/hook'
import './style.scss'

type Props = {}
type IDataSubmit = {
    email: string;
    password: string;
}

const Login = (props: Props) => {
    const isLoading = useAppSelector(state => state.login.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token)
            navigate('/')
    }, [])
    function onFinish(values: IDataSubmit) {
        dispatch(login(values)).then(rs => {
            if (rs?.payload) {
                navigate('/')
            }
        })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleRegister = () => {
        navigate('/register')
    };

    return (

        <div className="container__login">
            <Spin spinning={isLoading}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 450 }}
                    initialValues={{ remember: true }}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    requiredMark={false}
                    autoComplete="off"
                >
                    <div className='title'><span >Login</span></div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    
                    <div className='button__list'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link" onClick={handleRegister}>
                            Register
                        </Button>
                    </div>
                </Form>
            </Spin>
        </div>

    )
}

export default Login