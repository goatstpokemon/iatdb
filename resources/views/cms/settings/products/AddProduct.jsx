import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Store } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

const addProductSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "2 karakters is wel heel kort, probeer het nog eens.",
        })
        .max(30, {
            message: "Het moet korter zijn dan 30 karakters.",
        }),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    size: z.string(),
});

const AddProduct = () => {
    const onSubmit = (data) => {};
    const form = useForm({
        resolver: zodResolver(addProductSchema),
        mode: "onChange",
    });
    const product = {
        category: "kleding",
    };
    const categoryWatcher = useWatch({
        name: "category",
        control: form.control,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Top bar */}
                <section className="flex h-fit justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Store />
                        <h1 className="font-medium text-2xl">
                            Voeg product toe
                        </h1>
                    </div>
                    <div>
                        <Button className="btn-primary" type="submit">
                            Voeg Product Toe
                        </Button>
                    </div>
                </section>
                {/* General Info */}
                <section className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-5 gap-4">
                    <section className="bg-gray-50 rounded-xl p-4 col-span-2 row-span-3">
                        <h2 className="font-semibold text-lg">
                            Algemene informatie
                        </h2>

                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Productnaam</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="productnaam"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Beschrijving</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product beschrijving"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {categoryWatcher === "Kleding" ? (
                            <section className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-5">
                                <FormField
                                    control={form.control}
                                    name="size"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Maat</FormLabel>
                                            <FormDescription>
                                                Kies de maat van het kleding
                                            </FormDescription>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Kies maat" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="xs">
                                                        XS
                                                    </SelectItem>
                                                    <SelectItem value="s">
                                                        S
                                                    </SelectItem>
                                                    <SelectItem value="m">
                                                        M
                                                    </SelectItem>
                                                    <SelectItem value="l">
                                                        L
                                                    </SelectItem>
                                                    <SelectItem value="xl">
                                                        XL
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3 col-span-2 mt-4 md:mt-0">
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex  space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="man" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Man
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="vrouw" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Vrouw
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="unisex" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Unisex
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </section>
                        ) : null}
                    </section>
                    <section className="row-span-4 col-start-3 bg-gray-50 rounded-xl p-4">
                        <section className="">
                            <h2 className="font-semibold text-lg my-2">
                                Foto uploaden
                            </h2>
                            <div className="my-2">
                                <div className="rounded-md bg-gray-200 w-[98%] aspect-square"></div>
                            </div>
                            <input type="file" />
                        </section>
                    </section>
                    <section className="col-span-2 row-span-2 row-start-4 bg-gray-50 rounded-xl p-4">
                        <h2 className="font-semibold text-lg my-2">Prijs</h2>
                    </section>
                    <section className="col-start-3 row-start-5">
                        <section className="bg-gray-50 rounded-xl p-4">
                            <h2 className="font-semibold text-lg my-2">
                                Categorie
                            </h2>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categorie Kiezen</FormLabel>

                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Categorieen" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Kleding">
                                                    Kleding
                                                </SelectItem>
                                                <SelectItem value="Schrijfgerij">
                                                    Schrijfgerij
                                                </SelectItem>
                                                <SelectItem value="Sport spullen">
                                                    Sport spullen
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                    </section>
                </section>
            </form>
        </Form>
    );
};
export default AddProduct;
