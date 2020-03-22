import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, createRefetchContainer } from 'react-relay';
import { ROOT_ID } from "relay-runtime";

import ProblemFilterBar from '../components/ProblemFilterBar';
import environment from '../environment';

const root = environment.getStore().getSource().get(ROOT_ID);
console.log(root);

const ProblemList = (props: any) => {
  console.log('query', props.query)
  return(
  <React.Fragment>
    <ProblemFilterBar
      isFilterMenuOpen={props.isFilterMenuOpen}
      tags={props.tags}
      ranges={props.ranges}
      tagFilter={props.tagFilter}
      levelFilter={props.levelFilter}
      refetch={() => {
        console.log(props.tagFilter);
        console.log(props.levelFilter);
        console.log(props.problems);
        console.log(props.relay);
        props.relay.refetch({
          last: 12,
          tags: props.tagFilter,
          level: props.levelFilter
        }, null, () => {
          console.log('Refetch done')
        }, { force: true })
      }}
    />
    { console.log(props.problems) }
    { console.log(props.problems) }
    {
      props.query.problems.map((i: any) => (
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
  </React.Fragment>
  )
}

export default createRefetchContainer(ProblemList, {
  query: graphql`
    fragment ProblemList_query on Query @argumentDefinitions(
      last: { type: Int, defaultValue: 10 }
      tags: { type: String}
      level: { type: String}
    ) {
      problems(last: $last, tags: $tags, level: $level) {
        id,
        rank,
        whofirst,
        previewImgR1 {
          x300
        }
      }
    }
  `
}, graphql`
  query ProblemListRefetchQuery($last: Int!, $tags: String!, $level: String!) {
    ...ProblemList_query @arguments(last: $last, tags: $tags, level: $level)
  }
`)
