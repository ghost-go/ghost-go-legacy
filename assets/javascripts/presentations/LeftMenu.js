import React, {Component, PropTypes} from 'react'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

let SelectableList = makeSelectable(List)

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      })
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      })
    }


    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      )
    }
  }
}

SelectableList = wrapState(SelectableList)

const ListExampleSelectable = () => (
  <SelectableList defaultValue={1}>
    <Subheader>Menu</Subheader>
    <ListItem
      value={1}
      primaryText="Tsumego"
    />
    <ListItem
      value={2}
      primaryText="Practice"
    />
    <ListItem
      value={3}
      primaryText="Practice Record"
    />
    <ListItem
      value={4}
      primaryText="Kifu"
    />
  </SelectableList>
);

export default ListExampleSelectable;
