@echo off
chcp 65001 > nul
title VUI HOC TOAN - SERVER & OPEN DOMAIN

echo ==========================================================
echo    🎓 WEB APP: VUI HOC TOAN (TOAN 6 - 7 KNTT)
echo    🔒 GEMINI 3.6 FLASH SECURED BACKEND
echo    🌐 KHOI DONG SERVER VA TAO DUONG LINK CONG KHAI CHO BAN BE
echo ==========================================================
echo.

cd /d "%~dp0"

echo [1/2] Dang mo may chu Backend bao mat API Key tai http://localhost:3000 ...
start "Backend Server (PowerShell)" powershell -ExecutionPolicy Bypass -NoExit -File "%~dp0server.ps1"

timeout /t 2 > nul

echo [2/2] Dang tao duong link Open Domain HTTPS cong khai...
start "Public Open Tunnel" powershell -ExecutionPolicy Bypass -NoExit -File "%~dp0start_public_tunnel.ps1"

timeout /t 3 > nul

echo.
echo ==========================================================
echo  🎉 MAY CHU DA HOAT DONG!
echo  - Link cuc bo tren may ban: http://localhost:3000
echo  - Link Open Domain (de gui ban be): Xem trong cua so "Public Open Tunnel"
echo    (Dang: https://xxxxx.trycloudflare.com)
echo ==========================================================
echo.

start http://localhost:3000
pause
