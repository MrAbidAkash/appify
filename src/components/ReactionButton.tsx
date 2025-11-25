"use client";

import { useState } from "react";

const REACTIONS = [
  { type: "like", label: "Like", emoji: "👍" },
  { type: "love", label: "Love", emoji: "❤️" },
  { type: "haha", label: "Haha", emoji: "😂" },
  { type: "wow", label: "Wow", emoji: "😮" },
  { type: "sad", label: "Sad", emoji: "😢" },
  { type: "angry", label: "Angry", emoji: "😡" },
];

interface ReactionButtonProps {
  postId: string;
  userId: string;
  userReaction: string; // Can be empty string if no reaction
  handleClick?: () => void;
  type?: string;
}

export default function ReactionButton({
  postId,
  userId,
  userReaction,
  handleClick,
  type = "post",
}: ReactionButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState(userReaction);

  console.log("userReaction", userReaction);

  const sendReaction = async (reaction: string | null) => {
    // reaction === null means remove reaction
    const res = await fetch(
      `/api/${type === "post" ? "posts" : "comments"}/${postId}/reaction`,
      {
        method: "POST",
        body: JSON.stringify({ userId, reaction }),
      },
    );

    const data = await res.json();
    if (data.success) {
      setCurrent(reaction ?? "");
    }
    if (!handleClick) return;

    handleClick();
  };

  const currentReaction = REACTIONS.find((r) => r.type === current);

  // Handle main button click: toggle off reaction if reacted
  const handleMainButtonClick = () => {
    if (!handleClick) return;
    handleClick();
    if (current) {
      // User clicked the button with existing reaction, remove it
      sendReaction(null);
    } else {
      // No reaction yet, just show the menu to choose
      setShowMenu(true);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* === MAIN BUTTON === */}
      <button
        className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${
          current ? "_feed_reaction_active" : ""
        }`}
        onClick={handleMainButtonClick}
        type="button"
      >
        <span className="_feed_inner_timeline_reaction_link">
          <span className="flex items-center gap-1">
            {/* Emoji */}
            <span className="text-xl">
              {currentReaction ? currentReaction.emoji : ""}
            </span>
            {/* Label */}
            <span>{currentReaction ? currentReaction.label : "React"}</span>
          </span>
        </span>
      </button>

      {/* === POPUP MENU === */}
      {showMenu && (
        <div className="absolute bottom-full mb-2 p-2 bg-white shadow-lg flex gap-3 rounded-xl z-50">
          {REACTIONS.map((r) => (
            <button
              key={r.type}
              onClick={() => sendReaction(r.type)}
              className="hover:scale-125 transition-transform flex flex-col items-center"
              type="button"
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="text-xs">{r.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
