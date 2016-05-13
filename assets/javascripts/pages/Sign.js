import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

export default class Sign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
    }
  }

  handleNext() {
    const {stepIndex} = this.state
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1})
    }
  }

  handlePrev() {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this)}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev.bind(this)}
          />
        )}
      </div>
    )
  }

  getStepContent(stepIndex) {
    const signStyle = {
      width: 400,
      margin: '0 auto'
    }
    switch (stepIndex) {
    case 0:
      return (
        <div style={signStyle}>
        </div>
      )
    case 1:
      return (
        <div>
        </div>
      )
    case 2:
      return (
        <div>
          <p>
            Congratulation!
          </p>
        </div>
      )
    default:
      return 'OK'
    }
  }

  render() {
    const {stepIndex} = this.state
    const paperStyle = {
      width: '40%',
      margin: '0 auto',
      marginTop: 20,
      padding: 30
    }

    return (
      <Layout>
        <Paper style={paperStyle}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0})}>
                Basic Information
              </StepButton>
              <StepContent>
                <TextField hintText='Email'
                           floatingLabelText='Email'
                           errorText='This field is required'/>
                <TextField hintText="Username"
                           floatingLabelText="Username" />
                <TextField hintText="Password"
                           floatingLabelText="Password"
                           type="password" />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
                Optional Information
              </StepButton>
              <StepContent>
                <TextField hintText="Age(optional)" floatingLabelText="Age(optional)" />
                <TextField hintText="Language(optional)" floatingLabelText="Language(optional)" />
                <TextField hintText="Nationality(optional)" floatingLabelText="Nationality(optional)" />
                <TextField hintText="Ranking(optional)" floatingLabelText="Ranking(optional)" />
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
                Finished
              </StepButton>
              <StepContent>
                <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      </Layout>
    )
  }
}
