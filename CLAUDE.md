# DoAide-Salary (SalaryDecode)

CTC to In-Hand Salary Calculator for Indian Professionals.

## Architecture
- Frontend: React + Vite (port 3036)
- Backend: FastAPI + SQLAlchemy + PostgreSQL (port 3035)

## Conventions
- DO NOT run ruff format
- DO NOT run prettier --write
- DO NOT start dev servers
- All tax calculation logic is in frontend/src/utils/taxCalculator.js
- Tests: frontend uses vitest, backend uses pytest

## Free Tools (no auth required)
- CTC to In-Hand Calculator (/calculator)
- Offer Letter Comparator (/compare)
