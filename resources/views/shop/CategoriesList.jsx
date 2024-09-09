import apiClient from "@/api";
import Container from "@/components/ui/container";
import { BentoGrid, BentoGridItem } from "@/components/ui/custom/bento";

import { useEffect, useState } from "react";


const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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
