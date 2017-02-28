import React, { Component, PropTypes as T } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'

import {Button, Col, HelpBlock, ControlLabel, FormControl, FormGroup, Dropdown, Glyphicon} from 'react-bootstrap'

import { StyleSheet, css } from 'aphrodite'

let FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

export default class User extends Component {
  constructor(props, context) {
    super(props, context)
    let profile = props.auth.getProfile()
    this.state = {
      tab: 'Basic Information',
      profile: profile,
      rank: profile.user_metadata.rank,
      tipsOpen: false
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

  }

  logout(){
    this.props.auth.logout()
  }

  handleChange(event, index, value) {
    this.setState({rank: value}, () => {
      const { auth } = this.props
      const { profile } = this.state
      auth.updateProfile(profile.user_id, {
        user_metadata: {
          rank: value
        }
      }).then(() => {
        this.setState({
          tipsOpen: true,
        })
      })
    })
  }

  //handleSave() {
  //const { auth } = this.props
  //const { profile } = this.state
  //auth.updateProfile(profile.user_id, {
  //user_metadata: {
  //rank: this.state.rank
  //}
  //})
  //}

  fillNotSet(val) {
    if (val) {
      return val
    }
    else {
      return 'Not Set'
    }
  }

  handleChange() {
  }

  getValidationState() {
  }

  render() {
    const { profile } = this.state
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className='page-container profile-container'>
        <h3>Profile</h3>
        <Col xs={8} md={8}>
          <div>
            <FormGroup
              controlId="formUserName"
              validationState={this.getValidationState()}
            >
              <ControlLabel>User Name</ControlLabel>
              <FormControl.Static>
                { profile.name }
              </FormControl.Static>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formNickName"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Nick Name</ControlLabel>
              <FormControl
                type="text"
                value={profile.user_metadata.nickname}
                placeholder="Nick Name"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="Level"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Level</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value='18k'>18k</option>
                <option value='17k'>17k</option>
                <option value='16k'>16k</option>
                <option value='16k'>16k</option>
                <option value='15k'>15k</option>
                <option value='14k'>14k</option>
                <option value='13k'>13k</option>
                <option value='12k'>12k</option>
                <option value='11k'>11k</option>
                <option value='10k'>10k</option>
                <option value='9k'>9k</option>
                <option value='8k'>8k</option>
                <option value='7k'>7k</option>
                <option value='6k'>6k</option>
                <option value='5k'>5k</option>
                <option value='4k'>4k</option>
                <option value='3k'>3k</option>
                <option value='2k'>2k</option>
                <option value='1k'>1k</option>
                <option value='1d'>1d</option>
                <option value='2d'>2d</option>
                <option value='3d'>3d</option>
                <option value='4d'>4d</option>
                <option value='5d'>5d</option>
                <option value='6d'>6d</option>
                <option value='7d'>7d</option>
                <option value='8d'>8d</option>
                <option value='9d'>9d</option>
              </FormControl>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBio"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Bio</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Bio"
                value={profile.user_metadata.bio}
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button
              style={{marginRight: '10px'}}
              bsStyle="primary">
              Update profile
            </Button>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <ControlLabel>Profile Picture</ControlLabel>
          <div className='clearfix'></div>
          <img className='avatar' src={profile.picture} alt="" />
          <br />
          <br />
          <Button
            style={{marginRight: '10px'}}
            bsStyle="primary">
            Upload new picture
          </Button>
        </Col>
        {/*
        <List>
          <Subheader style={{fontSize: '20px'}}>Profile</Subheader>
          <ListItem
            primaryText='User Name'
            secondaryText={profile.name}
      />
          <ListItem
            primaryText='Nick Name'
            secondaryText={profile.user_metadata.nickname}
            ref='nickname'
      />
          <ListItem primaryText='Ranking' />
          <SelectField
            className={css(styles.offsetLeft)}
            value={this.state.rank}
            onChange={this.handleChange.bind(this)}
            ref='rank'
          >
            <MenuItem value={'18k'} primaryText="18k" />
            <MenuItem value={'17k'} primaryText="17k" />
            <MenuItem value={'16k'} primaryText="16k" />
            <MenuItem value={'16k'} primaryText="16k" />
            <MenuItem value={'15k'} primaryText="15k" />
            <MenuItem value={'14k'} primaryText="14k" />
            <MenuItem value={'13k'} primaryText="13k" />
            <MenuItem value={'12k'} primaryText="12k" />
            <MenuItem value={'11k'} primaryText="11k" />
            <MenuItem value={'10k'} primaryText="10k" />
            <MenuItem value={'9k'} primaryText="9k" />
            <MenuItem value={'8k'} primaryText="8k" />
            <MenuItem value={'7k'} primaryText="7k" />
            <MenuItem value={'6k'} primaryText="6k" />
            <MenuItem value={'5k'} primaryText="5k" />
            <MenuItem value={'4k'} primaryText="4k" />
            <MenuItem value={'3k'} primaryText="3k" />
            <MenuItem value={'2k'} primaryText="2k" />
            <MenuItem value={'1k'} primaryText="1k" />
            <MenuItem value={'1d'} primaryText="1d" />
            <MenuItem value={'2d'} primaryText="2d" />
            <MenuItem value={'3d'} primaryText="3d" />
            <MenuItem value={'4d'} primaryText="4d" />
            <MenuItem value={'5d'} primaryText="5d" />
            <MenuItem value={'6d'} primaryText="6d" />
            <MenuItem value={'7d'} primaryText="7d" />
            <MenuItem value={'8d'} primaryText="8d" />
            <MenuItem value={'9d'} primaryText="9d" />
          </SelectField>
        </List>
        */}
        <Snackbar
          open={this.state.tipsOpen}
          bodyStyle={{backgroundColor: 'green'}}
          message="Profile Updated"
          autoHideDuration={4000}
        />
        <div className='clearfix'></div>
      </div>
    )
  }
}
