import os
import tempfile
import pytest
from httpx import ASGITransport, AsyncClient

_tmp = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
_tmp.close()
os.environ["SALARY_DB_PATH"] = _tmp.name

from app.main import app
from app.database import init_db


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture
async def client():
    await init_db()
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.mark.anyio
async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


@pytest.mark.anyio
async def test_calculate_endpoint(client):
    resp = await client.post("/api/calculate", json={"annual_ctc": 1200000})
    assert resp.status_code == 200
    data = resp.json()
    assert "monthly" in data
    assert "annual_take_home" in data


@pytest.mark.anyio
async def test_calculate_invalid_ctc(client):
    resp = await client.post("/api/calculate", json={"annual_ctc": -1})
    assert resp.status_code == 422


@pytest.mark.anyio
async def test_hra_endpoint(client):
    resp = await client.post("/api/hra", json={
        "basic_salary_annual": 480000,
        "hra_received_annual": 240000,
        "rent_paid_annual": 300000,
        "metro_city": True,
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "hra_exemption" in data


@pytest.mark.anyio
async def test_compare_endpoint(client):
    resp = await client.post("/api/compare", json={
        "annual_ctc": 1500000,
        "deductions_80c": 150000,
        "deductions_80d": 25000,
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "comparison" in data
    assert "recommended_regime" in data["comparison"]


@pytest.mark.anyio
async def test_recommendations_endpoint(client):
    resp = await client.post("/api/recommendations", json={
        "annual_ctc": 1200000,
        "tax_regime": "new",
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "recommendations" in data
