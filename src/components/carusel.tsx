import { Movie } from "../pages/home";

const Carusel: React.FC<{ data: Movie[] }> = ({ data }) => {
  return (
    <>
      <h2 className="lg:pl-0 md:mt-[34px] md:text-[32px] text-[20px] font-light pl-4 mt-6 text-white">
        Trending
      </h2>
      <div>
        <div className="lg:pl-0 md:mt-6 md:px-6 relative overflow-hidden mt-4 px-4 h-[140px] md:h-[230px]">
          <div className="md:gap-[40px] md:h-[230px] h-[140px] gap-4 slide-track overflow-hidden  absolute   flex">
            {data
              ?.filter((item) => item.isTrending === true)
              .map((item, index) => (
                <div
                  key={index}
                  className=" md:min-w-[470px] rounded-lg  relative cursor-pointer h-full min-w-[240px] caruseldiv bg-no-repeat flex flex-col"
                  style={{
                    backgroundImage: `url(${
                      window.innerWidth >= 768
                        ? item.thumbnail.trending.large
                        : item.thumbnail.trending.small
                    })`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute rounded-[8px]  hoverdiv w-full h-full bg-hoverDiv flex justify-center items-center">
                    <div className="md:h-[48px] md:gap-[19px] pl-[9px]  h-[30px] rounded-[28.5px] pr-[23px] gap-[10px] flex justify-between items-center bg-[rgba(255,255,255,0.25)]">
                      <img
                        className="w-[15px] h-[15px ] md:w-[30px] md:h-[30px]"
                        src="/assets/icon-play.svg"
                      />
                      <p className="md:text-[18px] text-[12px] font-medium text-white">
                        Play
                      </p>
                    </div>
                  </div>
                  <div className="hover:bg-white svgDiv md:mt-4 md:mr-6 w-8 h-8 mt-2 ml-auto mr-2 flex items-center justify-center bg-bookmarkDiv rounded-[50%] relative z-30">
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
                          stroke-width="1.5"
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
                  <div className="md:mt-[106px] md:text-[15px] text-[12px] font-normal text-white  flex mt-[46px] gap-[9px] items-center ml-4">
                    <p className="opacity-[0.75]">{item.year}</p>
                    <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                    <div className="flex items-center">
                      <svg
                        width="12"
                        height="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                          fill="#FFF"
                          opacity=".75"
                        />
                      </svg>
                      <span className="ml-[6px] opacity-[0.75] ">
                        {item.category}
                      </span>
                    </div>
                    <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                    <p className="opacity-[0.75]">{item.rating}</p>
                  </div>
                  <h3 className="md:text-[24px] text-[15px] font-medium ml-4 mt-1 text-white">
                    {item.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carusel;
