$t1 = 47
$t2 = 17
$m = 4

$rp1 = ($t1 * $m) / 2.0
$rp2 = ($t2 * $m) / 2.0

$cx1 = 120.0
$cy1 = -80.0

$cx2 = -120.0
$cy2 = 80.0

$dx = $cx2 - $cx1
$dy = $cy2 - $cy1
$dist = [Math]::Sqrt($dx*$dx + $dy*$dy)

$angle = [Math]::Atan2($dy, $dx)

$alpha = [Math]::Asin(($rp1 - $rp2) / $dist)

$theta1 = $angle - [Math]::PI/2 + $alpha
$theta2 = $angle + [Math]::PI/2 - $alpha

$pt1x = $cx1 + $rp1 * [Math]::Cos($theta1)
$pt1y = $cy1 + $rp1 * [Math]::Sin($theta1)

$pt2x = $cx2 + $rp2 * [Math]::Cos($theta1)
$pt2y = $cy2 + $rp2 * [Math]::Sin($theta1)

$pt3x = $cx2 + $rp2 * [Math]::Cos($theta2)
$pt3y = $cy2 + $rp2 * [Math]::Sin($theta2)

$pt4x = $cx1 + $rp1 * [Math]::Cos($theta2)
$pt4y = $cy1 + $rp1 * [Math]::Sin($theta2)

# SVG Path for Chain
# Start at pt1
$chainPath = "M $([math]::Round($pt1x, 2)) $([math]::Round($pt1y, 2)) "
# Line to pt2
$chainPath += "L $([math]::Round($pt2x, 2)) $([math]::Round($pt2y, 2)) "
# Arc to pt3 (small arc, clockwise)
$chainPath += "A $([math]::Round($rp2, 2)) $([math]::Round($rp2, 2)) 0 0 1 $([math]::Round($pt3x, 2)) $([math]::Round($pt3y, 2)) "
# Line to pt4
$chainPath += "L $([math]::Round($pt4x, 2)) $([math]::Round($pt4y, 2)) "
# Arc to pt1 (large arc, clockwise)
$chainPath += "A $([math]::Round($rp1, 2)) $([math]::Round($rp1, 2)) 0 1 1 $([math]::Round($pt1x, 2)) $([math]::Round($pt1y, 2))"

function Get-GearPath ($teeth, $module) {
    $rp = ($teeth * $module) / 2.0
    $ro = $rp + $module
    $ri = $rp - 1.25 * $module
    $anglePerTooth = (2 * [Math]::PI) / $teeth
    
    $path = ""
    for ($i=0; $i -lt $teeth; $i++) {
        $a0 = $i * $anglePerTooth
        $a1 = $a0 + $anglePerTooth * 0.15
        $a2 = $a0 + $anglePerTooth * 0.35
        $a3 = $a0 + $anglePerTooth * 0.65
        $a4 = $a0 + $anglePerTooth * 0.85
        $a5 = $a0 + $anglePerTooth
        
        $px1 = [Math]::Cos($a1) * $ri; $py1 = [Math]::Sin($a1) * $ri
        $px2 = [Math]::Cos($a2) * $ro; $py2 = [Math]::Sin($a2) * $ro
        $px3 = [Math]::Cos($a3) * $ro; $py3 = [Math]::Sin($a3) * $ro
        $px4 = [Math]::Cos($a4) * $ri; $py4 = [Math]::Sin($a4) * $ri
        $px5 = [Math]::Cos($a5) * $ri; $py5 = [Math]::Sin($a5) * $ri
        
        if ($i -eq 0) {
            $startX = [Math]::Cos($a0) * $ri
            $startY = [Math]::Sin($a0) * $ri
            $path += "M $([math]::Round($startX, 2)) $([math]::Round($startY, 2)) "
        }
        $path += "A $([math]::Round($ri, 2)) $([math]::Round($ri, 2)) 0 0 1 $([math]::Round($px1, 2)) $([math]::Round($py1, 2)) "
        $path += "L $([math]::Round($px2, 2)) $([math]::Round($py2, 2)) "
        $path += "A $([math]::Round($ro, 2)) $([math]::Round($ro, 2)) 0 0 1 $([math]::Round($px3, 2)) $([math]::Round($py3, 2)) "
        $path += "L $([math]::Round($px4, 2)) $([math]::Round($py4, 2)) "
        $path += "A $([math]::Round($ri, 2)) $([math]::Round($ri, 2)) 0 0 1 $([math]::Round($px5, 2)) $([math]::Round($py5, 2)) "
    }
    $path += "Z"
    return $path
}

$path1 = Get-GearPath $t1 $m
$path2 = Get-GearPath $t2 $m

# SVG Construction
$svg = "<svg xmlns=""http://www.w3.org/2000/svg"" width=""400"" height=""400"" viewBox=""-220 -220 440 440"" fill=""none"" class=""gear-assembly"">`n"

# Chain
$svg += "    <!-- Chain -->`n"
$svg += "    <path d=""$chainPath"" stroke=""var(--text-secondary)"" stroke-width=""4"" stroke-dasharray=""8 4"" class=""chain-path"" opacity=""0.4"" />`n"

# Gear 1
$svg += "    <!-- Large Gear -->`n"
$svg += "    <g transform=""translate($cx1, $cy1)"" stroke=""var(--accent-color)"" stroke-width=""2"" opacity=""0.6"">`n"
$svg += "        <circle cx=""0"" cy=""0"" r=""$($rp1 * 0.15)"" stroke-width=""2""/>`n"
$svg += "        <circle cx=""0"" cy=""0"" r=""$($rp1 * 0.7)"" stroke-dasharray=""8 8"" opacity=""0.3""/>`n"
$svg += "        <path d=""$path1"">`n"
$svg += "            <animateTransform attributeName=""transform"" type=""rotate"" from=""0 0 0"" to=""360 0 0"" dur=""47s"" repeatCount=""indefinite"" />`n"
$svg += "        </path>`n"
$svg += "    </g>`n"

# Gear 2
$svg += "    <!-- Small Gear -->`n"
$svg += "    <g transform=""translate($cx2, $cy2)"" stroke=""var(--text-secondary)"" stroke-width=""2"" opacity=""0.5"">`n"
$svg += "        <circle cx=""0"" cy=""0"" r=""$($rp2 * 0.2)"" stroke-width=""2""/>`n"
$svg += "        <path d=""$path2"">`n"
$svg += "            <animateTransform attributeName=""transform"" type=""rotate"" from=""0 0 0"" to=""360 0 0"" dur=""17s"" repeatCount=""indefinite"" />`n"
$svg += "        </path>`n"
$svg += "    </g>`n"

$svg += "</svg>"

Set-Content -Path "chain_generator.txt" -Value $svg
