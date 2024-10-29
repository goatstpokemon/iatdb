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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createReviewSchema = z.object({
    rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
    comment: z.string().min(1),
});
const Product = () => {
    const { id } = useParams();
    const [stars, setStars] = useState(4);
    const [range, setRange] = useState([]);
    const [product, setProduct] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [borrowingData, setBorrowingData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [allowedToReview, setAllowedToReview] = useState(false);

    const form = useForm({
        resolver: zodResolver(createReviewSchema),
        mode: "onChange",
    });

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
                setProduct(res.data);
                apiClient
                    .get(`/review/${id}/request`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "ACCESS_TOKEN"
                            )}`,
                        },
                    })
                    .then((res) => {
                        setAllowedToReview(res.data.allowed);
                    });
                setIsLoading(false);
            });
    }, []);
    console.log({ rangeFrom: range.from, rangeTo: range.to });
    const handleResetClick = () => setRange([]);
    const borrowProduct = () => {
        setBorrowingData({
            lending_date: new Date(range.from),
            return_date: new Date(range.to),
            product_id: product.product.id,
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
    const handleReviewSubmit = (data) => {
        console.log({ data });

        const form = new FormData();
        form.append("rating", data.rating);
        form.append("comment", data.comment);
        form.append("owner", product.owner.id);
        form.append("renter", user.id);
        console.log({ form });

        apiClient
            .post(`/review/create`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then(() => {
                toast.success("Review geplaatst");
            });
    };
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
                                            href={`/products/categories/${product.product.category}`}
                                        >
                                            {product.product.category}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </nav>
                        <div className="mt-4">
                            <h1 className="font-bold text-4xl">
                                {product.product.name}
                            </h1>
                        </div>
                        <section className="mt-4 w-full">
                            <h2 className="sr-only">Product informatie</h2>

                            <div className="mt-4 text-muted-foreground">
                                <p className="text-md">
                                    {product.product.description}
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
                                src={product.product.product_image}
                                alt=""
                                className="rounded-lg object-cover h-full w-full"
                            />
                        </div>
                    </section>
                    <section className="my-10 flex flex-col ">
                        <section className="flex items-center gap-5">
                            <img
                                src={product.owner.profile_image}
                                alt="image of user profile"
                                className="w-20 h-20 rounded-full"
                            />
                            <Link to={`/users/${product.owner.id}`}>
                                <h2 className="font-bold text-2xl ">
                                    {product.owner.name}
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

                                        <span className="text-sm ml-2">
                                            2 reviews
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <Star
                                                    key={index}
                                                    className="fill-gray-200"
                                                    strokeWidth={0}
                                                    size={10}
                                                />
                                            )
                                        )}
                                        <span className="text-sm ml-2 text-muted-foreground">
                                            Geen reviews
                                        </span>
                                    </div>
                                )}
                            </Link>
                        </section>
                        <section>
                            {/* hier komt een melding om een review achter te laten als je al het product geleend hebt */}
                            {allowedToReview === true ? (
                                <>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                handleReviewSubmit
                                            )}
                                        >
                                            <h2 className="font-bold text-xl">
                                                Laat een review achter
                                            </h2>
                                            <FormField
                                                control={form.control}
                                                name="rating"
                                                className="flex items-center gap-4"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Rating
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Kies sterren" />
                                                                </SelectTrigger>
                                                            </FormControl>

                                                            <SelectContent>
                                                                <SelectItem
                                                                    {...field}
                                                                    value={1}
                                                                >
                                                                    1 ster
                                                                </SelectItem>
                                                                <SelectItem
                                                                    {...field}
                                                                    value={2}
                                                                >
                                                                    2 sterren
                                                                </SelectItem>
                                                                <SelectItem
                                                                    {...field}
                                                                    value={3}
                                                                >
                                                                    3 sterren
                                                                </SelectItem>
                                                                <SelectItem
                                                                    {...field}
                                                                    value={4}
                                                                >
                                                                    4 sterren
                                                                </SelectItem>
                                                                <SelectItem
                                                                    {...field}
                                                                    value={5}
                                                                >
                                                                    5 sterren
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="comment"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Comment
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Wat vond je van de gebruiker?"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="mt-5"
                                            >
                                                Plaats review
                                            </Button>
                                        </form>
                                    </Form>
                                </>
                            ) : (
                                <>
                                    <ReviewComponent
                                        product_id={id}
                                        user_id={user.id}
                                    />
                                </>
                            )}
                        </section>
                    </section>
                </div>
            </Container>
        );
    }
};

export default Product;
