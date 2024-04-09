import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { Copy, CalendarDays, BadgeEuro, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const ViewRequest = () => {
    const { id } = useParams();
    const request = {
        id: 1,
        product: {
            id: 1,
            name: "Pilot G2 Gel Pen",
        },
        price: 0.5,
        message: "I would love to borrow this pen for a day",
        status: "pending",
        start_date: new Date("2022-01-01"),
        end_date: new Date("2022-01-03"),
        location: "Amsterdam",
        updated_at: new Date("2023-11-23"),
        paid: false,
        requester: {
            id: 1,
            name: "John Doe",
            rating: 4.5,
            email: "john@doe.com",
            phone: "+31 6 12345678",
            address: {
                street: "Hoofdstraat 123",
                city: "Amsterdam",
                state: "NH",
                zip: "1234 AB",
            },
        },
    };

    var diffDays = request.end_date.getTime() - request.start_date.getTime();
    var days = diffDays / (1000 * 3600 * 24);
    const total = request.price * days;

    return (
        <Container>
            <div className="flex flex-col lg:grid grid-cols-3 lg:gap-20">
                <div className="col-span-2">
                    <div className="grid gap-2">
                        <h1 className="font-bold text-4xl">
                            Aanvraag #{request.id}
                        </h1>
                        <div className="flex flex-row items-center gap-2">
                            <Badge
                                variant={
                                    request.status === "success"
                                        ? "green"
                                        : "amber"
                                }
                            >
                                {request.status === "success"
                                    ? "Goedgekeurd"
                                    : "In afwachting"}
                            </Badge>
                        </div>

                        <Card className="border-0 bg-muted/50">
                            <CardHeader className="font-semibold text-xl">
                                Goedkeuren of Afkeuren
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-10 items-center mb-5">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="text-muted-foreground w-5 h-5" />
                                        <span className="text-muted-foreground">
                                            {days}

                                            {days > 1 ? " dagen" : " dag"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BadgeEuro />
                                        <span>€ {total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 my-2 items-center">
                                    <Button
                                        variant="green"
                                        className="flex gap-2 hover:bg-green-300 hover:text-green-900"
                                    >
                                        {" "}
                                        <Check />
                                        Goedkeuren
                                    </Button>
                                    <Button
                                        variant="red-subtle"
                                        className="flex gap-2 hover:bg-red-600 hover:text-white"
                                    >
                                        <X />
                                        Afkeuren
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="my-5">
                            <CardHeader className="font-semibold text-xl">
                                Bericht
                            </CardHeader>
                            <CardContent>
                                <p className="text-md text-muted-foreground">
                                    {request.message}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="my-5">
                        <div className="flex">
                            <img
                                src="/storage/person.jpg"
                                alt=""
                                className="size-24 rounded-xl mr-3 object-cover  "
                            />
                            <div className="flex flex-col gap-1">
                                <h2 className="font-semibold text-xl">
                                    {request.requester.name}
                                </h2>
                                <p className="text-muted-foreground">
                                    {request.requester.rating} sterren
                                </p>
                                <Link
                                    to={`/user/${request.requester.id}`}
                                    className=""
                                >
                                    Bekijk profiel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <Card
                        className="overflow-hidden"
                        x-chunk="dashboard-05-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    Aanvraag #{request.id}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only">
                                            Copy Order ID
                                        </span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm text-muted-foreground">
                                            Start datum:{" "}
                                            {request.start_date.toLocaleDateString(
                                                "nl-NL",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Eind datum:{" "}
                                            {request.end_date.toLocaleDateString(
                                                "nl-NL",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <h3 className="font-semibold text-xl">
                                    Aanvraag gegevens
                                </h3>
                                <h4>
                                    <span className="text-lg font-medium">
                                        Product
                                    </span>
                                </h4>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            {request.product.name}
                                        </span>
                                        <span>
                                            € {request.price.toFixed(2)}{" "}
                                            <span className="text-muted-foreground">
                                                / dag
                                            </span>
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Aantal dagen</span>
                                        <span className="text-muted-foreground">
                                            {days}

                                            {days > 1 ? " dagen" : " dag"}
                                        </span>
                                    </li>
                                </ul>

                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">
                                            Totaal
                                        </span>
                                        <span>€ {total.toFixed(2)}</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">
                                        Factuur adres
                                    </div>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        <span>{request.requester.name}</span>
                                        <span>
                                            {request.requester.address.street}
                                        </span>
                                        <span>
                                            {request.requester.address.zip}
                                        </span>
                                        <span>
                                            {request.requester.address.city}
                                        </span>
                                    </address>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Gebruiker</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Naam
                                        </dt>
                                        <dd>{request.requester.name}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Email
                                        </dt>
                                        <dd>
                                            <a href="mailto:">
                                                {request.requester.email}
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">
                                            Telfoonnummer
                                        </dt>
                                        <dd>
                                            <a href="tel:">
                                                {request.requester.phone}
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">
                                    Betalings status
                                </div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant={
                                                request.paid ? "green" : "red"
                                            }
                                        >
                                            {request.paid
                                                ? "Betaald"
                                                : "Niet betaald"}
                                        </Badge>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground">
                                Laatst Gewijzigd{" "}
                                <time dateTime="2023-11-23">
                                    {request.updated_at.toLocaleDateString(
                                        "nl-NL",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </time>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Container>
    );
};
export default ViewRequest;
