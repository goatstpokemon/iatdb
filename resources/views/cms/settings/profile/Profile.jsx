import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import apiClient from "@/api";

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "2 karakters is wel heel kort, probeer het nog eens.",
        })
        .max(30, {
            message: "Het moet korter zijn dan 30 karakters.",
        }),
    profilePhoto: z.any(),
});

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState(null);
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
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
                form.setValue("username", response.data.user.username);
            });
    }, []);

    const onSubmit = (data, image) => {
        const form = new FormData();
        form.append("photo", image.target[1].files[0]);
        form.append("username", data.username);
        console.log(image.target[1].files[0]);
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
    };
    if (profile.email) {
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gebruikersnaam</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Dit is je publiekelijke gebruikersnaam dus
                                    let op wat je hier invult
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="profilePhoto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profiel Foto</FormLabel>
                                <img
                                    src={profile.profile_image}
                                    alt="hello"
                                    className="size-24 md:size-26 lg:size-32 rounded"
                                />
                                <FormControl>
                                    <Input
                                        placeholder="upload een foto"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target[1].files[0];
                                            setImage(file);
                                            form.setValue("profilePhoto", file);
                                        }}
                                        accept="image/*"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Upload hier een profielfoto
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Update profiel</Button>
                </form>
            </Form>
        );
    }
};

export default Profile;
