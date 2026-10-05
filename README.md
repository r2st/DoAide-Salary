# SalaryDecode by DoAide

Free CTC to In-Hand Salary Calculator for Indian professionals. Compare old vs new tax regime, calculate exact take-home pay, and compare multiple job offers.

## Features
- CTC to In-Hand salary breakdown
- Old vs New tax regime comparison (FY 2025-26)
- Job offer comparator (2-3 offers side by side)
- No login required — all calculations are client-side

## Tech Stack
- Frontend: React 18 + Vite 5
- Backend: FastAPI + PostgreSQL
- Deployment: Hetzner VPS via systemd

## Quick Start
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn app.main:app --port 3035
```

## License
MIT
