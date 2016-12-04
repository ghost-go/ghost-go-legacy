import React, { Component, PropTypes } from 'react'
import mainStyles from '../styles/main'

import { Link } from 'react-router'

//external component
import { StyleSheet, css } from 'aphrodite'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

export default class Tests extends Component {

  state = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css(mainStyles.mainContainer)}>
				<Card key='lv-1' className={css(styles.card)}>
						<CardMedia className={css(mainStyles.mainImg)} >
						</CardMedia>
						<CardActions className={css(styles.mainIntro)}>
							<Link to={`/test?id=1`}>
								<h1 className={css(styles.mainIntroSpan)}>Level 1</h1>
							</Link>
							<span className={css(styles.mainIntroSpan, styles.versus)}>18k - 10k</span>
						</CardActions>
				</Card>
        <Card key={'lv-2'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >

          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
						<Link to={`/test?id=1`}>
							<h1 className={css(styles.mainIntroSpan)}>Level 2</h1>
						</Link>
            <span className={css(styles.mainIntroSpan, styles.versus)}>10k - 5k</span>
          </CardActions>
        </Card>
        <Card key={'lv-3'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
            <h1 className={css(styles.mainIntroSpan)}>Level 3</h1>
            <span className={css(styles.mainIntroSpan, styles.versus)}>5k - 1k</span>
          </CardActions>
        </Card>
        <Card key={'lv-4'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
            <h1 className={css(styles.mainIntroSpan)}>Level 4</h1>
            <span className={css(styles.mainIntroSpan, styles.versus)}>5k - 1k</span>
          </CardActions>
        </Card>
        <Card key={'lv-5'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
            <h1 className={css(styles.mainIntroSpan)}>Level 5</h1>
            <span className={css(styles.mainIntroSpan, styles.versus)}>5k - 1k</span>
          </CardActions>
        </Card>
        <Card key={'lv-6'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
            <h1 className={css(styles.mainIntroSpan)}>Level 6</h1>
            <span className={css(styles.mainIntroSpan, styles.versus)}>5k - 1k</span>
          </CardActions>
        </Card>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 'auto',
    margin: '0px 5px 20px 5px',
  },
})
