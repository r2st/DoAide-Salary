/**
 * DoAide Salary - Tax Calculator Utilities
 * All salary and tax calculation logic for Indian CTC-to-in-hand conversion.
 * FY 2026-27 (AY 2027-28) tax slabs for both Old and New regime.
 * Includes surcharge, cess, marginal relief, NPS 80CCD, state professional tax.
 */

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatNumber(amount) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export const PROFESSIONAL_TAX_BY_STATE = {
  'maharashtra': { name: 'Maharashtra', annual: 2500, monthly: [200,200,200,200,200,200,200,200,200,200,200,300] },
  'karnataka': { name: 'Karnataka', annual: 2400, monthly: 200 },
  'west-bengal': { name: 'West Bengal', annual: 2500, monthly: 208 },
  'tamil-nadu': { name: 'Tamil Nadu', annual: 2500, monthly: 208 },
  'andhra-pradesh': { name: 'Andhra Pradesh', annual: 2500, monthly: 208 },
  'telangana': { name: 'Telangana', annual: 2500, monthly: 208 },
  'gujarat': { name: 'Gujarat', annual: 2500, monthly: 208 },
  'madhya-pradesh': { name: 'Madhya Pradesh', annual: 2500, monthly: 208 },
  'kerala': { name: 'Kerala', annual: 2500, monthly: 208 },
  'assam': { name: 'Assam', annual: 2500, monthly: 208 },
  'odisha': { name: 'Odisha', annual: 2500, monthly: 208 },
  'bihar': { name: 'Bihar', annual: 2500, monthly: 208 },
  'jharkhand': { name: 'Jharkhand', annual: 2500, monthly: 208 },
  'meghalaya': { name: 'Meghalaya', annual: 2500, monthly: 208 },
  'tripura': { name: 'Tripura', annual: 2500, monthly: 208 },
  'manipur': { name: 'Manipur', annual: 2500, monthly: 208 },
  'mizoram': { name: 'Mizoram', annual: 2500, monthly: 208 },
  'sikkim': { name: 'Sikkim', annual: 2500, monthly: 208 },
  'goa': { name: 'Goa', annual: 2500, monthly: 208 },
  'chhattisgarh': { name: 'Chhattisgarh', annual: 2500, monthly: 208 },
  'puducherry': { name: 'Puducherry', annual: 2500, monthly: 208 },
  'delhi': { name: 'Delhi', annual: 0, monthly: 0 },
  'haryana': { name: 'Haryana', annual: 0, monthly: 0 },
  'uttar-pradesh': { name: 'Uttar Pradesh', annual: 0, monthly: 0 },
  'rajasthan': { name: 'Rajasthan', annual: 0, monthly: 0 },
  'uttarakhand': { name: 'Uttarakhand', annual: 0, monthly: 0 },
  'himachal-pradesh': { name: 'Himachal Pradesh', annual: 0, monthly: 0 },
  'punjab': { name: 'Punjab', annual: 0, monthly: 0 },
  'jammu-kashmir': { name: 'Jammu & Kashmir', annual: 0, monthly: 0 },
  'chandigarh': { name: 'Chandigarh', annual: 0, monthly: 0 },
  'arunachal-pradesh': { name: 'Arunachal Pradesh', annual: 0, monthly: 0 },
  'nagaland': { name: 'Nagaland', annual: 0, monthly: 0 },
};

export function getProfessionalTax(state = 'karnataka', grossSalary = 0) {
  const stateData = PROFESSIONAL_TAX_BY_STATE[state];
  if (!stateData || grossSalary <= 180000) return 0;
  return stateData.annual;
}

export function calculateSalaryComponents(annualCTC, cityType = 'metro') {
  const basic = annualCTC * 0.40;
  const hraPct = cityType === 'metro' ? 0.50 : 0.40;
  const hra = basic * hraPct;
  const gratuity = basic * 0.0481;

  const pfBasic = Math.min(basic * 0.12, 21600);
  const employerPF = pfBasic;
  const employeePF = pfBasic;

  const specialAllowance = annualCTC - basic - hra - employerPF - gratuity;

  const grossSalary = basic + hra + specialAllowance;

  return {
    basic,
    hra,
    specialAllowance: Math.max(0, specialAllowance),
    employeePF,
    employerPF,
    gratuity,
    grossSalary,
  };
}

