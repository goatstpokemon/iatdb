import apiClient from "@/api";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleFadingPlus, Table } from "lucide-react";
import { useEffect, useState } from "react";

const YourProducts = () => {
    const [products, setProducts] = useState([]);
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
                setProducts(response.data.products);
            });
    }, []);

    if (products[0]?.name) {
        return (
            <div>
                {products.length === 0 ? (
                    <NoProducts />
                ) : (
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Tabs defaultValue="all">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="active">
                                        Active
                                    </TabsTrigger>
                                    <TabsTrigger value="draft">
                                        Draft
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="archived"
                                        className="hidden sm:flex"
                                    >
                                        Archived
                                    </TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                    Filter
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Filter by
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                Active
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Draft
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Archived
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Export
                                        </span>
                                    </Button>
                                    <Button size="sm" className="h-8 gap-1">
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
                                            Manage your products and view their
                                            sales performance.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                                        <span className="sr-only">
                                                            Image
                                                        </span>
                                                    </TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Price
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Total Sales
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell">
                                                        Created at
                                                    </TableHead>
                                                    <TableHead>
                                                        <span className="sr-only">
                                                            Actions
                                                        </span>
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <img
                                                            alt="Product image"
                                                            className="aspect-square rounded-md object-cover"
                                                            height="64"
                                                            src={
                                                                products[0]
                                                                    .image
                                                            }
                                                            width="64"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        Laser Lemonade Machine
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            Draft
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        $499.99
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        25
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        2023-07-12 10:42 AM
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
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="text-xs text-muted-foreground">
                                            Showing <strong>1-10</strong> of{" "}
                                            <strong>32</strong> products
                                        </div>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </main>
                )}
            </div>
        );
    }
};
export default YourProducts;

const NoProducts = () => {
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
                    <Button className="mt-4 flex gap-5">
                        <CircleFadingPlus />
                        Voeg product toe
                    </Button>
                </div>
            </div>
        </main>
    );
};
