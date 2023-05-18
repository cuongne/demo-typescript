import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Props = {
    [key: string]: any,
    children: JSX.Element,
    open: boolean,
    title: string
}


const ModalCustom = (props: Props) => {
    const { children, open, title = 'Modal' } = props
    return (
        <Modal {...props} title={title} open={open} >
            {children}
        </Modal>
    )
}

export default ModalCustom