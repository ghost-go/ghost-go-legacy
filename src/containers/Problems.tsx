import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import { ROOT_ID } from "relay-runtime";

import ProblemList from './ProblemList';
import environment from '../environment';

import "./Problems.scss";

const root = environment.getStore().getSource().get(ROOT_ID);
console.log(root);

const Problems = () => (
  <div>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ProblemsQuery($last: Int!, $tags: String!, $level: String!) {
          tagFilter
          levelFilter
          ranges
          settings {
            isFilterMenuOpen
          }
          tags(last: 100) {
            ...ProblemFilterBar_tags
            id
            name
          }
          ...ProblemList_query @arguments(last: $last, tags: $tags, level: $level)
        }
      `}
      variables={{
        last: 12,
        tags: 'all',
        level: 'all'
      }}
      render={({error, props}: { error: any, props: any}) => {
        console.log(props);
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
            { console.log('props', props) }
            <ProblemList
              query={props}
              isFilterMenuOpen={props.settings.isFilterMenuOpen}
              problems={props.problems}
              ranges={props.ranges}
              tags={props.tags}
              tagFilter={props.tagFilter}
              levelFilter={props.levelFilter}
            ></ProblemList>
          </div>
        )
      }}
    />
    <div className="clearfix" />
  </div>
)

export default Problems;
