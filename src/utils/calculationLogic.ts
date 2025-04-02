
export interface TermSheetInputs {
  preMoneyValuation: number;
  investmentAmount: number;
  foundersShares: number;
  esopPool: number;
  liquidationPreference: number;
  participationCap: number;
}

export interface TermSheetResults {
  postMoneyValuation: number;
  investorEquityPercentage: number;
  foundersEquityPercentage: number;
  esopEquityPercentage: number;
  pricePerShare: number;
  investorShares: number;
  totalShares: number;
  dilutedFoundersEquity: number;
  effectivePreMoneyValuation: number;
}

export function calculateTermSheet(inputs: TermSheetInputs): TermSheetResults {
  const { preMoneyValuation, investmentAmount, foundersShares, esopPool, liquidationPreference, participationCap } = inputs;
  
  // Basic calculations
  const postMoneyValuation = preMoneyValuation + investmentAmount;
  const totalFoundersValue = preMoneyValuation * (1 - esopPool / 100);
  const pricePerShare = totalFoundersValue / foundersShares;
  const investorShares = investmentAmount / pricePerShare;
  const esopShares = (foundersShares * esopPool) / (100 - esopPool);
  const totalShares = foundersShares + investorShares + esopShares;
  
  // Equity percentages
  const investorEquityPercentage = (investorShares / totalShares) * 100;
  const foundersEquityPercentage = (foundersShares / totalShares) * 100;
  const esopEquityPercentage = (esopShares / totalShares) * 100;
  
  // Adjusted for liquidation preference
  const effectivePreMoneyValuation = preMoneyValuation - 
    (liquidationPreference > 1 ? (liquidationPreference - 1) * investmentAmount : 0);
  
  // Diluted founder's equity considering participation
  const participationImpact = participationCap > 0 ? 
    Math.min(participationCap, investorEquityPercentage) / 100 * postMoneyValuation : 0;
  
  const dilutedFoundersEquity = (foundersEquityPercentage / 100) * 
    (postMoneyValuation - participationImpact);
  
  return {
    postMoneyValuation,
    investorEquityPercentage,
    foundersEquityPercentage,
    esopEquityPercentage,
    pricePerShare,
    investorShares,
    totalShares,
    dilutedFoundersEquity,
    effectivePreMoneyValuation
  };
}

// Function to format currency in Indian Rupee format with commas
export function formatIndianRupee(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
}

// Function to format percentage
export function formatPercentage(value: number): string {
  return value.toFixed(2) + '%';
}
