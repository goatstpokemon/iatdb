import { cn } from "@/lib/utils";
import { LoginForm } from "@/components/LoginForm";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Toaster } from "../js/components/ui/sonner";

export const Login = () => {
    return (
        <>
            <Toaster />
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="lg:p-8 lg:w-[30vw] lg:mx-auto">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welkom Terug!
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Vul je email en wachtwoord in om verder te gaan
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
                <Link
                    to="/aanmelden"
                    className={cn(
                        buttonVariants({ variant: "cool" }),
                        "absolute right-4 top-4 md:right-8 md:top-8 font-semibold "
                    )}
                >
                    Account aanmaken
                </Link>
                <div className="relative hidden  xl:max-w-[20vw] md:flex md:flex-col md:justify-center">
                    <div className="h-fit relative mb-10">
                        <img
                            src="storage/peson.jpg"
                            className="rounded-2xl xl:max-w-[20vw] "
                            alt=""
                        />
                    </div>
                    <div className=" h-1/2 xl:max-w-[25vw] flex-col bg-muted p-10 text-white lg:flex dark:border-r justify-end xl:max-h-[15vh] bg-zinc-900 rounded-2xl">
                        <div className="relative  z-20 flex flex-col  align-bottom text-xl font-medium">
                            <div className="flex items-center mb-4 ">
                                <Clock size={24} />
                                <h1 className="ml-2">Time2Share</h1>
                            </div>
                            <br />
                            Delen van producten verlaagt de impact op het
                            milieu. <br />
                            Begin daarom vnadaag nog met Time2Share!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
