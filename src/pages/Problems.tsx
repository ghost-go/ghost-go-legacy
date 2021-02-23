import React, { useEffect, useCallback, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProblems } from "slices";
import { useGenericData, useTypedSelector, useDispatch } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";

const Problems = () => {
  const dispatch = useDispatch();

  const [problems] = useGenericData(
    useTypedSelector((state) => state.problems)
  );
  const [problemList, setProblemList] = useState([]);
  const handleFetchProblems = useCallback(
    (q) => {
      dispatch(fetchProblems({ params: { q } })).then((obj: any) => {
        console.log("obj", obj);
        setProblemList((oldProblemList: any) =>
          oldProblemList.concat(obj.payload.data.data)
        );
      });
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchProblems({});
  }, [handleFetchProblems]);

  const items: any = [];
  if (problemList.length > 0) {
    problemList.forEach((p: any) => {
      const { rank, whofirst, image_url } = p.attributes;
      items.push(
        <div
          key={p.id}
          className="relative"
          style={{ paddingTop: "calc(100% + 25px)" }}>
          <img className="absolute w-full top-0" src={image_url} alt={p.id} />
          <div className="absolute left-2 bottom-0 text-base">
            LEVEL: {rank}
          </div>
          {whofirst === "Black First" ? (
            <div className="absolute right-2 bottom-0 rounded-full h-5 w-5 flex items-center justify-center bg-black"></div>
          ) : (
            <div className="absolute right-2 bottom-0 rounded-full h-5 w-5 flex items-center justify-center bg-white border border-black"></div>
          )}
        </div>
      );
    });
  }

  console.log("items", items);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={() => {
          handleFetchProblems({});
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        // below props only if you need pull down functionality
        refreshFunction={fetchProblems}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }>
        <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-col-2 gap-4 pl-3 pr-6 pt-1">
          {items}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Problems;
