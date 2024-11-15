import React, { useState } from "react";
import { FaCircleArrowRight, FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Nova from "../assets/Gemini_Generated_Image_t14tj3t14tj3t14t-removebg-preview.png";
import { addSearchMessage, addBotReply } from "../utils/SearchSlice"; // Adjust according to your slice
import { IconSettings } from "@tabler/icons-react";
import { OpenAI } from "openai"; // Correct import for OpenAI API v3+

const Hero = () => {
  const [searchMessage, setSearchMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const dispatch = useDispatch();

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
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  // Initialize OpenAI API directly (with dangerouslyAllowBrowser flag)
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use your API key here
    dangerouslyAllowBrowser: true, // Enable this for browser usage (use with caution)
  });

  const handleInput = (e) => {
    setSearchMessage(e.target.value);
  };

  // API request to get the bot reply
  async function run() {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Or use any other available model
        messages: [{ role: "user", content: searchMessage }],
      });

      const botReply = response.choices[0].message.content;
      setBotMessage(botReply); // Set the bot's response here
    } catch (error) {
      console.error("Error generating response:", error);
      setBotMessage("Sorry, I couldn't process your request.");
    }
  }

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault(); // Prevent page reload on form submit

    if (!searchMessage) return; // Don't send empty message
    dispatch(addSearchMessage(searchMessage)); // Dispatch user message
    await run(); // Wait for bot response
    dispatch(addBotReply(botMessage)); // Dispatch bot message
    setSearchMessage(""); // Clear the input field
  };

  const ReplyArea = () => {
    const searchMessages = useSelector((store) => store.search.searchMessage);
    const botReplies = useSelector((store) => store.search.botReply);

    if (!searchMessages || !botReplies) return null;

    return (
      <div className="flex flex-col gap-4 w-full overflow-y-auto p-4">
        {searchMessages.map((query, index) => (
          <div
            key={index}
            className={`flex items-start ${
              query.userType === "user"
                ? "justify-end ml-10"
                : "justify-start mr-10"
            }`}
          >
            <div className="max-w-[70%] bg-blue-500 text-white p-4 rounded-lg shadow-lg text-lg flex items-center">
              {query.message}
            </div>
          </div>
        ))}
        {botReplies.map((reply, index) => (
          <div
            key={index}
            className={`flex items-start ${
              reply.userType === "bot"
                ? "justify-start ml-10"
                : "justify-end mr-10"
            }`}
          >
            <div className="max-w-[70%] bg-gray-700 text-white p-4 rounded-lg shadow-lg text-lg flex items-center">
              {reply.message}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lg:flex justify-center items-center w-[100%] h-[100%]">
      <div className="flex flex-1 flex-col justify-center items-center w-[100%] h-[100%]">
        <div className="flex h-1/4 w-full justify-end items-start p-10">
          <section className="flex flex-col justify-end items-end">
            <div className="flex justify-center items-center w-full">
              <img width={100} src={Nova} />
            </div>
            <div className="flex justify-center items-center w-full">
              <h1 className="text-white uppercase select-none">nova</h1>
            </div>
          </section>
        </div>
        <section className="w-full h-3/4 flex justify-evenly items-center flex-col">
          <motion.h1
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-bold lg:text-5xl bg-gradient-to-r from-red-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent p-4 text-4xl"
          >
            How can I help you ?
          </motion.h1>

          <div className="searchBox w-full flex justify-center items-center flex-col">
            <form className="flex w-[50%] rounded-full border p-1">
              <input
                onChange={handleInput}
                value={searchMessage}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)} // Pass event object
                name="prompt"
                type="text"
                placeholder="Enter prompt"
                className="w-full h-14 rounded-full bg-transparent text-neutral-300 p-5 outline-none"
              />

              <button
                onClick={handleSendMessage}
                className="h-14 w-14 rounded-full text-white text-sm"
              >
                <FaCircleArrowRight className="h-full w-full text-neutral-500 hover:text-cyan-500 duration-300 ease-in-out" />
              </button>
            </form>

            <div className="flex w-full p-20 bg-neutral-900 h-screen">
              <ReplyArea />
            </div>
          </div>
          <h1 className="text-neutral-400 text-xs">
            ** Nova may display inaccurate solutions, so please check it once.
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Hero;
