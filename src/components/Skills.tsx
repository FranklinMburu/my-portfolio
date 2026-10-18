import { Brain, Server, Wrench } from "lucide-react";
import { skills } from "../data/skills";

const iconMap = {
  Brain,
  Server,
  Wrench,
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-28 bg-gradient-to-b from-[#020617] via-[#030712] to-[#000000]"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Technologies{" "}
            <span className="bg-gradient-to-r from-[#00E0FF] to-[#007BFF] bg-clip-text text-transparent">
              & Skills
            </span>
          </h2>

          {/* Small Top Bar */}
          <div className="w-40 h-2 mx-auto rounded-full bg-gradient-to-r from-[#00E0FF] to-[#007BFF] mb-6"></div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                  bg-[#0A0F1F]/70
                  border border-white/10
                  shadow-[0_0_40px_-10px_rgba(0,100,255,0.3)]
                  hover:shadow-[0_0_60px_-6px_rgba(0,150,255,0.45)]
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
                      bg-gradient-to-br from-[#00E0FF] to-[#007BFF]
                      shadow-[0_0_20px_rgba(0,150,255,0.6)]
                      scale-100 group-hover:scale-110 transition-all
                    "
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
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
                        bg-[#111827]/60
                        border border-white/10
                        hover:text-white
                        hover:bg-gradient-to-r hover:from-[#00E0FF] hover:to-[#007BFF]
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
              bg-gradient-to-r from-[#00E0FF] to-[#007BFF]
              shadow-[0_0_30px_rgba(0,150,255,0.4)]
              border border-white/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-white">8+</p>
            <p className="text-white/90">Production Projects</p>
          </div>

          {/* Technologies */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-[#8A2BE2] to-[#EC4899]
              shadow-[0_0_30px_rgba(236,72,153,0.4)]
              border border-white/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-white">25+</p>
            <p className="text-white/90">Technologies</p>
          </div>

          {/* Specializations */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-[#00E0FF] to-[#60A5FA]
              shadow-[0_0_30px_rgba(0,150,255,0.35)]
              border border-white/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-white/90">Core Specializations</p>
          </div>

          {/* Production Ready */}
          <div
            className="
              text-center py-8 rounded-2xl
              bg-gradient-to-r from-[#10B981] to-[#059669]
              shadow-[0_0_30px_rgba(16,185,129,0.4)]
              border border-white/10
              transition-all duration-500
              hover:scale-[1.03]
            "
          >
            <p className="text-3xl font-bold text-white">100%</p>
            <p className="text-white/90">Production Ready</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
