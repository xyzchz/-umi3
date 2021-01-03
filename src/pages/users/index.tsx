import React from 'react';
import { Table } from 'antd';
import { connect } from 'umi';

const mapStateToProps = (state: any) => {
  console.log(state);
  const { users } = state;
  return {
    users: users.list,
  };
};

const Index = (props) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
  ];
  const { users } = props;

  return <Table key="userId" dataSource={users} columns={columns} />;
};

export default connect(mapStateToProps)(Index);
