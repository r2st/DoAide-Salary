/**
 * DoAide Salary - Tax Calculator Utilities
 * All salary and tax calculation logic for Indian CTC-to-in-hand conversion.
 * FY 2025-26 tax slabs for both Old and New regime.
 */

/**
 * Format a number as Indian currency string.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Calculate salary components from CTC.
 * @param {number} annualCTC - Annual CTC in INR
 * @param {string} cityType - 'metro' or 'non-metro'
 * @returns {object} Salary components
 */
export function calculateSalaryComponents(annualCTC, cityType = 'metro') {
  const basic = annualCTC * 0.40;
  const hraPct = cityType === 'metro' ? 0.50 : 0.40;
  const hra = basic * hraPct;
  const gratuity = basic * 0.0481;

  // PF: 12% of basic, capped at 1800/month = 21600/year
  const pfBasic = Math.min(basic * 0.12, 21600);
  const employerPF = pfBasic;
  const employeePF = pfBasic;

  const professionalTaxAnnual = 2400; // 200/month

  // Special allowance = CTC minus employer costs (basic + HRA + employer PF + gratuity)
  const specialAllowance = annualCTC - basic - hra - employerPF - gratuity;

  // Gross salary (what employee receives before deductions, excludes employer-only costs)
  const grossSalary = basic + hra + specialAllowance;

  return {
    basic,
    hra,
    specialAllowance: Math.max(0, specialAllowance),
    employeePF,
    employerPF,
    gratuity,
    professionalTaxAnnual,
    grossSalary,
  };
}

/**
 * Calculate tax under the New Regime (FY 2025-26).
 * @param {number} grossSalary - Annual gross salary
 * @returns {object} { taxBeforeCess, cess, totalTax, slabs, rebateApplied }
 */
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

  // Rebate u/s 87A: if taxable income <= 12L, rebate up to 60000
  let rebateApplied = 0;
  if (taxableIncome <= 1200000) {
    rebateApplied = Math.min(tax, 60000);
    tax = Math.max(0, tax - rebateApplied);
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    standardDeduction,
    taxableIncome,
    taxBeforeCess: tax,
    cess,
    totalTax,
    slabBreakdown,
    rebateApplied,
  };
}

/**
 * Calculate tax under the Old Regime (FY 2025-26).
 * @param {number} grossSalary - Annual gross salary
 * @param {number} deductions80C - Section 80C deductions (max 1.5L)
 * @returns {object} { taxBeforeCess, cess, totalTax, slabs, rebateApplied }
 */
export function calculateOldRegimeTax(grossSalary, deductions80C = 150000) {
  const standardDeduction = 50000;
  const capped80C = Math.min(deductions80C, 150000);
  const taxableIncome = Math.max(0, grossSalary - standardDeduction - capped80C);

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

  // Rebate u/s 87A: if taxable income <= 5L, rebate up to 12500
  let rebateApplied = 0;
  if (taxableIncome <= 500000) {
    rebateApplied = Math.min(tax, 12500);
    tax = Math.max(0, tax - rebateApplied);
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    standardDeduction,
    deductions80C: capped80C,
    taxableIncome,
    taxBeforeCess: tax,
    cess,
    totalTax,
    slabBreakdown,
    rebateApplied,
  };
}

/**
 * Full salary calculation combining components + tax for both regimes.
 * @param {number} annualCTC
 * @param {string} cityType - 'metro' or 'non-metro'
 * @param {number} age - Employee age (for future surcharge logic)
 * @param {number} deductions80C - Old regime 80C deductions
 * @returns {object} Complete breakdown
 */
export function calculateFullBreakdown(annualCTC, cityType = 'metro', age = 30, deductions80C = 150000) {
  const components = calculateSalaryComponents(annualCTC, cityType);

  const newRegimeTax = calculateNewRegimeTax(components.grossSalary);
  const oldRegimeTax = calculateOldRegimeTax(components.grossSalary, deductions80C);

  const newRegimeAnnualDeductions = components.employeePF + components.professionalTaxAnnual + newRegimeTax.totalTax;
  const oldRegimeAnnualDeductions = components.employeePF + components.professionalTaxAnnual + oldRegimeTax.totalTax;

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
    components,
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
