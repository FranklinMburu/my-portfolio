import { Brain, Server, Wrench } from "lucide-react";
import { skills } from "../data/skills";
import { projects } from "../data/projects";

const technologyCount = skills.reduce((total, group) => total + group.items.length, 0);
const livePublicCount = projects.filter((p) => p.liveUrl || p.githubUrl).length;

const iconMap = {
  Brain,
  Server,
  Wrench,
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-28 bg-gradient-to-b from-page via-page to-background-dark"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink">
            Technologies{" "}
            <span className="bg-gradient-to-r from-primary-cyan to-primary-blue bg-clip-text text-transparent">
              & Skills
            </span>
          </h2>

          {/* Small Top Bar */}
          <div className="w-40 h-2 mx-auto rounded-full bg-gradient-to-r from-primary-cyan to-primary-blue mb-6"></div>

          <p className="text-muted text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML, full-stack development, and
            production deployment
          </p>
        </div>

        {/* SKILL CARDS */}
        <div className="grid md:grid-cols-3 gap-10">
          {skills.map((group, idx) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap];

            return (
              <div
                key={idx}
                className="
                  p-8 rounded-3xl
                  bg-glass/70
                  border border-ink/10
                  shadow-card
                  hover:shadow-card-hover
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-2
                "
              >
                {/* Icon + Title */}
                <div className="flex items-center mb-6 space-x-5">
                  <div
                    className="
                      w-14 h-14 flex items-center justify-center rounded-xl
                      bg-gradient-to-br from-primary-cyan to-primary-blue
                      shadow-icon
                      scale-100 group-hover:scale-110 transition-all
                    "
                  >
                    <Icon className="w-7 h-7 text-ink" />
                  </div>

                  <h3 className="text-xl font-semibold text-ink">
                    {group.category}
                  </h3>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1.5 text-sm rounded-xl
                        text-white/90
                        bg-section/60
                        border border-ink/10
                        hover:text-white
                        hover:bg-gradient-to-r hover:from-primary-cyan hover:to-primary-blue
                        hover:shadow-[0_0_18px_rgba(0,150,255,0.55)]
                        transition-all duration-300
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* STATS SECTION */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">
          {/* Projects */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-primary-cyan to-primary-blue
              shadow-[0_0_30px_rgba(0,150,255,0.4)]
              border border-ink/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-ink">{projects.length}</p>
            <p className="text-white/90">Portfolio Projects</p>
          </div>

          {/* Technologies */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-accent-purple to-primary-blue
              shadow-[0_0_30px_rgba(108,99,255,0.4)]
              border border-ink/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-ink">{technologyCount}</p>
            <p className="text-white/90">Technologies</p>
          </div>

          {/* Specializations */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-primary-cyan to-primary-blue/70
              shadow-[0_0_30px_rgba(0,150,255,0.35)]
              border border-ink/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-ink">{skills.length}</p>
            <p className="text-white/90">Core Specializations</p>
          </div>

          {/* Live or public */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-[#10B981] to-[#059669]
              shadow-[0_0_30px_rgba(16,185,129,0.4)]
              border border-ink/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-ink">{livePublicCount}</p>
            <p className="text-white/90">Live or Public Code</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
