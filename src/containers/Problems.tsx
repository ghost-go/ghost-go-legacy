import React from 'react';
import "./Problems.scss";
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import ProblemFilterBar from '../components/ProblemFilterBar';
import { Link } from 'react-router-dom';

interface PrevieImageData {
  x300: String
}

interface ProblemsPageData {
  tags: [TagData]
  problems: [ProblemData]
}

interface TagData {
  id: String,
  name: String,
}

interface ProblemData {
  id: String,
  rank: String,
  whofirst: String,
  previewImgR1: PrevieImageData
}

interface ProblemQueryVar {
  last: number,
  tags: string,
  level: string,
}

const FEED_QUERY = gql`
  query getProblems($last: Int!, $tags: String!, $level: String!) {
    tags(last: 100) {
      id
      name
    }
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

const Problems = () => {
  const { loading, error, data } = useQuery<ProblemsPageData, ProblemQueryVar>(
    FEED_QUERY, {
      variables: {
        last: 10,
        tags: 'all',
        level: 'all'
      }
    }
  );
  if (loading) return (
    <div className="loading">
      <i className="fa fa-spinner fa-pulse fa-fw" />
    </div>
  )
  if (error) return <div>Error</div>
  if (data) {
    return (
      <React.Fragment>
        <ProblemFilterBar />
        {
          data.problems.map((i: any) => (
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
}

export default Problems;