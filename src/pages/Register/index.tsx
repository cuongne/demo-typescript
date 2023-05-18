import { register } from '@/pages/Register/registerSlice'
import { useAppDispatch, useAppSelector } from '@/stores/hook'
import { Button, Form, Input, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

type IDataSubmit = {
    email: string;
    username:string;
    password: string;
}

const Register = () => {
    const isLoading = useAppSelector(state => state.register.isLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token)
            navigate('/')
    }, [])
    function onFinish(values: IDataSubmit) {
        dispatch(register(values)).then(rs => {
            if (rs?.payload) {
                navigate('/login')
            }
        })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div className="container__register">
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
                     <div className='title'><span >Register</span></div>
                     <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Spin>
        </div>

    )
}

export default Register