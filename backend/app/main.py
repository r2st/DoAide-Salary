from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SalaryDecode API",
    description="CTC to In-Hand Salary Calculator API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
async def health():
    return {"status": "healthy", "service": "salarydecode-api"}


@app.get("/api/v1/tax-slabs")
async def get_tax_slabs():
    """Return current tax slab information for both regimes."""
    return {
        "financial_year": "2025-26",
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
        "cess_rate": 4,
        "pf_rate": 12,
        "pf_cap_monthly": 1800,
    }
