import math

def generate_gear_path(teeth, module):
    rp = (teeth * module) / 2.0
    ro = rp + module
    ri = rp - 1.25 * module
    
    angle_per_tooth = (2 * math.pi) / teeth
    path = ""
    
    for i in range(teeth):
        a0 = i * angle_per_tooth
        a1 = a0 + angle_per_tooth * 0.15
        a2 = a0 + angle_per_tooth * 0.35
        a3 = a0 + angle_per_tooth * 0.65
        a4 = a0 + angle_per_tooth * 0.85
        a5 = a0 + angle_per_tooth
        
        px1, py1 = math.cos(a1) * ri, math.sin(a1) * ri
        px2, py2 = math.cos(a2) * ro, math.sin(a2) * ro
        px3, py3 = math.cos(a3) * ro, math.sin(a3) * ro
        px4, py4 = math.cos(a4) * ri, math.sin(a4) * ri
        px5, py5 = math.cos(a5) * ri, math.sin(a5) * ri
        
        if i == 0:
            start_x, start_y = math.cos(a0) * ri, math.sin(a0) * ri
            path += f"M {start_x:.2f} {start_y:.2f} "
            
        path += f"A {ri:.2f} {ri:.2f} 0 0 1 {px1:.2f} {py1:.2f} "
        path += f"L {px2:.2f} {py2:.2f} "
        path += f"A {ro:.2f} {ro:.2f} 0 0 1 {px3:.2f} {py3:.2f} "
        path += f"L {px4:.2f} {py4:.2f} "
        path += f"A {ri:.2f} {ri:.2f} 0 0 1 {px5:.2f} {py5:.2f} "
        
    path += "Z"
    return path, rp

m = 4

t1 = 47
path1, rp1 = generate_gear_path(t1, m)

t2 = 17
path2, rp2 = generate_gear_path(t2, m)

svg1 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{rp1*2.2}" height="{rp1*2.2}" viewBox="{-rp1*1.1} {-rp1*1.1} {rp1*2.2} {rp1*2.2}" fill="none" stroke="var(--accent-color)" stroke-width="1.5" class="gear-large" style="opacity: 0.5;">
    <circle cx="0" cy="0" r="{rp1 * 0.15}" stroke-width="2"/>
    <circle cx="0" cy="0" r="{rp1 * 0.7}" stroke-dasharray="8 8" opacity="0.3"/>
    <path d="{path1}" />
</svg>"""

# Calculate the exact center distance for the second gear
# rp1 + rp2 is the distance between centers. 
# We want the second gear to mesh perfectly.
center_dist = rp1 + rp2

svg2 = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{rp2*2.2}" height="{rp2*2.2}" viewBox="{-rp2*1.1} {-rp2*1.1} {rp2*2.2} {rp2*2.2}" fill="none" stroke="var(--text-secondary)" stroke-width="2" class="gear-small" style="position: absolute; bottom: -20px; left: -60px; opacity: 0.3;">
    <circle cx="0" cy="0" r="{rp2 * 0.2}" stroke-width="2"/>
    <path d="{path2}" />
</svg>"""

with open("gears_output.txt", "w") as f:
    f.write(svg1 + "\n\n" + svg2)

print("Done")
