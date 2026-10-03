from pydantic import BaseModel, Field


class CTCInput(BaseModel):
    annual_ctc: float = Field(gt=0, description="Annual CTC in INR")
    basic_salary_pct: float = Field(default=40.0, ge=10, le=100)
    hra_pct_of_basic: float = Field(default=50.0, ge=0, le=100)
    da_pct_of_basic: float = Field(default=0.0, ge=0, le=100)
    employer_pf_pct: float = Field(default=12.0, ge=0, le=12)
    include_gratuity: bool = True
    tax_regime: str = Field(default="new", pattern="^(old|new)$")
    deductions_80c: float = Field(default=0.0, ge=0)
    deductions_80d: float = Field(default=0.0, ge=0)
    other_deductions: float = Field(default=0.0, ge=0)
    hra_exemption: float = Field(default=0.0, ge=0)


class HRAInput(BaseModel):
    basic_salary_annual: float = Field(gt=0)
    da_annual: float = Field(default=0.0, ge=0)
    hra_received_annual: float = Field(gt=0)
    rent_paid_annual: float = Field(gt=0)
    metro_city: bool = True


class TaxRegimeInput(BaseModel):
    annual_ctc: float = Field(gt=0)
    basic_salary_pct: float = Field(default=40.0, ge=10, le=100)
    hra_pct_of_basic: float = Field(default=50.0, ge=0, le=100)
    da_pct_of_basic: float = Field(default=0.0, ge=0, le=100)
    employer_pf_pct: float = Field(default=12.0, ge=0, le=12)
    include_gratuity: bool = True
    deductions_80c: float = Field(default=150000.0, ge=0)
    deductions_80d: float = Field(default=25000.0, ge=0)
    other_deductions: float = Field(default=0.0, ge=0)
    hra_exemption: float = Field(default=0.0, ge=0)
    rent_paid_annual: float = Field(default=0.0, ge=0)
    metro_city: bool = True


OLD_REGIME_SLABS = [
    (250000, 0.00),
    (500000, 0.05),
    (1000000, 0.20),
    (float("inf"), 0.30),
]

NEW_REGIME_SLABS_2024 = [
    (300000, 0.00),
    (700000, 0.05),
    (1000000, 0.10),
    (1200000, 0.15),
    (1500000, 0.20),
    (float("inf"), 0.30),
]


def calculate_tax(taxable_income: float, regime: str) -> dict:
    slabs = OLD_REGIME_SLABS if regime == "old" else NEW_REGIME_SLABS_2024
    tax = 0.0
    prev_limit = 0
    breakdown = []

    for limit, rate in slabs:
        if taxable_income <= prev_limit:
            break
        slab_income = min(taxable_income, limit) - prev_limit
        slab_tax = slab_income * rate
        tax += slab_tax
        if slab_income > 0:
            breakdown.append({
                "slab": f"₹{prev_limit:,.0f} - ₹{limit:,.0f}" if limit != float("inf") else f"Above ₹{prev_limit:,.0f}",
                "rate": f"{rate * 100:.0f}%",
                "taxable_amount": round(slab_income, 2),
                "tax": round(slab_tax, 2),
            })
        prev_limit = limit

    # New regime: rebate u/s 87A for income up to ₹7L (marginal relief up to ₹7.27L)
    rebate = 0.0
    if regime == "new" and taxable_income <= 700000:
        rebate = min(tax, 25000)
    elif regime == "old" and taxable_income <= 500000:
        rebate = min(tax, 12500)

    tax_after_rebate = max(tax - rebate, 0)
    cess = tax_after_rebate * 0.04
    total_tax = tax_after_rebate + cess

    # New regime: marginal relief for income slightly above 7L
    if regime == "new" and 700000 < taxable_income <= 727778:
        marginal_tax = taxable_income - 700000
        if marginal_tax < total_tax:
            total_tax = marginal_tax
            cess = 0
            tax_after_rebate = marginal_tax

    return {
        "taxable_income": round(taxable_income, 2),
        "tax_before_rebate": round(tax, 2),
        "rebate": round(rebate, 2),
        "tax_after_rebate": round(tax_after_rebate, 2),
        "cess": round(cess, 2),
        "total_tax": round(total_tax, 2),
        "slab_breakdown": breakdown,
    }


def calculate_professional_tax(annual_salary: float) -> float:
    if annual_salary <= 180000:
        return 0
    return 2400  # Max ₹2400/year in most Indian states


def calculate_hra_exemption(inp: HRAInput) -> dict:
    basic_plus_da = inp.basic_salary_annual + inp.da_annual
    hra_pct = 0.50 if inp.metro_city else 0.40

    actual_hra = inp.hra_received_annual
    pct_of_basic = basic_plus_da * hra_pct
    rent_minus_10pct = max(inp.rent_paid_annual - (0.10 * basic_plus_da), 0)

    exemption = min(actual_hra, pct_of_basic, rent_minus_10pct)

    return {
        "actual_hra_received": round(actual_hra, 2),
        "percent_of_basic_da": round(pct_of_basic, 2),
        "rent_minus_10pct_basic": round(rent_minus_10pct, 2),
        "hra_exemption": round(exemption, 2),
        "taxable_hra": round(max(actual_hra - exemption, 0), 2),
        "city_type": "Metro" if inp.metro_city else "Non-Metro",
    }


