import { Movie } from "../pages/home";

const SearchBody: React.FC<{ filteredSearchData: Movie[]; submit: string }> = ({
  filteredSearchData,
  submit,
}) => {
  return (
    <>
      <h2 className="md:text-[32px] text-[20px] font-light pl-4 mt-6 text-white">
        Found{" "}
        {
          filteredSearchData?.filter((item) =>
            item.title.toLowerCase().includes(submit.toLowerCase())
          ).length
        }{" "}
        results for {`'${submit}'`}
      </h2>
      <div className="lg:pr-9 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 md:grid-cols-3 md:gap-x-[29px] md:gap-y-6 grid grid-cols-2 gap-[15px] px-4 mt-6">
        {filteredSearchData
          ?.filter((item) =>
            item.title.toLowerCase().includes(submit.toLowerCase())
          )
          .map((item, index) => {
            return (
              <div key={index}>
                <div className="relative rounded-lg caruseldiv overflow-hidden">
                  <div className="absolute rounded-[8px]  hoverdiv w-full h-full bg-hoverDiv flex justify-center items-center">
                    <div className="lg:h-[48px] lg:gap-[19px] pl-[9px]  h-[30px] rounded-[28.5px] pr-[23px] gap-[10px] flex justify-between items-center bg-[rgba(255,255,255,0.25)]">
                      <img
                        className="lg:w-[30px] lg:h-[30px] w-[15px] h-[15px ]"
                        src="/assets/icon-play.svg"
                      />
                      <p className="lg:text-[18px] text-[12px] font-medium text-white">
                        Play
                      </p>
                    </div>
                  </div>
                  <img
                    className="w-full md:hidden"
                    src={item.thumbnail.regular.small}
                  />
                  <img
                    className="w-full hidden md:block lg:hidden"
                    src={item.thumbnail.regular.medium}
                  />
                  <img
                    className="w-full hidden lg:block"
                    src={item.thumbnail.regular.large}
                  />
                  <div className="hover:bg-white svgDiv md:top-4 md:right-4 w-8 h-8 top-2  right-2 flex items-center justify-center bg-bookmarkDiv rounded-[50%] absolute z-30">
                    {!item.isBookmarked ? (
                      <svg
                      className="path"
                        width="12"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="path"
                          d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                          stroke="#FFF"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    ) : (
                      <svg
                      className="path"
                        width="12"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="path"
                          d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                          fill="#FFF"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="md:text-[13px] text-[11px] font-light text-white  flex mt-[8px] gap-[6px] items-center">
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
                  <div className="rounded-[50%] bg-white w-[3px] h-[3px]  opacity-[0.5] "></div>
                  <p className="opacity-[0.75]">{item.rating}</p>
                </div>
                <h3 className="md:text-[18px] text-[15px] font-medium mt-1 text-white">
                  {item.title}
                </h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchBody;
