import BentoGrid from "@/components/BentoGrid";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import { mostPurchasedProduct } from "@/lib/algo/MostRented";
import React from "react";

const Borrow = () => {
    return (
        <Container>
            <h1 className="font-bold text-5xl mb-10 text-center">Lenen</h1>
            <BentoGrid />
            <ProductList title={"Alle producten"} />
        </Container>
    );
};

export default Borrow;
