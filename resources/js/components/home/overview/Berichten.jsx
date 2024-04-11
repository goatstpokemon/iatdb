import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const Berichten = () => {
    const id = 1;
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">
                        Pilot G2 Gel Pen
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Olivia Martin
                    </p>
                </div>
                <div className="ml-auto">
                    <Button size="sm" variant="primary">
                        Bekijken
                    </Button>
                    <Button size="sm" variant="secondary">
                        Afkeuren
                    </Button>
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">Stopwatch</p>
                    <p className="text-sm text-muted-foreground">Jackson Lee</p>
                </div>
                <div className="ml-auto">
                    <Button size="sm" variant="primary">
                        <Link to={`/request/${id}`}>Bekijken</Link>
                    </Button>
                    <Button size="sm" variant="secondary">
                        Afkeuren
                    </Button>
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-bold leading-none">
                        Wiskunde voor het HBO
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Isabella Nguyen
                    </p>
                </div>
                <div className="ml-auto">
                    <Button size="sm" variant="primary">
                        Bekijken
                    </Button>
                    <Button size="sm" variant="secondary">
                        Afkeuren
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Berichten;
