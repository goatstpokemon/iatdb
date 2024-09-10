import { Separator } from "@/components/ui/separator";
import SidebarNav from "./SidebarNav";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../../js/components/Header";
import { Toaster } from "@/components/ui/sonner";

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
            title: "Producten",
            href: "/profile/products",
            subtitle: "Al je producten die je hebt toegevoegd aan Time2Share",
        },
    ];

    return (
        <div className="min-h-svh">
            <Toaster />
            <Header />
            <div className="space-y-6 p-10 pb-16">
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
                    <div className="flex-1 lg:max-w-[70vw] 2xl:max-w-[50vw]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
