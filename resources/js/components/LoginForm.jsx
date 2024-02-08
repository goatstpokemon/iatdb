import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const LoginForm = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
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
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
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
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
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
