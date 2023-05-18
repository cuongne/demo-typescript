import ArticleList from '@/components/ArticleList'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/stores/hook'
import ModalCustom from '@/components/ModalCustom'
import { Button, Form, Input, Select } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { articleList, createArticle, deleteArticle, updateArticle } from './articleSlice'
import './style.scss'


interface DataType {
    id: number;
    title: string;
    description: string;
    slug: string;
    tagList: Array<string>;
}


const Article = () => {
    const dispatch = useAppDispatch()
    const articles = useAppSelector(state => state.articles.articles)
    const [open, setIsOpen] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [form] = Form.useForm()
    useEffect(() => {
        dispatch(articleList())
    }, [])
    function onFinish(values: DataType) {
        if (isAdd) {
            dispatch(createArticle(values)).then(rs => {
                form.resetFields()
                setIsOpen(false)
            })
        }
        else {
            dispatch(updateArticle(values)).then(rs => {
                form.resetFields()
                setIsOpen(false)
            })
        }
    }
    const handleEdit = (e:React.MouseEvent<HTMLDivElement>,item: DataType) => {
        e.stopPropagation()
        setIsOpen(true)
        form.setFieldsValue(item)
    }
    const handleDelete = (e:any,item: DataType) => {
        e.stopPropagation()
        dispatch(deleteArticle(item?.slug))

    }
    const handleCancel = () => {
        form.resetFields()
        setIsOpen(false)
        setIsAdd(false)
    }
    const handleAdd = () => {
        form.resetFields()
        setIsOpen(true)
        setIsAdd(true)
    }
    return (
        <div className="container__article">
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={handleAdd}
            >
                Add new article
            </Button>
            <ArticleList data={articles?.articles} count={3} onEdit={handleEdit} onDelete={handleDelete} />
            <ModalCustom title={isAdd ? "Add article" : "Edit article"} open={open} footer={null} getContainer={false} onCancel={handleCancel}>
                <Form
                    name="article"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 450 }}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                    autoComplete="off"

                >
                    <Form.Item name="id" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please input your body!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!isAdd && <Form.Item
                        label="Slug"
                        name="slug"
                        rules={[{ required: true, message: 'Please input your slug!' }]}
                    >
                        <Input disabled />
                    </Form.Item>}
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>
                    <Form.Item
                        label="Tags"
                        name="tagList"
                        rules={[{ required: true, message: 'Please input your tags!' }]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                        />
                    </Form.Item>
                    <div className='button__list'>
                        <Button type="default" onClick={handleCancel} >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </ModalCustom>
            <h4>Items: {articles?.articlesCount}</h4>
        </div>

    )
}

export default Article