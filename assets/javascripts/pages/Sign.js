import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';



export default class Sign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext() {
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField hintText="Email" floatingLabelText="Email" />
            <br />
            <TextField hintText="Username" floatingLabelText="Username" />
            <br />
            <TextField hintText="Password" floatingLabelText="Password" type="password" />
          </div>
        )
      case 1:
        return (
          <div>
            <TextField hintText="Age(optional)" floatingLabelText="Age(optional)" />
            <br />
            <TextField hintText="Language(optional)" floatingLabelText="Language(optional)" />
            <br />
            <TextField hintText="Nationality(optional)" floatingLabelText="Nationality(optional)" />
            <br />
            <TextField hintText="Ranking(optional)" floatingLabelText="Ranking(optional)" />
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
        return 'OK';
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const {finished, stepIndex} = this.state
    const contentStyle = {margin: '0 16px'}

    return (
      <Layout>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select campaign settings</StepLabel>
            </Step>
            <Step>
              <StepLabel>Create an ad group</StepLabel>
            </Step>
            <Step>
              <StepLabel>Create an ad</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                {this.getStepContent(stepIndex)}
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev.bind(this)}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onTouchTap={this.handleNext.bind(this)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}
