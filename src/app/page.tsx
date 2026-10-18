import Navbar from '@/components/Navbar';
import { navLinks, profile } from '@/data/portfolio';
import Footer from '@/components/Footer';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar
        links={navLinks}
        name={profile.name}
        initials={profile.initials}
        resumeUrl={profile.resumeUrl}
      />
      <main id="main-content" tabIndex={-1} className="bg-[#0a0a0a] min-h-screen outline-hidden">
        {/* AboutSection is the combined hero + about section */}
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
