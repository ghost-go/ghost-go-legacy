//react
import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'

//material-ui
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

//internal component
import Layout from './Layout'
import Navigation from '../presentations/Navigation'
import { fetchKifus } from '../actions/KifuActions'

//external component
import { StyleSheet, css } from 'aphrodite'

//language
//import lang from '../components/lang'

class Kifus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 11,
      current: 0,
      visablePage: 6
    }
    let { query } = this.props.location
    this.props.dispatch(fetchKifus(query.page))
    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  render() {
    const { kifus } = this.props
    return (
      <Layout>
        <div className={css(styles.puzzlesContainer)}>
          <div className={css(styles.puzzlesLeft)}>
            <h1 className={css(styles.title)}>Puzzles Library</h1>
            <div className={css(styles.buttonGroup)}>
              <RaisedButton className={css(styles.button)} primary={true} label="Undo" />
              <div className={css(styles.clearfix)}></div>
              <RaisedButton className={css(styles.button)} secondary={true} label="Undo" />
            </div>
            <Card>
              <CardHeader
                title="Without Avatar"
                subtitle="Subtitle"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions expandable={true}>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>
          <div className={css(styles.puzzlesRight)}>
            <Card className={css(styles.card)}>
              <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="http://lorempixel.com/100/100/nature/"
              />
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
              >
                <img src="http://lorempixel.com/600/337/nature/" />
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>
        </div>
      </Layout>
    )
  //render() {
    //const { kifus } = this.props
    //return (
      //<Layout>
        //<KifuTable kifus={ kifus.data } />
        //<Pagination current={this.state.current}
                    //total={this.state.total}
                    //visiblePages={this.state.visablePage}
                    //onPageChanged={this.handlePageChanged}
                    //titles = {{
                      //first: 'First',
                      //prev: 'Prev',
                      //prevSet: '<<<',
                      //nextSet: '>>>',
                      //next: 'Next',
                      //last: 'Last',
                    //}}
        ///>
      //</Layout>
    //)
  //}
  }

}

const styles = StyleSheet.create({
  puzzlesContainer: {
    marginTop: '40px',
    backgroundColor: '#fff',
    padding: '20px 60px',
    float: 'left',
  },

  title: {
    fontSize: '26px',
    lineHeight: '26px',
    fontWeight: '300',
    margin: '10px 0 35px',
    padding: '0'
  },

  puzzlesLeft: {
    width: '25%',
    marginLeft: 0,
    float: 'left',
  },

  buttonGroup: {
    marginBottom: '30px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

  puzzlesRight: {
    width: '70%',
    marginLeft: '5%',
    paddingTop: '10px',
    float: 'left',
  },

  card: {
    width: '30%',
    margin: '0px 1.5% 20px 1.5%',
    float: 'left'
  },

  clearfix: {
    clear: 'both'
  }
})

function select(state) {
  return {
    kifus: state.kifus
  }
}

export default connect(select)(Kifus)
