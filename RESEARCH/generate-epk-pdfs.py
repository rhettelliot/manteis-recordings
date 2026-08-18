#!/usr/bin/env python3
"""Generate 5 EPK one-sheet PDFs for Manteis Recordings artists.
Uses ReportLab to render single-page PDFs.
Design spec: black bg, Safety Orange #FF5500 accents, white text,
JetBrains Mono for data, Helvetica for body (substitute).
One page per artist — Letter size, designed to fit on a single sheet.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, Color
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image,
    Frame, PageTemplate, BaseDocTemplate
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
from PIL import Image as PILImage
import os

BASE = Path("/Volumes/OWC/GitHub/manteis-recordings")
COVERS = BASE / "public" / "covers"
OUT = BASE / "RESEARCH" / "epk-pdfs"
OUT.mkdir(exist_ok=True)

ORANGE = HexColor("#FF5500")
BLACK = HexColor("#000000")
DARK_GRAY = HexColor("#111111")
MED_GRAY = HexColor("#222222")
LIGHT_GRAY = HexColor("#DDDDDD")
MUTED = HexColor("#999999")
DIM = HexColor("#666666")

artists = [
    {
        "name": "The Manteis Project",
        "slug": "the-manteis-project",
        "genre": "Ambient / Quantum Architecture",
        "tagline": "Signal architecture",
        "short_bio": "Ambient architecture from the intersection of data, frequency, and presence. Four transmissions mapping the terrain between void and signal.",
        "bio": [
            "The Manteis Project is the ambient architecture arm of Manteis Recordings — a solo exploration of sound as structural blueprint. Where most ambient music creates atmosphere, The Manteis Project builds rooms you can stand in.",
            "Four releases chart a progression from foundational drone (The Source, 20 tracks of generative architecture) through quantum geometry (Continuous, Foundations) to the atmospheric precision of Violet Cirrus. Each release treats frequency as a building material — not decoration, not mood, but load-bearing structure.",
            "The work draws from the lineage of Brian Eno, Stars of the Lid, and Steve Roach, but rejects the genre's passivity. This is not background music. This is foundation music.",
        ],
        "releases": "4 (MR-001, MR-003, MR-004, MR-005)",
        "founded": "2024",
        "cover": "MP_The_Source.webp",
        "tracks": [
            ("Violet Cirrus", "MR-005", "70", "8:42", "Layered drone with upper-harmonic shimmer. Contemplative sequences, scientific visualization, architectural reveals."),
            ("Continuous", "MR-003", "60", "12:15", "Long-form generative ambient. Time-lapse, slow cinema, extended meditation."),
            ("The Source", "MR-001", "50", "20:00", "20-track generative suite. Installation work, long-form media."),
        ],
        "spotify": "open.spotify.com/artist/4xG6n3c2dQF0w7oK9aT2b1",
        "web": "manteisrecordings.com/epk/the-manteis-project",
    },
    {
        "name": "Red Shift Mantra",
        "slug": "red-shift-mantra",
        "genre": "Electronic / Synthwave",
        "tagline": "Cosmic pressure",
        "short_bio": "Cosmic pressure encoded as sound. Two transmissions mapping the distance between atomic vibration and the void between stars.",
        "bio": [
            "Red Shift Mantra is the cosmic metaphor made audible — the red shift of distant light stretched low, the mantra as vibration that reshapes consciousness through repetition. Two albums map this terrain: Phoneme (9 tracks of granular synth architecture) and Deep Field Image (7 tracks inspired by the Hubble Deep Field observation).",
            "The sound occupies the space between synthwave's pulse and ambient's expanse. It is not retro-futurism. It is cosmic realism — the sound of a universe that is mostly empty, punctuated by the violence of creation.",
        ],
        "releases": "2 (MR-002, MR-006)",
        "founded": "2024",
        "cover": "RSM_DFI.webp",
        "tracks": [
            ("Obsidian", "MR-006", "120", "5:38", "Driving synthwave with granular texture. Night driving, tech reveals, high-stakes montage."),
            ("Ajna", "MR-002", "90", "7:22", "Hypnotic synth architecture, drone to pulse. Meditation sequences, consciousness expansion."),
            ("Kobayashi Maru", "MR-006", "110", "4:51", "Tension-laden electronic. Cliffhangers, training sequences, impossible-choice narratives."),
        ],
        "spotify": "open.spotify.com/artist/1nJCr1MCkLBA1ZqD7j7GDF",
        "web": "manteisrecordings.com/epk/red-shift-mantra",
    },
    {
        "name": "Thesan Musique",
        "slug": "thesan-musique",
        "genre": "Deep Dance / Techno / DnB",
        "tagline": "Warehouse bass",
        "short_bio": "Bass is architecture. The kick drum is the heartbeat of a world that has forgotten how to dance. Ataraxia: tranquility through rhythm.",
        "bio": [
            "Thesan Musique is the dance floor architecture arm of Manteis Recordings. Where The Manteis Project builds rooms for contemplation, Thesan Musique builds rooms for movement — warehouses, basements, the liminal spaces where bass frequencies become physical.",
            "The debut album Ataraxia (9 tracks) strips everything to frequency. Techno removes the unnecessary. DnB accelerates what was already infinite. Thesan — from the Etruscan goddess of dawn, transformation, and the threshold between states.",
        ],
        "releases": "1 (MR-008)",
        "founded": "2025",
        "cover": "Thesan.webp",
        "tracks": [
            ("Ataraxia", "MR-008", "130", "6:45", "Peak-time techno, warehouse energy, euphoric breakdown. Sweat and dark rooms."),
            ("Warehouse Bass", "MR-008", "174", "5:12", "DnB with sub-bass pressure. Chase scenes, kinetic montage."),
            ("Tranquility", "MR-008", "120", "8:30", "Ambient techno comedown. After-hours, contemplative transitions."),
        ],
        "spotify": "open.spotify.com/artist/34IoM42BGoMQ7VoeeZSWlh",
        "web": "manteisrecordings.com/epk/thesan-musique",
    },
    {
        "name": "Brindavan Gardens",
        "slug": "brindavan-gardens",
        "genre": "Spiritual / Shoegaze / Dream",
        "tagline": "Devotional reverb",
        "short_bio": "Devotional reverb. Sound as spiritual practice — the sacred made audible through drones, mantras, and the resonance of contemplation.",
        "bio": [
            "Brindavan Gardens is the spiritual sound practice of Manteis Recordings. Named after the gardens of Vrindavan — where devotion meets the earth — the project treats sound as a spiritual technology, not entertainment.",
            "The debut album Upekṣā (5 tracks) takes its name from the Buddhist concept of equanimity — the non-reactive awareness that holds all experience without grasping or pushing away. Where shoegaze wraps distortion around melody, Brindavan Gardens wraps silence around resonance.",
        ],
        "releases": "1 (MR-007)",
        "founded": "2025",
        "cover": "BrindavanGardens.webp",
        "tracks": [
            ("Upekṣā", "MR-007", "60", "10:15", "Sustained devotional drone with bell resonance. Spiritual sequences, nature documentary."),
            ("Mantra", "MR-007", "70", "7:38", "Vocal drone with harmonic overtone singing. Ritual sequences, pilgrimage, transcendence."),
            ("Equanimity", "MR-007", "50", "12:00", "Long-form ambient with nature field recordings. Meditation guidance, emotional stillness."),
        ],
        "spotify": "open.spotify.com/artist/1oPtOn5okI3nLDvWWGgd3F",
        "web": "manteisrecordings.com/epk/brindavan-gardens",
    },
    {
        "name": "Bethany Pritchett",
        "slug": "bethany-pritchett",
        "genre": "Alternative / Vocal / Synthesist",
        "tagline": "Intimate poetry",
        "short_bio": "Voice, synthesizer, and the words that hold them together. Music made in a small room in Seattle with one window and one microphone.",
        "bio": [
            "Bethany Pritchett makes music in a small room in Seattle — voice, synthesizer, and the words that hold them together. No studio polish. No band. Just one person writing honestly and arranging sound around it.",
            "Her debut album, Good Morning, Good Fortune Elephant, is five songs recorded at home with one window and one microphone. The result is intimate in the literal sense — music that records the interior of a person, not the performance of one.",
        ],
        "releases": "1 (MR-009)",
        "founded": "2025",
        "cover": "GMGFE.webp",
        "tracks": [
            ("Good Morning, Good Fortune Elephant", "MR-009", "85", "4:22", "Intimate vocal-led alternative with synth texture. Character moments, quiet intimacy."),
            ("Window", "MR-009", "75", "3:48", "Minimal synth-pop with breath-room vocal. Vulnerability, morning light."),
            ("Elephant", "MR-009", "80", "5:15", "Building alternative with layered vocal harmonies. Emotional crescendo, character transformation."),
        ],
        "spotify": "open.spotify.com/artist/0hpTO28w4Qjc3xA9oKKQGk",
        "web": "manteisrecordings.com/epk/bethany-pritchett",
    },
]


def convert_cover_to_png(webp_path: Path, png_path: Path):
    """Convert webp to PNG for reportlab compatibility."""
    img = PILImage.open(webp_path)
    # Resize to max 400px square for PDF
    img = img.convert("RGB")
    img.thumbnail((400, 400))
    img.save(png_path, "PNG")


def generate_epk_pdf(artist: dict, out_path: Path):
    """Generate a single-page EPK PDF using reportlab canvas directly."""
    W, H = letter  # 612 x 792 points
    c = canvas.Canvas(str(out_path), pagesize=letter)
    c.setTitle(f"EPK - {artist['name']} - Manteis Recordings")
    c.setAuthor("Manteis Recordings")
    c.setSubject("Electronic Press Kit")

    # Black background
    c.setFillColor(BLACK)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Convert cover image
    webp_path = COVERS / artist["cover"]
    png_path = OUT / f"tmp_{artist['slug']}_cover.png"
    convert_cover_to_png(webp_path, png_path)

    # === HEADER ===
    y = H - 36  # top margin

    # Artist name
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(36, y, artist["name"])

    # Genre + tagline
    y -= 16
    c.setFillColor(ORANGE)
    c.setFont("Courier", 7.5)
    c.drawString(36, y, f"{artist['genre'].upper()}  ·  {artist['tagline'].upper()}")

    # Cover art (top right)
    cover_size = 90
    cover_x = W - 36 - cover_size
    cover_y = H - 36 - cover_size
    c.drawImage(str(png_path), cover_x, cover_y, width=cover_size, height=cover_size)

    # Label badge under cover
    c.setFillColor(DIM)
    c.setFont("Courier", 6)
    c.drawCentredString(cover_x + cover_size / 2, cover_y - 10, "MANTEIS RECORDINGS")

    # Orange divider line
    y -= 24
    c.setStrokeColor(ORANGE)
    c.setLineWidth(0.75)
    c.line(36, y, W - 36, y)

    # === SHORT BIO ===
    y -= 14
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 9)
    # word-wrap short bio
    words = artist["short_bio"].split()
    line = ""
    bio_lines = []
    for w in words:
        test = f"{line} {w}".strip()
        if c.stringWidth(test, "Helvetica-Oblique", 9) > (W - 72 - cover_size - 10):
            bio_lines.append(line)
            line = w
        else:
            line = test
    if line:
        bio_lines.append(line)
    for bl in bio_lines:
        c.drawString(36, y, bl)
        y -= 12

    y -= 4

    # === META GRID ===
    meta_items = [
        ("LOCATION", "Seattle, WA"),
        ("FOUNDED", artist["founded"]),
        ("RELEASES", artist["releases"]),
        ("LABEL", "Manteis Recordings"),
    ]
    col_w = (W - 72) / 4
    meta_y = y - 2
    for i, (label, value) in enumerate(meta_items):
        x = 36 + i * col_w
        # Orange left border
        c.setStrokeColor(ORANGE)
        c.setLineWidth(1.5)
        c.line(x, meta_y, x, meta_y - 22)
        # Label
        c.setFillColor(ORANGE)
        c.setFont("Courier", 6)
        c.drawString(x + 6, meta_y - 6, label)
        # Value
        c.setFillColor(white)
        c.setFont("Helvetica", 7.5)
        c.drawString(x + 6, meta_y - 16, value)

    y = meta_y - 30

    # === BIO SECTION ===
    c.setFillColor(ORANGE)
    c.setFont("Courier", 7)
    c.drawString(36, y, "BIO")
    c.setStrokeColor(MED_GRAY)
    c.setLineWidth(0.5)
    c.line(36 + 20, y + 2, W - 36, y + 2)
    y -= 12

    for para in artist["bio"]:
        c.setFillColor(LIGHT_GRAY)
        c.setFont("Helvetica", 8)
        words = para.split()
        line = ""
        bio_lines = []
        max_w = W - 72
        for w in words:
            test = f"{line} {w}".strip()
            if c.stringWidth(test, "Helvetica", 8) > max_w:
                bio_lines.append(line)
                line = w
            else:
                line = test
        if line:
            bio_lines.append(line)
        for bl in bio_lines:
            c.drawString(36, y, bl)
            y -= 11
        y -= 4

    y -= 4

    # === KEY TRACKS TABLE ===
    c.setFillColor(ORANGE)
    c.setFont("Courier", 7)
    c.drawString(36, y, "KEY TRACKS FOR SYNC")
    c.setStrokeColor(MED_GRAY)
    c.setLineWidth(0.5)
    c.line(36 + 100, y + 2, W - 36, y + 2)
    y -= 8

    # Table header
    headers = [("TRACK", 0.28), ("CAT #", 0.08), ("BPM", 0.06), ("TIME", 0.07), ("SYNC DESCRIPTION", 0.51)]
    avail_w = W - 72
    c.setFont("Courier", 6)
    c.setFillColor(ORANGE)
    x = 36
    for h, frac in headers:
        c.drawString(x, y, h)
        x += avail_w * frac
    y -= 4
    c.setStrokeColor(MED_GRAY)
    c.line(36, y, W - 36, y)
    y -= 8

    # Track rows
    for track in artist["tracks"]:
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(white)
        c.drawString(36, y, track[0])

        c.setFont("Courier", 7)
        c.setFillColor(MUTED)
        x = 36 + avail_w * 0.28
        c.drawString(x, y, track[1])
        x += avail_w * 0.08
        c.drawString(x, y, track[2])
        x += avail_w * 0.06
        c.drawString(x, y, track[3])

        # Description (may need wrapping)
        c.setFont("Helvetica", 7)
        c.setFillColor(LIGHT_GRAY)
        desc_x = 36 + avail_w * (0.28 + 0.08 + 0.06 + 0.07)
        desc_max_w = W - 36 - desc_x
        words = track[4].split()
        line = ""
        desc_lines = []
        for w in words:
            test = f"{line} {w}".strip()
            if c.stringWidth(test, "Helvetica", 7) > desc_max_w:
                desc_lines.append(line)
                line = w
            else:
                line = test
        if line:
            desc_lines.append(line)
        for i, dl in enumerate(desc_lines):
            if i == 0:
                c.drawString(desc_x, y, dl)
            else:
                y -= 9
                c.drawString(desc_x, y, dl)
        y -= 6
        c.setStrokeColor(DARK_GRAY)
        c.line(36, y, W - 36, y)
        y -= 10

    y -= 2

    # === STREAMING + CONTACT ===
    # Streaming (left)
    c.setFillColor(ORANGE)
    c.setFont("Courier", 6)
    c.drawString(36, y, "STREAMING")
    c.setFillColor(MUTED)
    c.setFont("Courier", 7)
    stream_lines = [
        f"Spotify: {artist['spotify']}",
        "SoundCloud: soundcloud.com/rhettelliot",
        "Bandcamp: manteisrecordings.bandcamp.com",
        f"Web: {artist['web']}",
    ]
    y -= 9
    for sl in stream_lines:
        c.drawString(36, y, sl)
        y -= 9

    # Contact (right)
    contact_y = y + 9 * 4 + 9
    c.setFillColor(ORANGE)
    c.setFont("Courier", 6)
    c.drawRightString(W - 36, contact_y, "CONTACT")
    c.setFillColor(MUTED)
    c.setFont("Courier", 7)
    contact_lines = [
        "Booking: manteisrecordings@mac.com",
        "Press: manteisrecordings@mac.com",
        "Label: manteisrecordings.com",
    ]
    contact_y -= 9
    for cl in contact_lines:
        c.drawRightString(W - 36, contact_y, cl)
        contact_y -= 9

    # === FOOTER ===
    footer_y = 24
    c.setFillColor(ORANGE)
    c.setFont("Courier", 6)
    c.drawCentredString(W / 2, footer_y, "MANTEIS RECORDINGS")
    c.setFillColor(DIM)
    c.drawString(W / 2 + c.stringWidth("MANTEIS RECORDINGS", "Courier", 6) / 2 + 4, footer_y, "·  SEATTLE, WA  ·  manteisrecordings.com")

    c.save()

    # Clean up temp PNG
    png_path.unlink(missing_ok=True)


# Generate all 5 PDFs
for artist in artists:
    out_path = OUT / f"epk-{artist['slug']}.pdf"
    generate_epk_pdf(artist, out_path)
    size_kb = out_path.stat().st_size // 1024
    print(f"✅ epk-{artist['slug']}.pdf ({size_kb}KB)")

print(f"\nAll 5 EPK PDFs generated in {OUT}")