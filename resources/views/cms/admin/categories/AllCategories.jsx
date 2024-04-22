import apiClient from "@/api";
import AdminHeader from "@/components/AdminHeader";
import { categoriesColums } from "@/components/table/CategoriesColumns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        apiClient
            .get("/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setData(response.data.products);
            });
    }, []);
    return (
        <div className="container mx-auto py-10">
            <AdminHeader title={"Categorieen"} />
            <DataTable
                columns={categoriesColums}
                data={data}
                button={"Nieuw Categorie"}
            />

            <Button className="h-10 gap-2" onClick={() => navigate("add")}>
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Nieuw Categorie
                </span>
            </Button>
        </div>
    );
};
export default AllCategories;
