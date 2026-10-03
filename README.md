# DoAide Salary Calculator

CTC-to-take-home salary calculator for Indian professionals. Part of the [DoAide](https://doaide.com) suite.

## Features

- **CTC Breakdown Calculator** — Input CTC, get full salary breakdown with pie chart
- **Tax Regime Comparator** — Side-by-side old vs new regime comparison
- **HRA Exemption Calculator** — Calculate HRA tax exemption
- **AI Tax-Saving Tips** — Personalized recommendations powered by AI
- **Embeddable Widget** — Other sites can embed the calculator via `/embed`

## Tech Stack

- **Backend**: FastAPI + Python (port 3038)
- **Frontend**: React + Vite (port 3039)
- **Database**: SQLite

## Development

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 172.18.0.1 --port 3038 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

Deployed at [salary.doaide.com](https://salary.doaide.com)

```bash
./deploy.sh
```
