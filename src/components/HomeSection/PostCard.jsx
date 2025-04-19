import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteOutlined } from "@mui/icons-material";
import CommentModal from "./CommentModal";



const PostCard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentOpen, setCommentOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    console.log("delete post");
    handleClose();
  };

  const handleOpenCommentModel = () => {
    setCommentOpen(true);
  };

  const handleCreateRepost = () => {
    console.log("handle create repost");
  };

  const handleLikePost = () => {
    console.log("handle like post");
  };

  return (
    <>
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${3}`)}
          className="cursor-pointer"
          alt="username"
          src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vJ4e80aywstss.png"
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Thushani Kavindya</span>
              <span className="text-gray-600">@thushani123 . 2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt=""
              />
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                <MenuItem onClick={handleDeletePost}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div
              onClick={() => navigate(`/post/${6}`)}
              className="cursor-pointer"
            >
              <p className="mb-2 p-0">
              Beginners to E-Learning with Innovations for Education !
              </p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src="https://i.ytimg.com/vi/95yaGDZkGis/sddefault.jpg"
                alt=""
              />
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenCommentModel}
                />
                <p>43</p>
              </div>

              <div className="text-gray-600 space-x-3 flex items-center">
                <RepeatIcon
                  onClick={handleCreateRepost}
                  className="cursor-pointer"
                />
                <p>54</p>
              </div>

              <div className="text-pink-600 space-x-3 flex items-center">
                {true ? (
                  <FavoriteIcon
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteOutlined
                    onClick={handleLikePost}
                    className="cursor-pointer"
                  />
                )}
                <p>54</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                />
                <p>430</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal open={commentOpen} handleClose={() => setCommentOpen(false)} />
    </>
  );
};

export default PostCard;
