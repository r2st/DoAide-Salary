from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .calculator import (
    CTCInput,
    HRAInput,
    TaxRegimeInput,
    calculate_ctc_breakdown,
    calculate_hra_exemption,
    compare_tax_regimes,
)
from .database import init_db, save_calculation, get_recent_calculations
from .ai_recommendations import get_tax_recommendations


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="DoAide Salary Calculator API",
    description="CTC to take-home salary calculator for Indian professionals",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "doaide-salary-api"}


@app.post("/api/calculate")
async def calculate_salary(inp: CTCInput):
    result = calculate_ctc_breakdown(inp)
    await save_calculation("ctc_breakdown", inp.model_dump(), result)
    return result


@app.post("/api/hra")
async def calculate_hra(inp: HRAInput):
    result = calculate_hra_exemption(inp)
    await save_calculation("hra_exemption", inp.model_dump(), result)
    return result


@app.post("/api/compare")
async def compare_regimes(inp: TaxRegimeInput):
    result = compare_tax_regimes(inp)
    await save_calculation("regime_comparison", inp.model_dump(), result)
    return result


class AIRecommendationInput(BaseModel):
    annual_ctc: float = Field(gt=0)
    tax_regime: str = Field(default="new", pattern="^(old|new)$")
    deductions_80c: float = Field(default=0.0, ge=0)
    deductions_80d: float = Field(default=0.0, ge=0)
    has_home_loan: bool = False
    age_group: str = Field(default="below_60")


@app.post("/api/recommendations")
async def recommendations(inp: AIRecommendationInput):
    result = await get_tax_recommendations(
        annual_ctc=inp.annual_ctc,
        tax_regime=inp.tax_regime,
        current_deductions_80c=inp.deductions_80c,
        current_deductions_80d=inp.deductions_80d,
        has_home_loan=inp.has_home_loan,
        age_group=inp.age_group,
    )
    await save_calculation("ai_recommendations", inp.model_dump(), result)
    return result


@app.get("/api/history")
async def calculation_history(limit: int = 20):
    return await get_recent_calculations(limit)
