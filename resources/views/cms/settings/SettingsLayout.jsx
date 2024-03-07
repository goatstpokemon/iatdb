import { Separator } from "@/components/ui/separator";
import SidebarNav from "./SidebarNav";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../../js/components/Header";

const SettingsLayout = () => {
    const location = useLocation();
    const { pathname } = location;
    const sidebarNavItems = [
        {
            title: "Profile",
            href: "/profile",
            subtitle: "This is how others will see you on the site.",
        },
        {
            title: "Account",
            href: "/profile/account",
            subtitle:
                "Change your email, password, and other account settings.",
        },
        {
            title: "Lending",
            href: "/profile/lending",
            subtitle: "view  your lending history",
        },
        {
            title: "Borrowing",
            href: "/profile/borrowing",
            subtitle: "view  your borrowing history",
        },
    ];

    return (
        <div className="min-h-svh">
            <Header />
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        {sidebarNavItems.map((item) =>
                            item.href === pathname ? item.title : null
                        )}
                    </h2>
                    <p className="text-muted-foreground">
                        {sidebarNavItems.map((item) =>
                            item.href === pathname ? item.subtitle : null
                        )}
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
