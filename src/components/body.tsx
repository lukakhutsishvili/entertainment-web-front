import { Movie } from "../pages/home";

const Body: React.FC<{ filteredData: Movie[]; children: string }> = ({
  filteredData,
  children,
}) => {
  return (
    <section className="px-4 mt-6">
      <h1 className="text-[20px] font-light text-white mb-6">
        {children}
      </h1>
      <div className="grid grid-cols-2 gap-[15px]">
        {filteredData.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              <div className="relative rounded-lg caruseldiv overflow-hidden">
                <div className="absolute rounded-[8px]  hoverdiv w-full h-full bg-hoverDiv flex justify-center items-center">
                  <div className="pl-[9px]  h-[30px] rounded-[28.5px] pr-[23px] gap-[10px] flex justify-between items-center bg-[rgba(255,255,255,0.25)]">
                    <img
                      className="w-[15px] h-[15px ]"
                      src="/assets/icon-play.svg"
                    />
                    <p className="text-[12px] font-medium text-white">Play</p>
                  </div>
                </div>
                <img className="w-full" src={item.thumbnail.regular.small} />
                <div className="w-8 h-8 top-2  right-2 flex items-center justify-center bg-bookmarkDiv rounded-[50%] absolute z-30">
                  {item.isBookmarked ? (
                    <img src="/assets/icon-bookmark-empty.svg" />
                  ) : (
                    <img src="/assets/icon-bookmark-full.svg" />
                  )}
                </div>
              </div>
              <div className="text-[11px] font-normal text-white  flex mt-[8px] gap-[6px] items-center">
                <p className="opacity-[0.75]">{item.year}</p>
                <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                <div className="flex items-center">
                  {item.category == "Movie" ? (
                    <img
                      className="w-[12px] h-[12px]"
                      src="/assets/icon-nav-movies.svg"
                    />
                  ) : (
                    <img
                      className="w-[12px] h-[12px]"
                      src="/assets/icon-nav-tv-series.svg"
                    />
                  )}

                  <span className="ml-[6px] opacity-[0.75]">
                    {item.category}
                  </span>
                </div>
                <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                <p className="opacity-[0.75]">{item.rating}</p>
              </div>
              <h3 className="text-[15px] font-medium mt-1 text-white">
                {item.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Body;
