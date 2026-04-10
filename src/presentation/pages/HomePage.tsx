import { AuroraBackground } from '../components/layout/AuroraBackground'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HeroSection } from '../components/sections/HeroSection'
import { AboutSection } from '../components/sections/AboutSection'
import { SkillsSection } from '../components/sections/SkillsSection'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { ContactSection } from '../components/sections/ContactSection'

export function HomePage() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <AuroraBackground />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <SkillsSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </div>
    )
}
