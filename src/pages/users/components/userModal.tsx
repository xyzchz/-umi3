import React, { useEffect } from 'react';
import { Form, Input, Modal, Button } from 'antd';

const UserModal = (props: any) => {
  const [form] = Form.useForm();

  const { record } = props;

  useEffect(() => {
    form.setFieldsValue(props.record);
  }, [props.visible]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="编辑用户"
        visible={props.visible}
        onOk={props.visibleHandler}
        onCancel={props.closeHandler}
        footer={false}
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
