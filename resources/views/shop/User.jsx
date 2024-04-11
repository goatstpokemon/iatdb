import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import apiClient from "@/api";
const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiClient
            .get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setLoading(false);
                setUser(response.data.user);
                setProducts(response.data.products);
            });
    }, []);
    console.log({ products, user });
    // const user = {
    //     id: 1,
    //     name: "John Doe",
    //     email: "john@doe.com",
    //     profile_picture: "https://randomuser.me/api/portraits/men/75.jpg",
    //     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    //     address: {
    //         street: "Hoofdstraat 123",
    //         city: "Amsterdam",
    //         state: "NH",
    //         zip: "1234 AB",
    //     },
    //     reviews: [
    //         {
    //             id: 1,
    //             rating: 5,
    //             comment: "Great user!",
    //             type: "lending",
    //         },
    //         {
    //             id: 2,
    //             rating: 3,
    //             comment: "Good user!",
    //             type: "borrowing",
    //         },
    //     ],
    // };

    if (loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <Container>
                <section className="flex flex-col-reverse lg:grid grid-cols-3 ">
                    <div className="flex flex-col gap-2">
                        <img
                            src={user.profile_image}
                            alt={user.name}
                            className="rounded-xl w-28 h-28 object-cover"
                        />
                        <h1 className="text-4xl font-bold mt-2">{user.name}</h1>
                        <p className="text-md text-muted-foreground">
                            {user.email}
                        </p>
                        <div className="flex gap-4 mt-2 font-bold text-md">
                            <span>20x Geleend</span>
                            <span>10x Uitgeleed</span>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button varient="primary">Bekijk producten</Button>
                        </div>
                    </div>
                </section>
                <section className="mt-10">
                    <Tabs defaultValue="products" className="max-w-[500px]">
                        <TabsList variant={"underline"}>
                            <TabsTrigger value="products" variant={"underline"}>
                                Producten
                            </TabsTrigger>
                            <TabsTrigger value="reviews" variant={"underline"}>
                                Reviews
                            </TabsTrigger>
                            <TabsTrigger value="about" variant={"underline"}>
                                Gebruiker
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="products">
                            {products.length ? (
                                <ProductList
                                    data={products}
                                    isLoading={loading}
                                />
                            ) : (
                                <div className="flex min-h-[20vh] justify-center items-center">
                                    <p>De gebruiker heeft geen producten</p>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="reviews">
                            {user.reviews ? (
                                <>
                                    {user.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="flex gap-4"
                                        >
                                            <div className="flex flex-col">
                                                <p>{review.comment}</p>
                                                <p>{review.rating} sterren</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p>
                                                    {review.type === "lending"
                                                        ? "Uitgeleend"
                                                        : "Geleend"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="flex min-h-[20vh] justify-center items-center">
                                    <p>De gebruiker heeft geen reviews</p>
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="about">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold">
                                    Gebruiker Informatie
                                </h1>
                                <p>
                                    <span className="font-bold">Naam:</span>{" "}
                                    {user.name}
                                </p>
                                <p>
                                    <span className="font-bold">bio:</span>{" "}
                                    {user.bio}
                                </p>
                                <p>
                                    <span className="font-bold">Email:</span>{" "}
                                    {user.email}
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>
            </Container>
        );
    }
};
export default User;
