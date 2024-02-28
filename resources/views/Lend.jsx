import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import React from "react";

const Lend = () => {
    return (
        <Container>
            <h1 className="font-bold text-5xl mb-10 text-center">Uitlenen</h1>
            <ProductList title={"Uitgeleend"} />
            <ProductList title={"Uit te lenen"} />
        </Container>
    );
};

export default Lend;
