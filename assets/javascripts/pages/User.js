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

import LinkedAccountsList from '../components/LinkedAccount/LinkedAccountsList'
//import styles from './styles.module.css'

import { StyleSheet, css } from 'aphrodite'
import AuthService from '../utils/AuthService'

//import AuthenticationClient from 'auth0'
var AuthenticationClient = require('auth0').AuthenticationClient
var ManagementClient = require('auth0').ManagementClient

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

  handleSeeMore(rank) {
    this.setState({ rankFilter: rank })
  }

  render() {
    const { profile } = this.state
    return (
      <div className={css(styles.usersContainer)}>
        <div className={css(styles.usersLeft)}>
          <Card expanded={true}>
            <CardHeader
              title="RANKING"
            />
            <CardText>
              <FlatButton
                backgroundColor={ this.state.tab == 'Basic Information' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'Basic Information')}
                className={css(styles.button)}
                style={{textAlign: 'left'}}
                label="Basic Information"
              />
              <FlatButton
                backgroundColor={ this.state.tab == 'Recent Activity' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'Recent Activity')} className={css(styles.button)}
                style={{textAlign: 'left'}}
                label='Recent Activity(Not Open)'
              />
            </CardText>
          </Card>
        </div>
        <Paper className={css(styles.usersRight)}>
            <div className={css(styles.lists)}>
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
            </div>
            <div className={css(styles.linkedAccounts)}>
              <LinkedAccountsList profile={profile} auth={this.props.auth}></LinkedAccountsList>
            </div>
        </Paper>
        <Snackbar
          open={this.state.tipsOpen}
          bodyStyle={{backgroundColor: 'green'}}
          message="Profile Updated"
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  usersContainer: {
    display: 'flex',
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '30px',
    justifyContent: 'space-around'
  },

  accountSection: {
    fontSize: '20px'
  },

  lists: {
    flex: '1 1 auto'
  },

  linkedAccounts: {
    flex: '1 1 auto'
  },

  offsetLeft: {
    marginLeft: '16px'
  },

  title: {
    fontSize: '26px',
    lineHeight: '26px',
    fontWeight: '300',
    margin: '10px 0 35px',
    padding: '0'
  },

  usersLeft: {
    width: '250px',
  },

  usersRight: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    marginLeft: '30px',
    minHeight: '500px'
  },

  buttonGroup: {
    marginBottom: '30px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

  toggle: {
    maxWidth: '250px',
    marginBottom: '16px',
    fontSize: '16px'
  },

  card: {
    width: '22vw',
    margin: '0px 1.5vw 20px 1.5vw',
  },

  previewImgWrapper: {
    height: '22vw'
  },

  clearfix: {
    clear: 'both'
  }
})
