import React, { PropTypes as T } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import LinkedAccountItem from './LinkedAccountItem'
import AuthService from '../../utils/AuthService'
import LinkAccountService from '../../utils/LinkAccountService'

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
        <h3>Linked Accounts</h3>
        <ListGroup>{items}</ListGroup>
        <Button onClick={linker.link} bsStyle="primary">Link Account</Button>
      </div>
    )
  }
}

LinkedAccountsList.propTypes = {
  auth: T.instanceOf(AuthService),
  profile: T.object,
  identity: T.object
}

export default LinkedAccountsList

