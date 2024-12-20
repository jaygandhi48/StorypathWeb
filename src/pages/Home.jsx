import React from "react";
import Navbar from "../components/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ThreeDcomponent from "../components/ThreeDcomponent";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import tourData from "../data/HomeDisplayData";

/*
/**
 * Home component - The landing page of the Storypath application.
 * 
 * This component displays a welcoming message and introduces users to the platform,
 * where they can explore different types of tours and adventures. It renders different 
 * 3D modeles.
*/
function Home() {
  const [currentmodel, setCurrentModel] = useState(0); // State to track the current 3D model being displayed
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-20 w-full">
        <Navbar />
        <h1 className="text-6xl text-center font-semibold  translate-y-full md:-translate-x-[30%]  text-gray-300 ">
          Welcome <br />
          to Storypath
        </h1>
      </div>
      <img
        className="w-full h-80 sm:h-80 object-cover"
        src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="flex flex-col md:flex-row items-start flex-grow">
        <div className="w-full md:w-1/2 h-[35rem] flex justify-center items-center">
          <button
            className="ml-10"
            onClick={() => {
              // Decrease model index but ensure it stays within bounds
              if (currentmodel > 0) {
                setCurrentModel(currentmodel - 1);
              }
            }}
          >
            <FaChevronLeft />
          </button>
          <ThreeDcomponent componentIdentifier={currentmodel}></ThreeDcomponent>
          <button
            className="mr-10"
            onClick={() => {
              // Decrease model until 2 as there are 3 models
              if (currentmodel < 2) {
                setCurrentModel(currentmodel + 1);
              }
            }}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className=" w-full md:w-1/2 p-4">
          <p className="mt-5 text-2xl font-thin ">
            Storypath, a webapp which lets you create cool locations tours,
            adventure hunts all from your house.
          </p>

          {currentmodel === 0 ? (
            <>
              <h1 className="text-2xl font-bold text-center pt-7">
                {tourData[0].title}
              </h1>
              <p className="text-justify p-5  text-lg leading-10">
                {tourData[0].description}
              </p>
              <div className="flex justify-center">
                <NavLink to="/allProjects" className="btn btn-primary">
                  {tourData[0].buttonText}
                </NavLink>
              </div>
            </>
          ) : currentmodel === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-center pt-7">
                {tourData[1].title}
              </h1>
              <p className="text-justify p-5  text-lg leading-10">
                {tourData[1].description}
              </p>
              <div className="flex justify-center">
                <NavLink to="/allProjects" className="btn btn-primary">
                  {tourData[1].buttonText}
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center pt-7">
                {tourData[2].title}
              </h1>
              <p className="text-justify p-5  text-lg leading-10">
                {tourData[2].description}
              </p>
              <div className="flex justify-center">
                <NavLink to="/allProjects" className="btn btn-primary">
                  {tourData[2].buttonText}
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
