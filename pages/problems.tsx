import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useRouter} from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {isMobile} from 'react-device-detect';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import {useQueryParam} from 'use-query-params';
import {Popup} from 'semantic-ui-react';

import {fetchProblems, selectTags, fetchTags} from 'slices';

import {
  useDispatch,
  useTypedSelector,
  useOutsideClick,
  useGenericData,
} from 'utils';
import {
  FilterButton,
  ProblemCard,
  Spinner,
  ProblemFilterPanel,
} from 'components/common';

const Problems = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [problemList, setProblemList] = useState([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [tags] = useGenericData(useTypedSelector(state => selectTags(state)));
  const problems = useTypedSelector(state => state.problems);
  const [levelParam = 'all', setLevelParam] = useQueryParam<string>('level');
  const [tagsParam = 'all', setTagsParam] = useQueryParam<string>('tags');
  const router = useRouter();

  const handleFetchProblems = () => {
    const params = {
      level: levelParam,
      tags: tagsParam,
    };
    dispatch(fetchProblems({params})).then((obj: any) => {
      if (obj && obj.payload) {
        setProblemList((oldProblemList: any) =>
          oldProblemList.concat(obj.payload.data.data)
        );
      }
    });
  };

  useOutsideClick(ref, () => {
    if (filter) setFilter(false);
  });

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const refetchProblems = useCallback(
    (levelParam, tagsParam) => {
      const params = {
        level: levelParam,
        tags: tagsParam,
      };
      dispatch(fetchProblems({params})).then((obj: any) => {
        if (obj && obj.payload) {
          setProblemList(obj.payload.data.data);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    refetchProblems(levelParam, tagsParam);
  }, [levelParam, tagsParam, refetchProblems]);

  let items: any = [];
  if (problemList.length > 0) {
    items = problemList.map((p: any, index) => (
      <ProblemCard key={`p-index-${index}`} problem={p} />
    ));
  }

  return (
    <>
      <div className="flex flex-row items-center px-3 py-1 lg:px-1 lg:py-2">
        <Popup
          on="click"
          wide="very"
          pinned
          position="bottom left"
          trigger={
            <div>
              <FilterButton />
            </div>
          }
        >
          <ProblemFilterPanel
            activeLevel={levelParam}
            activeTags={tagsParam}
            setLevelParam={setLevelParam}
            setTagsParam={setTagsParam}
            tags={tags}
          />
        </Popup>
        <div className="text-base ml-4">Level: {levelParam}</div>
        <div className="text-base ml-4">Tags: {tagsParam}</div>
        {(levelParam !== 'all' || tagsParam !== 'all') && (
          <div>
            <button
              onClick={() => {
                setLevelParam('all');
                setTagsParam('all');
              }}
              className="text-base underline ml-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={() => {
          handleFetchProblems();
        }}
        hasMore={true}
        loader={<></>}
        endMessage={
          <p className="text-center text-sm">
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => {
          refetchProblems(levelParam, tagsParam);
        }}
        pullDownToRefresh={isMobile}
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <span className="text-center text-sm">
            <h3>&#8595; Pull down to refresh</h3>
          </span>
        }
        releaseToRefreshContent={
          <span className="text-center text-sm">
            &#8593; Release to refresh
          </span>
        }
      >
        {problems.status === 'loading' && items.length === 0 && (
          <div className="mt-20">
            <Spinner />
          </div>
        )}
        {items.length > 0 && (
          <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 lg:pr-2 lg:pl-0 p-2">
            {items}
          </div>
        )}
        {problems.status === 'succeeded' && items.length === 0 && (
          <div className="text-center">
            <div className="mt-10 text-2xl">No Data</div>
            <button
              onClick={() => {
                setLevelParam('all');
                setTagsParam('all');
              }}
              className="underline p-5 mt-2"
            >
              Clear Filters
            </button>
            <button
              onClick={() => {
                router.back();
              }}
              className="underline p-5"
            >
              Go back
            </button>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
};

export default Problems;
