import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

const EpisodeContent = () => {
  return (
    <div className="mx-2 sm:mx-7 sm:my-3 overflow-scroll">
      <Tabs defaultValue="transcript">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="transcript">
          <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a
          nibh aliquam, pharetra dolor non, malesuada ex. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Maecenas vel posuere dolor. Sed euismod enim sed luctus rhoncus. Nunc
          non tortor varius orci dapibus pellentesque in nec tellus.
          Pellentesque egestas maximus bibendum. Maecenas nec imperdiet neque.
          Proin id diam sit amet elit cursus lacinia. Sed augue magna, egestas
          iaculis sollicitudin mattis, porttitor in justo. Pellentesque iaculis
          purus dictum tellus feugiat, et volutpat mi suscipit. Nulla tempor
          nibh vehicula, pulvinar ligula ac, interdum quam. Aenean ut lorem in
          libero tristique imperdiet. Curabitur dictum nibh in suscipit
          ultricies. Morbi semper odio pretium, tincidunt urna a, hendrerit est.
          Quisque venenatis condimentum mi, a porta urna sodales aliquet. Donec
          posuere nibh turpis, vel tincidunt justo congue a. Sed pharetra, ex
          quis ultrices lobortis, orci mi commodo lacus, quis faucibus augue
          augue a metus. Donec venenatis volutpat leo at tempor. Aenean accumsan
          ante sagittis enim bibendum, at consectetur ante tincidunt.
          </div>
        </TabsContent>
        <TabsContent value="summary">Wow what a great summary</TabsContent>
      </Tabs>
    </div>
  );
};
export default EpisodeContent;
