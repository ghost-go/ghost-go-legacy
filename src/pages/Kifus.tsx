import React, { useEffect, useCallback, useState } from "react";
import { fetchKifus } from "slices";
import { useGenericData, useTypedSelector, useDispatch } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";

const Kifus = () => {
  const dispatch = useDispatch();

  const [kifus] = useGenericData(useTypedSelector((state) => state.kifus));
  const [kifuList, setKifuList] = useState([]);
  const handleFetchKifus = useCallback(
    (q) => {
      dispatch(fetchKifus({ params: { q } })).then((obj: any) => {
        console.log("obj", obj);
        setKifuList((oldKifuList: any) =>
          oldKifuList.concat(obj.payload.data.data)
        );
      });
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchKifus({});
  }, [handleFetchKifus]);

  const items: any = [];
  if (kifuList.length > 0) {
    kifuList.forEach((p: any) => {
      const { name, whofirst, image_url } = p.attributes;
      items.push(
        <div key={p.id} className="w-60 h-60">
          <div>
            <img src={image_url} alt={p.id} />
          </div>
          <div className="flex flex-row justify-between p-2">
            <div>{name}</div>
            <div>{whofirst}</div>
          </div>
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
          handleFetchKifus({});
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>Yay! You have seen it all</b>
        //   </p>
        // }
        // below props only if you need pull down functionality
        refreshFunction={() => {
          handleFetchKifus({});
        }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }>
        <div className="flex flex-row flex-wrap">{items}</div>
      </InfiniteScroll>
    </>
  );
};

export default Kifus;
