import aiosqlite
import json
import os
from datetime import datetime

DB_PATH = os.getenv("SALARY_DB_PATH", "salary_history.db")


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS calculations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                calc_type TEXT NOT NULL,
                input_data TEXT NOT NULL,
                result_data TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        await db.commit()


async def save_calculation(calc_type: str, input_data: dict, result_data: dict):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO calculations (calc_type, input_data, result_data, created_at) VALUES (?, ?, ?, ?)",
            (calc_type, json.dumps(input_data), json.dumps(result_data), datetime.utcnow().isoformat()),
        )
        await db.commit()


async def get_recent_calculations(limit: int = 20) -> list:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT id, calc_type, input_data, result_data, created_at FROM calculations ORDER BY id DESC LIMIT ?",
            (limit,),
        ) as cursor:
            rows = await cursor.fetchall()
            return [
                {
                    "id": row["id"],
                    "calc_type": row["calc_type"],
                    "input_data": json.loads(row["input_data"]),
                    "result_data": json.loads(row["result_data"]),
                    "created_at": row["created_at"],
                }
                for row in rows
            ]
