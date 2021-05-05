import { useState, useEffect } from "react";
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
  FormProps,
  InputOnChangeData,
} from "semantic-ui-react";

import { GoogleLogin } from "react-google-login";
import {
  authSlice,
  googleSignIn,
  openSignInSlice,
  openSignUpSlice,
  signIn,
} from "slices";
import { GOOGLE_CLINET_ID } from "utils/constants";

import logo from "assets/images/logo.png";

const SignInModal = () => {
  const open = useTypedSelector((i) => i.openSignIn);
  const auth = useTypedSelector((i) => i.auth);
  const [signInParams, setSignInParams] = useState({
    email: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const handleGoogleSignInSuccess = (res: any) => {
    console.log(res);
    dispatch(googleSignIn({ meta: res }));
  };
  const handleGoogleSignInFailure = (res: any) => {
    setErrorMessage(res);
    console.log(res);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData
  ) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    setSignInParams({
      ...signInParams,
      [name]: value,
    });
  };

  useEffect(() => {
    if (auth.error) {
      setErrorMessage(auth.error.message);
    }
    if (auth.token) {
      dispatch(openSignInSlice.actions.makeFalse());
    }
  }, [auth, dispatch]);

  const handleSignIn = () => {
    dispatch(signIn(signInParams));
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
            <Form size="large" onSubmit={handleSignIn}>
              {errorMessage && (
                <Message negative>
                  <Message.Header>{errorMessage}</Message.Header>
                </Message>
              )}
              <Segment textAlign="right">
                <Form.Input
                  fluid
                  name="email"
                  onChange={handleChange}
                  value={signInParams.email}
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                />
                <Form.Input
                  name="password"
                  onChange={handleChange}
                  value={signInParams.password}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <span className="inline-block mb-4 text-gray-400 cursor-pointer">
                  Forgot password?
                </span>
                <Button color="black" fluid size="large">
                  Login
                </Button>
              </Segment>
              <Segment size="large" textAlign="left">
                <div className="mb-2">Or Login with:</div>
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
              Not registered?{" "}
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => {
                  dispatch(openSignInSlice.actions.makeFalse());
                  dispatch(openSignUpSlice.actions.makeTrue());
                }}>
                Sign Up
              </span>
            </Message>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};
export default SignInModal;
