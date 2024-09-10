import apiClient from "@/api";
import { useEffect, useState } from "react";

const Leningen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiClient
            .get("/lending/borrowed", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                console.log(response.data.lendings);
                setProducts(response.data.lendings);
            });
    }, []);
    return (
        <div className="space-y-8">
            {products.length === 0 && (
                <p className="text-muted-foreground text-center">
                    Je hebt momenteel geen producten geleend
                </p>
            )}
            {products.map((product) => (
                <div className="flex items-center" key={product.id}>
                    {product.returned === false ? (
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-bold leading-none">
                                {product.product.name}
                            </p>
                            <p className="text-sm text-muted-foreground font-medium">
                                {new Date(product.return_date) > Date.now() ? (
                                    <>
                                        Over {""}
                                        {Math.ceil(
                                            (new Date(product.return_date) -
                                                Date.now()) /
                                                (1000 * 60 * 60 * 24)
                                        )}{" "}
                                        dagen{" "}
                                    </>
                                ) : (
                                    ""
                                )}
                            </p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center">
                            Je hebt momenteel geen producten geleend
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};
export default Leningen;
