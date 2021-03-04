import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useQueryParam } from "use-query-params";

import {
  closeKifuFilterVisible,
  fetchKifus,
  selectUI,
  toggleKifuFilterVisible,
  selectPlayers,
  fetchPlayers,
} from "slices";
import {
  useDispatch,
  useTypedSelector,
  useOutsideClick,
  useGenericData,
} from "utils";
import { FilterButton, KifuCard, Tag, Spinner } from "components/common";
import {} from "slices/tagSlice";

const Kifus = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [kifuList, setKifuList] = useState([]);
  const { kifuFilterVisible } = useTypedSelector((state) => selectUI(state));
  const [players] = useGenericData(
    useTypedSelector((state) => selectPlayers(state))
  );
  const kifus = useTypedSelector((state) => state.kifus);
  const [playerParam = "all", setPlayerParam] = useQueryParam<string>("player");

  const handleFetchKifus = () => {
    const params = {
      player: playerParam,
    };
    dispatch(fetchKifus({ params })).then((obj: any) => {
      if (obj && obj.payload) {
        setKifuList((oldKifuList: any) =>
          oldKifuList.concat(obj.payload.data.data)
        );
      }
    });
  };

  useOutsideClick(ref, () => {
    if (kifuFilterVisible) {
      dispatch(closeKifuFilterVisible());
    }
  });

  useLayoutEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  const refetchKifus = useCallback(
    (playerParams) => {
      const params = {
        player: playerParams,
      };
      dispatch(fetchKifus({ params })).then((obj: any) => {
        if (obj && obj.payload) {
          setKifuList(obj.payload.data.data);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    refetchKifus(playerParam);
  }, [playerParam, refetchKifus]);

  let items: any = [];
  if (kifuList.length > 0) {
    items = kifuList.map((k: any, index) => (
      <KifuCard key={`p-index-${index}`} kifu={k} />
    ));
  }

  return (
    <>
      <div className="flex flex-row items-center px-3 py-1 lg:px-1 lg:py-2">
        <FilterButton
          onClick={() => {
            dispatch(toggleKifuFilterVisible());
          }}
        />
        <div className="text-base ml-4">Player: {playerParam}</div>
        {playerParam !== "all" && (
          <div>
            <button
              onClick={() => {
                setPlayerParam("all");
              }}
              className="text-base underline ml-4">
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <div
        ref={ref}
        className={`absolute transition transform origin-top-left ${
          kifuFilterVisible
            ? "scale-100 opacity-1"
            : "scale-50 opacity-0 pointer-events-none"
        } bg-white shadow-md rounded-sm max-w-full lg:max-w-2xl z-10 p-2 border mx-2.5 lg:mx-1`}>
        <div>
          <div className="block font-semibold text-gray-400 mb-2">
            Top Players(Top 30 from go ratings)
          </div>
          <Tag
            key={`t-all`}
            onClick={() => {
              setPlayerParam("all");
              dispatch(closeKifuFilterVisible());
            }}>
            all
          </Tag>
          {players &&
            players.data.map(({ attributes: { name, en_name } }: any) => (
              <Tag
                key={`p-${en_name}`}
                onClick={() => {
                  setPlayerParam(en_name);
                  dispatch(closeKifuFilterVisible());
                }}>
                {en_name}
              </Tag>
            ))}
        </div>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={() => {
          handleFetchKifus();
        }}
        hasMore={true}
        loader={<></>}
        endMessage={
          <p className="text-center text-sm">
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => {
          refetchKifus(playerParam);
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
        {kifus.status === "loading" && items.length === 0 && (
          <div className="mt-20">
            <Spinner />
          </div>
        )}
        {items.length > 0 && (
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-2 gap-1 lg:pr-2 lg:pl-0 p-2">
            {items}
          </div>
        )}
        {kifus.status === "succeeded" && items.length === 0 && (
          <div className="text-center">
            <div className="mt-10 text-2xl">No Data</div>
            <button
              onClick={() => {
                setPlayerParam("all");
              }}
              className="underline p-5 mt-2">
              Clear Filters
            </button>
            <button
              onClick={() => {
                window.history.back();
              }}
              className="underline p-5">
              Go back
            </button>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
};

export default Kifus;
