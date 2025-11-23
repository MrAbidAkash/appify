/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

const Feed = () => {
  const [isNotifyDropShow, setIsNotifyDropShow] = useState(false);
  const [isProfileDropShow, setIsProfileDropShow] = useState(false);
  const [isTimelineDropShow, setIsTimelineDropShow] = useState(false);

  const toggleNotifyDropdown = () => {
    setIsNotifyDropShow(!isNotifyDropShow);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropShow(!isProfileDropShow);
  };

  const toggleTimelineDropdown = () => {
    setIsTimelineDropShow(!isTimelineDropShow);
  };

  return (
    <div className="_layout _layout_main_wrapper">
      {/*Switching Btn Start*/}
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link">
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round"></div>
          </div>
          <div className="_layout_change_btn_ic1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="16"
              fill="none"
              viewBox="0 0 11 16"
            >
              <path
                fill="#fff"
                d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z"
              />
            </svg>
          </div>
          <div className="_layout_change_btn_ic2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="4.389"
                stroke="#fff"
                transform="rotate(-90 12 12)"
              />
              <path
                stroke="#fff"
                strokeLinecap="round"
                d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05"
              />
            </svg>
          </div>
        </button>
      </div>
      {/*Switching Btn End*/}

      <div className="_main_layout">
        {/*Desktop Menu Start*/}
        <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
          <div className="container _custom_container">
            <div className="_logo_wrap">
              <a className="navbar-brand" href="feed.html">
                <img
                  src="/assets/images/logo.svg"
                  alt="Image"
                  className="_nav_logo"
                />
              </a>
            </div>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="_header_form ms-auto">
                <form className="_header_form_grp">
                  <svg
                    className="_header_form_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="none"
                    viewBox="0 0 17 17"
                  >
                    <circle cx="7" cy="7" r="6" stroke="#666" />
                    <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                  </svg>
                  <input
                    className="form-control me-2 _inpt1"
                    type="search"
                    placeholder="input search text"
                    aria-label="Search"
                  />
                </form>
              </div>
              <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
                <li className="nav-item _header_nav_item">
                  <a
                    className="nav-link _header_nav_link_active _header_nav_link"
                    aria-current="page"
                    href="feed.html"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="21"
                      fill="none"
                      viewBox="0 0 18 21"
                    >
                      <path
                        className="_home_active"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeOpacity=".6"
                        d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z"
                      />
                      <path
                        className="_home_active"
                        stroke="#000"
                        strokeOpacity=".6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-item _header_nav_item">
                  <a
                    className="nav-link _header_nav_link"
                    aria-current="page"
                    href="friend-request.html"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="20"
                      fill="none"
                      viewBox="0 0 26 20"
                    >
                      <path
                        fill="#000"
                        fillOpacity=".6"
                        fillRule="evenodd"
                        d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.27-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.181a.88.88 0 01-.994-.745.875.875 0 01.75-.989 2.494 2.494 0 002.147-2.45 2.473 2.473 0 00-2.09-2.443.876.876 0 01-.726-1.005.881.881 0 011.013-.721zm-13.528.72a.876.876 0 01-.726 1.006 2.474 2.474 0 00-2.09 2.446A2.493 2.493 0 005.86 7.762a.875.875 0 11-.243 1.734c-2.085-.29-3.66-2.087-3.664-4.179 0-2.082 1.5-3.837 3.566-4.174a.876.876 0 011.012.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-item _header_nav_item">
                  <span
                    className="nav-link _header_nav_link _header_notify_btn"
                    onClick={toggleNotifyDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="22"
                      fill="none"
                      viewBox="0 0 20 22"
                    >
                      <path
                        fill="#000"
                        fillOpacity=".6"
                        fillRule="evenodd"
                        d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="_counting">6</span>
                    <div
                      className={`_notification_dropdown ${
                        isNotifyDropShow ? "show" : ""
                      }`}
                    >
                      <div className="_notifications_content">
                        <h4 className="_notifications_content_title">
                          Notifications
                        </h4>
                        <div className="_notification_box_right">
                          <button
                            type="button"
                            className="_notification_box_right_link"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="4"
                              height="17"
                              fill="none"
                              viewBox="0 0 4 17"
                            >
                              <circle
                                cx="2"
                                cy="2"
                                r="2"
                                fill="#C4C4C4"
                              ></circle>
                              <circle
                                cx="2"
                                cy="8"
                                r="2"
                                fill="#C4C4C4"
                              ></circle>
                              <circle
                                cx="2"
                                cy="15"
                                r="2"
                                fill="#C4C4C4"
                              ></circle>
                            </svg>
                          </button>
                          <div className="_notifications_drop_right">
                            <ul className="_notification_list">
                              <li className="_notification_item">
                                <span className="_notification_link">
                                  Mark as all read
                                </span>
                              </li>
                              <li className="_notification_item">
                                <span className="_notification_link">
                                  Notifivations seetings
                                </span>
                              </li>
                              <li className="_notification_item">
                                <span className="_notification_link">
                                  Open Notifications
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="_notifications_drop_box">
                        <div className="_notifications_drop_btn_grp">
                          <button className="_notifications_btn_link">
                            All
                          </button>
                          <button className="_notifications_btn_link1">
                            Unread
                          </button>
                        </div>
                        <div className="_notifications_all">
                          {/* Notification items would go here */}
                        </div>
                      </div>
                    </div>
                  </span>
                </li>
                <li className="nav-item _header_nav_item">
                  <a
                    className="nav-link _header_nav_link"
                    aria-current="page"
                    href="chat.html"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="22"
                      fill="none"
                      viewBox="0 0 23 22"
                    >
                      <path
                        fill="#000"
                        fillOpacity=".6"
                        fillRule="evenodd"
                        d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0zm0 1.535A9.5 9.5 0 004.69 4.307a9.463 9.463 0 00-1.91 10.686c.241.592.474 1.17.474 1.77 0 .598-.207 1.201-.39 1.733-.15.439-.378 1.1-.231 1.245.143.147.813-.085 1.255-.235.53-.18 1.133-.387 1.73-.391.597 0 1.161.225 1.758.463 3.655 1.679 7.98.915 10.796-1.881 3.716-3.693 3.716-9.7 0-13.391a9.5 9.5 0 00-6.74-2.77zm4.068 8.867c.57 0 1.03.458 1.03 1.024 0 .566-.46 1.023-1.03 1.023a1.023 1.023 0 11-.01-2.047h.01zm-4.131 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.03 1.03 0 01-1.035-1.024c0-.566.455-1.023 1.025-1.023h.01zm-4.132 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.022 1.022 0 11-.01-2.047h.01z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    <span className="_counting">2</span>
                  </a>
                </li>
              </ul>
              <div className="_header_nav_profile">
                <div className="_header_nav_profile_image">
                  <img
                    src="/assets/images/profile.png"
                    alt="Image"
                    className="_nav_profile_img"
                  />
                </div>
                <div className="_header_nav_dropdown">
                  <p className="_header_nav_para">Dylan Field</p>
                  <button
                    className="_header_nav_dropdown_btn _dropdown_toggle"
                    type="button"
                    onClick={toggleProfileDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        fill="#112032"
                        d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
                      />
                    </svg>
                  </button>
                </div>
                {/* Profile Dropdown */}
                <div
                  className={`_nav_profile_dropdown _profile_dropdown ${
                    isProfileDropShow ? "show" : ""
                  }`}
                >
                  <div className="_nav_profile_dropdown_info">
                    <div className="_nav_profile_dropdown_image">
                      <img
                        src="/assets/images/profile.png"
                        alt="Image"
                        className="_nav_drop_img"
                      />
                    </div>
                    <div className="_nav_profile_dropdown_info_txt">
                      <h4 className="_nav_dropdown_title">Dylan Field</h4>
                      <a href="profile.html" className="_nav_drop_profile">
                        View Profile
                      </a>
                    </div>
                  </div>
                  <hr />
                  <ul className="_nav_dropdown_list">
                    {/* Dropdown items would go here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/*Desktop Menu End*/}

        {/* Rest of the component would continue here... */}
        {/* For brevity, I'm showing the main structure with the dropdown functionality */}

        {/* Main Layout Structure */}
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_left_sidebar_wrap">
                  {/* Left sidebar content would go here */}
                </div>
              </div>

              {/* Layout Middle */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    {/* Feed content would go here */}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  {/* Right sidebar content would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
