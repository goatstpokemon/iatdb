import Header from "@/components/Header";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
export const AppWrapper = () => {
    return (
        <div className="min-h-svh">
            <Toaster />
            <Header />
            <Suspense
                fallback={
                    <>
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-2xl font-bold">
                                <Loader2 className="animate-spin" />
                            </div>
                        </div>
                    </>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    );
};
