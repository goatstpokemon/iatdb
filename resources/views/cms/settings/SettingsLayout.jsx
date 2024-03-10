import { Separator } from "@/components/ui/separator";
import SidebarNav from "./SidebarNav";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../../js/components/Header";

const SettingsLayout = () => {
    const location = useLocation();
    const { pathname } = location;
    const sidebarNavItems = [
        {
            title: "Profiel",
            href: "/profile",
            subtitle: "Dit is je publieke profiel",
        },
        {
            title: "Account",
            href: "/profile/account",
            subtitle:
                "Pas hier je accountinstellingen aan, zoals je e-mailadres en wachtwoord",
        },
        {
            title: "Uitlenen",
            href: "/profile/lending",
            subtitle: "Beheer hier je uitgeleende producten",
        },
        {
            title: "Lenen",
            href: "/profile/borrowing",
            subtitle: "Zie hier de producten die je hebt geleend",
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
                    <div className="flex-1 max-w-[30vw]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
