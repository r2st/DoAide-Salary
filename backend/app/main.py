from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .calculator import (
    CTCInput,
    HRAInput,
    TaxRegimeInput,
    calculate_ctc_breakdown,
    calculate_hra_exemption,
    compare_tax_regimes,
)
from .ai_recommendations import get_tax_recommendations
from .database import init_db, save_calculation
from pydantic import BaseModel, Field

app = FastAPI(
    title="SalaryDecode API",
    description="CTC to In-Hand Salary Calculator API",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/health")
async def health_simple():
    return {"status": "ok", "service": "salarydecode-api"}


@app.get("/api/v1/health")
async def health():
    return {"status": "healthy", "service": "salarydecode-api"}


@app.post("/api/calculate")
async def calculate(inp: CTCInput):
    result = calculate_ctc_breakdown(inp)
    await save_calculation("ctc_breakdown", inp.model_dump(), result)
    return result


@app.post("/api/hra")
async def hra(inp: HRAInput):
    result = calculate_hra_exemption(inp)
    return result


@app.post("/api/compare")
async def compare(inp: TaxRegimeInput):
    result = compare_tax_regimes(inp)
    return result


class RecommendationInput(BaseModel):
    annual_ctc: float = Field(gt=0)
    tax_regime: str = Field(default="new", pattern="^(old|new)$")
    deductions_80c: float = Field(default=0, ge=0)
    deductions_80d: float = Field(default=0, ge=0)
    has_home_loan: bool = False
    age_group: str = "below_60"


@app.post("/api/recommendations")
async def recommendations(inp: RecommendationInput):
    result = await get_tax_recommendations(
        inp.annual_ctc, inp.tax_regime, inp.deductions_80c, inp.deductions_80d,
        inp.has_home_loan, inp.age_group,
    )
    return result


@app.get("/api/v1/tax-slabs")
async def get_tax_slabs():
    """Return current tax slab information for both regimes (FY 2026-27)."""
    return {
        "financial_year": "2026-27",
        "assessment_year": "2027-28",
        "new_regime": {
            "standard_deduction": 75000,
            "slabs": [
                {"min": 0, "max": 400000, "rate": 0},
                {"min": 400001, "max": 800000, "rate": 5},
                {"min": 800001, "max": 1200000, "rate": 10},
                {"min": 1200001, "max": 1600000, "rate": 15},
                {"min": 1600001, "max": 2000000, "rate": 20},
                {"min": 2000001, "max": 2400000, "rate": 25},
                {"min": 2400001, "max": None, "rate": 30},
            ],
            "rebate_limit": 1200000,
            "max_rebate": 60000,
        },
        "old_regime": {
            "standard_deduction": 50000,
            "slabs": [
                {"min": 0, "max": 250000, "rate": 0},
                {"min": 250001, "max": 500000, "rate": 5},
                {"min": 500001, "max": 1000000, "rate": 20},
                {"min": 1000001, "max": None, "rate": 30},
            ],
            "rebate_limit": 500000,
            "max_rebate": 12500,
        },
        "surcharge": {
            "slabs": [
                {"min": 5000001, "max": 10000000, "rate": 10},
                {"min": 10000001, "max": 20000000, "rate": 15},
                {"min": 20000001, "max": 50000000, "rate": 25},
                {"min": 50000001, "max": None, "rate_new": 25, "rate_old": 37},
            ],
        },
        "cess_rate": 4,
        "pf_rate": 12,
        "pf_cap_monthly": 1800,
    }
