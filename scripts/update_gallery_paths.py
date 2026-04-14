#!/usr/bin/env python3
"""
Gallery Path Updater — FunLoading360
--------------------------------------
Citește raportul generat de categorize_gallery.py și actualizează
automat path-urile src din GalleryContent.tsx.

Rulare (după categorize_gallery.py):
    python3 scripts/update_gallery_paths.py
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
REPORT_FILE = Path(__file__).parent / "gallery_categorization.json"
GALLERY_FILE = ROOT / "src" / "app" / "gallery" / "GalleryContent.tsx"

def main():
    if not REPORT_FILE.exists():
        print("❌  Raportul nu există. Rulează mai întâi categorize_gallery.py")
        return

    with open(REPORT_FILE) as f:
        report = json.load(f)

    moved = {v["original"]: v["new_path"] for v in report.values() if v["action"] == "moved"}

    if not moved:
        print("ℹ️   Nicio imagine mutată în raport.")
        return

    content = GALLERY_FILE.read_text()
    original_content = content
    updated = 0

    for old_path, new_path in moved.items():
        # Caută path-ul vechi în format src="/images/..."
        old_web = "/" + old_path  # e.g. /images/events/360-couple-dancing.jpeg
        if old_web in content:
            content = content.replace(old_web, new_path)
            updated += 1
            print(f"  ✅  {old_web}")
            print(f"       → {new_path}")

    if content != original_content:
        GALLERY_FILE.write_text(content)
        print(f"\n✅  GalleryContent.tsx actualizat — {updated} path-uri modificate.")
    else:
        print("\nℹ️   Nicio modificare necesară în GalleryContent.tsx.")

    # Rezumat categorii
    print("\n📊  Rezumat categorii:")
    cats: dict[str, list] = {}
    for v in report.values():
        if v["action"] == "moved":
            cats.setdefault(v["label"], []).append(v["new_path"])
    for label, paths in sorted(cats.items()):
        print(f"  {label}: {len(paths)} imagini")

if __name__ == "__main__":
    main()
