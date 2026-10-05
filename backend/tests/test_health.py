import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_tax_slabs():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/tax-slabs")
    assert response.status_code == 200
    data = response.json()
    assert data["financial_year"] == "2025-26"
    assert len(data["new_regime"]["slabs"]) == 7
    assert len(data["old_regime"]["slabs"]) == 4
    assert data["cess_rate"] == 4
