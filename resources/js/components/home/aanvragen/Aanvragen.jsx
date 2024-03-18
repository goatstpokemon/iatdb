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

const Aanvragen = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-muted-foreground">
                Aanvragen
            </h2>
            <Table>
                <TableCaption>Aanvraag berichten</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aanvraag periode</TableHead>
                        <TableHead>Bedrag</TableHead>
                        <TableHead className="text-right">
                            Goedkeuren/afkeuren
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            Pilot G2 gel pen
                        </TableCell>
                        <TableCell>Verzoek ingediend</TableCell>
                        <TableCell>5 tot 7 oktober</TableCell>
                        <TableCell>€0.50</TableCell>
                        <TableCell className="text-right">
                            <Button size="sm" variant="primary">
                                Bekijken
                            </Button>
                            <Button size="sm" variant="secondary">
                                Afkeuren
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
export default Aanvragen;
