import React, { useState } from 'react';
import { Table, Modal, message, Button } from 'antd';
import { connect } from 'umi';
import { patchUser } from '@/service/serviceApi';
import UserModal from './components/userModal';

const mapStateToProps = (state: any) => {
  const { users } = state;
  console.log(state);
  return {
    users: users.list,
    listLoading: state.loading.models.users,
  };
};

const Index = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [record, setRecord] = useState(undefined);

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
      render: (text, record) => (
        <>
          <a onClick={() => editHandler(record)}>edit</a>
        </>
      ),
    },
  ];
  const { users } = props;

  const editHandler = (record) => {
    setRecord(record);
    setModalVisible(true);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  const visibleHandler = () => {
    setModalVisible(true);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    closeHandler();
    if (record) {
      props
        .dispatch({
          type: 'users/edit',
          payload: {
            ...values,
            userId: record.userId,
          },
        })
        .then((res) => {
          message.success('修改成功');
        });
    } else {
      props
        .dispatch({
          type: 'users/add',
          payload: values,
        })
        .then((res) => {
          message.success('添加成功');
        });
    }
  };

  return (
    <>
      <Button type="primary" onClick={addHandler}>
        添加用户
      </Button>
      <Table
        rowKey="userId"
        dataSource={users}
        columns={columns}
        loading={props.listLoading}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        visibleHandler={visibleHandler}
      />
    </>
  );
};

export default connect(mapStateToProps)(Index);
