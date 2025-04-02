
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, Calculator } from "lucide-react";
import EquityVisualization from './EquityVisualization';
import ShareOptions from './ShareOptions';
import { TermSheetInputs, TermSheetResults, calculateTermSheet, formatIndianRupee, formatPercentage } from '../utils/calculationLogic';
import { toast } from '@/components/ui/use-toast';

const TermSheetCalculator: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [investorName, setInvestorName] = useState('');
  const [inputs, setInputs] = useState<TermSheetInputs>({
    preMoneyValuation: 10000000, // 1 crore
    investmentAmount: 2500000, // 25 lakhs
    foundersShares: 1000000, // 10 lakh shares
    esopPool: 10, // 10%
    liquidationPreference: 1, // 1x
    participationCap: 0, // No cap
  });
  
  const [results, setResults] = useState<TermSheetResults | null>(null);
  const [pdfData, setPdfData] = useState<any>(null);
  
  const handleInputChange = (field: keyof TermSheetInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCalculate = () => {
    if (!companyName.trim()) {
      toast({
        title: "Company name required",
        description: "Please enter your company name",
        variant: "destructive"
      });
      return;
    }
    
    if (!investorName.trim()) {
      toast({
        title: "Investor name required",
        description: "Please enter the investor name",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const calculatedResults = calculateTermSheet(inputs);
      setResults(calculatedResults);
      
      // Prepare data for PDF
      setPdfData({
        results: calculatedResults,
        inputs: {
          companyName,
          investorName,
          ...inputs
        },
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
      
      toast({
        title: "Calculation complete",
        description: "Term sheet simulation results are ready"
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation error",
        description: "There was an error processing your inputs. Please check and try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleReset = () => {
    setCompanyName('');
    setInvestorName('');
    setInputs({
      preMoneyValuation: 10000000,
      investmentAmount: 2500000,
      foundersShares: 1000000,
      esopPool: 10,
      liquidationPreference: 1,
      participationCap: 0,
    });
    setResults(null);
    setPdfData(null);
  };
  
  const formatCurrency = (value: number): string => {
    return formatIndianRupee(value);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center text-primary gap-2">
            <Calculator className="h-6 w-6" />
            <span>Term Sheet Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mb-4"
              />
              
              <Label htmlFor="investorName">Investor Name</Label>
              <Input
                id="investorName"
                placeholder="Enter investor name"
                value={investorName}
                onChange={(e) => setInvestorName(e.target.value)}
                className="mb-4"
              />
              
              <Label htmlFor="preMoneyValuation">
                Pre-Money Valuation (₹)
                <span className="ml-2 text-sm text-muted-foreground">
                  {formatCurrency(inputs.preMoneyValuation)}
                </span>
              </Label>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="preMoneyValuation"
                  type="number"
                  min="100000"
                  step="100000"
                  value={inputs.preMoneyValuation}
                  onChange={(e) => handleInputChange('preMoneyValuation', parseFloat(e.target.value))}
                />
              </div>
              
              <Label htmlFor="investmentAmount">
                Investment Amount (₹)
                <span className="ml-2 text-sm text-muted-foreground">
                  {formatCurrency(inputs.investmentAmount)}
                </span>
              </Label>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="investmentAmount"
                  type="number"
                  min="100000"
                  step="100000"
                  value={inputs.investmentAmount}
                  onChange={(e) => handleInputChange('investmentAmount', parseFloat(e.target.value))}
                />
              </div>
              
              <Label htmlFor="foundersShares">
                Founders Shares (pre-investment)
                <span className="ml-2 text-sm text-muted-foreground">
                  {inputs.foundersShares.toLocaleString()}
                </span>
              </Label>
              <Input
                id="foundersShares"
                type="number"
                min="1000"
                step="1000"
                value={inputs.foundersShares}
                onChange={(e) => handleInputChange('foundersShares', parseFloat(e.target.value))}
                className="mb-4"
              />
            </div>
            
            <div>
              <Label htmlFor="esopPool">
                ESOP Pool (%)
                <span className="ml-2 text-sm text-muted-foreground">
                  {inputs.esopPool}%
                </span>
              </Label>
              <Slider
                id="esopPool"
                min={0}
                max={30}
                step={0.5}
                value={[inputs.esopPool]}
                onValueChange={([value]) => handleInputChange('esopPool', value)}
                className="py-4 mb-6"
              />
              
              <Label htmlFor="liquidationPreference">
                Liquidation Preference
                <span className="ml-2 text-sm text-muted-foreground">
                  {inputs.liquidationPreference}x
                </span>
              </Label>
              <Slider
                id="liquidationPreference"
                min={1}
                max={3}
                step={0.1}
                value={[inputs.liquidationPreference]}
                onValueChange={([value]) => handleInputChange('liquidationPreference', value)}
                className="py-4 mb-6"
              />
              
              <Label htmlFor="participationCap">
                Participation Cap
                <span className="ml-2 text-sm text-muted-foreground">
                  {inputs.participationCap === 0 ? 'None' : `${inputs.participationCap}x`}
                </span>
              </Label>
              <Slider
                id="participationCap"
                min={0}
                max={3}
                step={0.5}
                value={[inputs.participationCap]}
                onValueChange={([value]) => handleInputChange('participationCap', value)}
                className="py-4 mb-6"
              />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={handleCalculate}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Calculate
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          <ShareOptions 
            pdfData={pdfData} 
            disabled={!results}
          />
        </CardContent>
      </Card>
      
      <div className="flex flex-col gap-6">
        <EquityVisualization results={results} />
        
        {results && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-primary">Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Post-Money Valuation:</span>
                  <span className="font-medium">{formatCurrency(results.postMoneyValuation)}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Founder Equity:</span>
                  <span className="font-medium">{formatPercentage(results.foundersEquityPercentage)}</span>
                </div>
                
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Investor Equity:</span>
                  <span className="font-medium">{formatPercentage(results.investorEquityPercentage)}</span>
                </div>
                
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">ESOP Pool:</span>
                  <span className="font-medium">{formatPercentage(results.esopEquityPercentage)}</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Price Per Share:</span>
                  <span className="font-medium">{formatCurrency(results.pricePerShare)}</span>
                </div>
                
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Effective Pre-Money:</span>
                  <span className="font-medium">{formatCurrency(results.effectivePreMoneyValuation)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TermSheetCalculator;
