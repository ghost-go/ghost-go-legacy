import React, { Component, PropTypes } from 'react'
import Kifu from './Kifu'
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import lang from '../components/lang';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

export default class KifuTable extends Component {
  render() {
    return(
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              <FormattedMessage
                id='app.games.table.date'
                defaultMessage="Date"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id='app.games.table.title'
                defaultMessage="Title"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id='app.games.table.black'
                defaultMessage="Black"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id='app.games.table.white'
                defaultMessage="White"
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                id='app.games.table.result'
                defaultMessage="Result"
              />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.kifus.map((kifu, index) => 
            <Kifu {...kifu} key={index}/>
          )}
        </TableBody>
      </Table>
    )
  }
}

