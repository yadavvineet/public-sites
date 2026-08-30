import { useSearchParams } from "react-router-dom";
import { company } from "../config/company";
import ContactForm from "../components/ContactForm";
import { contactContent } from "../config/content";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || undefined;
  const labels = contactContent.formLabels;

  return (
    <main className="bg-offwhite py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal">
            {contactContent.heading}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
            {contactContent.supporting}
          </p>

          {/* Contact Details */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-sm font-medium text-charcoal mb-2">Email</p>
              <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                {company.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal mb-2">Phone</p>
              <a href={`tel:${company.phoneLink}`} className="text-accent hover:underline">
                {company.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal mb-2">Location</p>
              <p className="text-muted">{company.location}</p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-charcoal/5">
            <h2 className="text-xl font-semibold text-charcoal mb-6">
              {labels.message}
            </h2>
            <ContactForm preselectedCategory={subject} />
          </div>
        </div>
      </div>
    </main>
  );
}
