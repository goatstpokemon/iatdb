import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useAuthContext } from "../contexts/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavbarContext } from "@/contexts/NavbarContext";
import { useEffect } from "react";
import apiClient from "@/api";

const Header = () => {
    const menus = [
        { title: "Home", path: "/" },
        { title: "Lenen", path: "/lenen" },
    ];

    const { user, token, setUser, getUser } = useAuthContext();
    const { navItem, Select } = useNavbarContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    console.log(user.id);
    useEffect(() => {
        getUser();
    }, []);

    if (user.name) {
        return (
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="lg:hidden"
                            size="icon"
                            variant="outline"
                        >
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full">
                        <Link className="mr-6 hidden lg:flex" to="/">
                            <LogoIcon />
                            <span className="sr-only">Time2Share</span>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {menus.map(({ path, title }, index) => (
                                <Link
                                    to={path}
                                    key={index}
                                    className="flex w-full items-center py-2 text-lg font-semibold"
                                    onClick={() => Select(title)}
                                >
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="mr-6 hidden lg:flex" href="/">
                    <LogoIcon />
                    <span className="sr-only">Time2Share</span>
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {menus.map(({ path, title }, index) => (
                        <Link
                            key={index}
                            onClick={() => Select(title)}
                            className={cn(
                                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium   slideOut hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
                                navItem === title &&
                                    "bg-gray-100 dark:bg-gray-800 font-semibold animate-fade"
                            )}
                            to={path}
                        >
                            {title}
                        </Link>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>
                                        {user?.name
                                            .substring(0, 1)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user?.name}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/logout">Uitloggen</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </header>
        );
    }
};
export default Header;

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

function LogoIcon() {
    return (
        <div className="flex items-center">
            <Clock size={24} />
            <h2 className="font-semibold ml-2">Time2Share</h2>
        </div>
    );
}
