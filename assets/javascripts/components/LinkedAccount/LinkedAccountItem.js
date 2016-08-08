import React, { PropTypes as T } from 'react'
import {ListGroupItem, Button} from 'react-bootstrap'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import AuthService from '../../utils/AuthService'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import Checkbox from 'material-ui/Checkbox'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {red500} from 'material-ui/styles/colors'

export class LinkedAccountItem extends React.Component {

  unlink(identity){
    if (window.confirm(`Are you sure you want to unlink ${identity.connection}?`)) {
      this.props.auth.unlinkAccount(identity)
    }
  }

  renderUnlink(){
    const { profile, identity } = this.props
    if (profile.user_id != identity.provider + '|' + identity.user_id){
      return (
        <IconButton style={{padding: 0, marign: 0}}
          onClick={this.unlink.bind(this, identity)}
          tooltip="Unlink" tooltipPosition="bottom-left">
          <FontIcon
            className="zmdi zmdi-close"
            color={red500}
          />
        </IconButton>
      )
    }
  }

  render(){
    const { identity } = this.props
    console.log(identity.profileData)
    let profileName = null
    if (identity.profileData && identity.profileData.name) {
      profileName = identity.profileData.name
    }
    else {
      profileName = 'Main'
    }

    return (
      <ListItem
        primaryText={profileName}
        secondaryText={identity.connection}
        rightIcon={this.renderUnlink()}
      />
    )
  }
}



LinkedAccountItem.propTypes = {
  auth: T.instanceOf(AuthService),
  profile: T.object,
  identity: T.object
}

LinkedAccountItem.propTypes = {
  auth: T.instanceOf(AuthService),
  profile: T.object,
  identity: T.object
}

export default LinkedAccountItem
