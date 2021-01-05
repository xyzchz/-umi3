import React, { useEffect } from 'react';
import { Form, Input, Modal, Button, Select, message } from 'antd';
import { patchUser } from '@/service/serviceApi'

const { Option } = Select

const UserModal = (props: any) => {
  const [form] = Form.useForm();

  const { record } = props;

  useEffect(() => {
    form.setFieldsValue(props.record);
  }, [props.visible]);

  const onFinish = (values: any) => {
    patchUser({ ...values, userId: props.userId }).then(() => {
      props.closeHandler()
      message.success('修改成功')
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const onGenderChange = (sex: any) => {
    console.log(sex)
    if(sex === '男') form.setFieldsValue({
      age: (Math.random() * 10).toFixed(0)
    })
  }

  return (
    <>
      <Modal
        title="编辑用户"
        visible={props.visible}
        onOk={props.visibleHandler}
        onCancel={props.closeHandler}
        footer={false}
        forceRender
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="姓名"
            name="userName"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="请选择性别"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='年龄'
            name='age'
            rules={[{ required: true, message: '请输入年龄!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
