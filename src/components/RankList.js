import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class RankingList extends Component {

  static propTypes = {
    rank: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    floatingLabelText: PropTypes.string.isRequired,
  }

  state = {
    rank: this.props.rank || '18k',
  }

  handleChange = (event, index, value) => {
    this.setState({ rank: value }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.props.floatingLabelText}
        style={{ width: 85 }}
        value={this.state.rank}
        onChange={this.handleChange}
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
    );
  }
}

