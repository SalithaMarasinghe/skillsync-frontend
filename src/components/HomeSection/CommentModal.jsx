import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Menu icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
import EditIcon from '@mui/icons-material/Edit'; // Edit icon
import { formik, useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function CommentModal({ open, handleClose }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCommentId, setSelectedCommentId] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event, commentId) => {
    setSelectedCommentId(commentId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = () => {
    console.log("Deleted comment:", selectedCommentId);
    handleCloseMenu();
  };

  const handleEditComment = () => {
    console.log("Edit comment:", selectedCommentId);
    handleCloseMenu();
  };

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");

  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      postId: 4,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgFile = event.target.files[0];
    if (imgFile) {
      formik.setFieldValue("image", imgFile);
      setSelectedImage(URL.createObjectURL(imgFile));
    }
    setUploadingImage(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex space-x-5">
          <Avatar
            onClick={() => navigate(`/profile/${6}`)}
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
            </div>

            <div className="mt-2">
              <div onClick={() => navigate(`/post/${3}`)} className="cursor-pointer">
                <p className="mb-2 p-0">
                  Beginners to E-Learning with Innovations for Education !
                </p>
              </div>
            </div>
          </div>
          
        </div>
        <section className="py-10">
          <div className="flex items-center space-x-5">
            <Avatar
              alt="username"
              src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vJ4e80aywstss.png"
            />
            <div className="w-full">
              <form onSubmit={formik.handleSubmit} className="flex flex-col">
                <div>
                  <input
                    type="text"
                    name="content"
                    placeholder="Add a comment...."
                    className="border-none outline-none text-xl bg-transparent w-full"
                    {...formik.getFieldProps("content")}
                  />
                  {formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">
                      {formik.errors.content}
                    </span>
                  )}
                </div>

                {/* Single image preview */}
                {selectedImage && (
                  <div className="mt-3">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                      <ImageIcon className="text-[#1d9bf0]" />
                      <input
                        type="file"
                        name="imageFile"
                        className="hidden"
                        onChange={handleSelectImage}
                      />
                    </label>

                    <TagFacesIcon className="text-[#1d9bf0]" />
                  </div>

                  <Button
                    sx={{
                      borderRadius: "16px",
                      paddingY: "4px",
                      paddingX: "12px",
                      fontSize: "0.9rem",
                      minWidth: "auto",
                      bgcolor: "#1e88e5",
                      textTransform: "none",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Comments List */}
          <div className="mt-10 space-y-4">
            {[
              {
                id: 1,
                username: "Jane Doe",
                handle: "@jane_d",
                content: "Great post! Learned a lot from this project.",
                avatar: "https://via.placeholder.com/150",
              },
              {
                id: 2,
                username: "John Smith",
                handle: "@johnsmith",
                content: "Awesome clone! I love the UI.",
                avatar: "https://via.placeholder.com/150",
              },
              {
                id: 3,
                username: "Alice Wonder",
                handle: "@alicew",
                content: "Looking forward to building this too!",
                avatar: "https://via.placeholder.com/150",
              },
            ].map((comment) => (
              <div key={comment.id} className="flex space-x-3 items-start">
                <Avatar alt={comment.username} src={comment.avatar} />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{comment.username}</span>
                        <span className="text-gray-600">{comment.handle}</span>
                      </div>
                      <p className="text-gray-800 mt-1">{comment.content}</p>
                    </div>
                    <MoreHorizIcon
                      onClick={(e) => handleClickMenu(e, comment.id)}
                      className="cursor-pointer"
                    />
                    <Menu
                    anchorEl={anchorEl}
                    open={openMenu && selectedCommentId === comment.id}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      sx: {
                        padding: 1,
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap={2}
                    >
                      <DeleteIcon
                        onClick={handleDeleteComment}
                        sx={{ color: "red", cursor: "pointer", fontSize: 15 }}
                      />
                      <EditIcon
                        onClick={handleEditComment}
                        sx={{ color: "blue", cursor: "pointer", fontSize: 15 }}
                      />
                    </Box>
                  </Menu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Box>
    </Modal>
  );
}
