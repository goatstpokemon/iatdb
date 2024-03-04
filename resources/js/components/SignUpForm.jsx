import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import apiClient from "@/api";
import { toast } from "sonner";

export const SignUpForm = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [type1, setType1] = useState("password");
    const [icon1, setIcon1] = useState(
        <EyeOff size={16} className="absolute mr-20" />
    );
    const [type2, setType2] = useState("password");
    const [icon2, setIcon2] = useState(
        <EyeOff size={16} className="absolute mr-20" />
    );
    const handleToggle1 = () => {
        if (type1 === "password") {
            setIcon1(<Eye size={16} className="absolute mr-20" />);
            setType1("text");
        } else {
            setIcon1(<EyeOff size={16} className="absolute mr-20" />);
            setType1("password");
        }
    };
    const handleToggle2 = () => {
        if (type2 === "password") {
            setIcon2(<Eye size={16} className="absolute mr-20" />);
            setType2("text");
        } else {
            setIcon2(<EyeOff size={16} className="absolute mr-20" />);
            setType2("password");
        }
    };

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        if (password === passwordConfirmation) {
            apiClient
                .get("http://localhost:8000/sanctum/csrf-cookie")
                .then((response) => {
                    apiClient
                        .post("http://localhost:8000/api/signup", {
                            email,
                            password,
                            name,
                        })
                        .then((response) => {
                            console.log(response);
                            setIsLoading(false);
                            if (response.status === 201) {
                                console.log("success");
                                toast("Je bent geregistreerd!");
                            } else {
                                toast(
                                    "Er is iets fout gegaan, probeer het opnieuw"
                                );
                            }
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            toast(
                                error.response.data.message ||
                                    "Er is iets fout gegaan, probeer het opnieuw"
                            );
                        });
                });
        } else {
            setIsLoading(false);
            toast("Wachtwoorden komen niet overeen");
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="font-bold" htmlFor="email">
                            Naam
                        </Label>
                        <Input
                            id="name"
                            placeholder="Jouw naam"
                            type="text"
                            autoCapitalize="none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="font-bold" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1 py-2">
                        <Label className="font-bold" htmlFor="wachtwoord">
                            Wachtwoord
                        </Label>

                        <div className="flex ">
                            <Input
                                id="wachtwoord"
                                placeholder="iets super velig!"
                                type={type1}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <span
                                className="flex justify-around items-center"
                                onClick={handleToggle1}
                            >
                                {icon1}
                            </span>
                        </div>
                    </div>
                    {password.length > 5 ? (
                        <div className="grid gap-1 py-2 animate-fade">
                            <Label
                                className="font-bold flex"
                                htmlFor="confirmpassword"
                            >
                                Bevestig Wachtwoord
                            </Label>
                            <div className="flex ">
                                <Input
                                    id="confirmpassword"
                                    placeholder="Om het zeker te weten!"
                                    type={type2}
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                />
                                <span
                                    className="flex justify-around items-center"
                                    onClick={handleToggle2}
                                >
                                    {icon2}
                                </span>
                            </div>
                        </div>
                    ) : null}
                    <Button disabled={isLoading}>
                        Inloggen
                        {isLoading && (
                            <Loader2 className="animate-spin h-5 w-5 text-zinc-300 ml-2" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
