import apiClient from "@/api";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email("Invalid email"),
    role: z.string(),
    banned: z.boolean(),
});

const EditUser = () => {
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const form = useForm({
        resolver: zodResolver(userFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            username: "",
            email: "",
            role: "",
            banned: "",
        },
    });
    useEffect(() => {
        apiClient
            .get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                const user = res.data.user;
                setUser(user);
                setProducts(res.data.products);
                form.setValue("name", user.name);
                form.setValue("username", user.username);
                form.setValue("email", user.email);
                form.setValue("role", user.isAdmin);
                form.setValue("banned", user.isBanned);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    }, []);

    const submitHandler = (data) => {
        const form = new FormData();
        form.append("name", data.name);
        form.append("username", data.username);
        form.append("email", data.email);
        form.append("role", data.role);
        form.append("banned", data.banned);

        apiClient
            .put(`/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then(() => {
                toast.success("User bijgewerkt");
            })
            .catch((error) => {
                toast.error(error);
            });
    };
    console.log(user);
    console.log({ user });
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
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Gebruikersnaam
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="gebruikersnaam"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        value={user.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Naam</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="naam"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Admin</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Is een admin" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value={1}
                                                            >
                                                                Ja
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={0}
                                                            >
                                                                Nee
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="banned"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Verbannen</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Is verbannen" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem
                                                                value={1}
                                                            >
                                                                Ja
                                                            </SelectItem>
                                                            <SelectItem
                                                                value={0}
                                                            >
                                                                Nee
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>
                        </section>
                    </form>
                </Form>
                <section>
                    <h1 className="font-bold text-3xl">Producten</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Naam</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Prijs</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        {product.rentable === 1
                                            ? "Niet uitgeleed"
                                            : "Uitgeleend"}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <Link to={`/product/${product.id}`}>
                                            <Button>
                                                <ChevronRight />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </Container>
        );
    }
};
export default EditUser;
