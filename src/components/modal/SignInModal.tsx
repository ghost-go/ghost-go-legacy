import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";

import { useMutation, gql } from "@apollo/client";
import AuthContext from "../../contexts/auth-context";
import UIContext from "../../contexts/ui-context";

const SIGN_IN = gql`
  mutation CreateProblemRecord($email: String!, $password: String!) {
    signinUser(credentials: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignInModal = () => {
  const [signIn, { data: signInMutationData }] = useMutation(SIGN_IN);

  const { setToken, setSigninUser } = useContext(AuthContext);
  const { signInModalVisible, setSignInModalVisible } = useContext(UIContext);

  useEffect(() => {
    if (!signInMutationData) return;
    if (signInMutationData.signinUser) {
      console.log("signinuser", signInMutationData.signinUser);
      localStorage.setItem("signinUser", JSON.stringify(signInMutationData.signinUser.user))
      setToken(signInMutationData.signinUser.token);
      setSigninUser(signInMutationData.signinUser.user);
      setSignInModalVisible(false);
    } else {
      alert("用户名或密码错误");
    }
  }, [signInMutationData]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  const onFinish = (values: any) => {
    signIn({
      variables: {
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
      visible={signInModalVisible}
      closable={false}
      footer={null}
      onCancel={setSignInModalVisible.bind(null, false)}
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
