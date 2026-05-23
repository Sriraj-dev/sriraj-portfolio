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
        <Skills skills={data.skills} subtitle={data.sectionSubtitles.skills} />
        <SaasProducts products={data.saasProducts} subtitle={data.sectionSubtitles.products} />
        <Background experience={data.experience} education={data.education} subtitle={data.sectionSubtitles.background} />
        <Projects projects={data.projects} subtitle={data.sectionSubtitles.projects} />
        <Blogs blogs={data.blogs} subtitle={data.sectionSubtitles.blogs} />
        <Contact contact={data.contact} subtitle={data.sectionSubtitles.contact} />
      </main>
      <Footer name={data.meta.name} />
    </>
  );
}
