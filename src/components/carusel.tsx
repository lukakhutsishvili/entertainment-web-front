import { Movie } from "../pages/home";

const Carusel: React.FC<{ data: Movie[] }> = ({ data }) => {
  return (
    <>
      <h2 className="text-[20px] font-light pl-4 mt-6 text-white">Trending</h2>
      <div>
        <div className="relative overflow-hidden mt-4 px-4 h-[140px]">
          <div className=" h-[140px] gap-4 slide-track overflow-hidden  absolute   flex">
            {data
              ?.filter((item) => item.isTrending === true)
              .map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg  relative cursor-pointer h-full min-w-[240px] caruseldiv bg-no-repeat flex flex-col"
                  style={{
                    backgroundImage: `url(${item.thumbnail.trending.small})`,
                    backgroundSize: "100% 100% ",
                  }}
                >
                  <div className="absolute rounded-[8px]  hoverdiv w-full h-full bg-hoverDiv flex justify-center items-center">
                    <div className="pl-[9px]  h-[30px] rounded-[28.5px] pr-[23px] gap-[10px] flex justify-between items-center bg-[rgba(255,255,255,0.25)]">
                      <img
                        className="w-[15px] h-[15px ]"
                        src="/assets/icon-play.svg"
                      />
                      <p className="text-[12px] font-medium text-white">Play</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 mt-2 ml-auto mr-2 flex items-center justify-center bg-bookmarkDiv rounded-[50%] relative z-30">
                    <img src="/assets/icon-bookmark-empty.svg" />
                  </div>
                  <div className="text-[12px] font-normal text-white opacity-[0.75] flex mt-[46px] gap-[9px] items-center ml-4">
                    <p>{item.year}</p>
                    <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                    <div className="flex items-center">
                      <img
                        className="w-[12px] h-[12px]"
                        src="/assets/icon-nav-movies.svg"
                      />
                      <span className="ml-[6px]">{item.category}</span>
                    </div>
                    <div className="rounded-[50%] bg-white w-[3px] h-[3px] opacity-[0.5]"></div>
                    <p>{item.rating}</p>
                  </div>
                  <h3 className="text-[15px] font-medium ml-4 mt-1 text-white">
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
