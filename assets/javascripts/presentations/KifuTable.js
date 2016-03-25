import React, { Component, PropTypes } from 'react'
import Kifu from './Kifu'
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import lang from '../components/lang';

export default class KifuTable extends Component {
  render() {
    return(
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <FormattedMessage
                id='app.games.table.date'
                defaultMessage="Date"
              />
            </th>
            <th>
              <FormattedMessage
                id='app.games.table.title'
                defaultMessage="Title"
              />
            </th>
            <th>
              <FormattedMessage
                id='app.games.table.black'
                defaultMessage="Black"
              />
            </th>
            <th>
              <FormattedMessage
                id='app.games.table.white'
                defaultMessage="White"
              />
            </th>
            <th>
              <FormattedMessage
                id='app.games.table.result'
                defaultMessage="Result"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.kifus.map((kifu, index) => 
            <Kifu {...kifu} key={index}/>
          )}
        </tbody>
      </table>
    )
  }
}

