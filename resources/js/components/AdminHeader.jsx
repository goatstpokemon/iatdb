import {
    ArrowDownLeft,
    ArrowDownRight,
    ArrowUpLeft,
    ArrowUpRight,
} from "lucide-react";
const AdminHeader = ({ title }) => {
    return (
        <div className="w-full h-48 bg-black rounded-2xl flex items-center mb-10 relative overflow-hidden">
            <div className="grid grid-cols-5 grid-rows-3 gap-4 absolute top-1 right-1  ">
                <div>
                    <ArrowUpRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-1 row-start-2">
                    <ArrowDownLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-2 row-start-2">
                    <ArrowDownRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-3 row-start-1">
                    <ArrowUpRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowDownLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowDownRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-3 row-start-4">
                    <ArrowUpLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-2 row-start-4">
                    <ArrowDownRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div className="col-start-1 row-start-4">
                    <ArrowUpLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpLeft
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
                <div>
                    <ArrowUpRight
                        className="w-24 h-24 -z-10 text-zinc-200
                        opacity-20"
                    />
                </div>
            </div>
            <h1 className="font-bold text-white text-5xl ml-10">{title}</h1>
        </div>
    );
};
export default AdminHeader;
