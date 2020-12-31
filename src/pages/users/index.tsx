import React from 'react';
import { Table } from 'antd'
import { connect } from 'umi'

const mapStateToProps = (state: any) => {
  console.log(state)
  const { users } = state
  return {
    users
  }
}

const Index = (props) => {
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const { users } = props

  return <Table dataSource={users} columns={columns} />
}

export default connect(mapStateToProps)(Index)