def calculate_ctc_breakdown(inp: CTCInput) -> dict:
    ctc = inp.annual_ctc
    basic = ctc * (inp.basic_salary_pct / 100)
    hra = basic * (inp.hra_pct_of_basic / 100)
    da = basic * (inp.da_pct_of_basic / 100)

    # Employer PF (capped at 12% of ₹15,000/month = ₹1,800/month)
    pf_wage = min(basic + da, 15000 * 12)
    employer_pf = pf_wage * (inp.employer_pf_pct / 100)
    employee_pf = employer_pf

    # Gratuity (4.81% of basic, for 5+ years — shown as CTC component)
    gratuity = (basic * 4.81 / 100) if inp.include_gratuity else 0

    # Special allowance = CTC minus all components
    special_allowance = max(ctc - basic - hra - da - employer_pf - gratuity, 0)

    gross_salary = basic + hra + da + special_allowance
    professional_tax = calculate_professional_tax(gross_salary)

    # Taxable income
    total_deductions_employee = employee_pf + professional_tax
    gross_taxable = gross_salary - total_deductions_employee

    if inp.tax_regime == "old":
        standard_deduction = 50000
        total_exemptions = (
            standard_deduction
            + min(inp.deductions_80c + employee_pf, 150000)
            + inp.deductions_80d
            + inp.other_deductions
            + inp.hra_exemption
        )
        taxable_income = max(gross_taxable - total_exemptions, 0)
    else:
        standard_deduction = 75000
        taxable_income = max(gross_taxable - standard_deduction, 0)

    tax_result = calculate_tax(taxable_income, inp.tax_regime)
    monthly_tax = tax_result["total_tax"] / 12

    monthly_take_home = (gross_salary - employee_pf - professional_tax - tax_result["total_tax"]) / 12
    annual_take_home = monthly_take_home * 12

    return {
        "annual_ctc": round(ctc, 2),
        "components": {
            "basic_salary": round(basic, 2),
            "hra": round(hra, 2),
            "dearness_allowance": round(da, 2),
            "special_allowance": round(special_allowance, 2),
            "employer_pf": round(employer_pf, 2),
            "gratuity": round(gratuity, 2),
        },
        "gross_salary": round(gross_salary, 2),
        "deductions": {
            "employee_pf": round(employee_pf, 2),
            "professional_tax": round(professional_tax, 2),
            "income_tax": round(tax_result["total_tax"], 2),
        },
        "total_deductions": round(employee_pf + professional_tax + tax_result["total_tax"], 2),
        "tax_details": tax_result,
        "monthly": {
            "gross_salary": round(gross_salary / 12, 2),
            "basic_salary": round(basic / 12, 2),
            "hra": round(hra / 12, 2),
            "special_allowance": round(special_allowance / 12, 2),
            "employee_pf": round(employee_pf / 12, 2),
            "professional_tax": round(professional_tax / 12, 2),
            "income_tax": round(monthly_tax, 2),
            "take_home": round(monthly_take_home, 2),
        },
        "annual_take_home": round(annual_take_home, 2),
        "effective_tax_rate": round((tax_result["total_tax"] / ctc) * 100, 2) if ctc > 0 else 0,
        "tax_regime": inp.tax_regime,
    }


def compare_tax_regimes(inp: TaxRegimeInput) -> dict:
    old_input = CTCInput(
        annual_ctc=inp.annual_ctc,
        basic_salary_pct=inp.basic_salary_pct,
        hra_pct_of_basic=inp.hra_pct_of_basic,
        da_pct_of_basic=inp.da_pct_of_basic,
        employer_pf_pct=inp.employer_pf_pct,
        include_gratuity=inp.include_gratuity,
        tax_regime="old",
        deductions_80c=inp.deductions_80c,
        deductions_80d=inp.deductions_80d,
        other_deductions=inp.other_deductions,
        hra_exemption=inp.hra_exemption,
    )
    new_input = CTCInput(
        annual_ctc=inp.annual_ctc,
        basic_salary_pct=inp.basic_salary_pct,
        hra_pct_of_basic=inp.hra_pct_of_basic,
        da_pct_of_basic=inp.da_pct_of_basic,
        employer_pf_pct=inp.employer_pf_pct,
        include_gratuity=inp.include_gratuity,
        tax_regime="new",
    )

    old_result = calculate_ctc_breakdown(old_input)
    new_result = calculate_ctc_breakdown(new_input)

    old_tax = old_result["deductions"]["income_tax"]
    new_tax = new_result["deductions"]["income_tax"]
    savings = old_tax - new_tax

    return {
        "old_regime": old_result,
        "new_regime": new_result,
        "comparison": {
            "old_regime_tax": round(old_tax, 2),
            "new_regime_tax": round(new_tax, 2),
            "tax_difference": round(abs(savings), 2),
            "recommended_regime": "new" if savings > 0 else "old",
            "annual_savings": round(abs(savings), 2),
            "monthly_savings": round(abs(savings) / 12, 2),
        },
    }
