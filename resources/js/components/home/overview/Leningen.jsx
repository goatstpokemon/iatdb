import { Link } from "react-router-dom";
const Leningen = () => {
    return (
        <div className="space-y-8">
            <Link to="/" className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">
                        Pilot G2 Gel Pen
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Olivia Martin
                    </p>
                </div>
                <div className="ml-auto font-medium">Nog 3 dagen</div>
            </Link>
            <Link to="/" className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">Stopwatch</p>
                    <p className="text-sm text-muted-foreground">Jackson Lee</p>
                </div>
                <div className="ml-auto font-medium">Nog 1 dag</div>
            </Link>
            <Link to="/" className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">
                        Wiskunde voor het HBO
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Isabella Nguyen
                    </p>
                </div>
                <div className="ml-auto font-medium">Nog 1 week</div>
            </Link>
        </div>
    );
};
export default Leningen;
