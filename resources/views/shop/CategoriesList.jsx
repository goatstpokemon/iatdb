import apiClient from "@/api";
import Container from "@/components/ui/container";
import { BentoGrid, BentoGridItem } from "@/components/ui/custom/bento";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
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
                setCategories(response.data.categories);
            });
    }, []);
    useEffect(() => {
        apiClient
            .get("/product", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setLoading(false);
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            });
    }, []);

    const search = (e) => {
        setSearchTerm(e.target.value);
        const filtered = products.filter((product) => {
            return product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setFilteredProducts(filtered);
    };

    if (loading) {
        return <Container>Loading...</Container>;
    } else {
        return (
            <Container>
                <h1 className="font-bold text-4xl my-10">Categorieen</h1>
                <BentoGrid className="max-w-4xl left-0">
                    {categories.map((category, i) => (
                        <BentoGridItem
                            key={category.id}
                            title={category.name}
                            link={category.name}
                            header={category.category_image}
                            className={
                                i === 3 || i === 6 ? "md:col-span-2" : ""
                            }
                        ></BentoGridItem>
                    ))}
                </BentoGrid>
                <h1 className="font-bold text-4xl my-10">Alle producten</h1>
                <Input
                    className="w-full md:w-[30rem]"
                    type="search"
                    placeholder="Zoek naar product"
                    value={searchTerm}
                    onChange={(e) => search(e)}
                />
                <div className="grid grid-cols-1 justify-items-center md:justify-items-start  gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts?.map((item, i) => (
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
            </Container>
        );
    }
};
export default CategoriesList;
