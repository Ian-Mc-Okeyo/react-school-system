import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          School System
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <Link class="nav-item nav-link" to={"/"}>Home</Link>
            </li>
          </ul>
          <div class="navbar-nav ms-auto" style={{textAlign: 'right'}}>       
                <a class="nav-item nav-link" href="#">My progress</a>
                <a class="nav-item nav-link" href="#">Logout</a>
              <Link class="nav-item nav-link" to={"/"}>Home</Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
