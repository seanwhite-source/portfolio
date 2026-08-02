const fs = require('fs');

function generateGearPath(teeth, module) {
    const rp = (teeth * module) / 2; // pitch radius
    const ro = rp + module; // outer radius
    const ri = rp - 1.25 * module; // inner radius
    
    // Tooth width at different radii (approximated)
    // A tooth spans roughly half the pitch, so pi * module / 2
    // Angle span of one full tooth cycle
    const anglePerTooth = (2 * Math.PI) / teeth;
    
    let path = "";
    
    for (let i = 0; i < teeth; i++) {
        // Angles for the four corners of a tooth
        // 0: start of gap (inner)
        // 1: base of tooth (inner)
        // 2: top of tooth (outer)
        // 3: end top of tooth (outer)
        // 4: back to base (inner)
        
        const a0 = i * anglePerTooth;
        const a1 = a0 + anglePerTooth * 0.15; // end of gap
        const a2 = a0 + anglePerTooth * 0.35; // top left
        const a3 = a0 + anglePerTooth * 0.65; // top right
        const a4 = a0 + anglePerTooth * 0.85; // bottom right
        const a5 = a0 + anglePerTooth; // end of cycle
        
        const px1 = Math.cos(a1) * ri; const py1 = Math.sin(a1) * ri;
        const px2 = Math.cos(a2) * ro; const py2 = Math.sin(a2) * ro;
        const px3 = Math.cos(a3) * ro; const py3 = Math.sin(a3) * ro;
        const px4 = Math.cos(a4) * ri; const py4 = Math.sin(a4) * ri;
        const px5 = Math.cos(a5) * ri; const py5 = Math.sin(a5) * ri;
        
        if (i === 0) {
            const startX = Math.cos(a0) * ri;
            const startY = Math.sin(a0) * ri;
            path += `M ${startX.toFixed(2)} ${startY.toFixed(2)} `;
        }
        
        // Arc to base of tooth
        path += `A ${ri.toFixed(2)} ${ri.toFixed(2)} 0 0 1 ${px1.toFixed(2)} ${py1.toFixed(2)} `;
        // Line to top of tooth
        path += `L ${px2.toFixed(2)} ${py2.toFixed(2)} `;
        // Arc across top of tooth
        path += `A ${ro.toFixed(2)} ${ro.toFixed(2)} 0 0 1 ${px3.toFixed(2)} ${py3.toFixed(2)} `;
        // Line to bottom of tooth
        path += `L ${px4.toFixed(2)} ${py4.toFixed(2)} `;
        // Arc to end of cycle
        path += `A ${ri.toFixed(2)} ${ri.toFixed(2)} 0 0 1 ${px5.toFixed(2)} ${py5.toFixed(2)} `;
    }
    
    path += "Z";
    return path;
}

// Module determines the size of the teeth. Must be same for both gears to mesh.
const m = 6; 

const t1 = 47;
const rp1 = (t1 * m) / 2;
const path1 = generateGearPath(t1, m);

const t2 = 17;
const rp2 = (t2 * m) / 2;
const path2 = generateGearPath(t2, m);

// Center distance
const centerDist = rp1 + rp2;

console.log(`Large Gear Pitch Radius: ${rp1}`);
console.log(`Small Gear Pitch Radius: ${rp2}`);
console.log(`Center Distance: ${centerDist}`);

// Output SVG elements
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" width="${rp1*2.5}" height="${rp1*2.5}" viewBox="${-rp1*1.2} ${-rp1*1.2} ${rp1*2.4} ${rp1*2.4}" fill="none" stroke="var(--accent-color)" stroke-width="1.5" class="gear-large" style="opacity: 0.5;">
    <!-- Hub -->
    <circle cx="0" cy="0" r="${rp1 * 0.15}" stroke-width="2"/>
    <circle cx="0" cy="0" r="${rp1 * 0.6}" stroke-dasharray="8 8" opacity="0.3"/>
    <!-- Spokes -->
    <line x1="0" y1="${rp1 * 0.15}" x2="0" y2="${rp1 * 0.6}" opacity="0.3"/>
    <line x1="0" y1="${-rp1 * 0.15}" x2="0" y2="${-rp1 * 0.6}" opacity="0.3"/>
    <line x1="${rp1 * 0.15}" y1="0" x2="${rp1 * 0.6}" y2="0" opacity="0.3"/>
    <line x1="${-rp1 * 0.15}" y1="0" x2="${-rp1 * 0.6}" y2="0" opacity="0.3"/>
    <!-- Teeth -->
    <path d="${path1}" />
</svg>`;

const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="${rp2*2.5}" height="${rp2*2.5}" viewBox="${-rp2*1.2} ${-rp2*1.2} ${rp2*2.4} ${rp2*2.4}" fill="none" stroke="var(--text-secondary)" stroke-width="2" class="gear-small" style="position: absolute; bottom: 0px; left: -100px; opacity: 0.3;">
    <circle cx="0" cy="0" r="${rp2 * 0.2}" stroke-width="2"/>
    <path d="${path2}" />
</svg>`;

fs.writeFileSync('gears_output.txt', svg1 + '\n\n' + svg2);
console.log("Wrote SVGs to gears_output.txt");
