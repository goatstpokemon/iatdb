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
import DropZone from "@/components/ui/custom/dropzone";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import apiClient from "@/api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

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
    size: z.string().optional(),
    type: z.string().optional(),
    file: z.any(),
    price: z.string().transform((v) => Number(v) || 0),
    category: z.string(),
});

const EditProducts = () => {
    const [productImg, setProductImg] = useState({});
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const form = useForm({
        resolver: zodResolver(addProductSchema),
        mode: "onChange",
    });

    const categoryWatcher = useWatch({
        name: "category",
        control: form.control,
    });

    const handleOnDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            form.setValue("file", acceptedFiles[0]);
            form.clearErrors("file");
            getImageData(acceptedFiles[0]);
        } else {
            form.setValue("file", null);
            form.setError("file", {
                message: "File is required",
                type: "typeError",
            });
        }
    };
    function getImageData(file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setProductImg(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        return fileReader.result;
    }
    const submitHandler = (data) => {
        console.log({ data });
        const form = new FormData();
        form.append("photo", data.file);
        form.append("name", data.name);
        form.append("description", data.description);
        form.append("price", parseFloat(data.price).toFixed(2));
        form.append("category", data.category);
        form.append("size", data.size);
        form.append("type", data.type);
        apiClient
            .post(`/product/item/${id}/update`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                toast.success("Product toegevoegd");
            })
            .catch((error) => {
                toast.error("Er is iets mis gegaan");
            });
    };

    useEffect(() => {
        apiClient
            .get(`/product/item/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setProduct(response.data.product);
                form.setValue("name", response.data.product.name);
                form.setValue("description", response.data.product.description);
                form.setValue("price", response.data.product.price);
                form.setValue("category", response.data.product.category);
                form.setValue("size", response.data.product.size);
                form.setValue("type", response.data.product.type);
                form.setValue("file", response.data.product.photo);
            });
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                {/* Top bar */}
                <section className="flex h-fit justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Store />
                        <h1 className="font-medium text-2xl">Bewerk Product</h1>
                    </div>
                    <div>
                        <Button type="submit">Aanpassen</Button>
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
                                <div className="rounded-md  w-[98%] aspect-square">
                                    {form.watch("file") ||
                                    product.product_image ? (
                                        <div className="flex items-center justify-center gap-3 p-4 relative">
                                            {product && (
                                                <img
                                                    className="rounded-md  w-[98%] aspect-square"
                                                    src={product.product_image}
                                                    alt="product img"
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-md  w-[98%] aspect-square bg-gray-200"></div>
                                    )}
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="file"
                                accept="image/*"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <DropZone
                                                {...field}
                                                dropMessage="Drop files or click here"
                                                handleOnDrop={handleOnDrop}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                    </section>
                    <section className="col-span-2 row-span-2 row-start-4 bg-gray-50 rounded-xl p-4">
                        <h2 className="font-bold text-2xl py-4 px-10">
                            Prijs en categorie
                        </h2>
                        <section className="flex flex-col lg:flex-row lg:justify-between px-10">
                            <div>
                                <h2 className="font-semibold text-lg my-2">
                                    Verhuurprijs
                                </h2>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem className="w-30">
                                                <FormLabel>
                                                    Prijs per dag
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Voer hier bedrag in"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <h2 className="font-semibold text-lg my-2">
                                    Categorie
                                </h2>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="w-[20rem]">
                                            <FormLabel>
                                                Categorie Kiezen
                                            </FormLabel>

                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
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
                            </div>
                        </section>
                    </section>
                </section>
            </form>
        </Form>
    );
};
export default EditProducts;
