import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";

import { updateUi } from "../../common/utils";
import { GET_UI } from "../../common/graphql";
import { useQuery } from "@apollo/client";

const SignInModal = (props: any) => {
  const { data, loading, error } = useQuery(GET_UI);

  const [ui, setUi] = useState({
    signInModalVisible: false,
  });

  useEffect(() => {
    if (!data) return;

    setUi(data.ui);
  }, [data]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Modal
      visible={ui.signInModalVisible}
      // closable={true}
      footer={null}
      onCancel={() => {
        updateUi({ signInModalVisible: false });
      }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SignInModal;
