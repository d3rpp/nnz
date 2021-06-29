import React, { useState } from 'react';
import { isMobile } from 'mobile-device-detect';
import './Header.scss';

import { LogoWhite as img } from '../../assets';

import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import HomeRounded from '@material-ui/icons/HomeRounded';
import ListIcon from '@material-ui/icons/List';
import StoreIcon from '@material-ui/icons/Store';
import MailIcon from '@material-ui/icons/Mail';

interface HeaderProps {
	colour?: string;
}

const DesktopHeader: React.FC<HeaderProps> = ({ colour }: HeaderProps) => {
	return (
		<header id="desktop">
			<Link to="/">Home</Link>
			<Link to="/recipes">Recipes</Link>
			<Link to="/" className="logo">
				<img src={img} alt="The NurtureNZ Logo" height="80%" />
			</Link>
			<a href="https://nurture-new-zealand.mystorbie.com" target="_blank">
				Shop
			</a>
			<Link to="/contact">Contact</Link>
		</header>
	);
};

const MobileHeader: React.FC<HeaderProps> = ({ colour }: HeaderProps) => {
	const [anchor, setAnchor] = useState(null);

	const handleClick = (e: any) => {
		setAnchor(e.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	return (
		<header id="mobile">
			<div className="filler" />
			<img
				src={img}
				alt="The NurtureNZ Logo"
				className="logo"
				height="80%"
			/>

			<Menu
				id="nav-menu"
				anchorEl={anchor}
				keepMounted
				open={Boolean(anchor)}
				onClose={handleClose}
			>
				<MenuItem>
					<Link to="/" onClick={handleClose}>
						<HomeRounded />
						Home
					</Link>
				</MenuItem>
				<MenuItem>
					<Link to="/recipes" onClick={handleClose}>
						<ListIcon />
						Recipes
					</Link>
				</MenuItem>
				<MenuItem>
					<a
						href="https://nurture-new-zealand.mystorbie.com"
						target="_blank"
						onClick={handleClose}
					>
						<StoreIcon />
						Shop
					</a>
				</MenuItem>
				<MenuItem>
					<Link to="/contact" onClick={handleClose}>
						<MailIcon />
						Contact
					</Link>
				</MenuItem>
			</Menu>

			<button className="menu_icon" onClick={handleClick}>
				<MenuIcon />
			</button>
		</header>
	);
};

export const Header: React.FC<HeaderProps> = ({ colour }) => {
	return isMobile || window.innerWidth < 599 ? (
		<MobileHeader />
	) : (
		<DesktopHeader />
	);
};
