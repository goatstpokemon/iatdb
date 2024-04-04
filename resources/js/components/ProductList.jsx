import { Skeleton } from "./ui/skeleton";

import { Link } from "react-router-dom";

const ProductList = ({ title, data, isLoading }) => {
    if (isLoading) {
        return (
            <section className="mt-10">
                <h1 className="text-4xl font-semibold">{title}</h1>
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="aspect-video h-40 rounded-md mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    } else {
        return (
            <section className="mt-10">
                <h1 className="text-4xl font-semibold">{title}</h1>
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    {data?.category.map((item, i) => (
                        <Link
                            to={`/product/${item.id}`}
                            key={i}
                            className=" rounded-xl dark:bg-neutral-900"
                        >
                            <div className=" aspect-square h-40 bg-gray-100 mb-4 rounded-md">
                                <img
                                    src={item.product_image}
                                    alt="product"
                                    className="object-cover h-full w-full rounded-md"
                                />
                            </div>
                            <h2 className="text-xl font-semibold mb-1">
                                {item.name}
                            </h2>
                            <p className="text-md font-normal">{item.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }
};
export default ProductList;
