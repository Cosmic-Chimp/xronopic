import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, X, User } from "lucide-react";
import { useMediaQuery } from "../hooks/use-media-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
// TODO: refactor this entire damn component, its so ugly, separate the mobile and desktop for example
export function Navbar() {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    // not using this right now but might?
    // const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch(); // Get the dispatch function

    const handleLogout = () => {
        dispatch(logout());
        // redirect user maybe?
    };

    // Function to determine if a link is active
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    // Function to get the appropriate styling for a nav link
    const getLinkStyle = (path: string) => {
        return cn(
            "transition-colors duration-200",
            isActive(path)
                ? "text-blue-500"
                : "text-gray-800 hover:text-blue-500"
        );
    };

    const AccountSection = () => {
        if (isAuthenticated) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="rounded-full p-0 h-10 w-10"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src="/api/placeholder/40/40"
                                    alt="User avatar"
                                />
                                <AvatarFallback className="bg-blue-100 text-blue-800">
                                    <User size={20} />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link to="/profile" className="cursor-pointer">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/settings" className="cursor-pointer">
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-500 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        } else {
            return (
                <Button
                    asChild
                    variant="default"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                >
                    <Link to="/auth">Sign In</Link>
                </Button>
            );
        }
    };

    // Mobile navbar component
    const MobileNavbar = () => {
        return (
            <nav className="w-full border-b bg-white">
                <div className="flex items-center justify-between p-4">
                    {/* Logo */}
                    <div className="bg-gray-200 h-12 w-12 flex items-center justify-center">
                        <span className="text-xs font-medium">Logo</span>
                    </div>

                    {/* Burger Menu Icon */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2"
                    >
                        {isMenuOpen ? (
                            <X size={24} className="text-gray-800" />
                        ) : (
                            <Menu size={24} className="text-gray-800" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="bg-white border-t w-full py-2 px-4 shadow-lg absolute z-10">
                        <ul className="space-y-4 py-4">
                            <li>
                                <Link
                                    to="/"
                                    className={cn(
                                        "block py-2",
                                        getLinkStyle("/")
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/pricing"
                                    className={cn(
                                        "block py-2",
                                        getLinkStyle("/pricing")
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={cn(
                                        "block py-2",
                                        getLinkStyle("/about")
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/timelines"
                                    className={cn(
                                        "block py-2",
                                        getLinkStyle("/timelines")
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Timelines
                                </Link>
                            </li>
                            <li className="pt-4 border-t">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            className="block py-2 text-gray-800"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block py-2 text-gray-800"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            className="block py-2 text-red-500 w-full text-left"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/auth"
                                        className="block py-2 text-blue-500"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        );
    };

    // Desktop navbar component
    const DesktopNavbar = () => {
        return (
            <nav className="flex items-center justify-between w-full border-b bg-white px-[10%]">
                {/* Left side: Logo */}
                <div className="bg-gray-200 h-16 w-16 flex items-center justify-center">
                    <span className="text-sm font-medium">Logo</span>
                </div>

                {/* Middle: Navigation Links */}
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="flex space-x-8">
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    to="/"
                                    className={cn("p-4", getLinkStyle("/"))}
                                >
                                    Home
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    to="/pricing"
                                    className={cn(
                                        "p-4",
                                        getLinkStyle("/pricing")
                                    )}
                                >
                                    Pricing
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    to="/about"
                                    className={cn(
                                        "p-4",
                                        getLinkStyle("/about")
                                    )}
                                >
                                    About
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link
                                    to="/timelines"
                                    className={cn(
                                        "p-4",
                                        getLinkStyle("/timelines")
                                    )}
                                >
                                    Timelines
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right side: Account Icon or Sign In button */}
                <div className="pr-4">
                    <AccountSection />
                </div>
            </nav>
        );
    };

    // Render based on screen size
    return isDesktop ? <DesktopNavbar /> : <MobileNavbar />;
}
