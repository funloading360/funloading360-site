#!/usr/bin/env python3
"""
Fix boothType + tag colors in GalleryContent.tsx
Derivă boothType din folderul src al fiecărei imagini.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
GALLERY = ROOT / "src" / "app" / "gallery" / "GalleryContent.tsx"

# Mapare folder → boothType
FOLDER_TO_BOOTH = {
    "360-slow-motion": "360",
    "glam-vintage":    "glam",
    "selfie-pod":      "selfie",
}

# Tag styles per boothType
TAG_STYLES = {
    "360":    ('boothTag["360"].bg', 'boothTag["360"].text'),
    "glam":   ("boothTag.glam.bg",   "boothTag.glam.text"),
    "selfie": ("boothTag.selfie.bg", "boothTag.selfie.text"),
}

content = GALLERY.read_text()

# Găsește fiecare linie cu un galleryItem (conține src: "/images/...")
line_re = re.compile(
    r'(\{ id: \d+.*?boothType: ")(\w+)(".*?src: "/images/([^/]+)/[^"]+?".*?tagBg: )([^,]+)(, tagText: )([^}]+?)( \})',
    re.DOTALL
)

# Procesăm linie cu linie
lines = content.split("\n")
updated = 0
new_lines = []

for line in lines:
    # Caută pattern: boothType: "xxx" și src: "/images/FOLDER/..."
    booth_match = re.search(r'boothType: "(\w+)"', line)
    src_match   = re.search(r'src: "/images/([^/]+)/', line)

    if booth_match and src_match:
        folder     = src_match.group(1)
        old_booth  = booth_match.group(1)
        new_booth  = FOLDER_TO_BOOTH.get(folder)

        if new_booth and new_booth != old_booth:
            # Update boothType
            line = re.sub(r'boothType: "\w+"', f'boothType: "{new_booth}"', line)

            # Update tagBg
            new_tag_bg, new_tag_text = TAG_STYLES[new_booth]
            line = re.sub(r'tagBg: [^,]+,', f'tagBg: {new_tag_bg},', line)
            line = re.sub(r'tagText: [^\}]+\}', f'tagText: {new_tag_text} }}', line)

            updated += 1
            print(f"  ✅  id src={folder}/... : boothType {old_booth} → {new_booth}")

    new_lines.append(line)

new_content = "\n".join(new_lines)
GALLERY.write_text(new_content)
print(f"\n✅  {updated} înregistrări actualizate în GalleryContent.tsx")
