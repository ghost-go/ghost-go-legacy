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
import { openSignInSlice, openSignUpSlice } from "slices";

import logo from "assets/images/logo.png";
import { GOOGLE_CLINET_ID } from "utils/constants";

const SignUpModal = () => {
  const open = useTypedSelector((i) => i.openSignUp);
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
                  placeholder="Email Address"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="User Name"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Display Name(Optional)"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button color="black" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
              <Segment size="large" textAlign="left">
                <div className="mb-2">Or Sign Up with:</div>
                <GoogleLogin
                  clientId={GOOGLE_CLINET_ID}
                  buttonText="Login"
                  onSuccess={handleGoogleSignInSuccess}
                  onFailure={handleGoogleSignInFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </Segment>
            </Form>
            <Message>
              Already registered?
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => {
                  dispatch(openSignInSlice.actions.makeTrue());
                  dispatch(openSignUpSlice.actions.makeFalse());
                }}>
                Sign In
              </span>
            </Message>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default SignUpModal;
