import { useAppDispatch, useAppSelector } from '@/stores/hook'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { commentItem, createComment, deleteComment } from './commentSlice'
import { Avatar, Button, Form, Input, Popconfirm, Tag, Tooltip } from 'antd'
import { UserOutlined, DeleteOutlined } from '@ant-design/icons'
import { convertDateTime } from '@/utils/helper'
import './style.scss'

type Props = {}
type IDataSubmit = {
    body: string;
}
const Comment = (props: Props) => {
    const article = useAppSelector(state => state.comments.article)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const location = useLocation();
    useEffect(() => {
        dispatch(commentItem(location?.state?.slug))
    }, [])
    function onFinish(values: IDataSubmit) {
        dispatch(createComment({ slug: article?.slug, ...values })).then(rs => {
            form.resetFields()
        })
    }
    const handleDelete = (e: any, item: any) => {
        e.stopPropagation()
        dispatch(deleteComment({ slug: article?.slug, id: item?.id })).then(rs => {
            dispatch(commentItem(location?.state?.slug))
        })
    }
    return (

        <div className="container__comment">

            <h2>{article?.title}</h2>
            <span>{article?.description}</span>

            <div className="container__comment-data">
                {article?.tagList?.map(item => (
                    <Tag key={crypto.randomUUID()}>{item}</Tag>
                ))}
            </div>
            <h2> Comment:</h2>
            <Form
                name="comment"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                autoComplete="off"
            >
                <Form.Item
                    name="body"
                    rules={[{ required: true, message: 'Please input your comment!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <div className='button__list'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </div>
            </Form>
            <div className="container__comment-list">
                {article?.comments?.map(comment => (<div key={comment?.id} className="container__comment-item">

                    <div className="article__action">
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Delete user!"
                                description="Are you sure to delete this comment?"
                                onConfirm={(e) => handleDelete(e, comment)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <div className="icon">
                                    <DeleteOutlined />
                                </div>
                            </Popconfirm>
                        </Tooltip>
                    </div>
                    <div className='container__comment-detail'>
                        <Avatar shape="circle" size={32} icon={<UserOutlined />} />
                        <span>{comment?.body}</span>
                    </div>
                    <span className="article__create-by">Create by: {comment?.author?.username} - {convertDateTime(comment?.created)}</span>
                </div>


                ))}
            </div>
        </div>

    )
}

export default Comment