'use client';

import { mappings } from '@/constants'; // Make sure this exists and is correctly imported

type TechIconsProps = {
    techstack: string[];
};

const getTechIcon = (tech: string) => {
    const normalized = tech.toLowerCase().replace(/\s+/g, '');
    const mapped = mappings[normalized] || normalized;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}/${mapped}-original.svg`;
};

export default function TechIcons({ techstack }: TechIconsProps) {
    return (
        <div className="flex flex-wrap gap-3 mt-2">
            {techstack.map((tech) => (
                <div
                    key={tech}
                    className="bg-white/10 px-2 py-1.5 rounded-md flex items-center"
                    title={tech}
                >
                <img
                    src={getTechIcon(tech)}
                    alt={tech}
                    className="w-5 h-5"
                    onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
                    }}
                />
                <span className="text-xs text-gray-300 ml-1.5">{tech}</span>
                </div>
            ))}
        </div>
    );
}
