import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CategoriesList = () => {
    // const categories = [
    //     {
    //         id: 1,
    //         name: "Kleding",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-3 row-span-3  rounded-xl",
    //         to: "/products/categories/Kleding",
    //     },
    //     {
    //         id: 2,
    //         name: "Elektronica",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-4  rounded-xl",
    //         to: "/products/categories/Elektronica",
    //     },
    //     {
    //         id: 3,
    //         name: "Gereedschap",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-2 row-span-3 row-start-4 rounded-xl",
    //         to: "/products/categories/Gereedschap",
    //     },
    //     {
    //         id: 4,
    //         name: "Sport Spullen",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-3 row-start-4  rounded-xl",
    //         to: "/products/categories/Sport Spullen",
    //     },
    //     {
    //         id: 5,
    //         name: "Schrijfgerij",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-3 col-start-4 row-start-4  rounded-xl",
    //         to: "/products/categories/Schrijfgerij",
    //     },
    //     {
    //         id: 6,
    //         name: "Boeken",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Boeken",
    //     },
    //     {
    //         id: 7,
    //         name: "Speelgoed",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "col-span-2 row-span-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Speelgoed",
    //     },
    //     {
    //         id: 8,
    //         name: "Tuin Spullen",
    //         image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         className: "row-span-4 col-start-4 row-start-7  rounded-xl",
    //         to: "/products/categories/Tuin Spullen",
    //     },
    // ];
    return (
        <Container>
            <h1 className="font-bold text-4xl my-10">Categorieen</h1>
            <div className="grid grid-cols-4 grid-rows-10 gap-4 min-h-svh">
                {categories.map((category) => (
                    <Link
                        to={category.to}
                        key={category.id}
                        style={{
                            backgroundImage: `url(${category.image})`,
                            objectFit: "cover",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            position: "relative",
                        }}
                        className={category.className}
                    >
                        <div className="absolute w-full bottom-0 left-0 bg-gradient-to-t from-gray-100 to-transparent h-20 z-10 flex items-end pb-3 rounded-b-xl ">
                            <h2 className="text-2xl font-semibold   px-6  ">
                                {category.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </Container>
    );
};
export default CategoriesList;
