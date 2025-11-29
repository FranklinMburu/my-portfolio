import { Brain, Code, Database, Rocket } from "lucide-react";

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full justify-center mt-10 px-4 mb-16 sm:mb-10">
      {/* AI/ML */}
      <div className="border border-neutral-700 rounded-xl p-6 bg-neutral-900/40 text-center transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1">
        <Brain className="w-10 h-10 text-cyan-400 mb-3 mx-auto" />
        <h3 className="text-white font-semibold">AI/ML</h3>
        <p className="text-neutral-400 text-sm">Multi-agent Systems</p>
      </div>

      {/* Full-Stack */}
      <div className="border border-neutral-700 rounded-xl p-6 bg-neutral-900/40 text-center transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-1">
        <Code className="w-10 h-10 text-cyan-400 mb-3 mx-auto" />
        <h3 className="text-white font-semibold">Full-Stack</h3>
        <p className="text-neutral-400 text-sm">Python, React, APIs</p>
      </div>

      {/* Data */}
      <div className="border border-neutral-700 rounded-xl p-6 bg-neutral-900/40 text-center transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-1">
        <Database className="w-10 h-10 text-blue-400 mb-3 mx-auto" />
        <h3 className="text-white font-semibold">Data</h3>
        <p className="text-neutral-400 text-sm">RAG, Vector DBs</p>
      </div>

      {/* Production */}
      <div className="border border-neutral-700 rounded-xl p-6 bg-neutral-900/40 text-center transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1">
        <Rocket className="w-10 h-10 text-purple-500 mb-3 mx-auto" />
        <h3 className="text-white font-semibold">Production</h3>
        <p className="text-neutral-400 text-sm">FastAPI, Docker</p>
      </div>
    </div>
  );
}