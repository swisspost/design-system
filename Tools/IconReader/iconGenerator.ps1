$svgTemplate = "
`$svg-pi-{0}-name: `"{0}`";{1}
`$svg-pi-{0}-path: `"{2}`";
`$svg-icon-map: map.merge((`$svg-pi-{0}-name: `$svg-pi-{0}-path), `$svg-icon-map);"

$date = Get-Date -Format "yyyyMMdd_HHmm"
$outfile = "./icons-$date.txt"

foreach ($svgFile in get-ChildItem icons/*.svg) {

$svgFilename = $svgFile.Name
if ($svgFilename.Contains(" (1)")) {
    continue
}
$svgNumber = $svgFilename.Split("_")[0].Split(".")[0];
$svgDescription = "";

if ($svgNumber -notmatch "\d{4}") {
    $svgDescription = " // $svgNumber"
    $svgNumber = "9999"
}
$svgFilepath = "./icons/$svgFilename"

$svgPath = (Get-Content -Path $svgFilepath -ReadCount 0) -join "`n"

if ($svgPath.Contains("st0{fill:none")) {
    $svgPath = $svgPath -replace "<.* class=`"st0`".*>", ""
}
if ($svgPath.Contains("fill=`"none`"")) {
    $svgPath = $svgPath -replace "<.* fill=`"none`".*>", ""
}

$svgPath = $svgPath.Replace("`t", " ")
$svgPath = $svgPath.Replace("`n", " ")
$svgPath = $svgPath.Replace("`"", "`'")
$svgPath = $svgPath -replace "<!--.*-->",""
$svgPath = $svgPath -replace "<\?xml.*\?>",""
$svgPath = $svgPath -replace "<title.*/title>",""
$svgPath = $svgPath -replace "</?g>",""
$svgPath = $svgPath -replace "(^.+</style> ?)", ""
$svgPath = $svgPath -replace "> +<", "><"
$svgPath = $svgPath -replace "  +", " "
$svgPath = $svgPath -replace "'> ?</path> ?</svg>", ""
$svgPath = $svgPath -replace "'/> ?</svg>", "'/><path d='"
$svgPath = $svgPath -replace " ?class='st\d' ?", " "
$svgPath = $svgPath -replace " fill='.*' d=", " d="

if ($svgPath.Contains("<svg")) {
    $svgPath = $svgPath -replace "<svg .*(preserve|32)'>", ""
}

$svgPath = $svgPath.Trim()

if (!$svgPath.StartsWith("<path")) {
    $svgPath = "'></path>" + $svgPath
} else {
    $svgPath = $svgPath.Substring(9)
}

$svgPath = $svgPath.Replace(">", "%3E")
$svgPath = $svgPath.Replace("<", "%3C")

if ($svgNumber -eq "3221") {
    $svgPath = "M30.7,19.4l-5.7-0.8l-2.6-5.2l-2.6,5.2l-5.7,0.8l4.1,4l-1,5.7l5.1-2.7l5.1,2.7l-1-5.7L30.7,19.4z M23,25.2 l-0.6-0.3l-0.6,0.3L19,26.7l0.5-3l0.1-0.7l-0.5-0.5l-2.2-2.2l3.1-0.4l0.7-0.1l0.3-0.6l1.4-2.8l1.4,2.8l0.3,0.6l0.7,0.1l3.1,0.4 l-2.2,2.2l-0.5,0.5l0.1,0.7l0.5,3L23,25.2z M17.3,10c0-4-3.3-7.3-7.3-7.3C6,2.7,2.7,6,2.7,10c0,1.3,0.3,2.6,1,3.7l6.3,11l6.3-11 C17,12.6,17.3,11.3,17.3,10z M15.2,13L10,22l-5.2-9c-0.5-0.9-0.8-2-0.8-3c0-3.3,2.7-6,6-6c3.3,0,6,2.7,6,6 C16,11.1,15.7,12.1,15.2,13z M10,7.3c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7s2.7-1.2,2.7-2.7S11.5,7.3,10,7.3z M10,11.3 c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C11.3,10.7,10.7,11.3,10,11.3z"
}

$value = "$svgTemplate" -f $svgNumber, $svgDescription, $svgPath
Add-Content -Path $outfile -Value $value
}

