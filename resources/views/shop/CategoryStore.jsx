import ProductList from "@/components/ProductList";
import { CategoriesName } from "./tempdata";
import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import apiClient from "@/api";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const CategoryStore = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        apiClient
            .get(`/product/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((res) => {
                setIsLoading(false);
                setData(res.data.category);
            });
    }, []);
    console.log({ data });
    if (!isLoading) {
        return (
            <>
                <section className="border-b">
                    <div className="px-[10rem] mx-auto">
                        <div className="flex flex-col lg:flex-row items-center lg:gap-20 py-10">
                            <div className="rounded-xl pb-5">
                                <img
                                    className="rounded-xl h-[30rem] object-cover"
                                    src={CategoriesName[0].image}
                                    alt={id}
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-6xl font-bold  my-2">
                                    {id}
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="px-[10rem] mx-auto">
                    <ProductList title={id} data={data} isLoading={isLoading} />
                </div>
            </>
        );
    } else {
        return (
            <>
                <section className="border-b">
                    <div className="px-[10rem] mx-auto">
                        <div className="flex flex-col lg:flex-row items-center lg:gap-20 py-10">
                            <div className="rounded-xl pb-5">
                                <Skeleton className="h-[30rem] rounded-xl" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="px-[10rem] mx-auto">
                    <ProductList title={id} data={data} isLoading={isLoading} />
                </div>
            </>
        );
    }
};
export default CategoryStore;
