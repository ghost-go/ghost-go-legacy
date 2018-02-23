import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';
import { Button, Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import AuthService from '../common/AuthService';

function mapStateToProps(state) {
  return {
    auth: state.ui.auth,
  };
}

@connect(mapStateToProps)
export default class User extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired,
  }

  constructor(props) {
    super(props);
    const profile = AuthService.getProfile();
    // Be careful for following code.
    // profile.user_metadata might be undefiend.
    const { rank = '18k', bio = '' } = profile.user_metadata;
    // let nickname = '';
    // if (!_.isNil(profile.user_metadata)) {
    //   rank = profile.user_metadata.rank;
    //   bio = profile.user_metadata.bio;
    //   // nickname = profile.user_metadata.nickname;
    // }
    this.state = {
      // tab: 'Basic Information',
      profile,
      tipsOpen: false,
      rank,
      bio,
      // nickname: profile.nickname || nickname,
    };

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
    });

    this.setRank = this.setRank.bind(this);
    this.setBio = this.setBio.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  // setNickName(e) {
  //   this.setState({ nickname: e.target.value });
  // }

  setBio(e) {
    this.setState({ bio: e.target.value });
  }

  setRank(e) {
    this.setState({ rank: e.target.value });
  }

  handleUpdateProfile() {
    const { auth } = this.context;
    const { profile } = this.state;
    auth.updateProfile(profile.user_id, {
      user_metadata: {
        // nickname: this.state.nickname,
        rank: this.state.rank,
        bio: this.state.bio,
      },
    }).then(() => {
      this.setState({
        tipsOpen: true,
      });
    });
  }

  logout() {
    this.context.auth.logout();
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="profile-container">
        <h3>Profile</h3>
        {
          !AuthService.loggedIn() ? <div>You must login to access this page</div> :
          <div>
            <Col xs={8} md={8}>
              <div>
                <FormGroup controlId="formUserName">
                  <ControlLabel>User Name</ControlLabel>
                  <FormControl.Static>
                    { profile.username || profile.nickname }
                  </FormControl.Static>
                  <FormControl.Feedback />
                </FormGroup>
                {/*
                <FormGroup
                  controlId="formNickName"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Nick Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.nickname}
                    placeholder="Nick Name"
                    onChange={::this.setNickName}
                      />
                  <FormControl.Feedback />
                </FormGroup>
                */}
                <FormGroup controlId="Level" >
                  <ControlLabel>Level</ControlLabel>
                  <FormControl onChange={this.setRank} componentClass="select" placeholder="select" value={this.state.rank}>
                    <option value="18k">18k</option>
                    <option value="17k">17k</option>
                    <option value="16k">16k</option>
                    <option value="16k">16k</option>
                    <option value="15k">15k</option>
                    <option value="14k">14k</option>
                    <option value="13k">13k</option>
                    <option value="12k">12k</option>
                    <option value="11k">11k</option>
                    <option value="10k">10k</option>
                    <option value="9k">9k</option>
                    <option value="8k">8k</option>
                    <option value="7k">7k</option>
                    <option value="6k">6k</option>
                    <option value="5k">5k</option>
                    <option value="4k">4k</option>
                    <option value="3k">3k</option>
                    <option value="2k">2k</option>
                    <option value="1k">1k</option>
                    <option value="1d">1d</option>
                    <option value="2d">2d</option>
                    <option value="3d">3d</option>
                    <option value="4d">4d</option>
                    <option value="5d">5d</option>
                    <option value="6d">6d</option>
                    <option value="7d">7d</option>
                    <option value="8d">8d</option>
                    <option value="9d">9d</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="formBio">
                  <ControlLabel>Bio</ControlLabel>
                  <FormControl
                    onChange={this.setBio}
                    componentClass="textarea"
                    placeholder="Bio"
                    value={this.state.bio}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Button onClick={this.handleUpdateProfile} style={{ marginRight: '10px' }} bsStyle="primary">
                  Update profile
                </Button>
              </div>
            </Col>
            <Col xs={4} md={4}>
              <ControlLabel>Profile Picture</ControlLabel>
              <div className="clearfix" />
              <img className="avatar" src={profile.picture} alt="" />
              {/*
              <br />
              <br />
              <Button style={{marginRight: '10px'}} bsStyle="primary">
                Upload new picture
              </Button>
              */}
            </Col>
            <Snackbar
              open={this.state.tipsOpen}
              bodyStyle={{ backgroundColor: 'green' }}
              message="Profile Updated"
              autoHideDuration={4000}
            />
            <div className="clearfix" />
          </div>
        }
      </div>
    );
  }
}
