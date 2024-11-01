import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const LoginForm = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser, setToken, token } = useAuthContext();

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        apiClient
            .get("http://localhost:8000/sanctum/csrf-cookie")
            .then((response) => {
                apiClient
                    .post("http://localhost:8000/api/login", {
                        email,
                        password,
                    })
                    .then((response) => {
                        setIsLoading(false);
                        if (response.status === 200) {
                            console.log({ response });
                            setUser(response.data.user);
                            setToken(response.data.token);
                            toast("Je bent ingelogd!");
                        } else {
                            toast(
                                "Er is iets fout gegaan, probeer het opnieuw"
                            );
                        }
                    })
                    .then(() => {
                        window.location.replace("/");
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        toast(
                            error.response.data.message ||
                                "Er is iets fout gegaan, probeer het opnieuw"
                        );
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        toast(
                            error.response.data.message ||
                                "Er is iets fout gegaan, probeer het opnieuw"
                        );
                    });
            });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="font-bold" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="grid gap-1 py-4">
                        <Label className="font-bold" htmlFor="wachtwoord">
                            Wachtwoord
                        </Label>
                        <Input
                            id="wachtwoord"
                            placeholder="iets super velig!"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                    </div>
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
