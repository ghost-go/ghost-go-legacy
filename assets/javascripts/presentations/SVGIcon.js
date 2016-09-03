import React, { Component } from 'react'

export default class SVGIcon extends Component {

  render() {
    // Namespaced attributes are not supported in JSX. As a workaround
    // we can use the dangerouslySetInnerHTML to set the innerHTML property.
    // See https://github.com/facebook/react/issues/2250
    var svg =
      '<svg class="' + this.props.className + '">' +
      '<use xlink:href="' + this.props.href + '"></use>' +
      '</svg>'
    return React.createElement('div', {
      dangerouslySetInnerHTML: {__html: svg}
    })
  }
}
