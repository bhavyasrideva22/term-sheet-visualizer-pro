
import React from 'react';
import TermSheetCalculator from '@/components/TermSheetCalculator';
import ExplanationSection from '@/components/ExplanationSection';
import { Calculator, ArrowDown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-8 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-block bg-white/10 p-3 rounded-full mb-4">
            <Calculator className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Term Sheet Simulator Pro</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Visualize startup funding scenarios and negotiate better terms with investors
          </p>
          <div className="mt-8 animate-bounce">
            <ArrowDown className="h-6 w-6 mx-auto" />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <TermSheetCalculator />
        </div>
        
        <ExplanationSection />
      </main>
      
      <footer className="bg-primary/95 text-white py-6 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm opacity-80">
              Term Sheet Simulator Pro - A tool for Indian entrepreneurs and investors
            </p>
            <p className="text-xs opacity-60 mt-2">
              © {new Date().getFullYear()} Term Sheet Simulator Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
