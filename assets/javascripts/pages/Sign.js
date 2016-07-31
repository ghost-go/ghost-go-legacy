import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
//import lang from '../components/lang'

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

import AuthService from '../utils/AuthService'

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

  render() {
    const {stepIndex} = this.state
    const paperStyle = {
      width: '60%',
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
                <TextField hintText=''
                           floatingLabelText='Email' />
                <div className="clearfix"></div>
                <TextField hintText=''
                           floatingLabelText="Username" />
                <div className="clearfix"></div>
                <TextField hintText=''
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
                <TextField hintText="" floatingLabelText="Age(optional)" />
                <div className="clearfix"></div>
                <TextField hintText="" floatingLabelText="Language(optional)" />
                <div className="clearfix"></div>
                <TextField hintText="" floatingLabelText="Nationality(optional)" />
                <div className="clearfix"></div>
                <TextField hintText="" floatingLabelText="Ranking(optional)" />
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
