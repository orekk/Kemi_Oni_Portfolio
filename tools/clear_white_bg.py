#!/usr/bin/env python3
"""Quick utility: remove near-white background from a logo/image.
Usage:
  python clear_white_bg.py path/to/logo.png [threshold]

Writes a new file alongside the input with `.clear.png` appended.
"""
import sys, os
from PIL import Image
import numpy as np

if len(sys.argv) < 2:
    print("Usage: python clear_white_bg.py path/to/logo.png [threshold 225-255]")
    sys.exit(1)

in_path = sys.argv[1]
thr = int(sys.argv[2]) if len(sys.argv) > 2 else 240

im = Image.open(in_path).convert("RGBA")
arr = np.array(im).astype(np.uint16)
rgb = arr[:,:,:3]
white_mask = (rgb > thr).all(axis=2)
light_mask = ((rgb > thr-15).sum(axis=2) == 3) & (np.max(rgb,axis=2) - np.min(rgb,axis=2) < 8)
mask = white_mask | light_mask
arr[mask, 3] = 0
out = Image.fromarray(arr.astype(np.uint8), mode="RGBA")
base, ext = os.path.splitext(in_path)
out_path = base + ".clear.png"
out.save(out_path)
print("Wrote", out_path)
