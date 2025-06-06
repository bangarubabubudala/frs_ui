import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";

// Curved gradient background behind navbar
const NavbarBackdrop = styled.div`
  position: absolute;
  width: 200%;
  height: 300px;
  border-radius: 50%;
  top: -150px;
  left: -50%;
`;

const NavbarWrapper = styled.div`
  position: relative;  /* to contain backdrop absolute */
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* menu left, back button right */
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 100; /* navbar content on top of backdrop */
  color: #fff; /* text color to contrast with background */
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3498db;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;       
  justify-content: center;   
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  padding: 0;
  line-height: 0;
  z-index: 110;
  position: relative;

  &:hover {
    background-color: #2c80b4; /* Hover color */
  }
  &:focus {
    outline: 2px solid #2980b9;
    outline-offset: 2px;
  }`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3498db;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;       
  justify-content: center;   
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  padding: 0;
  line-height: 0;
  font-size: 20px; /* slightly smaller than before, adjust icon size */
  z-index: 110;
  position: relative;

  &:hover {
    background-color: #2c80b4; /* Hover color */
  }
  &:focus {
    outline: 2px solid #2980b9;
    outline-offset: 2px;
  }
`;


const MenuDropdown = styled.div`
  position: absolute;
  top: 55px;
  left: 20px;
  width: 200px;
  background: linear-gradient(145deg, #ffffff, #f0f4ff);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1), 
    inset 0 0 10px rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  z-index: 120;
  color: #2c3e50;
  border: 1px solid #d1d9ff;
  backdrop-filter: saturate(180%) blur(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: transform, opacity;
`;


const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: #2c3e50;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: 
    background 0.3s ease,
    transform 0.15s ease,
    box-shadow 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, #f9f9f9, #e0e7ff);
    box-shadow: 0 4px 8px rgba(100, 100, 255, 0.15);
    transform: scale(1.03);
    color: #1a237e;
  }
  
  &:focus {
    outline: 2px solid #3f51b5;
    outline-offset: 2px;
  }
`;


export function Navbar({ showBackButton = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Create refs for menu and button to detect outside clicks
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close menu if clicked outside menu or menu button
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <NavbarWrapper>
            <NavbarBackdrop />
            {/* Menu button on the LEFT */}
            <MenuButton
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                title="Toggle menu"
            >
                <FaBars />
            </MenuButton>

            {/* Back button on the RIGHT */}
            {showBackButton && (
                <BackButton
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    title="Go back"
                >
                    <HiArrowLeft size={20} />
                </BackButton>
            )}

            {menuOpen && (
                <MenuDropdown ref={menuRef}>
                    <MenuItem onClick={handleLogout}>
                        <FaUserCircle size={20} />
                        <FaSignOutAlt style={{ marginLeft: "auto" }} />
                        Logout
                    </MenuItem>
                </MenuDropdown>
            )}
        </NavbarWrapper>
    );
}
