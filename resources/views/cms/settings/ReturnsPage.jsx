import apiClient from "@/api";
import { Button } from "@/components/ui/button";

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
import { toast } from "sonner";

const Returns = () => {
    const [returns, setReturns] = useState([]);

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
                if (response.data) {
                    if (response.data.lentOut) {
                        setReturns(response.data.lentOut);
                    }
                }
            });
    }, []);

    const handleReturn = (id) => {
        apiClient
            .get(`/lending/returns/${id}/return`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then(() => {
                toast.success("Product is geretourneerd");
            });
    };

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
                    {returns.map((re) => (
                        <TableRow key={re.id}>
                            {new Date(re.return_date) &&
                            new Date(re.return_date) <= Date.now() ? (
                                <>
                                    <TableCell className="font-medium">
                                        {re.product.name}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(re.return_date) &&
                                        new Date(re.return_date) >=
                                            Date.now() ? (
                                            "Uitgeleend"
                                        ) : (
                                            <strong>Moet nu terug</strong>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            className="secondary"
                                            onClick={() => handleReturn(re.id)}
                                        >
                                            Retour Accepteren
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                ""
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default Returns;
