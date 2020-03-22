import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, QueryRenderer } from 'react-relay';

import ProblemFilterBar from '../components/ProblemFilterBar';
import environment from '../environment';

import "./Problems.scss";

const Problems = () => (
  <div>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ProblemsQuery {
          tagFilter
          rangeFilter
          ranges
          settings {
            isFilterMenuOpen
          }
          tags(last: 100) {
            ...ProblemFilterBar_tags
            id
            name
          }
          problems(last: 100) {
            id,
            rank,
            whofirst,
            previewImgR1 {
              x300
            }
          }
        }
      `}
      variables={{}}
      render={({error, props}: { error: any, props: any}) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return (
            <div className="loading">
              <i className="fa fa-spinner fa-pulse fa-fw" />
            </div>
          )
        }
        return (
          <div>
            <ProblemFilterBar
              isFilterMenuOpen={props.settings.isFilterMenuOpen}
              tags={props.tags}
              ranges={props.ranges}
              tagFilter={props.tagFilter}
              rangeFilter={props.rangeFilter}
            />
            { console.log('props', props) }
            {
              props.problems.map((i: any) => (
                <div key={i.id} className="puzzle-card">
                  <Link to={`/problems/${i.id}`}>
                    <img src={i.previewImgR1.x300} alt="" />
                  </Link>
                  <div className="puzzle-info">
                    <span>Level: {i.rank}</span>
                    { i.whofirst === 'Black First' ? <div className="black-ki-shape" /> : <div className="white-ki-shape" /> }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }}
    />
    <div className="clearfix" />
  </div>
)

export default Problems;
