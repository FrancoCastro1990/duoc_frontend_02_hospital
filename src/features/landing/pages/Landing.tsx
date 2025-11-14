import React from "react";
import {
  Stethoscope,
  Calendar,
  Users,
  Heart,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useLanding } from "../hooks/useLanding";
import { LandingService } from "../services/LandingService";
import type { LandingProps } from "../types";
import { FeatureCard, StatisticCard, QuickActionButton } from "../components";

// Create service instance outside component
const landingService = new LandingService();

/**
 * Landing Page Component
 * Main landing page for the Hospital Dashboard featuring hero section,
 * key features showcase, statistics display, and quick action buttons
 */
export const Landing: React.FC<LandingProps> = ({ className = "" }) => {
  const {
    statistics,
    features,
    quickActions,
    isLoading,
    error,
    refreshStatistics,
  } = useLanding(landingService);

  return (
    <div className={`min-h-screen bg-primary-100 ${className}`.trim()}>
      {/* Hero Section */}
      <section className="bg-gradient-secondary p-8 md:p-12 lg:p-16 mb-8 md:mb-12 animate-fade-in-down">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg mb-6">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-secondary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-4 md:mb-6">
            Welcome to Hospital Dashboard
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-primary-700 leading-relaxed max-w-3xl mx-auto">
            Your comprehensive healthcare management system for efficient
            patient care, staff coordination, and medical records management.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900">
            Dashboard Overview
          </h2>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 hover:border-secondary-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            onClick={refreshStatistics}
            disabled={isLoading}
            aria-label="Refresh statistics"
          >
            <Activity className={`w-4 h-4 md:w-5 md:h-5 text-secondary-700 ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-sm md:text-base font-medium text-primary-900">
              {isLoading ? "Loading..." : "Refresh"}
            </span>
          </button>
        </div>

        {error && (
          <div
            className="flex items-center gap-3 bg-error-50 border border-error-200 text-error-700 p-4 rounded-lg mb-6 animate-fade-in"
            role="alert"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatisticCard
            icon={Users}
            label="Total Patients"
            value={statistics.totalPatients}
            testId="stat-total-patients"
            delay={0}
            isLoading={isLoading}
          />
          <StatisticCard
            icon={Calendar}
            label="Today's Appointments"
            value={statistics.todaysAppointments}
            testId="stat-appointments"
            delay={50}
            isLoading={isLoading}
          />
          <StatisticCard
            icon={Stethoscope}
            label="Active Staff"
            value={statistics.activeStaff}
            testId="stat-active-staff"
            delay={100}
            isLoading={isLoading}
          />
          <StatisticCard
            icon={AlertCircle}
            label="Emergency Cases"
            value={statistics.emergencyCases}
            testId="stat-emergency-cases"
            delay={150}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 md:mb-4">
            Key Features
          </h2>
          <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto">
            Discover the powerful tools and capabilities of our hospital
            management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 md:mb-4">
            Quick Actions
          </h2>
          <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto">
            Get started with common tasks and workflows
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {quickActions.map((action) => (
            <QuickActionButton key={action.id} action={action} />
          ))}
        </div>
      </section>
    </div>
  );
};
