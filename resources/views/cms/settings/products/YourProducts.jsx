import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { Link } from "react-router-dom";

const YourProducts = () => {
    const products = [
        {
            id: 1,
            name: "Pilot G2 Gel Pen",
            price: 1.4,
            period: "2 dagen geleden ontvangen",
            img: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
        },
    ];
    return (
        <div>
            {products.length === 0 ? (
                <NoProducts />
            ) : (
                <main className="min-w-full min-h-full flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Jouw Producten
                        </h1>
                    </div>
                    <div className="flex flex-1 py-10">
                        <div className="grid grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <div key={index}>
                                    <div>
                                        <img
                                            src={product.img}
                                            alt={product.name}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Link to={`/lend/${product.id}`}>
                                            <h3 className="text-md font-medium text-muted-foreground">
                                                {product.name}
                                            </h3>
                                            <h4>€{product.price.toFixed(2)}</h4>
                                            <p className="font-bold text-lg mt-1.5">
                                                {product.period}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default YourProducts;

const NoProducts = () => {
    return (
        <main className="min-w-full min-h-full flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Jouw Producten
                </h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-10">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        Momenteel geen producten
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Je kan beginnen met uitlenen als je producten toevoegt.
                    </p>
                    <Button className="mt-4 flex gap-5">
                        <CircleFadingPlus />
                        Voeg product toe
                    </Button>
                </div>
            </div>
        </main>
    );
};
