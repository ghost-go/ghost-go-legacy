import React, { PropTypes as T } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import LinkedAccountItem from './LinkedAccountItem'
import AuthService from '../../utils/AuthService'
import LinkAccountService from '../../utils/LinkAccountService'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

import Subheader from 'material-ui/Subheader'

export class LinkedAccountsList extends React.Component {

  render(){
    const { profile, auth} = this.props
    const linker = new LinkAccountService(auth, profile.user_id)
    let items = []
    if (profile && profile.identities) {
      items = profile.identities.map(identity => {
        return (<LinkedAccountItem {...this.props} identity={identity} />)
      })
    }

    return (
      <div>
        <Subheader style={{fontSize: '20px'}}>Linked Accounts</Subheader>
        <List>
          {items}
          <ListItem>
            <RaisedButton onClick={linker.link} label="Link Account" />
          </ListItem>
        </List>
      </div>
    )
  }
}

//const styles = {
  //root: {
    //display: 'flex',
    //flexWrap: 'wrap',
  //},
//}

LinkedAccountsList.propTypes = {
  auth: T.instanceOf(AuthService),
  profile: T.object,
  identity: T.object
}

export default LinkedAccountsList

