import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import Berichten from "./Berichten";
import Leningen from "./Leningen";

export function Overview() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Aanvragen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Berichten />
                </CardContent>
            </Card>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Aan het lenen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Leningen />
                </CardContent>
            </Card>
        </div>
    );
}
