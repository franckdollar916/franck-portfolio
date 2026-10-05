#!/usr/bin/env python3
"""
Génère assets/img/gallery/photos.json à partir des images présentes
dans assets/img/gallery/.

- La légende de chaque photo = le nom du fichier (sans extension),
  les tirets/underscores devenant des espaces.
- Pour ordonner les photos, préfixe les fichiers : 01_..., 02_..., etc.
  (le préfixe numérique est retiré de la légende affichée).

Usage :  python tools/build-gallery.py
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GALLERY = ROOT / "assets" / "img" / "gallery"
EXine = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}

def caption_from(name: str) -> str:
    stem = Path(name).stem
    stem = re.sub(r"^\s*\d+\s*[-_.)]\s*", "", stem)   # retire un préfixe d'ordre "01_", "02-", ...
    stem = stem.replace("_", " ").replace("-", " ")
    stem = re.sub(r"\s+", " ", stem).strip()
    return stem

def main():
    files = sorted(
        [p for p in GALLERY.iterdir() if p.suffix.lower() in EXine],
        key=lambda p: p.name.lower(),
    )
    photos = [
        {"src": f"assets/img/gallery/{p.name}", "caption": caption_from(p.name)}
        for p in files
    ]
    out = GALLERY / "photos.json"
    out.write_text(json.dumps(photos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(photos)} photo(s) écrite(s) dans {out}")
    for ph in photos:
        print(f"  - {ph['src']}  →  “{ph['caption']}”")

if __name__ == "__main__":
    main()
