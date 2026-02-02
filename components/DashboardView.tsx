
import React from 'react';
import ProjectChart from './ProjectChart';
import HeroCard from './HeroCard';
import ResourceCard from './ResourceCard';
import { RESOURCE_CARDS } from '../constants';

interface DashboardViewProps {
  onCreateApp: () => void;
  onOpenProspector: () => void;
  projectCount: number;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onCreateApp, onOpenProspector, projectCount }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300 ease-out transform-gpu">
      <div className="flex flex-col lg:flex-row gap-6">
        <HeroCard onCreateApp={onCreateApp} />
        <ProjectChart count={projectCount} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] font-bold text-wine-400/80 tracking-widest uppercase">
            Recursos Rápidos
          </h3>
          <button className="text-[10px] font-bold text-wine-400 hover:text-wine-300 tracking-widest uppercase transition-colors duration-200">
            Ver todos
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {RESOURCE_CARDS.map((card, idx) => {
            const handleClick = () => {
              if (card.title === 'Materializar SaaS') onCreateApp();
              else if (card.title === 'Prospector') onOpenProspector();
            };

            return (
              <div
                key={idx}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-transform duration-300 hover:scale-[1.02]"
                onClick={handleClick}
              >
                <ResourceCard {...card} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
