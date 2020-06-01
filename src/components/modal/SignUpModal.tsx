import React, { useEffect, useContext } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import styled from "styled-components";

import { useMutation } from "@apollo/client";
import UIContext from "../../contexts/ui-context";
import { SIGN_UP } from "../../common/graphql";

const SignIn = styled.span`
  font-size: 12px;
  &:hover {
    color: #f87500;
  }
  cursor: pointer;
`;

const SignUpModal = () => {
  const [
    signUp,
    { data: signUpMutationData, error: signUpError },
  ] = useMutation(SIGN_UP);

  const { signUpModalVisible, setSignUpModalVisible } = useContext(UIContext);
  const { setSignInModalVisible } = useContext(UIContext);

  useEffect(() => {
    if (!signUpMutationData) return;
    if (signUpMutationData.createUser) {
      setSignUpModalVisible(false);
      setSignInModalVisible(true);
      message.success("Sign up successfully. Please login!");
      console.log("signinuser", signUpMutationData.createUser);
    } else {
      message.info(signUpMutationData.error);
    }
  }, [signUpMutationData, signUpError]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  const onFinish = (values: any) => {
    signUp({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      visible={signUpModalVisible}
      closable={false}
      footer={null}
      onCancel={setSignUpModalVisible.bind(null, false)}
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
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

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout} style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <SignIn
            onClick={() => {
              setSignUpModalVisible(false);
              setSignInModalVisible(true);
            }}
          >
            Already have an account? Sign in!
          </SignIn>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SignUpModal;
