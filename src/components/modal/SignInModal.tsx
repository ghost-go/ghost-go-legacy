import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useTypedSelector } from "utils";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Grid,
  Message,
  Segment,
} from "semantic-ui-react";

import { GoogleLogin } from "react-google-login";
import { openSignInSlice } from "slices";

import logo from "assets/images/logo.png";

const SignInModal = () => {
  const open = useTypedSelector((i) => i.openSignIn);
  const dispatch = useDispatch();
  const handleGoogleSignInSuccess = (res: any) => {
    console.log(res);
  };
  const handleGoogleSignInFailure = (res: any) => {
    console.log(res);
  };
  return (
    <Modal
      onClose={() => dispatch(openSignInSlice.actions.makeFalse())}
      onOpen={() => dispatch(openSignInSlice.actions.makeTrue())}
      open={open}>
      <Modal.Content>
        <Grid
          textAlign="center"
          style={{ height: "90vh" }}
          verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              <Image src={logo} />
              Login to your account
            </Header>
            <Form size="large">
              <Segment textAlign="right">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <a className="inline-block mb-4 text-gray-400">
                  Forgot password?
                </a>
                <Button color="black" fluid size="large">
                  Login
                </Button>
              </Segment>
              <Segment size="large" textAlign="left">
                <div className="mb-2">Or Login with:</div>
                <GoogleLogin
                  clientId="277291989992-j38jt4dat4mi367ec0drpiamt6d4n4s0.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={handleGoogleSignInSuccess}
                  onFailure={handleGoogleSignInFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </Segment>
            </Form>
            <Message>
              Not registered? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      {/* <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions> */}
    </Modal>
  );
};
export default SignInModal;
