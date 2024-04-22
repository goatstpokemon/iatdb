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
import { useState } from "react";
import apiClient from "@/api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Container from "@/components/ui/container";

const addCategorySchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "2 karakters is wel heel kort, probeer het nog eens.",
        })
        .max(30, {
            message: "Het moet korter zijn dan 30 karakters.",
        }),
    description: z.string(),
    file: z.any(),
});

const EditProducts = () => {
    const [productImg, setProductImg] = useState({});
    const [product, setProduct] = useState({});

    const { id } = useParams();
    const form = useForm({
        resolver: zodResolver(addCategorySchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            file: null,
        },
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
        apiClient
            .post(`/categories/add`, form, {
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

    console.log(form.formState.errors);
    return (
        <Container>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                    {/* Top bar */}
                    <section className="flex h-fit justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Store />
                            <h1 className="font-medium text-2xl">
                                Voeg Categorie Toe
                            </h1>
                        </div>
                        <div>
                            <Button type="submit">Aanmaken</Button>
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
                                            <FormLabel>
                                                Categorie Naam
                                            </FormLabel>
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
                                                        src={
                                                            product.product_image
                                                        }
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
                    </section>
                </form>
            </Form>
        </Container>
    );
};
export default EditProducts;
