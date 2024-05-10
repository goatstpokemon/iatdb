import apiClient from "@/api";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    dob: z.string().nonempty("Date of birth is required"),
    role: z.string().nonempty("Role is required"),
    banned: z.boolean(),
    varified: z.boolean(),
});

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiClient
            .get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                const user = response.data;
                setUser(user);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    }, []);

    const form = useForm({
        resolver: zodResolver(userFormSchema),
        mode: "onChange",
        defaultValues: {
            name: user.name,
            email: user.email,
            dob: user.dob,
            role: user.role,
            banned: user.banned,
            varified: user.varified,
        },
    });
    const submitHandler = (data) => {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("dob", data.dob);
        form.append("role", data.role);
        form.append("banned", data.banned);
        form.append("varified", data.varified);
        apiClient
            .put(`/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                toast.success("User bijgewerkt");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                        <div className="flex h-fit justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <User />
                                <h1 className="font-medium text-2xl">
                                    Bewerk Gebruiker
                                </h1>
                            </div>
                            <div>
                                <Button type="submit">Bewerk</Button>
                            </div>
                        </div>
                        <section className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-5 gap-4">
                            <section className="bg-gray-50 rounded-xl p-4 col-span-2 row-span-3">
                                <h2>Profile informatie</h2>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Naam</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Naam"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>
                        </section>
                    </form>
                </Form>
            </Container>
        );
    }
};
export default EditUser;
