import httpx
import os


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


async def get_tax_recommendations(
    annual_ctc: float,
    tax_regime: str,
    current_deductions_80c: float = 0,
    current_deductions_80d: float = 0,
    has_home_loan: bool = False,
    age_group: str = "below_60",
) -> dict:
    prompt = f"""You are an Indian tax advisor. Based on the following details, provide 5 specific, actionable tax-saving recommendations.

Details:
- Annual CTC: ₹{annual_ctc:,.0f}
- Current Tax Regime: {tax_regime}
- Section 80C investments: ₹{current_deductions_80c:,.0f} (limit: ₹1,50,000)
- Section 80D health insurance: ₹{current_deductions_80d:,.0f}
- Has home loan: {"Yes" if has_home_loan else "No"}
- Age group: {age_group.replace("_", " ")}

Provide recommendations in this exact JSON format:
{{
  "recommendations": [
    {{
      "title": "Short title",
      "description": "2-3 sentence explanation",
      "potential_savings": "Estimated annual tax saving in INR",
      "section": "Relevant IT section",
      "priority": "high/medium/low"
    }}
  ],
  "regime_suggestion": "old or new",
  "regime_reason": "Why this regime is better for this profile"
}}

Only respond with valid JSON. No markdown or extra text."""

    if not OPENROUTER_API_KEY:
        return _fallback_recommendations(annual_ctc, tax_regime, current_deductions_80c, current_deductions_80d)

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "mistralai/mistral-7b-instruct:free",
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.3,
                    "max_tokens": 1000,
                },
            )
            data = resp.json()
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            import json
            return json.loads(content)
    except Exception:
        return _fallback_recommendations(annual_ctc, tax_regime, current_deductions_80c, current_deductions_80d)


def _fallback_recommendations(ctc: float, regime: str, d80c: float, d80d: float) -> dict:
    recs = []
    remaining_80c = max(150000 - d80c, 0)

    if remaining_80c > 0:
        recs.append({
            "title": "Maximize Section 80C",
            "description": f"You have ₹{remaining_80c:,.0f} unused 80C limit. Invest in ELSS, PPF, or pay life insurance premiums to save tax.",
            "potential_savings": f"₹{remaining_80c * 0.3:,.0f}",
            "section": "80C",
            "priority": "high",
        })

    if d80d < 25000:
        recs.append({
            "title": "Get Health Insurance",
            "description": "Buy health insurance for yourself and family. Premiums up to ₹25,000 (₹50,000 for senior citizens) are deductible under 80D.",
            "potential_savings": f"₹{(25000 - d80d) * 0.3:,.0f}",
            "section": "80D",
            "priority": "high",
        })

    recs.append({
        "title": "NPS Contribution (80CCD)",
        "description": "Additional ₹50,000 deduction under 80CCD(1B) for NPS contributions, over and above the 80C limit.",
        "potential_savings": "₹15,000",
        "section": "80CCD(1B)",
        "priority": "medium",
    })

    if ctc > 1000000:
        recs.append({
            "title": "Home Loan Interest (Section 24)",
            "description": "Home loan interest up to ₹2,00,000 per year is deductible. Consider this if planning to buy property.",
            "potential_savings": "₹60,000",
            "section": "24(b)",
            "priority": "medium",
        })

    recs.append({
        "title": "Education Loan Interest (80E)",
        "description": "If you have an education loan, the entire interest amount is deductible with no upper limit for up to 8 years.",
        "potential_savings": "Varies",
        "section": "80E",
        "priority": "low",
    })

    suggested = "new" if ctc <= 1500000 and d80c < 50000 else "old"
    reason = (
        "With minimal deductions, the new regime's lower slab rates save more tax."
        if suggested == "new"
        else "Your deductions are substantial enough to make the old regime more beneficial."
    )

    return {
        "recommendations": recs[:5],
        "regime_suggestion": suggested,
        "regime_reason": reason,
    }
