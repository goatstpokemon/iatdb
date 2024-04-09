import Container from "@/components/ui/container";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const User = () => {
    const { id } = useParams();
    const user = {
        id: 1,
        name: "John Doe",
        email: "john@doe.com",
        profile_picture: "https://randomuser.me/api/portraits/men/75.jpg",
        address: {
            street: "Hoofdstraat 123",
            city: "Amsterdam",
            state: "NH",
            zip: "1234 AB",
        },
        reviews: [
            {
                id: 1,
                rating: 5,
                comment: "Great user!",
                type: "lending",
            },
            {
                id: 2,
                rating: 3,
                comment: "Good user!",
                type: "borrowing",
            },
        ],
    };

    return (
        <Container>
            <section className="flex flex-col-reverse lg:grid grid-cols-3 ">
                <div className="flex flex-col gap-2">
                    <img
                        src={user.profile_picture}
                        alt={user.name}
                        className="rounded-xl w-28 h-28 object-cover"
                    />
                    <h1 className="text-4xl font-bold mt-2">{user.name}</h1>
                    <p className="text-md text-muted-foreground">
                        {user.email}
                    </p>
                    <p className="flex gap-2 text-muted-foreground">
                        <MapPin />
                        {user.address.city}
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
                            Products
                        </TabsTrigger>
                        <TabsTrigger value="reviews" variant={"underline"}>
                            Reviews
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="reviews">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </section>
        </Container>
    );
};
export default User;
