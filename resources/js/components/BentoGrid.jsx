import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const BentoGrid = () => {
    return (
        <section className="grid auto-rows-[80vw] grid-cols-3 gap-4 max-h-[40vh]">
            <div
                className={`row-span-1 rounded-xl  bg-gray-100 p-4 dark:bg-gray-900 h-[40vh]`}
            >
                <img src="" alt="{product.name}" className="w-1/2" />
                <h2 className="text-4xl mt-4"></h2>
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
