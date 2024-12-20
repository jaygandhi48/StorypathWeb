import React, { useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar component provides navigation functionality for the application.
 *
 * It includes:
 * - A responsive navigation bar with links to various pages.
 * - A dropdown menu for small screens (mobile view) to access "Projects" and its sub-items.
 * - Navigation links to "Add/Edit Projects" and "All Projects" pages, organized under "Projects" in the dropdown and on larger screens.
 * - Uses React Router's `NavLink` for route-based navigation.
 * - Dynamically adjusts its layout for mobile and desktop views using Tailwind CSS classes.
 *
 * Features:
 * - For mobile devices, the navbar includes a dropdown with links to project-related actions.
 * - For larger screens (desktop), it displays a horizontal menu.
 * - The "Storypath" brand name is linked to the home page.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/allProjects">Projects</NavLink>
              <ul className="p-2">
                <li>
                  <NavLink to="/project/addEditProjects">
                    Add/Edit Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allProjects">All Projects</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <NavLink className="btn btn-ghost text-xl" to="/">
          Storypath
        </NavLink>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Projects</summary>
              <ul className="p-2">
                <li>
                  <NavLink to="/project/addEditProjects">
                    Add/Edit Project
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allProjects">All Projects</NavLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
