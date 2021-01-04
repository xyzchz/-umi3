import React from 'react'
import { Modal, Button } from 'antd'

const UserModal = (props) => {

  const { record } = props

  return (
    <>
      <Modal
        title='编辑用户'
        visible={props.visible}
        onOk={props.visibleHandler}
        onCancel={props.closeHandler}
      >
        {
          record
          &&
          record.userName
        }
      </Modal>
    </>
  )
}

export default UserModal