import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { NavigationMenu } from "../Navigation/NavigationMenu"; // Corrected import
import { useNavigate } from "react-router";
import { Button, Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navigation = ({ setCurrentSection, currentSection }) => {
  // Use useState for anchorEl without TypeScript type annotations
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle the opening of the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle the closing of the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleClose();
  };

  const navigate = useNavigate();

  // Handle section change
  const handleSectionChange = (section) => {
    setCurrentSection(section); // Update the current section
    if (section === "profile") {
      navigate(`/profile/${section}`);
    } else {
      navigate(`/${section}`);
    }
  };

  return (
    <div className="py-5">
      <img src={logo} alt="Logo" className="w-32 h-auto" />
      <div className="space-y-6">
        {NavigationMenu.map((item) => (
          <div
            className={`cursor-pointer flex space-x-3 items-center ${
              item.path.replace('/', '') === currentSection ? "text-blue-500" : ""
            }`}
            onClick={() => handleSectionChange(item.path.replace('/', ''))}
            key={item.title}
          >
            {item.icon}
            <p className="text-xl">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="py-10 px-5 ">
        <Button
          sx={{
            width: "75%",
            borderRadius: "29px",
            py: "15px",
            bgcolor: "#1e88e5",
          }}
          variant="contained"
        >
          Post
        </Button>
      </div>

      <div className="flex items-center justify-start">
        <div className="flex items-start space-x-3 mr-5">
          <Avatar
            alt="username"
            src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vJ4e80aywstss.png"
          />
        </div>
        <div>
          <span className="text-lg">Salitha Marasinghe</span>
          <span className="text-sm opacity-70 block">@Salitha</span>
        </div>

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
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
