import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import { connect } from 'umi';
import UserModal from './components/userModal'

const mapStateToProps = (state: any) => {
  const { users } = state
  return {
    users: users.list,
  }
}

const Index = (props) => {

  const [modalVisible, setModalVisible] = useState(false)

  const [record, setRecord] = useState(undefined)

  const columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => <a onClick={() => editHandler(record)}>edit</a>,
    },
  ];
  const { users } = props

  const editHandler = (record) => {
    setRecord(record)
    setModalVisible(true)
  }

  const visibleHandler = () => {
    setModalVisible(true)
  }

  const closeHandler = () => {
    setModalVisible(false)
  }

  return (
    <>
      <Table key="userId" dataSource={users} columns={columns} />
      <UserModal visible={modalVisible} closeHandler={closeHandler} record={record} visibleHandler={visibleHandler} />
    </>
  )
}

export default connect(mapStateToProps)(Index);
