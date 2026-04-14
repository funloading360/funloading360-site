#!/usr/bin/env python3
"""
Gallery Image Categorizer — FunLoading360
-----------------------------------------
Deschide fiecare imagine, o categorizezi interactiv, o mută în folderul serviciului.
La final generează un raport JSON cu toate path-urile noi.

Rulare:
    python3 scripts/categorize_gallery.py
"""

import os
import shutil
import json
import subprocess
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent
IMAGES_DIR = ROOT / "public" / "images"

CATEGORIES = {
    "1": ("360-slow-motion", "360° Slow Motion"),
    "2": ("glam-vintage",    "Glam Vintage"),
    "3": ("selfie-pod",      "Selfie Pod"),
}

# Pre-etichetare automată bazată pe numele fișierului (poți corecta manual)
AUTO_LABELS = {
    "360-":          "1",
    "booth-exterior": "1",
    "venue-setup-":  "1",
    "glam-":         "2",
    "IMG_3067":      "2",
    "selfie-pod":    "3",
}

REPORT_FILE = ROOT / "scripts" / "gallery_categorization.json"

# ── Helpers ───────────────────────────────────────────────────────────────────

def guess_category(filename: str):
    """Ghiceste categoria din numele fișierului."""
    for prefix, cat in AUTO_LABELS.items():
        if prefix in filename:
            return cat
    return None

def open_image(path: Path):
    """Deschide imaginea cu Preview pe macOS."""
    subprocess.Popen(["open", str(path)])

def close_preview():
    """Închide Preview după fiecare imagine."""
    subprocess.run(["osascript", "-e", 'tell application "Preview" to close every window'],
                   capture_output=True)

def print_menu(filename: str, guess):
    print("\n" + "─" * 55)
    print(f"  📸  {filename}")
    if guess:
        cat_name = CATEGORIES[guess][1]
        print(f"  💡  Sugestie automată: [{guess}] {cat_name}")
    print("─" * 55)
    for key, (_, label) in CATEGORIES.items():
        print(f"  {key}  →  {label}")
    print("  s  →  Skip (lasă imaginea unde e)")
    print("  d  →  Delete (șterge imaginea)")
    print("  q  →  Quit și salvează progresul")
    print("─" * 55)

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    # Colectează toate imaginile din subfolderele existente
    all_images = sorted([
        p for p in IMAGES_DIR.rglob("*")
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
        and p.parts[-2] not in {"360-slow-motion", "glam-vintage", "selfie-pod"}
    ])

    if not all_images:
        print("✅  Toate imaginile sunt deja categorizate!")
        return

    # Creează folderele destinație
    for slug, _ in CATEGORIES.values():
        dest = IMAGES_DIR / slug
        dest.mkdir(parents=True, exist_ok=True)

    # Încarcă raportul existent dacă există (pentru a relua de unde ai rămas)
    report: dict = {}
    if REPORT_FILE.exists():
        with open(REPORT_FILE) as f:
            report = json.load(f)

    print(f"\n🎯  FunLoading360 — Gallery Categorizer")
    print(f"    {len(all_images)} imagini de procesat\n")
    print("    Apasă Enter după ce ai văzut imaginea pentru a afișa meniul.")

    moved_count = 0
    skipped_count = 0
    deleted_count = 0

    for img_path in all_images:
        filename = img_path.name

        # Skip dacă deja procesată în sesiuni anterioare
        if filename in report:
            print(f"  ⏭   {filename} — deja categorisit, skip")
            continue

        # Deschide imaginea
        open_image(img_path)

        guess = guess_category(filename)
        print_menu(filename, guess)

        while True:
            raw = input("  Alegere: ").strip().lower()

            # Enter gol = acceptă sugestia automată
            if raw == "" and guess:
                choice = guess
            else:
                choice = raw

            if choice == "q":
                close_preview()
                _save_report(report, REPORT_FILE)
                print(f"\n💾  Progres salvat în {REPORT_FILE}")
                print(f"    Mutate: {moved_count} | Skipped: {skipped_count} | Șterse: {deleted_count}")
                return

            if choice == "s":
                skipped_count += 1
                report[filename] = {"action": "skipped", "original": str(img_path.relative_to(ROOT / "public"))}
                break

            if choice == "d":
                confirm = input(f"  ⚠️   Sigur vrei să ștergi '{filename}'? (y/N): ").strip().lower()
                if confirm == "y":
                    img_path.unlink()
                    report[filename] = {"action": "deleted", "original": str(img_path.relative_to(ROOT / "public"))}
                    deleted_count += 1
                    print(f"  🗑️   Șters: {filename}")
                    break
                else:
                    print("  ↩️   Anulat. Alege din nou.")
                    continue

            if choice in CATEGORIES:
                slug, label = CATEGORIES[choice]
                dest_path = IMAGES_DIR / slug / filename

                # Dacă există deja un fișier cu același nume, adaugă suffix
                if dest_path.exists():
                    stem = img_path.stem
                    suffix = img_path.suffix
                    counter = 1
                    while dest_path.exists():
                        dest_path = IMAGES_DIR / slug / f"{stem}_{counter}{suffix}"
                        counter += 1

                shutil.move(str(img_path), str(dest_path))
                new_web_path = f"/images/{slug}/{dest_path.name}"
                report[filename] = {
                    "action": "moved",
                    "category": slug,
                    "label": label,
                    "original": str(img_path.relative_to(ROOT / "public")),
                    "new_path": new_web_path,
                }
                moved_count += 1
                print(f"  ✅  Mutat → {new_web_path}")
                break

            print("  ⚠️   Opțiune invalidă. Alege 1, 2, 3, s, d sau q.")

        close_preview()

    _save_report(report, REPORT_FILE)

    print(f"\n{'═' * 55}")
    print(f"  🎉  Gata! Mutate: {moved_count} | Skipped: {skipped_count} | Șterse: {deleted_count}")
    print(f"  📄  Raport salvat: {REPORT_FILE}")
    print(f"\n  Rulează acum scriptul de update pentru galerie:")
    print(f"  python3 scripts/update_gallery_paths.py")
    print(f"{'═' * 55}\n")


def _save_report(report: dict, path: Path):
    with open(path, "w") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    main()
