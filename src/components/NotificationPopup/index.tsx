import { notification } from 'antd'



export function openSuccess(notiMess: string = 'Success', notiDuration: number = 2, notiPlacement: any = 'bottomRight') {
    notification.success({
        message: notiMess || 'Success',
        placement: notiPlacement,
        duration: notiDuration
    })
}

export function openError(notiMess: string = 'Error', notiDuration: number = 2, notiPlacement: any = 'bottomRight') {
    notification.error({
        message: notiMess || 'Error',
        placement: notiPlacement || 'bottomRight',
        duration: notiDuration
    })
}

export function openWarning(notiMess: string = 'Warning', notiDuration: number = 2, notiPlacement: any = 'bottomRight') {
    const key = `open${Date.now()}`
    notification.warning({
        message: notiMess || 'Warning',
        placement: notiPlacement || 'bottomRight',
        duration: notiDuration,
        key: key
    })
}

export function destroy() {
    notification.destroy()
}
