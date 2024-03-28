import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import apiClient from "@/api";
import { toast } from "sonner";

const accountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Je naam moet minstens 2 karakters lang zijn.",
        })
        .max(30, {
            message: "Maar niet langer dan 30 karakters.",
        }),
    email: z.string().email(),
    dob: z.date({
        required_error: "Je moet een geboortedatum invullen.",
    }),
    oldPassword: z
        .string({ message: "Je oude wachtwoord is verplicht." })
        .optional(),
    newPassword: z
        .string()
        .min(8, {
            message: "Je wachtwoord moet minstens 8 karakters lang zijn.",
        })
        .optional(),
    confirmPassword: z
        .string()

        .refine((value, data) => value === data.newPassword, {
            message: "Je wachtwoorden komen niet overeen.",
        })
        .optional(),
});

export const AccountPage = () => {
    const [profile, setProfile] = useState({});
    const form = useForm({
        resolver: zodResolver(accountFormSchema),
    });
    useEffect(() => {
        apiClient
            .get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setProfile(response.data.user);
                form.setValue("name", response.data.user.name);
                form.setValue("email", response.data.user.email);
                form.setValue("dob", response.data.user.dob);
            });
    }, []);
    const onSubmit = (data) => {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("dob", data.dob);

        apiClient
            .post("/user/profile/update", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                toast({
                    title: "Profiel bijgewerkt",
                    description: "Je profiel is succesvol bijgewerkt",
                });
            });
        toast({
            title: "Je hebt het volgende ingevuld:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className="font-bold text-4xl">Persoonlijke gegevens</h1>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Naam</FormLabel>
                            <FormControl>
                                <Input placeholder="Jouw naam" {...field} />
                            </FormControl>
                            <FormDescription>
                                Dit is je naam, ook andere zien dit
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Jouw email" {...field} />
                            </FormControl>
                            <FormDescription>
                                Je email dat je gebruikt voor inloggen
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Geboorte datum</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Selecteer een datum</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown-buttons"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        fromYear={1900}
                                        defaultMonth={profile.dob}
                                        toYear={new Date().getFullYear()}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                We willen weten hoe oud je bent
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <h1 className="font-bold text-4xl">Wachtwoord Aanpassen</h1>
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Oude Wachtwoord</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Je oude wachtwoord"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Ik hoop dat je het nog weet
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nieuwe wachtwoord</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Je oude wachtwoord"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Bedenk iets nieuws
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wachtwoord bevestigen</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Je oude wachtwoord"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Wat je net invulde
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update account</Button>
            </form>
        </Form>
    );
};
