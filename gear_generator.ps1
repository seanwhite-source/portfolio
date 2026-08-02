$teeth1 = 47
$teeth2 = 17
$m = 4

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
    return $path, $rp
}

$res1 = Get-GearPath $teeth1 $m
$path1 = $res1[0]
$rp1 = $res1[1]

$res2 = Get-GearPath $teeth2 $m
$path2 = $res2[0]
$rp2 = $res2[1]

$w1 = $rp1 * 2.2; $w2 = $rp2 * 2.2
$o1 = -$rp1 * 1.1; $o2 = -$rp2 * 1.1

$svg1 = "<svg xmlns=""http://www.w3.org/2000/svg"" width=""250"" height=""250"" viewBox=""$o1 $o1 $w1 $w1"" fill=""none"" stroke=""var(--accent-color)"" stroke-width=""2"" class=""gear-large"">`n"
$svg1 += "    <circle cx=""0"" cy=""0"" r=""$($rp1 * 0.15)"" stroke-width=""2""/>`n"
$svg1 += "    <circle cx=""0"" cy=""0"" r=""$($rp1 * 0.7)"" stroke-dasharray=""8 8"" opacity=""0.3""/>`n"
$svg1 += "    <path d=""$path1"" />`n</svg>"

$svg2 = "<svg xmlns=""http://www.w3.org/2000/svg"" width=""90"" height=""90"" viewBox=""$o2 $o2 $w2 $w2"" fill=""none"" stroke=""var(--text-secondary)"" stroke-width=""2"" class=""gear-small"">`n"
$svg2 += "    <circle cx=""0"" cy=""0"" r=""$($rp2 * 0.2)"" stroke-width=""2""/>`n"
$svg2 += "    <path d=""$path2"" />`n</svg>"

Set-Content -Path "gears_output.txt" -Value "$svg1`n`n$svg2"
