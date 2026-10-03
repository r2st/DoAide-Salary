from app.calculator import (
    CTCInput,
    HRAInput,
    TaxRegimeInput,
    calculate_ctc_breakdown,
    calculate_hra_exemption,
    calculate_tax,
    calculate_professional_tax,
    compare_tax_regimes,
)


def test_basic_ctc_breakdown():
    inp = CTCInput(annual_ctc=1200000)
    result = calculate_ctc_breakdown(inp)
    assert result["annual_ctc"] == 1200000
    assert result["components"]["basic_salary"] == 480000
    assert result["components"]["hra"] == 240000
    assert result["annual_take_home"] > 0
    assert result["annual_take_home"] < 1200000


def test_ctc_components_sum_to_ctc():
    inp = CTCInput(annual_ctc=1500000)
    result = calculate_ctc_breakdown(inp)
    comp = result["components"]
    total = (
        comp["basic_salary"]
        + comp["hra"]
        + comp["dearness_allowance"]
        + comp["special_allowance"]
        + comp["employer_pf"]
        + comp["gratuity"]
    )
    assert abs(total - 1500000) < 1


def test_ctc_without_gratuity():
    inp = CTCInput(annual_ctc=1000000, include_gratuity=False)
    result = calculate_ctc_breakdown(inp)
    assert result["components"]["gratuity"] == 0


def test_ctc_old_regime_with_deductions():
    inp = CTCInput(
        annual_ctc=2000000,
        tax_regime="old",
        deductions_80c=150000,
        deductions_80d=25000,
    )
    result = calculate_ctc_breakdown(inp)
    assert result["tax_regime"] == "old"
    assert result["deductions"]["income_tax"] > 0


def test_ctc_new_regime():
    inp = CTCInput(annual_ctc=1200000, tax_regime="new")
    result = calculate_ctc_breakdown(inp)
    assert result["tax_regime"] == "new"


def test_low_salary_no_tax():
    inp = CTCInput(annual_ctc=400000, tax_regime="new")
    result = calculate_ctc_breakdown(inp)
    assert result["deductions"]["income_tax"] == 0


def test_monthly_values():
    inp = CTCInput(annual_ctc=1200000)
    result = calculate_ctc_breakdown(inp)
    assert abs(result["monthly"]["gross_salary"] * 12 - result["gross_salary"]) < 1
    assert result["monthly"]["take_home"] > 0


def test_effective_tax_rate():
    inp = CTCInput(annual_ctc=2500000)
    result = calculate_ctc_breakdown(inp)
    assert 0 < result["effective_tax_rate"] < 100


def test_tax_new_regime_slabs():
    tax = calculate_tax(1000000, "new")
    assert tax["total_tax"] > 0
    assert len(tax["slab_breakdown"]) > 0


def test_tax_old_regime_slabs():
    tax = calculate_tax(1000000, "old")
    assert tax["total_tax"] > 0
    assert tax["taxable_income"] == 1000000


def test_tax_rebate_new_regime():
    tax = calculate_tax(700000, "new")
    assert tax["total_tax"] == 0


def test_tax_rebate_old_regime():
    tax = calculate_tax(500000, "old")
    assert tax["total_tax"] == 0


def test_professional_tax_low_salary():
    assert calculate_professional_tax(150000) == 0


def test_professional_tax_high_salary():
    assert calculate_professional_tax(1200000) == 2400


def test_hra_exemption_metro():
    inp = HRAInput(
        basic_salary_annual=480000,
        hra_received_annual=240000,
        rent_paid_annual=300000,
        metro_city=True,
    )
    result = calculate_hra_exemption(inp)
    assert result["hra_exemption"] > 0
    assert result["hra_exemption"] <= result["actual_hra_received"]
    assert result["city_type"] == "Metro"


def test_hra_exemption_nonmetro():
    inp = HRAInput(
        basic_salary_annual=480000,
        hra_received_annual=240000,
        rent_paid_annual=200000,
        metro_city=False,
    )
    result = calculate_hra_exemption(inp)
    assert result["city_type"] == "Non-Metro"
    assert result["hra_exemption"] <= min(
        result["actual_hra_received"],
        result["percent_of_basic_da"],
        result["rent_minus_10pct_basic"],
    )


def test_hra_with_da():
    inp = HRAInput(
        basic_salary_annual=480000,
        da_annual=48000,
        hra_received_annual=240000,
        rent_paid_annual=300000,
        metro_city=True,
    )
    result = calculate_hra_exemption(inp)
    assert result["percent_of_basic_da"] == (480000 + 48000) * 0.50


def test_hra_taxable_amount():
    inp = HRAInput(
        basic_salary_annual=480000,
        hra_received_annual=240000,
        rent_paid_annual=300000,
        metro_city=True,
    )
    result = calculate_hra_exemption(inp)
    assert abs(result["taxable_hra"] - (result["actual_hra_received"] - result["hra_exemption"])) < 1


def test_compare_regimes():
    inp = TaxRegimeInput(annual_ctc=1500000, deductions_80c=150000, deductions_80d=25000)
    result = compare_tax_regimes(inp)
    assert "old_regime" in result
    assert "new_regime" in result
    assert "comparison" in result
    assert result["comparison"]["recommended_regime"] in ("old", "new")


def test_compare_regimes_savings():
    inp = TaxRegimeInput(annual_ctc=2000000, deductions_80c=150000, deductions_80d=50000, hra_exemption=200000)
    result = compare_tax_regimes(inp)
    assert result["comparison"]["annual_savings"] >= 0
    assert result["comparison"]["monthly_savings"] >= 0


def test_high_ctc_breakdown():
    inp = CTCInput(annual_ctc=5000000)
    result = calculate_ctc_breakdown(inp)
    assert result["deductions"]["income_tax"] > 0
    assert result["effective_tax_rate"] > 10


def test_custom_basic_percentage():
    inp = CTCInput(annual_ctc=1200000, basic_salary_pct=50)
    result = calculate_ctc_breakdown(inp)
    assert result["components"]["basic_salary"] == 600000


def test_da_included():
    inp = CTCInput(annual_ctc=1200000, da_pct_of_basic=10)
    result = calculate_ctc_breakdown(inp)
    assert result["components"]["dearness_allowance"] == 48000