function calculateSurcharge(taxBeforeSurcharge, totalIncome, regime = 'new') {
  if (totalIncome <= 5000000 || taxBeforeSurcharge <= 0) return { surcharge: 0, rate: 0 };

  let rate = 0;
  if (totalIncome <= 10000000) rate = 0.10;
  else if (totalIncome <= 20000000) rate = 0.15;
  else if (totalIncome <= 50000000) rate = 0.25;
  else rate = regime === 'new' ? 0.25 : 0.37;

  let surcharge = taxBeforeSurcharge * rate;

  const thresholds = [5000000, 10000000, 20000000, 50000000];
  for (const threshold of thresholds) {
    if (totalIncome > threshold) {
      const prevRate = threshold === 5000000 ? 0
        : threshold === 10000000 ? 0.10
        : threshold === 20000000 ? 0.15
        : 0.25;
      const prevSurcharge = taxBeforeSurcharge * prevRate;
      const taxAtThreshold = taxBeforeSurcharge + prevSurcharge;
      const excess = totalIncome - threshold;
      if (taxBeforeSurcharge + surcharge > taxAtThreshold + excess) {
        surcharge = Math.max(0, taxAtThreshold + excess - taxBeforeSurcharge);
      }
    }
  }

  return { surcharge: Math.round(surcharge), rate };
}

export function calculateNewRegimeTax(grossSalary) {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossSalary - standardDeduction);

  const slabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 0.05 },
    { min: 800000, max: 1200000, rate: 0.10 },
    { min: 1200000, max: 1600000, rate: 0.15 },
    { min: 1600000, max: 2000000, rate: 0.20 },
    { min: 2000000, max: 2400000, rate: 0.25 },
    { min: 2400000, max: Infinity, rate: 0.30 },
  ];

  let tax = 0;
  const slabBreakdown = [];

  for (const slab of slabs) {
    if (taxableIncome <= slab.min) break;
    const taxableInSlab = Math.min(taxableIncome, slab.max) - slab.min;
    const slabTax = taxableInSlab * slab.rate;
    tax += slabTax;
    if (taxableInSlab > 0) {
      slabBreakdown.push({
        range: slab.max === Infinity
          ? `Above ${formatCurrency(slab.min)}`
          : `${formatCurrency(slab.min)} - ${formatCurrency(slab.max)}`,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInSlab,
        tax: slabTax,
      });
    }
  }

  let rebateApplied = 0;
  if (taxableIncome <= 1200000) {
    rebateApplied = Math.min(tax, 60000);
    tax = Math.max(0, tax - rebateApplied);
  }

  const { surcharge, rate: surchargeRate } = calculateSurcharge(tax, taxableIncome, 'new');
  const taxAfterSurcharge = tax + surcharge;
  const cess = taxAfterSurcharge * 0.04;
  const totalTax = taxAfterSurcharge + cess;

  return {
    standardDeduction,
    taxableIncome,
    taxBeforeCess: tax,
    surcharge,
    surchargeRate,
    cess,
    totalTax,
    slabBreakdown,
    rebateApplied,
  };
}

export function calculateOldRegimeTax(grossSalary, deductions80C = 150000, deductions80D = 0, npsDeduction = 0, hraExemption = 0) {
  const standardDeduction = 50000;
  const capped80C = Math.min(deductions80C, 150000);
  const capped80D = Math.min(deductions80D, 100000);
  const cappedNPS = Math.min(npsDeduction, 50000);
  const totalDeductions = standardDeduction + capped80C + capped80D + cappedNPS + hraExemption;
  const taxableIncome = Math.max(0, grossSalary - totalDeductions);

  const slabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 0.05 },
    { min: 500000, max: 1000000, rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 },
  ];

  let tax = 0;
  const slabBreakdown = [];

  for (const slab of slabs) {
    if (taxableIncome <= slab.min) break;
    const taxableInSlab = Math.min(taxableIncome, slab.max) - slab.min;
    const slabTax = taxableInSlab * slab.rate;
    tax += slabTax;
    if (taxableInSlab > 0) {
      slabBreakdown.push({
        range: slab.max === Infinity
          ? `Above ${formatCurrency(slab.min)}`
          : `${formatCurrency(slab.min)} - ${formatCurrency(slab.max)}`,
        rate: `${slab.rate * 100}%`,
        taxableAmount: taxableInSlab,
        tax: slabTax,
      });
    }
  }

  let rebateApplied = 0;
  if (taxableIncome <= 500000) {
    rebateApplied = Math.min(tax, 12500);
    tax = Math.max(0, tax - rebateApplied);
  }

  const { surcharge, rate: surchargeRate } = calculateSurcharge(tax, taxableIncome, 'old');
  const taxAfterSurcharge = tax + surcharge;
  const cess = taxAfterSurcharge * 0.04;
  const totalTax = taxAfterSurcharge + cess;

  return {
    standardDeduction,
    deductions80C: capped80C,
    deductions80D: capped80D,
    npsDeduction: cappedNPS,
    hraExemption,
    totalDeductions,
    taxableIncome,
    taxBeforeCess: tax,
    surcharge,
    surchargeRate,
    cess,
    totalTax,
    slabBreakdown,
    rebateApplied,
  };
}

