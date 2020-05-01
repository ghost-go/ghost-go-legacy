// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Dropdown } from 'react-bootstrap';
// import {
//   closeDashboardFilter,
//   toggleDashboardFilter,
//   setDateRangeFilter,
//   setUserRangeFilter,
// } from '../actions/Actions';
// import { fetchDashboard } from '../actions/FetchActions';

const DashboardFilterBar = () => {
  return null;
};

export default DashboardFilterBar;

// function mapStateToProps(state) {
//   return {
//     dateRangeFilter: state.dateRangeFilter,
//     userRangeFilter: state.userRangeFilter,
//     auth: state.ui.auth,
//     ui: state.ui,
//   };
// }

// @connect(mapStateToProps)
// class DashboardFilterBar extends Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     dateRangeFilter: PropTypes.string.isRequired,
//     userRangeFilter: PropTypes.string.isRequired,
//     ui: PropTypes.shape({
//       dashboardFilter: PropTypes.shape({
//         open: PropTypes.bool.isRequired,
//       }),
//     }).isRequired,
//     profile: PropTypes.shape({}).isRequired,
//   }

//   constructor(props) {
//     super(props);

//     this.handleToggle = this.handleToggle.bind(this);
//     this.handleDateChange = this.handleDateChange.bind(this);
//     this.handleUserChange = this.handleUserChange.bind(this);
//   }

//   handleToggle() {
//     this.props.dispatch(toggleDashboardFilter());
//   }

//   handleUserChange(userRange) {
//     const { dispatch, dateRangeFilter, profile } = this.props;
//     dispatch(closeDashboardFilter());
//     dispatch(setUserRangeFilter(userRange));
//     dispatch(fetchDashboard({
//       date_range: dateRangeFilter,
//       user_range: userRange,
//       user_id: profile.sub || profile.user_id,
//     }));
//   }

//   handleDateChange(dateRange) {
//     const { dispatch, userRangeFilter, profile } = this.props;
//     dispatch(closeDashboardFilter());
//     dispatch(setDateRangeFilter(dateRange));
//     dispatch(fetchDashboard({
//       date_range: dateRange,
//       user_range: userRangeFilter,
//       user_id: profile.sub || profile.user_id,
//     }));
//   }

//   render() {
//     return (
//       <div className="page-nav">
//         <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.props.ui.dashboardFilter.open} onToggle={this.handleToggle}>
//           <Dropdown.Toggle>
//             <i className="fa fa-filter" />
//           </Dropdown.Toggle>
//           <Dropdown.Menu className="super-colors">
//             <div key="level">
//               <div className="popover-title">Level</div>
//               <div className="popover-content">
//                 <ul className="tags">
//                   {
//                     ['today', 'yesterday', 'last7days', 'last30days', 'all'].map(range => (
//                       <li key={range} className={`tag ${this.props.dateRangeFilter === range ? 'active' : ''}`}>
//                         <a onClick={() => { this.handleDateChange(range); }} tabIndex={0} onKeyPress={() => {}} role="button">{range}</a>
//                       </li>
//                     ))
//                   }
//                 </ul>
//               </div>
//             </div>
//             <div key="tag">
//               <div className="popover-title">Tags</div>
//               <div className="popover-content">
//                 <ul className="tags">
//                   {
//                     ['onlyme', 'all'].map(range => (
//                       <li key={range} className={`tag ${this.props.userRangeFilter === range ? 'active' : ''}`}>
//                         <a
//                           onClick={() => { this.handleUserChange(range); }}
//                           tabIndex={0}
//                           onKeyPress={() => {}}
//                           role="button"
//                         >
//                           {range}
//                         </a>
//                       </li>
//                     ))
//                 }
//                 </ul>
//               </div>
//             </div>
//           </Dropdown.Menu>
//         </Dropdown>
//         <ul className="page-subnav">
//           <li><a title={`Date Range: ${this.props.dateRangeFilter}`}>{`Date Range: ${this.props.dateRangeFilter}`}</a></li>
//           <li><a title={`Users: ${this.props.userRangeFilter}`}>{`Users: ${this.props.userRangeFilter}`}</a></li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default DashboardFilterBar;
