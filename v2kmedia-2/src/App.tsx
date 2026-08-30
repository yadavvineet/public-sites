import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RecaptchaScript from "./components/RecaptchaScript";
import { company } from "./config/company";

function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phone,
        location: {
          "@type": "Place",
          name: company.location,
        },
      },
      {
        "@type": "LocalBusiness",
        name: company.name,
        areaServed: {
          "@type": "City",
          name: "Delhi",
          containedInPlace: {
            "@type": "State",
            name: "Delhi",
          },
        },
        telephone: company.phone,
        email: company.email,
      },
    ],
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-offwhite text-charcoal">
        <RecaptchaScript />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
