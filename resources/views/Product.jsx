import apiClient from "@/api";
import ReviewComponent from "@/components/ReviewComponent";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Container from "@/components/ui/container";
import { toast } from "sonner";
import { Loader, Shield, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams();
    const [stars, setStars] = useState(4);
    const [range, setRange] = useState([]);
    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [borrowingData, setBorrowingData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const product = {
        reviews: [
            { id: 1, comment: "Good product", rating: 5 },
            { id: 2, comment: "Bad product", rating: 1 },
        ],
    };

    const calcStars = (reviews) => {
        let total = 0;
        reviews.forEach((review) => {
            total += review.rating;
        });
        // setStars(total / reviews.length);
    };
    useEffect(() => {
        apiClient
            .get(`/product/item/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            });
        calcStars(product.reviews);
    }, []);
    console.log({ rangeFrom: range.from, rangeTo: range.to });
    const handleResetClick = () => setRange([]);
    const borrowProduct = () => {
        setBorrowingData({
            lending_date: new Date(range.from),
            return_date: new Date(range.to),
            product_id: data.product.id,
            borrower_id: user.id,
        });
        apiClient
            .post(`/lending/create`, borrowingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((res) => {
                toast.success("Lening aangevraagd");
            });
    };
    console.log({ borrowingData });
    if (isLoading) {
        return <Loader className="w-10 h-10" />;
    } else {
        return (
            <Container>
                <div className="lg:grid max-w-svw lg:h-[60vh] md:max-w-[80rem] lg:grid-cols-2 gap-10 py-16">
                    <section className="w-svw md:max-w-[32rem]">
                        <nav>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={`/products/categories/${data.product.category}`}
                                        >
                                            {data.product.category}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </nav>
                        <div className="mt-4">
                            <h1 className="font-bold text-4xl">
                                {data.product.name}
                            </h1>
                        </div>
                        <section className="mt-4 w-full">
                            <h2 className="sr-only">Product informatie</h2>
                            <div className="flex md:flex-row flex-col md:divide-x md:items-center">
                                <div>
                                    <h2 className="sr-only">Reviews</h2>
                                    <div>
                                        {stars > 0 ? (
                                            <div className="flex  items-center md:ml-4">
                                                {Array.from(
                                                    { length: stars },
                                                    (_, index) => (
                                                        <Star
                                                            key={index}
                                                            className="fill-yellow-400 h-8 w-8"
                                                            strokeWidth={0}
                                                            size={20}
                                                        />
                                                    )
                                                )}
                                                {product.reviews.length && (
                                                    <span className="text-sm ml-2">
                                                        {product.reviews.length}
                                                        reviews
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex items-center ml-4">
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => (
                                                        <Star
                                                            key={index}
                                                            className="fill-gray-200"
                                                            strokeWidth={0}
                                                            size={20}
                                                        />
                                                    )
                                                )}
                                                <span className="text-sm ml-2 text-muted-foreground">
                                                    Geen reviews
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-muted-foreground">
                                <p className="text-md">
                                    {data.product.description}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h2 className="mb-1 text-2xl font-bold ">
                                    Product lenen
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Kies hier je datum om te lenen
                                </p>
                                <div className="flex justify-center flex-col w-full">
                                    <Calendar
                                        mode="range"
                                        defaultMonth={new Date()}
                                        selected={range}
                                        onSelect={setRange}
                                        className={"pl-0 mt-2 w-full"}
                                    />
                                    <Button
                                        onClick={() => handleResetClick()}
                                        disabled={range.length < 1}
                                        className="mt-4 w-1/2"
                                    >
                                        Verwijder selectie
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center max-w-fit">
                                <Button
                                    onClick={() => borrowProduct()}
                                    className={
                                        "mt-10 w-[25rem] h-12 bg-emerald-600"
                                    }
                                >
                                    Product lenen
                                </Button>
                                <Link
                                    to={"/garantie"}
                                    className="mt-4 flex gap-2"
                                >
                                    <Shield color="lightGray" />
                                    <p className="text-muted-foreground">
                                        Leen en Uitleen Garantie
                                    </p>
                                </Link>
                            </div>
                        </section>
                    </section>
                    <section>
                        <div className="rounded-lg">
                            <img
                                src={data.product.product_image}
                                alt=""
                                className="rounded-lg object-cover h-full w-full"
                            />
                        </div>
                    </section>
                    <section className="my-10 flex items-center gap-5">
                        <img
                            src={data.owner.profile_image}
                            alt="image of user profile"
                            className="w-20 h-20 rounded-full"
                        />
                        <Link to={`/users/${data.owner.id}`}>
                            <h2 className="font-bold text-2xl ">
                                {data.owner.name}
                            </h2>
                            {stars > 0 ? (
                                <div className="flex items-center">
                                    {Array.from(
                                        { length: stars },
                                        (_, index) => (
                                            <Star
                                                key={index}
                                                className="fill-yellow-400 h-8 w-8"
                                                strokeWidth={0}
                                                size={10}
                                            />
                                        )
                                    )}
                                    {product.reviews.length && (
                                        <span className="text-sm ml-2">
                                            {product.reviews.length} reviews
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star
                                            key={index}
                                            className="fill-gray-200"
                                            strokeWidth={0}
                                            size={10}
                                        />
                                    ))}
                                    <span className="text-sm ml-2 text-muted-foreground">
                                        Geen reviews
                                    </span>
                                </div>
                            )}
                        </Link>
                    </section>
                    <section>
                        {product.}
                    </section>
                </div>
            </Container>
        );
    }
};

export default Product;
