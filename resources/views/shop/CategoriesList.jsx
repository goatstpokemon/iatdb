import apiClient from "@/api";
import Container from "@/components/ui/container";
import { BentoGrid, BentoGridItem } from "@/components/ui/custom/bento";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    // const categories = [
    //     {
    //         id: 1,
    //         name: "Kleding",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-3 row-span-3  rounded-xl",
    //         to: "/products/categories/Kleding",
    //     },
    //     {
    //         id: 2,
    //         name: "Elektronica",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-4  rounded-xl",
    //         to: "/products/categories/Elektronica",
    //     },
    //     {
    //         id: 3,
    //         name: "Gereedschap",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-2 row-span-3 row-start-4 rounded-xl",
    //         to: "/products/categories/Gereedschap",
    //     },
    //     {
    //         id: 4,
    //         name: "Sport Spullen",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-3 row-start-4  rounded-xl",
    //         to: "/products/categories/Sport Spullen",
    //     },
    //     {
    //         id: 5,
    //         name: "Schrijfgerij",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-4 row-start-4  rounded-xl",
    //         to: "/products/categories/Schrijfgerij",
    //     },
    //     {
    //         id: 6,
    //         name: "Boeken",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Boeken",
    //     },
    //     {
    //         id: 7,
    //         name: "Speelgoed",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-2 row-span-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Speelgoed",
    //     },
    //     {
    //         id: 8,
    //         name: "Tuin Spullen",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-4 col-start-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Tuin Spullen",
    //     },
    // ];
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
                setLoading(false);
                setCategories(response.data.categories);
            });
    }, []);
    console.log({ categories });
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
            </Container>
        );
    }
};
export default CategoriesList;
