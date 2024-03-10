import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "2 karakters is wel heel kort, probeer het nog eens.",
        })
        .max(30, {
            message: "Het moet korter zijn dan 30 karakters.",
        }),
    profilePhoto: z
        .any()
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
            message: "Dit is geen geldig bestandstype.",
        }),

    bio: z.string().max(160).min(4),
});
const Profile = () => {
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        toast({
            title: "You submitted the following values:",
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
                                Dit is je publiekelijke gebruikersnaam dus let
                                op wat je hier invult
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profiel Foto</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="upload een foto"
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
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Een beetje over jezelf"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Vertel eens wat over jezelf
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profiel</Button>
            </form>
        </Form>
    );
};

export default Profile;
