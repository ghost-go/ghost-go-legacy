import {useState, useEffect} from 'react';
import {useDispatch, useTypedSelector} from 'utils';
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Grid,
  Message,
  Segment,
  InputOnChangeData,
} from 'semantic-ui-react';

import {GoogleLogin} from 'react-google-login';
import {openSignInSlice, openSignUpSlice, signIn, signUp} from 'slices';

import logo from 'public/images/logo.png';
import {GOOGLE_CLINET_ID} from 'utils/constants';

const SignUpModal = () => {
  const open = useTypedSelector(i => i.openSignUp);
  const signup = useTypedSelector(i => i.signup);
  const [signUpParams, setSignUpParams] = useState({
    email: undefined,
    name: undefined,
    display_name: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const handleGoogleSignInSuccess = (res: any) => {
    console.log(res);
  };
  const handleGoogleSignInFailure = (res: any) => {
    console.log(res);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    {name, value}: InputOnChangeData
  ) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    setSignUpParams({
      ...signUpParams,
      [name]: value,
    });
  };

  useEffect(() => {
    if (signup.error) {
      setErrorMessage(signup.error.message);
    }
    if (signup.status === 'succeeded') {
      dispatch(signIn(signUpParams));
      dispatch(openSignUpSlice.actions.makeFalse());
    }
  }, [signup, dispatch, signUpParams]);

  const handleSignUp = () => {
    dispatch(signUp({data: signUpParams}));
  };

  return (
    <Modal
      onClose={() => dispatch(openSignUpSlice.actions.makeFalse())}
      onOpen={() => dispatch(openSignUpSlice.actions.makeTrue())}
      open={open}
    >
      <Modal.Content>
        <Grid
          textAlign="center"
          style={{height: '90vh'}}
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Header as="h2" color="black" textAlign="center">
              <Image src={logo} />
              Login to your account
            </Header>
            <Form size="large" onSubmit={handleSignUp}>
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
                  value={signUpParams.email}
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                />
                <Form.Input
                  fluid
                  name="name"
                  icon="user"
                  iconPosition="left"
                  placeholder="User Name"
                  onChange={handleChange}
                  value={signUpParams.name}
                />
                <Form.Input
                  fluid
                  name="display_name"
                  icon="user"
                  iconPosition="left"
                  value={signUpParams.display_name}
                  onChange={handleChange}
                  placeholder="Display Name(Optional)"
                />
                <Form.Input
                  name="password"
                  onChange={handleChange}
                  value={signUpParams.password}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                {/* <Form.Input
                  name="confirm_password"
                  onChange={handleChange}
                  value={signUpParams.password}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                /> */}
                <Button color="black" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
              {/* <Segment size="large" textAlign="left">
                <div className="mb-2">Or Sign Up with:</div>
                <GoogleLogin
                  clientId={GOOGLE_CLINET_ID}
                  buttonText="Login"
                  onSuccess={handleGoogleSignInSuccess}
                  onFailure={handleGoogleSignInFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </Segment> */}
            </Form>
            <Message>
              Already registered?&nbsp;
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => {
                  dispatch(openSignInSlice.actions.makeTrue());
                  dispatch(openSignUpSlice.actions.makeFalse());
                }}
              >
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
