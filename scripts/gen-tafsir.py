#!/usr/bin/env python3
"""Generate per-surah tafsir JSON dari gading.dev → public/muslim/api/tafsir/{n}.json

Format output per file:
{
  "surah": 1,
  "nameLatin": "Al-Fatihah",
  "ayahs": [
    {"ayah": 1, "short": "...", "long": "..."},
    ...
  ]
}
"""
import json
import time
import urllib.request
from pathlib import Path

BASE = "https://api.quran.gading.dev"
OUT = Path("public/muslim/api/tafsir")
OUT.mkdir(parents=True, exist_ok=True)


def get(url, timeout=30):
    req = urllib.request.Request(
        url, headers={"User-Agent": "MuslimLeveling/1.1"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def main():
    # Metadata surat (untuk nama latin + jumlah ayat)
    surahs = get(f"{BASE}/surah")["data"]

    total = 0
    for s in surahs:
        n = s["number"]
        name = s["name"]["transliteration"]["id"]
        d = get(f"{BASE}/surah/{n}")
        verses = d["data"]["verses"]
        ayahs = []
        for v in verses:
            t = v["tafsir"]["id"]
            ayahs.append(
                {
                    "ayah": v["number"]["inSurah"],
                    "short": t.get("short", ""),
                    "long": t.get("long", ""),
                }
            )
        payload = {
            "surah": n,
            "nameLatin": name,
            "ayahs": ayahs,
        }
        (OUT / f"{n}.json").write_text(
            json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )
        total += len(ayahs)
        print(f"{n:3d} {name:<20} {len(ayahs):>3} ayat")
        time.sleep(0.15)  # sopan: 6-7 req/s

    print(f"\nTotal: {total} ayat di 114 file")


if __name__ == "__main__":
    main()
