import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";

import { updateUi } from "../../common/utils";
import { GET_UI } from "../../common/graphql";
import { useQuery, useMutation, gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation CreateProblemRecord($email: String!, $password: String!) {
    signinUser(credentials: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SignInModal = () => {
  const { data, loading, error } = useQuery(GET_UI);
  const [signIn, { data: signInMutationData }] = useMutation(SIGN_IN);

  const [ui, setUi] = useState({
    signInModalVisible: false,
  });
  const [signInData, setSignInData] = useState({});

  useEffect(() => {
    if (!data) return;
    setUi(data.ui);
  }, [data]);

  useEffect(() => {
    if (!signInMutationData) return;
    setSignInData(signInMutationData);
    console.log("token", signInMutationData.signinUser.token);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

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
