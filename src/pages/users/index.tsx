import React, { useState } from 'react';
import { Table, Modal, message, Button, Pagination } from 'antd';
import { connect } from 'umi';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { patchUser, getUserList } from '@/service/serviceApi';
import UserModal from './components/userModal';

const mapStateToProps = (state: any) => {
  const { users } = state;
  console.log(state);
  return {
    users: users.items,
    listLoading: state.loading.models.users,
    total: users.pageInfo.total,
    page: users.pageInfo.page,
    pageSize: users.pageInfo.pageSize,
  };
};

type Item = {
  title: string;
  dataIndex: string;
  render: (text: any, record: any) => any;
};

const Index = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [record, setRecord] = useState(undefined);

  const columns: ProColumns<Item>[] = [
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

  const requestHandler = async ({
    pageSize,
    current,
  }: {
    pageSize: number;
    current: number;
  }) => {
    const results = await getUserList({ pageSize, current });
    return {
      data: results,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: results.length,
    };
  };

  const pageChange = (pageNumber: number, pageSize: number = 10) => {
    props.dispatch({
      type: 'users/getRemote',
      payload: {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      },
    });
  };

  const { total, pageSize, page, listLoading } = props;

  return (
    <>
      <ProTable<Item>
        columns={columns}
        dataSource={users}
        editable={{
          type: 'multiple',
        }}
        rowKey="userId"
        search={false}
        pagination={false}
        loading={listLoading}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={addHandler}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <Pagination
        pageSize={pageSize}
        total={total}
        current={page}
        onChange={pageChange}
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
