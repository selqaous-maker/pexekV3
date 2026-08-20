from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "client/public/assets/NeonBlueGeometricPEmblem.webp"
target = root / "client/public/favicon.ico"
image = Image.open(source).convert("RGBA")
image.thumbnail((64, 64), Image.Resampling.LANCZOS)
canvas = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
canvas.alpha_composite(image, ((64 - image.width) // 2, (64 - image.height) // 2))
canvas.save(target, format="ICO", sizes=[(64, 64), (48, 48), (32, 32), (16, 16)])
print(f"wrote {target} ({target.stat().st_size} bytes)")
