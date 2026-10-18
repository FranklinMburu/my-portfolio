import { Brain, Code, Database, Rocket } from "lucide-react";

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full justify-center mt-10 px-4 mb-16 sm:mb-10">
      {/* AI/ML */}
      <div className="border border-line rounded-xl p-6 bg-card/40 text-center transition-all duration-300 hover:border-primary-cyan/40 hover:shadow-lg hover:shadow-primary-cyan/30 hover:-translate-y-1">
        <Brain className="w-10 h-10 text-primary-cyan mb-3 mx-auto" />
        <h3 className="text-ink font-semibold">AI/ML</h3>
        <p className="text-muted text-sm">Multi-agent Systems</p>
      </div>

      {/* Full-Stack */}
      <div className="border border-line rounded-xl p-6 bg-card/40 text-center transition-all duration-300 hover:border-primary-cyan/40 hover:shadow-lg hover:shadow-primary-cyan/30 hover:-translate-y-1">
        <Code className="w-10 h-10 text-primary-cyan mb-3 mx-auto" />
        <h3 className="text-ink font-semibold">Full-Stack</h3>
        <p className="text-muted text-sm">Python, React, APIs</p>
      </div>

      {/* Data */}
      <div className="border border-line rounded-xl p-6 bg-card/40 text-center transition-all duration-300 hover:border-primary-cyan/40 hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-1">
        <Database className="w-10 h-10 text-primary-blue mb-3 mx-auto" />
        <h3 className="text-ink font-semibold">Data</h3>
        <p className="text-muted text-sm">RAG, Vector DBs</p>
      </div>

      {/* Production */}
      <div className="border border-line rounded-xl p-6 bg-card/40 text-center transition-all duration-300 hover:border-primary-cyan/40 hover:shadow-lg hover:shadow-accent-purple/30 hover:-translate-y-1">
        <Rocket className="w-10 h-10 text-accent-purple mb-3 mx-auto" />
        <h3 className="text-ink font-semibold">Production</h3>
        <p className="text-muted text-sm">FastAPI, Docker</p>
      </div>
    </div>
  );
}