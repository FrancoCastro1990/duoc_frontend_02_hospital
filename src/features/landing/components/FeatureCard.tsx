import React, { createElement } from "react";
import type { FeatureCardProps } from "../types";
import { getIconComponent } from "../utils/iconMapper";

/**
 * FeatureCard Component
 * Displays a single feature highlight with icon, title, and description
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <div
      className="bg-white border border-primary-300 rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      data-testid={`feature-${feature.id}`}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
        {createElement(getIconComponent(feature.icon), {
          className: "text-secondary-700 w-6 h-6 md:w-7 md:h-7"
        })}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-primary-900 mb-2">{feature.title}</h3>
      <p className="text-sm md:text-base text-primary-700 leading-relaxed">{feature.description}</p>
    </div>
  );
};
