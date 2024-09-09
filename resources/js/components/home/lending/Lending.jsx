import apiClient from "@/api";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const Lending = () => {
    const [lendings, setLendings] = useState([]);

    useEffect(() => {
        apiClient
            .get("/lending/lent", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setLendings(response.data.lentOut);
            });
    }, []);
    console.log(lendings);

    return (
        <div>
            <h2 className="text-2xl font-bold text-muted-foreground">
                Uit geleend
            </h2>
            <Table>
                <TableCaption>Alles wat je uit aan het lenen bent</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Retour datum</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lendings.map((lending) => (
                        <TableRow key={lending.id}>
                            <TableCell className="font-medium">
                                {lending.product.name}
                            </TableCell>
                            <TableCell>
                                {new Date(lending.return_date) &&
                                new Date(lending.return_date) >= Date.now()
                                    ? "Uitgeleend"
                                    : "Teruggebracht"}
                            </TableCell>
                            <TableCell>
                                {new Date(lending.return_date) > Date.now() ? (
                                    <>
                                        Over {""}
                                        {Math.ceil(
                                            (new Date(lending.return_date) -
                                                Date.now()) /
                                                (1000 * 60 * 60 * 24)
                                        )}{" "}
                                        dagen{" "}
                                    </>
                                ) : (
                                    ""
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default Lending;