export function calculateHRAExemption(basicSalary, daAmount, hraReceived, rentPaid, isMetro) {
  const basicPlusDA = basicSalary + daAmount;
  const hraPct = isMetro ? 0.50 : 0.40;

  const actualHRA = hraReceived;
  const pctOfBasic = basicPlusDA * hraPct;
  const rentMinus10Pct = Math.max(rentPaid - (0.10 * basicPlusDA), 0);

  const exemption = Math.min(actualHRA, pctOfBasic, rentMinus10Pct);

  return {
    actualHRA,
    pctOfBasic,
    rentMinus10Pct,
    exemption,
    taxableHRA: Math.max(actualHRA - exemption, 0),
  };
}

export function calculateFullBreakdown(annualCTC, cityType = 'metro', age = 30, deductions80C = 150000, options = {}) {
  const {
    deductions80D = 0,
    npsDeduction = 0,
    rentPaidAnnual = 0,
    state = 'karnataka',
  } = options;

  const components = calculateSalaryComponents(annualCTC, cityType);
  const professionalTaxAnnual = getProfessionalTax(state, components.grossSalary);

  let hraExemption = 0;
  let hraDetails = null;
  if (rentPaidAnnual > 0) {
    hraDetails = calculateHRAExemption(
      components.basic, 0, components.hra, rentPaidAnnual, cityType === 'metro'
    );
    hraExemption = hraDetails.exemption;
  }

  const newRegimeTax = calculateNewRegimeTax(components.grossSalary);
  const oldRegimeTax = calculateOldRegimeTax(
    components.grossSalary, deductions80C, deductions80D, npsDeduction, hraExemption
  );

  const newRegimeAnnualDeductions = components.employeePF + professionalTaxAnnual + newRegimeTax.totalTax;
  const oldRegimeAnnualDeductions = components.employeePF + professionalTaxAnnual + oldRegimeTax.totalTax;

  const newRegimeAnnualTakeHome = components.grossSalary - newRegimeAnnualDeductions;
  const oldRegimeAnnualTakeHome = components.grossSalary - oldRegimeAnnualDeductions;

  const newRegimeMonthlyTakeHome = newRegimeAnnualTakeHome / 12;
  const oldRegimeMonthlyTakeHome = oldRegimeAnnualTakeHome / 12;

  const betterRegime = newRegimeAnnualTakeHome >= oldRegimeAnnualTakeHome ? 'new' : 'old';
  const savings = Math.abs(newRegimeAnnualTakeHome - oldRegimeAnnualTakeHome);

  return {
    annualCTC,
    cityType,
    age,
    components: { ...components, professionalTaxAnnual },
    hraDetails,
    newRegime: {
      tax: newRegimeTax,
      annualDeductions: newRegimeAnnualDeductions,
      annualTakeHome: newRegimeAnnualTakeHome,
      monthlyTakeHome: newRegimeMonthlyTakeHome,
    },
    oldRegime: {
      tax: oldRegimeTax,
      annualDeductions: oldRegimeAnnualDeductions,
      annualTakeHome: oldRegimeAnnualTakeHome,
      monthlyTakeHome: oldRegimeMonthlyTakeHome,
    },
    betterRegime,
    annualSavings: savings,
    monthlySavings: savings / 12,
  };
}

export function calculateSalaryHike(currentCTC, newCTC, cityType = 'metro') {
  const currentBreakdown = calculateFullBreakdown(currentCTC, cityType);
  const newBreakdown = calculateFullBreakdown(newCTC, cityType);

  const hikePct = ((newCTC - currentCTC) / currentCTC) * 100;
  const currentMonthly = currentBreakdown.newRegime.monthlyTakeHome;
  const newMonthly = newBreakdown.newRegime.monthlyTakeHome;
  const monthlyIncrease = newMonthly - currentMonthly;
  const annualIncrease = monthlyIncrease * 12;
  const effectiveHikePct = (monthlyIncrease / currentMonthly) * 100;

  return {
    currentCTC,
    newCTC,
    hikePct,
    currentMonthlyTakeHome: currentMonthly,
    newMonthlyTakeHome: newMonthly,
    monthlyIncrease,
    annualIncrease,
    effectiveHikePct,
    currentBreakdown,
    newBreakdown,
  };
}
