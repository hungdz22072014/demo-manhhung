# =================================================================
# SCRIPT KHOI TAO MIEN OPEN HTTPS CONG KHAI (CLOUDFLARE TUNNEL)
# =================================================================

$cloudflaredDir = Join-Path $PSScriptRoot "tools"
$cloudflaredPath = Join-Path $cloudflaredDir "cloudflared.exe"

if (!(Test-Path $cloudflaredPath)) {
    Write-Host "[!] Dang tu dong tai cong cu Cloudflare Tunnel..." -ForegroundColor Yellow
    if (!(Test-Path $cloudflaredDir)) { New-Item -ItemType Directory -Path $cloudflaredDir -Force | Out-Null }
    $cfUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
    Invoke-WebRequest -Uri $cfUrl -OutFile $cloudflaredPath -UseBasicParsing
    Write-Host "[OK] Da tai xong cloudflared.exe!" -ForegroundColor Green
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  * DANG TAO DUONG DAN OPEN DOMAIN HTTPS CONG KHAI...      " -ForegroundColor Yellow
Write-Host "  * Ban be co the truy cap truc tiep tren Dien thoai/PC    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

& $cloudflaredPath tunnel --url http://localhost:3000 --http-host-header "localhost:3000"
