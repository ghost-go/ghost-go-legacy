import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";

import { updateUi, updateAuth } from "../../common/utils";
import { login } from "../../common/Auth";

import { setRefreshAccessTokenInterval } from "../../common/Auth";
import { GET_UI } from "../../common/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";
import jwtDecode from "jwt-decode";

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
  const { data: uiData } = useQuery(GET_UI);
  const [signIn, { data: signInMutationData }] = useMutation(SIGN_IN);

  const [ui, setUi] = useState({
    signInModalVisible: false,
  });

  useEffect(() => {
    if (!uiData) return;
    setUi(uiData.ui);
  }, [uiData]);

  useEffect(() => {
    if (!signInMutationData) return;
    if (signInMutationData.signinUser) {
      console.log("signinuser", signInMutationData.signinUser);
      const decodedData: any = jwtDecode(signInMutationData.signinUser.token);
      login(signInMutationData.signinUser.token);
      updateAuth({
        signinUser: signInMutationData.signinUser,
        exp: decodedData.exp,
      });
      updateUi({ signInModalVisible: false });
      setRefreshAccessTokenInterval();
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
      visible={ui.signInModalVisible}
      closable={false}
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
