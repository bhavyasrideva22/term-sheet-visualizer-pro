
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ExplanationSection: React.FC = () => {
  return (
    <section className="my-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-primary mb-6">Understanding Term Sheet Negotiations</h2>
      
      <div className="prose prose-lg max-w-none text-charcoal">
        <p className="mb-6">
          A term sheet is a critical document that outlines the terms and conditions of an investment deal between 
          founders and investors. Our Term Sheet Simulator helps entrepreneurs and investors in India prepare for 
          funding negotiations by visualizing the impact of different terms and valuation metrics.
        </p>
        
        <p className="mb-6">
          With India's startup ecosystem growing at a remarkable pace, understanding the nuances of term sheet 
          negotiations has become essential. This simulator empowers founders to make informed decisions when 
          raising capital, helping them maintain appropriate equity control while securing necessary funding.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="mt-8">
        <AccordionItem value="valuation">
          <AccordionTrigger className="text-lg font-medium">Pre-Money vs. Post-Money Valuation</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              <strong>Pre-money valuation</strong> is the company's value before receiving external investment. 
              <strong>Post-money valuation</strong> equals pre-money valuation plus the investment amount.
            </p>
            <p>
              For example, if your startup has a pre-money valuation of ₹5 crore and receives an investment of 
              ₹1 crore, the post-money valuation becomes ₹6 crore. The investor then owns 16.67% (₹1 crore ÷ ₹6 crore) 
              of the company.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="liquidation">
          <AccordionTrigger className="text-lg font-medium">Liquidation Preference Explained</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Liquidation preference determines the order and amount investors receive in case of an acquisition, 
              merger, or liquidation. A "1x" preference means investors get their money back before other shareholders.
            </p>
            <p>
              Higher liquidation preferences (e.g., 2x) mean investors get twice their investment before others 
              receive anything. This significantly impacts founders' returns in moderate exit scenarios and effectively 
              reduces the company's pre-money valuation.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="participation">
          <AccordionTrigger className="text-lg font-medium">Participation Rights and Caps</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Participation rights allow investors to receive their liquidation preference first, then 
              "participate" with common shareholders in the remaining proceeds proportional to their equity ownership.
            </p>
            <p>
              A participation cap limits this "double-dipping" to a multiple of the original investment. 
              For Indian startups, negotiating appropriate participation terms is crucial for aligning 
              investor and founder incentives for different exit values.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="esop">
          <AccordionTrigger className="text-lg font-medium">ESOP Pool Considerations</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              The Employee Stock Option Pool (ESOP) is typically created from the pre-money valuation, 
              effectively diluting the founders before the investment occurs.
            </p>
            <p>
              For Indian startups, standard ESOP pools range from 10-15% of the company's equity. Creating 
              an appropriately sized ESOP pool is essential for attracting top talent in India's competitive 
              tech job market while balancing founder dilution.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="negotiation">
          <AccordionTrigger className="text-lg font-medium">Strategic Negotiation Tips</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Focus on the entire term sheet, not just valuation</li>
              <li>Understand the effective valuation after accounting for liquidation preferences</li>
              <li>Calculate your ownership after accounting for the ESOP pool</li>
              <li>Model different exit scenarios to understand the impact of participation rights</li>
              <li>Consider trade-offs between higher valuation and more founder-friendly terms</li>
              <li>Align terms with standard market practices in the Indian venture ecosystem</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h3 className="text-xl font-semibold text-primary mb-2">Why This Simulator Matters</h3>
        <p className="text-charcoal">
          Understanding how each term affects your ownership and potential returns is crucial before signing 
          any investment agreement. Our Term Sheet Simulator helps Indian entrepreneurs visualize these impacts, 
          enabling better-informed negotiations with investors and ultimately leading to more founder-friendly deals.
        </p>
      </div>
    </section>
  );
};

export default ExplanationSection;
