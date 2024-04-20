import apiClient from "@/api";
import { categoriesColums } from "@/components/table/CategoriesColumns";
import { productColums } from "@/components/table/ProductColumns";
import { userColumns } from "@/components/table/UserColumns";
import { DataTable } from "@/components/table/data-table";
import {
    ArrowDownLeft,
    ArrowDownRight,
    ArrowUpLeft,
    ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const AllCategories = () => {
    const [data, setData] = useState([]);
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
            <div className="w-full h-48 bg-black rounded-2xl flex items-center mb-10 relative overflow-hidden">
                <div className="grid grid-cols-5 grid-rows-3 gap-4 absolute top-1 right-1  ">
                    <div>
                        <ArrowUpRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-1 row-start-2">
                        <ArrowDownLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-2 row-start-2">
                        <ArrowDownRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-3 row-start-1">
                        <ArrowUpRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowDownLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowDownRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-3 row-start-4">
                        <ArrowUpLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-2 row-start-4">
                        <ArrowDownRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div className="col-start-1 row-start-4">
                        <ArrowUpLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpLeft
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                    <div>
                        <ArrowUpRight
                            className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                        />
                    </div>
                </div>
                <h1 className="font-bold text-white text-5xl ml-10">
                    Categorieen
                </h1>
            </div>
            <DataTable columns={categoriesColums} data={data} />
        </div>
    );
};
export default AllCategories;
