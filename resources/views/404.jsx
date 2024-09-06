import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container mt-auto flex h-svh min-h-full flex-1 flex-col items-center justify-center gap-4">
            <h1 className="text-8xl font-bold tracking-tight text-muted-foreground">
                404
            </h1>
            <p className="text-xg font-semibold">Page not found</p>
            <div className="mt-8 flex gap-2">
                <Button asChild>
                    <Link to="/">Ga terug</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
