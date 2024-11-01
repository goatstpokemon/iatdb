import { SignUpForm } from "@/components/SignUpForm";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Clock } from "lucide-react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const imageRef = useRef();
    const tl = gsap.timeline();
    useGSAP(() => {
        tl.fromTo(
            ".topDown",
            {
                height: 0,
                opacity: 0,
            },
            {
                duration: 2,
                height: "auto",
                opacity: 1,
                ease: "power3.inOut",
            },
            "+=1"
        );

        tl.to(
            ".slideOut",
            {
                duration: 2,
                width: "20vw",
                opacity: 1,
                ease: "power3.inOut",
            },
            0
        );
    });

    return (
        <>
            <Toaster />
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="lg:p-8 lg:w-[30vw] lg:mx-auto">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Welkom bij Time2Share!
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Vul je email en wachtwoord in om een account aan
                                te maken
                            </p>
                        </div>
                        <SignUpForm />
                    </div>
                </div>
                <Link
                    to="/login"
                    className={cn(
                        buttonVariants({ variant: "cool" }),
                        "absolute right-4 top-4 md:right-8 md:top-8 font-semibold "
                    )}
                >
                    Ik heb al een account
                </Link>
                <div className="relative hidden  md:flex md:flex-col md:justify-center ">
                    <div className="h-fit relative mb-10 topDown">
                        <img
                            ref={imageRef}
                            src="storage/person.jpg"
                            className="rounded-2xl w-[20vw]" // Update CSS properties
                            alt=""
                        />
                    </div>
                    <div className=" w-0 opacity-0 h-auto  flex-col bg-muted p-10 text-white lg:flex dark:border-r justify-end xl:max-h-[15vh] bg-zinc-900 rounded-2xl slideOut">
                        <div className="relative  z-20 flex flex-col  align-bottom text-xl font-medium">
                            <div className="flex items-center mb-4  ">
                                <Clock size={24} />
                                <h1 className="ml-2">Time2Share</h1>
                            </div>
                            <br />
                            Delen van producten verlaagt de impact op het
                            milieu. <br />
                            Begin daarom vandaag nog met Time2Share!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
