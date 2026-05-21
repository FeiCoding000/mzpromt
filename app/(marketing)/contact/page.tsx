import ContactForm from "@/app/components/forms/ContactForm";
export default function Page() {
  return (
    <>
      <section className="relative text-left w-full min-h-130 h-[70vh] flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center bg-no-repeat text-white">
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-left px-4 flex flex-col items-start space-y-6 max-w-3xl">
          <p className="text-1xl mt-8">CONTACT</p>
          <h1 className="text-5xl mb-4">
            Contact us for smart accounting solutions.
          </h1>

          <p className="text-1xl mt-1">
            Find a contact below or send us your enquiry via the contact form.
          </p>
        </div>
      </section>
        <section className="w-full bg-white py-16 text-brand-dark">
            <div className="container max-w-4xl space-y-6 text-lg leading-8">
                <ContactForm />
            </div>
        </section>
    </>
  );
}
