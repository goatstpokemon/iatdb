import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/home/overview/Overview";
import Borrowing from "@/components/home/borrowing/Borrowing";
import Lending from "@/components/home/lending/Lending";
import Aanvragen from "@/components/home/aanvragen/Aanvragen";
import { useAuthContext } from "@/contexts/AuthContext";

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
                            <TabsTrigger value="lending">Retouren</TabsTrigger>
                            <TabsTrigger value="returns">
                                Uit geleend
                            </TabsTrigger>
                        </TabsList>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Hallo {user?.name}
                        </h2>
                        <TabsContent value="overview" className="space-y-4">
                            <Overview />
                        </TabsContent>
                        <TabsContent value="returns" className="space-y-4">
                            <Lending />
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
