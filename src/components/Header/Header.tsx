import React, { useState } from 'react';
import { isMobile } from 'mobile-device-detect';
import './Header.scss';

//@ts-ignore
import img from '../../assets/NurtureNZW.png';

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
				<img src={img} alt="The NurtureNZ Logo" />
			</Link>
			<Link to="/shop">Shop</Link>
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
			<img src={img} alt="The NurtureNZ Logo" className="logo" />

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
					<Link to="/shop" onClick={handleClose}>
						<StoreIcon />
						Shop
					</Link>
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
