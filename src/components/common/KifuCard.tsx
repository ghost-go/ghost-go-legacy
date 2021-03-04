import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";

const KifuCard = ({ kifu }: { kifu: any }) => {
  const {
    image_url,
    b_name_en,
    w_name_en,
    b_rank,
    w_rank,
    moves_count,
    result,
    date,
  } = kifu.attributes;
  return (
    <div key={kifu.id} className="relative" style={{ paddingTop: "100%" }}>
      <LazyLoadImage
        className="absolute w-full top-0"
        height={0}
        alt={kifu.id}
        effect="opacity"
        wrapperProps={{ style: { display: "block" } }}
        src={image_url}
      />
      <div className="flex flex-col mt-1 px-2 text-xs md:text-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <span className="rounded-full h-3.5 w-3.5 bg-black mr-1 mt-0.5"></span>
            <span>
              {b_name_en}({b_rank})
            </span>
          </div>
          <span className="hidden md:inline">{result}</span>
          {/* <span>{moves_count} Moves</span> */}
        </div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <span className="rounded-full h-3.5 w-3.5 bg-white border border-black mr-1 mt-0.5"></span>
            <span>
              {w_name_en}({w_rank})
            </span>
          </div>
          <span className="hidden md:inline">
            {moment(date).locale("en").format("YYYY-MM-DD")}{" "}
          </span>
        </div>
        <div className="flex md:hidden items-center justify-between">
          <span>{result}</span>
          <span>{moment(date).locale("en").format("YYYY-MM-DD")} </span>
        </div>
      </div>
    </div>
  );
};

export default KifuCard;
