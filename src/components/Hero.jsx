import React from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  // IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const placeholders = [
    "Enter your prompt here",
    "Fix this code / snippet",
    // "Where is Andrew Laeddis Hiding?",
    // "Write a Javascript method to reverse a string",
    // "How to assemble your own PC?",
  ];

  const links = [
    {
      label: "New Chat",
      href: "#",
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
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-cyan-500  whitespace-pre"
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
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      </Link>
    );
  };

  const Dashboard = () => {
    return (
      <div className="flex flex-1 justify-center items-center w-[100%] h-[100%]">
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
          <div className=" w-full ">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              // onChange={handleChange}
              // onSubmit={onSubmit}
            />
          </div>
        </section>
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
    </div>
  );
};

export default Hero;
