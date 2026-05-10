import profile from "@/data/profile.json";
import type { Profile } from "@/lib/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import SaasProducts from "@/components/sections/SaasProducts";
import Projects from "@/components/sections/Projects";
import Background from "@/components/sections/Background";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";

const data = profile as Profile;

export default function Home() {
  return (
    <>
      <Navbar name={data.meta.name} />
      <main>
        <Hero intro={data.intro} meta={data.meta} />
        <Skills skills={data.skills} />
        <SaasProducts products={data.saasProducts} />
        <Projects projects={data.projects} />
        <Background experience={data.experience} education={data.education} />
        <Blogs blogs={data.blogs} />
        <Contact contact={data.contact} />
      </main>
      <Footer name={data.meta.name} />
    </>
  );
}
