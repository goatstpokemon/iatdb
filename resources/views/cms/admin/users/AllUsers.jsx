import apiClient from "@/api";
import { userColumns } from "@/components/table/UserColumns";
import { DataTable } from "@/components/table/data-table";
import { useEffect, useState } from "react";

const AllUsers = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        apiClient
            .get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setData(response.data.users);
            });
    }, []);
    console.log({ data });

    return (
        <div className="container mx-auto py-10">
            <h1 className="font-bold text-4xl mb-10">Gebruikers</h1>
            <DataTable columns={userColumns} data={data} type="user" />
        </div>
    );
};
export default AllUsers;
