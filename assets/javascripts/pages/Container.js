import React, { Component, PropTypes as T } from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Helmet from 'react-helmet'

const Footer = () => <div className='footer'>
  Source Code:  <a href="https://github.com/happybai/ghost-go">
    https://github.com/happybai/ghost-go
  </a>
</div>
// preload theme image
let images = new Array()
images = [
  '/assets/themes/flat-theme/black.svg',
  '/assets/themes/flat-theme/board.png',
  '/assets/themes/flat-theme/white.svg',
  '/assets/themes/photorealistic-theme/black.png',
  '/assets/themes/photorealistic-theme/board.png',
  '/assets/themes/photorealistic-theme/white.png',
  '/assets/themes/shell-stone/black.png',
  //'/assets/themes/shell-stone/board.png',
  '/assets/themes/shell-stone/white0.png',
  '/assets/themes/shell-stone/white1.png',
  '/assets/themes/shell-stone/white2.png',
  '/assets/themes/shell-stone/white3.png',
  '/assets/themes/shell-stone/white4.png',
  '/assets/themes/slate-and-shell-theme/board.png',
  '/assets/themes/slate-and-shell-theme/shell1.png',
  '/assets/themes/slate-and-shell-theme/shell2.png',
  '/assets/themes/slate-and-shell-theme/shell3.png',
  '/assets/themes/slate-and-shell-theme/shell4.png',
  '/assets/themes/slate-and-shell-theme/shell5.png',
  '/assets/themes/slate-and-shell-theme/slate1.png',
  '/assets/themes/slate-and-shell-theme/slate2.png',
  '/assets/themes/slate-and-shell-theme/slate3.png',
  '/assets/themes/slate-and-shell-theme/slate4.png',
  '/assets/themes/slate-and-shell-theme/slate5.png',
  '/assets/themes/subdued-theme/black.png',
  '/assets/themes/subdued-theme/white.png',
  '/assets/themes/subdued-theme/board.png',
  '/assets/themes/subdued-theme/black.png',
  '/assets/themes/subdued-theme/white.png',
  '/assets/themes/subdued-theme/board.png',
]
let imageData = new Object()
function preload() {
  for (let i = 0; i < images.length; i++) {
    let img = new Image()
    img.src = images[i]
    imageData[images[i]] = img
  }
}
preload()
console.log(imageData)

export default class Container extends Component {

  static childContextTypes = {
    auth: T.object.isRequired,
  }

  static propTypes = {
    route: T.object.isRequired,
    children: T.object
  }

  state = {
    expanded: true,
  }

  getChildContext() {
    return {
      auth: this.props.route.auth,
    }
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Helmet
            htmlAttributes={{lang: 'en', amp: undefined}}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Navigation expanded={this.state.expanded} collapseToggle={::this.handleClick} auth={this.props.route.auth} />
          <Sidebar expanded={this.state.expanded} auth={this.props.route.auth} />
          <div style={{marginLeft: this.state.expanded === true ? '235px' : '50px'}} className="page-container">
            { this.props.children }
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }

}
