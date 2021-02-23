import React, { useEffect, useContext } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import styled from "styled-components";

import { useMutation } from "@apollo/client";
import AuthContext from "../../contexts/auth-context";
import UIContext from "../../contexts/ui-context";
import { SIGN_IN } from "../../common/graphql";

const SignUp = styled.span`
  font-size: 12px;
  &:hover {
    color: #f87500;
  }
  cursor: pointer;
`;

const SignInModal = () => {
  const [signIn, { data: signInMutationData }] = useMutation(SIGN_IN);

  const { setToken, setSigninUser } = useContext(AuthContext);
  const { signInModalVisible, setSignInModalVisible } = useContext(UIContext);
  const { setSignUpModalVisible } = useContext(UIContext);

  useEffect(() => {
    if (!signInMutationData) return;
    if (signInMutationData.signinUser) {
      console.log("signinuser", signInMutationData.signinUser);
      localStorage.setItem(
        "signinUser",
        JSON.stringify(signInMutationData.signinUser.user)
      );
      setToken(signInMutationData.signinUser.token);
      setSigninUser(signInMutationData.signinUser.user);
      setSignInModalVisible(false);
      message.success("Signin successfully");
    } else {
      message.info("Email or password incorrect! Please try again.");
    }
  }, [signInMutationData, setToken, setSigninUser, setSignInModalVisible]);

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

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout} style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <SignUp
            onClick={() => {
              setSignUpModalVisible(true);
              setSignInModalVisible(false);
            }}
          >
            Don't have an account? Sign up!
          </SignUp>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SignInModal;
