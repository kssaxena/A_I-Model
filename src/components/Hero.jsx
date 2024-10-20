import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  // IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { FaCircleArrowRight, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Nova from "../assets/Gemini_Generated_Image_t14tj3t14tj3t14t-removebg-preview.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addSearchMessage, addBotReply } from "../utils/SearchSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Hero = () => {
  // const placeholders = [
  //   "Enter your prompt here",
  //   "Fix this code / snippet",
  //   // "Where is Andrew Laeddis Hiding?",
  //   // "Write a Javascript method to reverse a string",
  //   // "How to assemble your own PC?",
  // ];

  const handleReload = () => {
    window.location.reload();
  };

  const links = [
    {
      label: "New Chat",
      href: { handleReload },
      icon: (
        <FaPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Profile",
    //   href: "#",
    //   icon: (
    //     <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];
  const [open, setOpen] = useState(false);

  const Logo = () => {
    return (
      <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        <img
          // className="h-10 w-10"
          width={100}
          src={Nova}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-cyan-500  whitespace-pre text-xl"
        >
          NOVA
        </motion.span>
      </Link>
    );
  };

  const LogoIcon = () => {
    return (
      <Link
        href="#"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      >
        {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
        <img
          // className="h-10 w-10"
          width={100}
          src={Nova}
        />
      </Link>
    );
  };

  const Dashboard = () => {
    const [searchMessage, setSearchMessage] = useState("");
    const [botMessage, setBotMessage] = useState("");
    const dispatch = useDispatch();

    const handelInput = (e) => {
      setSearchMessage(e.target.value);
    };

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    async function run() {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // const prompt = "Write a story about a magic backpack.";

      const result = await model.generateContent(searchMessage);
      const response = await result.response;
      const text = response.text();
      setBotMessage(text);
      console.log(text);
    }

    const handelSendMessage = async () => {
      dispatch(addSearchMessage(searchMessage));
      await run();
      dispatch(addBotReply(botMessage));
      setSearchMessage("");
    };

    return (
      <div className="flex flex-1 flex-col justify-center items-center w-[100%] h-[100%]">
        <div className="flex h-1/4 w-full justify-end items-start p-10">
          <section className=" flex flex-col justify-end items-end">
            <div className="flex justify-center items-center w-full">
              <img
                // className="h-10 w-10"
                width={100}
                src={Nova}
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <h1 className="text-white uppercase select-none">nova</h1>
            </div>
          </section>
        </div>
        <section className="w-full h-3/4 flex justify-evenly items-center flex-col ">
          <div className="">
            <motion.h1
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-bold lg:text-5xl bg-gradient-to-r from-red-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent p-4  text-4xl"
            >
              How can I help you ?
            </motion.h1>
          </div>
          <div className=" w-full flex flex-col justify-center items-center">
            {/*            
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              // onChange={handleChange}
              // onSubmit={onSubmit}
            /> */}
            <div className="searchBox w-full flex justify-center items-center">
              <form className="flex w-[50%] rounded-full border p-1">
                <input
                  onChange={handelInput}
                  value={searchMessage}
                  onKeyPress={(e) => e.key === "Enter" && handelSendMessage}
                  name="prompt"
                  type="text"
                  placeholder="Enter prompt"
                  className="w-full h-14 rounded-full bg-transparent text-neutral-300 p-5 outline-none"
                />
                <button
                  onClick={handelSendMessage}
                  className="h-14 w-14 rounded-full text-white text-sm"
                >
                  <FaCircleArrowRight className="h-full w-full text-neutral-500 hover:text-cyan-500 duration-300 ease-in-out" />
                </button>
              </form>
            </div>
            <h1 className="text-neutral-400 text-xs">
              ** Nova may display inaccurate solutions, so please check it once.{" "}
            </h1>
          </div>
          {/* <div className="flex"></div> */}
        </section>
      </div>
    );
  };

  const ReplyArea = () => {
    const searchMessage = useSelector((store) => store.search.searchMessage);

    if (!searchMessage) return;

    return (
      <div className="flex flex-col gap-2 w-full bg-red-400 ">
        {searchMessage.map((query, index) => {
          return (
            <div
              key={index}
              className={`flex h-10 ${
                query.userType === "user"
                  ? "justify-end mr-10"
                  : "justify-start ml-10"
              }`}
            >
              {/* {console.log({ query })} */}
              <div className="border p-2 rounded-lg text-lg">
                {query.message}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="lg:flex justify-center items-center w-[100%] h-[100%]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-7 ">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
      <div>
        <ReplyArea />
      </div>
    </div>
  );
};

export default Hero;
