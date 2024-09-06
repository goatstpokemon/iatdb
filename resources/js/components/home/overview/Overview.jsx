import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import Berichten from "./Berichten";
import Leningen from "./Leningen";
import apiClient from "@/api";

export function Overview() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        apiClient
            .get("/lending/requests", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setRequests(response.data.lendingRequests);
            });
    }, []);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Aanvragen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Berichten requests={requests} setRequests={setRequests} />
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
