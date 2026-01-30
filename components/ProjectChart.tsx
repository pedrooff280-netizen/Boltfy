
import React, { useMemo } from 'react';
import { BarChart2 } from 'lucide-react';

interface ProjectChartProps {
  count?: number;
}

const ProjectChart: React.FC<ProjectChartProps> = ({ count = 0 }) => {
  // Generate pseudo-random heights for the chart based on the count to make it look "active"
  const bars = useMemo(() => {
    const baseBars = [45, 65, 30, 85, 45, 90, 60];
    if (count === 0) return Array(7).fill(0);
    // Adjust visual representation based on count
    return baseBars.map(h => Math.min(100, Math.max(10, h + (count % 10))));
  }, [count]);

  return (
    <div className="bg-slate-950/40 border border-wine-500/30 rounded-3xl p-6 flex-1 min-w-[320px] relative overflow-hidden group hover:border-wine-400/50 hover:shadow-[0_0_40px_rgba(136,19,55,0.15)] transition-all duration-500 backdrop-blur-md">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-[10px] font-bold text-wine-400/80 tracking-widest uppercase mb-1">Projetos Ativos</h4>
          <span className="text-5xl font-bold text-white tracking-tighter transition-all duration-500">
            {count}
          </span>
        </div>
        <div className="w-10 h-10 bg-wine-500/10 rounded-lg flex items-center justify-center text-wine-500 border border-wine-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
          <BarChart2 className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-end gap-2 h-20 mt-6 px-1">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-wine-600/20 rounded-t-lg transition-all duration-700 group-hover:bg-wine-600/40 relative overflow-hidden"
            style={{ height: `${height}%` }}
          >
            {/* Animated shine effect on bars */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-pulse" />
          </div>
        ))}
      </div>

      {/* Background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-wine-500/10 blur-[60px] pointer-events-none" />
    </div>
  );
};

export default ProjectChart;
