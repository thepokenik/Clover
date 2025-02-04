import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadBackend from "@/pages/roadmap/components/roadBackend/RoadBackend";
import RoadFrontend from "@/pages/roadmap/components/roadFrontend/RoadFrontend";
import RoadMobile from "@/pages/roadmap/components/roadMobile/RoadMobile";

const RoadmapPreview = () => {
    return (
        <Tabs defaultValue="frontend">
            <div className="flex justify-center my-2">
                <TabsList>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="frontend">
                <RoadFrontend />
            </TabsContent>
            <TabsContent value="backend">
                <RoadBackend />
            </TabsContent>
            <TabsContent value="mobile">
                <RoadMobile />
            </TabsContent>
        </Tabs>
    )
}

export default RoadmapPreview;