/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const PostReactions = ({ post }: { post: any }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Handler to toggle popup visibility
  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <div className="post-reactions-container" style={{ position: "relative" }}>
      {/* Reaction icon + count, clickable */}
      <button
        onClick={togglePopup}
        style={{ background: "none", border: "none", cursor: "pointer" }}
        aria-label="Show users who reacted"
      >
        {post?.totalReactions > 0 && (
          <img
            src="assets/images/react_img1.png"
            alt="Reactions"
            className="_react_img1"
          />
        )}
        {post?.totalReactions - 1 > 0 && (
          <span className="_feed_inner_timeline_total_reacts_para">
            {post.totalReactions - 1}+
          </span>
        )}
      </button>

      {/* Popup */}
      {showPopup && (
        <div
          className="reaction-popup"
          style={{
            position: "absolute",
            top: "30px",
            left: 0,
            zIndex: 100,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "6px",
            minWidth: "200px",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          <h4 style={{ marginBottom: "8px" }}>Users who reacted</h4>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {post.reactedUsers && post.reactedUsers.length > 0 ? (
              post.reactedUsers.map(({ user, type }: any) =>
                user ? (
                  <li key={user._id} style={{ marginBottom: "6px" }}>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>{" "}
                    — <em>{type}</em>
                  </li>
                ) : null,
              )
            ) : (
              <li>No reactions yet.</li>
            )}
          </ul>
          <button
            onClick={togglePopup}
            style={{
              marginTop: "8px",
              backgroundColor: "#eee",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PostReactions;
