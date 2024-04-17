import apiClient from "@/api";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CircleFadingPlus, PlusCircle, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const YourProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // const products = [
    //     {
    //         id: 1,
    //         name: "Laser Lemonade Machine",
    //         status: "draft",
    //         image: "https://source.unsplash.com/64x64/?product",
    //         price: "$499.99",
    //     },
    // ];
    useEffect(() => {
        apiClient
            .get("/product/yours", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setLoading(false);
                setProducts(response.data.products);
            });
    }, []);
    const removeProduct = (id) => {
        apiClient
            .delete(`/product/item/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setProducts(products.filter((product) => product.id !== id));

                toast.success("Product verwijderd");
            });
    };

    return (
        <>
            {products.length === 0 ? (
                <NoProducts />
            ) : (
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <div className="ml-auto flex items-center gap-2">
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                    onClick={navigate("/add")}
                                >
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Product
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Products</CardTitle>
                                    <CardDescription>
                                        Al jouw producten
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="hidden w-[100px] sm:table-cell">
                                                    <span className="sr-only">
                                                        Fotos
                                                    </span>
                                                </TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Prijs / dag
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Aangemaakt op
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">
                                                        Bewerken
                                                    </span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <img
                                                            alt="Product image"
                                                            className="aspect-square rounded-md object-cover"
                                                            height="64"
                                                            src={
                                                                product.product_image
                                                            }
                                                            width="64"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {product.name}
                                                    </TableCell>

                                                    <TableCell className="hidden md:table-cell">
                                                        {product.price} / dag
                                                    </TableCell>

                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(
                                                            product.created_at
                                                        ).toLocaleDateString(
                                                            "nl-NL"
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">
                                                                        Toggle
                                                                        menu
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    Acties
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Link
                                                                        to={`${product.id}/edit`}
                                                                    >
                                                                        Bewerk
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        removeProduct(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    Verwijder
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            )}
        </>
    );
};

export default YourProducts;

const NoProducts = () => {
    const navigate = useNavigate();
    return (
        <main className="min-w-full min-h-full flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Jouw Producten
                </h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-10">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Momenteel geen producten
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Je kan beginnen met uitlenen als je producten toevoegt.
                    </p>
                    <Button
                        className="mt-4 flex gap-5"
                        onClick={() => navigate("add")}
                    >
                        <CircleFadingPlus />
                        Voeg product toe
                    </Button>
                </div>
            </div>
        </main>
    );
};
