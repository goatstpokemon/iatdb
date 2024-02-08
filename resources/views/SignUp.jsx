import { SignUpForm } from "@/components/SignUpForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    return (
        <div>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    to="/aanmelden"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Account aanmaken
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Clock className="h-8 w-8 mr-2" />
                        Time2Share
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welkom bij Time2Share!
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Vul je email en wachtwoord in om verder te gaan
                            </p>
                            <hr />
                        </div>
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
