import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Lending = () => {
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
                        <TableHead className="text-right">Bedrag</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            Pilot G2 gel pen
                        </TableCell>
                        <TableCell>Uitgeleend</TableCell>
                        <TableCell>Nog 3 dagen</TableCell>
                        <TableCell className="text-right">€0.50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
export default Lending;
