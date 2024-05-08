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
import { useEffect, useState } from "react";
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

const AdminEditCategory = () => {
    const [categoryImg, setCategoryImg] = useState({});
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const form = useForm({
        resolver: zodResolver(addCategorySchema),
        mode: "onChange",
        defaultValues: {
            name: category.name,
            description: category.description,
            file: null,
        },
    });
    useEffect(() => {
        apiClient
            .get(`/categories/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                },
            })
            .then((response) => {
                setCategory(response.data.category);
                setCategoryImg(response.data.category.category_image);
                form.setValue("name", response.data.category.name);
                form.setValue(
                    "description",
                    response.data.category.description
                );
                setLoading(false);
            });
    }, []);
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
            setCategoryImg(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        return fileReader.result;
    }
    const submitHandler = (data) => {
        const form = new FormData();
        form.append("photo", data.file);
        form.append("name", data.name);
        form.append("description", data.description);
        apiClient
            .post(`/categories/${id}/edit`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "ACCESS_TOKEN"
                    )}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                toast.success("Categorie Bewerkt");
            })
            .catch((error) => {
                toast.error("Er is iets mis gegaan");
            });
    };
    const formValues = useWatch({ control: form.control });
    console.log({ formValues });
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)}>
                        {/* Top bar */}
                        <section className="flex h-fit justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Store />
                                <h1 className="font-medium text-2xl">
                                    Bewerk Categorie
                                </h1>
                            </div>
                            <div>
                                <Button type="submit">Bewerk</Button>
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
                                                        placeholder="categorie naam"
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
                                                <FormLabel>
                                                    Beschrijving
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Categorie beschrijving"
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
                                            category.category_image ? (
                                                <div className="flex items-center justify-center gap-3 p-4 relative">
                                                    {category && (
                                                        <img
                                                            className="rounded-md  w-[98%] aspect-square"
                                                            src={
                                                                category.category_image
                                                            }
                                                            alt="categorie img"
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
                                                        handleOnDrop={
                                                            handleOnDrop
                                                        }
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
    }
};
export default AdminEditCategory;
