import { Link } from "react-router-dom";

const LendingPage = () => {
    const product = {
        id: 1,
        name: "Pilot G2 Gel Pen",
        price: 1.4,
        period: "2 dagen geleden ontvangen",
        img: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
    };
    return (
        <div>
            <h1 className="text-4xl font-bold">Uit aan het lenen</h1>

            <div className="grid grid-cols-4 gap-8 mt-8">
                {[...Array(4)].map((_, index) => (
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

            <h1 className="text-4xl font-bold mt-20">
                Geschiedenis van uitlenen{" "}
            </h1>
            <div className="grid grid-cols-4 gap-8 mt-8">
                {[...Array(4)].map((_, index) => (
                    <div>
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
    );
};
export default LendingPage;
