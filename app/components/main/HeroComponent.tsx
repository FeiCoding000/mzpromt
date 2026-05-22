export type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImageUrl: string;
  children?: React.ReactNode;
};

export default function HeroComponent({ heroInfo }: { heroInfo: HeroProps }) {
  return (
    <section
      className={`relative text-left w-full min-h-130 h-[70vh] flex items-center justify-center bg-[url('/${heroInfo.backgroundImageUrl}')] bg-cover bg-center bg-no-repeat text-white`}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="w-full container relative z-10 text-left flex flex-col items-start space-y-6">
        <p className="text-1xl mt-8">{heroInfo.subtitle}</p>
        <h1 className="text-5xl mb-4">
          {heroInfo.title}
        </h1>
        <p className="text-1xl mt-4">{heroInfo.description}</p>
      </div>
        {heroInfo.children && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                {heroInfo.children}
            </div>
        )}
    </section>
  );
}
