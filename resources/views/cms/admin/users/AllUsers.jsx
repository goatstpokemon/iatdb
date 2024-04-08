import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

const AllUsers = () => {
    const data = [
        {
            id: "1",
            name: "John Doe",
            status: "Active",
            email: "m@example.com",
        },
        {
            id: "2",
            name: "Jane Doe",
            status: "Active",
            email: "m@example.com",
        },
        {
            id: "3",
            name: "Pide Piper",
            status: "Non Active",
            email: "m@example.com",
        },
        {
            id: "4",
            name: "Shawn Sheep",
            status: "Active",
            email: "m@example.com",
        },
        {
            id: "5",
            name: "John Doe",
            status: "Not Active",
            email: "m@example.com",
        },
    ];
    return (
        <div className="container mx-auto py-10">
            <h1 className="font-bold text-4xl mb-10">Gebruikers</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
};
export default AllUsers;
