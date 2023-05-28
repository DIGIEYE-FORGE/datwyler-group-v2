import { AiOutlineSearch } from "react-icons/ai";
import ReactPlayer from "react-player";
import { ReactComponent as Question } from "../../../../assets/icons/question.svg";
import { ReactComponent as VideoIcons } from "../../../../assets/icons/video-icon.svg";
import { ReactComponent as Fleshscrolle } from "../../../../assets/icons/flesh-scrolle.svg";
import "./style.scss";

import Button from "../../../../components/button";
import { IconButton } from "../dashboard";
const data = [
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
  {
    question: "What is the difference between a free and a paid account?",
    answer:
      "A free account allows you to create up to 3 projects and 3 teams. A paid account allows you to create unlimited projects and teams.",
  },
];

const dataVideo = [
  {
    title: "Datwyler´s modular Mini Data Centre for EDGE Computing",
    urlVideo: "https://www.youtube.com/watch?v=dijjhakgZrw",
  },
  {
    title: "DATWYLER MICRO AND MINI DATA CENTRES",
    urlVideo: "https://www.youtube.com/watch?v=HnJO0Df5wtU",
  },
  {
    title: "Mini data centres for dairy farm in Oman",
    urlVideo: "https://www.youtube.com/watch?v=A8QFZcH4Rkw",
  },
  {
    title: "Datwyler Smart Modular Data Centre Solution",
    urlVideo: "https://www.youtube.com/watch?v=A8lgBXxfz3k",
  },
];
function SupportTab() {
  return (
    <div className="support-tab w-full  flex flex-col pt-[2rem] items-center gap-[1rem] min-w-[50rem]">
      <div className="font-bold text-[1.7rem]">Welcome! How can we help?</div>
      <div className="relative bg-white dark:bg-primary-dark rounded   flex items-center gap-[0.5rem] w-[25%] h-[3rem] min-w-[20rem]">
        <input
          type="text"
          className="border-none  pl-[2.5rem] text-[1.3rem] h-full w-full"
          placeholder="search"
        />
        <AiOutlineSearch className="absolute left-2 text-[1.5rem]  text-gray-400" />
      </div>

      <div className="flex flex-col items-center gap-[1rem] w-full bg-white dark:bg-primary-dark mt-4">
        <Question />
        <div className="font-bold text-black dark:text-white text-[1.7rem]">
          Frequently Asked Questions
        </div>
        <div>
          Have a question about something specific? Find the answer here.
        </div>
        <div className="px-6 md:w-[70%] lg:w-[90%] max-w-[80rem] grid grid-rows-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-5 grid-flow-dense ">
          {data.map((item, index) => (
            <div
              key={index}
              className="min-h-[14rem] bg-[#7f7f7f]/10 p-3"
              style={{
                boxShadow: "0px 0px 2px rgba(6, 6, 6, 0.25)",
                borderRadius: "10px",
              }}
            >
              <div className="text-[1.2rem] font-bold">{item.question}</div>
              <div className="text-[0.9rem] mt-2">{item.answer}</div>
            </div>
          ))}
        </div>
        <div className="w-[60%]  h-[0.2rem] bg-[#0091AE]/[.3] mt-4"></div>
        <div className="flex flex-col gap-[1rem] items-center mt-4 ">
          <VideoIcons />
          <div className="font-bold text-[1.7rem]">Video Tutorials</div>
          <div className="">
            Quick tutorial videos to help you and your team be successful in
            Datwyler.
          </div>
        </div>
        <div className="flex gap-[0.5rem] items-center">
          <IconButton
            className="w-[4rem] h-[4rem] flex justify-center items-center"
            onClick={() => {
              const scroll = document.getElementById("scroll");
              scroll ? (scroll.scrollLeft -= 23 * 16) : null;
              // animation
              scroll?.classList.add("animate-scroll");
              setTimeout(() => {
                scroll?.classList.remove("animate-scroll");
              }, 500);
            }}
          >
            <Fleshscrolle className="rotate-180 text-sm" />
          </IconButton>
          <ul
            className="flex  p-3 gap-[1rem] w-[23rem] lg:w-[46rem] xl:w-[69rem] overflow-scroll items-center list-none"
            id="scroll"
            style={{ scrollBehavior: "smooth" }}
          >
            {dataVideo.map((item, index) => (
              <li
                key={index}
                style={{
                  background: "#F1F9FF",
                  boxShadow: "0px 0px 2px rgba(6, 6, 6, 0.25)",
                  borderRadius: "10px",
                  minWidth: "22rem",
                  minHeight: "30rem",
                  padding: "0.5rem",
                }}
              >
                <div className="w-[100%] h-[100%] pt-1">
                  <ReactPlayer
                    url={item.urlVideo}
                    width="100%"
                    height="20rem"
                    className="mt-3"
                  />
                  <div className="text-[1.2rem] font-bold mt-2">
                    {item.title}
                  </div>
                  <div className="">test</div>
                </div>
              </li>
            ))}
          </ul>

          <IconButton
            className="w-[4rem] h-[4rem] flex justify-center items-center"
            onClick={() => {
              const scroll = document.getElementById("scroll");
              scroll ? (scroll.scrollLeft += 23 * 16) : null;
            }}
          >
            <Fleshscrolle />
          </IconButton>
        </div>
        <div className="w-[60%] h-[0.2rem] bg-[#0091AE]/[.3] mt-4"></div>
        <div className="text-[1.7rem]">Can’t find what you’re looking for?</div>
        <div className="">Reach out with questions or feedback any time!</div>
        <Button className="mb-3"> Contact us</Button>
      </div>
    </div>
  );
}

export default SupportTab;
