import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const BentoGrid = () => {
    const product = {
        name: "Test Product",
        description: "This is a test product",
        image: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F6a0524be-9099-428b-a250-54a95f9fbf1c.23ba03a584911303f63eb9dc867c0426.jpeg&sp=1709306675Ta4433faa11f88bd9bbda3d989f29d9ee3b511f52b0a713177cbade7c074c866b",
    };
    return (
        <section className="grid auto-rows-[80vw] grid-cols-3 gap-4 max-h-[40vh]">
            <div
                className={`row-span-1 rounded-xl  bg-gray-100 p-4 dark:bg-gray-900 h-[40vh]`}
            >
                <img src={product.image} alt={product.name} className="w-1/2" />
                <h2 className="text-4xl mt-4">{product.name}</h2>
                <Link
                    className="mt-4 p-2 bg-gray-900 text-white"
                    to={"/product"}
                >
                    Leen nu
                </Link>
            </div>
            <div
                className={`row-span-1 rounded-xl  bg-gray-100 p-4 dark:bg-gray-900 h-[40vh] ${"col-span-2"}`}
            ></div>
        </section>
    );
};

export default BentoGrid;
