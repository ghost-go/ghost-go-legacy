import React, { useEffect, useCallback, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";
import "react-lazy-load-image-component/src/effects/opacity.css";

import {
  closeProblemFilterVisible,
  fetchProblems,
  selectUI,
  selectTags,
  toggleProblemFilterVisible,
  fetchTags,
  setProblemFilterTags,
  setProblemFilterLevel,
} from "slices";
import {
  useDispatch,
  useTypedSelector,
  useOutsideClick,
  useGenericData,
} from "utils";
import { FilterButton, ProblemCard, Tag } from "components/common";
import {} from "slices/tagSlice";

const LEVEL_LIST = ["18k-10k", "10k-5k", "5k-1d", "1d-3d", "3d-6d"];

const Problems = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [problemList, setProblemList] = useState([]);
  const {
    problemFilterVisible,
    problemFilterLevel,
    problemFilterTags,
  } = useTypedSelector((state) => selectUI(state));

  const [tags] = useGenericData(useTypedSelector((state) => selectTags(state)));

  useOutsideClick(ref, () => {
    if (problemFilterVisible) {
      dispatch(closeProblemFilterVisible());
    }
  });

  const handleFetchProblems = useCallback(() => {
    dispatch(
      fetchProblems({
        params: {
          level: problemFilterLevel || "all",
          tags: problemFilterTags.join(),
        },
      })
    ).then((obj: any) => {
      if (obj && obj.payload) {
        setProblemList((oldProblemList: any) =>
          oldProblemList.concat(obj.payload.data.data)
        );
      }
    });
  }, [dispatch, problemFilterLevel, problemFilterTags]);

  useEffect(() => {
    dispatch(fetchTags());
    handleFetchProblems();
  }, [handleFetchProblems, dispatch]);

  let items: any = [];
  if (problemList.length > 0) {
    items = problemList.map((p: any) => <ProblemCard key={p.id} problem={p} />);
  }

  return (
    <>
      <div className="flex flex-row items-center px-3 py-1 lg:px-1 lg:py-2">
        <FilterButton
          onClick={() => {
            dispatch(toggleProblemFilterVisible());
          }}
        />
        <div className="text-base ml-4">
          Level: {problemFilterLevel || "ALL"}
        </div>
        <div className="text-base ml-4">
          Tags:{" "}
          {problemFilterTags.length > 0 ? problemFilterTags.join(",") : "ALL"}
        </div>
      </div>
      <div
        ref={ref}
        className={`absolute transition transform origin-top-left ${
          problemFilterVisible ? "scale-100 opacity-1" : "scale-50 opacity-0"
        } bg-white shadow-md rounded-sm max-w-full lg:max-w-2xl z-10 p-2 border mx-2.5 lg:mx-1`}>
        <div>
          <div className="block font-semibold text-gray-400 mb-2">LEVEL</div>
          {LEVEL_LIST.map((l) => (
            <Tag
              key={l}
              onClick={() => {
                dispatch(setProblemFilterLevel(l));
                dispatch(closeProblemFilterVisible());
                handleFetchProblems();
              }}>
              {l}
            </Tag>
          ))}
        </div>
        <div>
          <div className="block font-semibold text-gray-400 mb-2">TAGS</div>
          {tags &&
            tags.data.map(({ attributes: { name } }: any) => (
              <Tag
                key={`t-${name}`}
                onClick={() => {
                  dispatch(setProblemFilterTags([name]));
                  dispatch(closeProblemFilterVisible());
                  handleFetchProblems();
                }}>
                {name}
              </Tag>
            ))}
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={() => {
          handleFetchProblems();
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center text-sm">
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => {
          handleFetchProblems();
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
        }>
        <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 lg:pr-2 lg:pl-0 p-2">
          {items}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Problems;
