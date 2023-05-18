import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Popconfirm, Space, Table, Tooltip } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/stores/hook';
import { deleteUser, updatePosition, updateUser, userList } from '@/pages/UserManagement/userSlice';
import { EditOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import ModalCustom from '@/components/ModalCustom';
import './style.scss'


interface DataType {
    id: number;
    username: string;
    email: string;
}
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': number;
}

const Row = ({ children, ...props }: RowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 })?.replace(
            /translate3d\(([^,]+),/,
            'translate3d(0,',
        ),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if ((child as React.ReactElement).key === 'sort') {
                    return React.cloneElement(child as React.ReactElement, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{ touchAction: 'none', cursor: 'move' }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};
const UserManagement = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)

    const [form] = Form.useForm()

    const [open, setIsOpen] = useState<boolean>(false)

    const handleEdit = (item: DataType) => {
        setIsOpen(true)
        form.setFieldsValue(item)
    }
    const handleDelete = (item: DataType) => {
        dispatch(deleteUser(item?.email))
    }
    const columns: ColumnsType<DataType> = [
        {
            key: 'sort',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <div className="icon" onClick={() => handleEdit(record)}>
                            <EditOutlined />
                        </div>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Delete user!"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleDelete(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className="icon">
                                <DeleteOutlined />
                            </div>
                        </Popconfirm>

                    </Tooltip>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(userList())
    }, [])
    function onFinish(values: DataType) {
        dispatch(updateUser(values)).then(rs => {
            form.resetFields()
            setIsOpen(false)
        })
    }
    const handleCancel = () => {
        form.resetFields()
        setIsOpen(false)
    }
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            const activeIndex = [...users].findIndex((i) => i.id === active.id);
            const overIndex = [...users].findIndex((i) => i.id === over?.id);
            const newArr = arrayMove([...users], activeIndex, overIndex)
            dispatch(updatePosition(newArr))
        }
    };
    return (

        <div className="container__user">
            <DndContext onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={users.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table columns={columns} components={{
                        body: {
                            row: Row,
                        },
                    }} dataSource={users} rowKey="id" />
                </SortableContext>
            </DndContext>
            <ModalCustom title="Edit user" open={open} footer={null} getContainer={false} onCancel={handleCancel}>
                <Form
                    name="user"
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
        </div >

    )
}

export default UserManagement