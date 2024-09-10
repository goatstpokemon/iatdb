import apiClient from "@/api";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Borrowing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiClient
            .get("/lending/borrowed", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                console.log(response.data.lendings);
                setProducts(response.data.lendings);
            });
    }, []);

    const returnProduct = async (id) => {
        try {
            await apiClient
                .get(`/lending/returns/${id}/return`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "ACCESS_TOKEN"
                        )}`,
                    },
                })
                .then(() => {
                    toast.success("Product geretourneerd");
                    setProducts(
                        products.filter((product) => product.id !== id)
                    );
                });
        } catch (error) {
            toast.error("Er is iets fout gegaan");
            console.error(error);
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-muted-foreground">
                Aan het lenen
            </h2>
            <Table>
                <TableCaption>Alles wat je aan het lenen bent</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Retour datum</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">
                                {product.product.name}
                            </TableCell>
                            <TableCell>
                                {new Date(product.return_date) &&
                                new Date(product.return_date) >= Date.now() ? (
                                    <>Aan het lenen</>
                                ) : (
                                    <strong>Moet nu terug</strong>
                                )}
                            </TableCell>
                            <TableCell>
                                {new Date(product.return_date) > Date.now() ? (
                                    <>
                                        Over {""}
                                        {Math.ceil(
                                            (new Date(product.return_date) -
                                                Date.now()) /
                                                (1000 * 60 * 60 * 24)
                                        )}{" "}
                                        dagen{" "}
                                    </>
                                ) : (
                                    ""
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">
                                                Menu openen
                                            </span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Acties
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                returnProduct(product.id)
                                            }
                                        >
                                            Nu retourneren
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default Borrowing;
