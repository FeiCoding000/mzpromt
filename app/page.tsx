import ContactUs from "./components/contact/ContactUs";
import Hero from "./components/main/Hero";
import Services, { ServiceCardData } from "./components/main/Services";
import { getAllServices } from "@/lib/queries/services";
import { getAllPublishedPosts } from "@/lib/queries/posts";
import PostCard from "./components/posts/PostCard";

export default async function Home() {
  const services: ServiceCardData[] = await getAllServices();
  const posts = await getAllPublishedPosts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <Hero />
      <section className="mx-auto bg-zinc-50 w-full">
        <Services services={services} />
      </section>
      <section className="my-10">
        <p className="mx-auto max-w-2xl text-center text-lg text-gray-700 container">
          Start and manage your business with confidence Explore practical
          insights on company setup, tax planning, bookkeeping, and compliance —
          designed to help business owners make informed decisions from day one.
        </p>
        <div className="my-10  grid gap-10 md:grid-cols-3 md:gap-20">
          {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        </div>
        
      </section>
      <ContactUs />
    </div>
  );
}
