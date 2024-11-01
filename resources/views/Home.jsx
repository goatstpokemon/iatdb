import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/home/overview/Overview";
import Borrowing from "@/components/home/borrowing/Borrowing";
import Lending from "@/components/home/lending/Lending";
import Aanvragen from "@/components/home/aanvragen/Aanvragen";
import { useAuthContext } from "@/contexts/AuthContext";
import Returns from "./cms/settings/ReturnsPage";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <Container>
                <div className="flex items-center justify-between space-y-2">
                    <Tabs defaultValue="overview" className="space-y-4 w-full">
                        <TabsList>
                            <TabsTrigger value="overview">
                                Overzicht
                            </TabsTrigger>
                            <TabsTrigger value="borrowing">
                                Aan het lenen
                            </TabsTrigger>
                            <TabsTrigger value="lentout">
                                Uit geleend
                            </TabsTrigger>
                            <TabsTrigger value="returns">Retouren</TabsTrigger>
                        </TabsList>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Hey, {user?.name}
                        </h2>
                        <TabsContent value="overview" className="space-y-4">
                            <Overview />
                        </TabsContent>
                        <TabsContent value="lentout" className="space-y-4">
                            <Lending />
                        </TabsContent>
                        <TabsContent value="borrowing" className="space-y-4">
                            <Borrowing />
                        </TabsContent>
                        <TabsContent value="returns" className="space-y-4">
                            <Returns />
                        </TabsContent>
                        <TabsContent
                            value="notifications"
                            className="space-y-4"
                        >
                            <Aanvragen />
                        </TabsContent>
                    </Tabs>
                </div>
            </Container>
        </div>
    );
};

export default Home;
