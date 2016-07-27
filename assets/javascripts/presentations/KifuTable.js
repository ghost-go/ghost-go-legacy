import React, { Component, PropTypes } from 'react'
import Kifu from './Kifu'
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
//import lang from '../components/lang';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'

export default class KifuTable extends Component {
  render() {
    const tableStyle = {
      marginTop: 1
    }
    return(
      <div style={tableStyle}>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
              {/*<FormattedMessage
                  id='app.games.table.date'
                  defaultMessage="Date"
                />*/}
                Date
              </TableHeaderColumn>
              <TableHeaderColumn>
                {/*<FormattedMessage
                  id='app.games.table.title'
                  defaultMessage="Title"
                />*/}
                Title
              </TableHeaderColumn>
              <TableHeaderColumn>
              {/*<FormattedMessage
                  id='app.games.table.black'
                  defaultMessage="Black"
                />*/}
                Black
              </TableHeaderColumn>
              <TableHeaderColumn>
              {/*<FormattedMessage
                  id='app.games.table.white'
                  defaultMessage="White"
                />*/}
                 White
              </TableHeaderColumn>
              <TableHeaderColumn>
              {/*<FormattedMessage
                  id='app.games.table.result'
                  defaultMessage="Result"
                />*/}
                 Result
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.kifus.map((kifu, index) => 
              <Kifu {...kifu} key={index}/>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

