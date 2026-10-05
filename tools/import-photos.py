#!/usr/bin/env python3
"""
Importe les photos d'un dossier source vers assets/img/gallery/ :
- dédoublonne les fichiers strictement identiques (même contenu),
- renomme en slugs web-safe (sans accents ni espaces),
- applique de belles légendes (OVERRIDES) et un ordre d'affichage (ORDER),
- génère photos.json.

Usage :  python tools/import-photos.py "C:\\chemin\\vers\\le\\dossier"
"""
import sys, re, json, hashlib, shutil, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DST = ROOT / "assets" / "img" / "gallery"
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

OVERRIDES = {
    "Heureux d'avoir remporter le premier prix": "Premier prix — Orange Jeunes Talents 2026",
    "Prix spécial": "Prix spécial du jury — Orange Jeunes Talents",
    "Prix spécial (2)": "Prix spécial du jury — Orange Jeunes Talents",
    "Madame Elisabeth TCHOUNGUI Directrice Executive RSE Orange": "Avec Mme Élisabeth Tchoungui, Directrice Exécutive RSE — Orange",
    "Concours Orange jeunes talents 2026": "Concours Orange Jeunes Talents 2026",
    "Concours Orange": "Concours Orange Jeunes Talents 2026",
    "Vainqueur et représentantes de l'école": "Vainqueur, avec les représentantes de l'ESIEE",
    "Jour de la finale Bourse Sisley": "Jour de la finale — Bourse Sisley",
    "Focus sur les derniers ajustements Finale Sisley": "Derniers ajustements — Finale Sisley",
    "Finaliste Bourse Sisley": "Finaliste — Bourse Sisley Jeunes Créateurs",
    "EDU TSAI": "Edu-TSAI",
    "VivaTech 2026": "VivaTech 2026",
    "Chef d'équipe Solution Radio et Transmission SFR": "Avec mon chef d'équipe — Solution Radio & Transmission, SFR",
    "Une partie de l'équipe SFR": "Une partie de l'équipe — SFR",
    "L'équipe": "L'équipe — SFR",
    "Collaborateur SFR": "Avec un collaborateur — SFR",
    "Labo SFR": "Au laboratoire — SFR",
    "Mon espace de travail": "Mon espace de travail — SFR",
    "Dernière semaine de mes 6mois de stage": "Dernière semaine de mon stage de 6 mois — SFR",
    "SFR": "Chez SFR",
    "Notre très chère Encadrante Madame GONCALVES": "Avec notre encadrante, Mme Gonçalves — SFR",
    "ESIEE PARIS 2024": "ESIEE Paris, 2024",
    "Les camarades de promo": "Avec les camarades de promo — ESIEE Paris",
    "Moi à l'école": "À l'école",
}

ORDER = [
    "Heureux d'avoir remporter le premier prix",
    "Prix spécial",
    "Prix spécial (2)",
    "Madame Elisabeth TCHOUNGUI Directrice Executive RSE Orange",
    "Concours Orange jeunes talents 2026",
    "Vainqueur et représentantes de l'école",
    "Jour de la finale Bourse Sisley",
    "Focus sur les derniers ajustements Finale Sisley",
    "Finaliste Bourse Sisley",
    "EDU TSAI",
    "VivaTech 2026",
    "Chef d'équipe Solution Radio et Transmission SFR",
    "Une partie de l'équipe SFR",
    "L'équipe",
    "Collaborateur SFR",
    "Labo SFR",
    "Mon espace de travail",
    "Dernière semaine de mes 6mois de stage",
    "SFR",
    "Notre très chère Encadrante Madame GONCALVES",
    "ESIEE PARIS 2024",
    "Les camarades de promo",
    "Moi à l'école",
]

def clean(stem: str) -> str:
    return re.sub(r"\s+", " ", stem).strip()

def slugify(text: str) -> str:
    t = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    t = t.lower()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return re.sub(r"-{2,}", "-", t) or "photo"

def order_index(cleaned: str) -> int:
    return ORDER.index(cleaned) if cleaned in ORDER else len(ORDER) + 1

def main():
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not src or not src.is_dir():
        print("Dossier source introuvable. Usage: python tools/import-photos.py \"<chemin>\"")
        sys.exit(1)

    # remove previously imported images (keep photos.json)
    for f in DST.iterdir():
        if f.suffix.lower() in EXTS:
            f.unlink()

    files = sorted([p for p in src.iterdir() if p.suffix.lower() in EXTS], key=lambda p: p.name.lower())

    seen_hash = {}
    used_slugs = set()
    items = []
    skipped = []

    for p in files:
        h = hashlib.md5(p.read_bytes()).hexdigest()
        cleaned = clean(p.stem)
        if h in seen_hash:
            skipped.append((p.name, "doublon de " + seen_hash[h]))
            continue
        seen_hash[h] = p.name

        caption = OVERRIDES.get(cleaned, cleaned.replace("6mois", "6 mois"))
        slug = slugify(cleaned)
        base, n = slug, 2
        while slug in used_slugs:
            slug = f"{base}-{n}"; n += 1
        used_slugs.add(slug)

        ext = ".jpg" if p.suffix.lower() == ".jpeg" else p.suffix.lower()
        dst_name = slug + ext
        shutil.copy2(p, DST / dst_name)
        items.append({
            "src": f"assets/img/gallery/{dst_name}",
            "caption": caption,
            "_order": order_index(cleaned),
            "_name": p.name,
        })

    items.sort(key=lambda it: (it["_order"], it["_name"].lower()))
    manifest = [{"src": it["src"], "caption": it["caption"]} for it in items]
    payload = json.dumps(manifest, ensure_ascii=False, indent=2)
    (DST / "photos.json").write_text(payload + "\n", encoding="utf-8")
    # Inlined copy so the gallery works even when index.html is opened directly (file://)
    (DST / "photos.js").write_text("window.GALLERY_PHOTOS = " + payload + ";\n", encoding="utf-8")

    print(f"{len(manifest)} photo(s) importée(s).")
    for it in items:
        print(f"  [{it['_order']:>2}] {it['src']}  ←  {it['_name']}\n        “{it['caption']}”")
    if skipped:
        print("\nDoublons ignorés :")
        for name, why in skipped:
            print(f"  - {name}  ({why})")

if __name__ == "__main__":
    main()
