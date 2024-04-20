import Container from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <Container>
            <h1 className="text-3xl font-bold my-10">Admin Dashboard</h1>
            <section className="flex flex-col md:flex-row gap-10">
                <div className="w-64 h-96 rounded-2xl bg-gray-900 flex flex-col relative">
                    <section className="absolute top-1 right-1">
                        <ArrowUpRight className="w-40 h-40 -z-10 text-zinc-200 opacity-25" />
                    </section>
                    <section className="h-1/2 p-3 mt-16 flex items-start ">
                        <h2 className="text-white uppercase font-medium text-[3rem] text-wrap z-10">
                            Beheer
                            <br /> al je <br /> users
                        </h2>
                    </section>
                    <section className="bottom-0 items-end justify-center h-1/2 flex">
                        <Link
                            to="/admin/users"
                            className="w-[90%] h-12 mb-4  bg-white rounded-lg flex justify-center items-center"
                        >
                            <h2 className="text-center text-2xl font-semibold">
                                Alle gebruikers
                            </h2>
                        </Link>
                    </section>
                </div>
                <div className="w-64 h-96 rounded-2xl bg-slate-200 flex flex-col relative">
                    <section className="absolute top-1 right-1">
                        <ArrowUpRight className="w-40 h-40 -z-10 text-gray-600 opacity-25" />
                    </section>
                    <section className="h-1/2 p-3 mt-16 flex items-start ">
                        <h2 className="text-black uppercase font-medium text-[2.6rem] text-wrap z-10">
                            Beheer
                            <br /> al je <br /> products
                        </h2>
                    </section>
                    <section className="bottom-0 items-end justify-center h-1/2 flex">
                        <Link
                            to="/admin/products"
                            className="w-[90%] h-12 mb-4  bg-white rounded-lg flex justify-center items-center"
                        >
                            <h2 className="text-center text-2xl font-semibold">
                                Alle producten
                            </h2>
                        </Link>
                    </section>
                </div>
                <div className="w-64 h-96 rounded-2xl bg-gray-900 flex flex-col relative">
                    <section className="absolute top-1 right-1">
                        <ArrowUpRight className="w-40 h-40 -z-10 text-zinc-200 opacity-25" />
                    </section>
                    <section className="h-1/2 p-3 mt-16 flex items-start ">
                        <h2 className="text-white uppercase font-medium text-[2rem] text-wrap z-10">
                            Bekijk
                            <br /> alle <br /> categorieen
                        </h2>
                    </section>
                    <section className="bottom-0 items-end justify-center h-1/2 flex">
                        <Link
                            to="/admin/categories"
                            className="w-[90%] h-12 mb-4  bg-white rounded-lg flex justify-center items-center"
                        >
                            <h2 className="text-center text-2xl font-semibold">
                                Alle categorieen
                            </h2>
                        </Link>
                    </section>
                </div>
            </section>
        </Container>
    );
};
export default AdminDashboard;
