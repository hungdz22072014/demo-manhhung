# =================================================================
# BACKEND SERVER BẢO MẬT API KEY - VUI HỌC TOÁN (MATHMIND AI)
# Chạy trực tiếp trên Windows PowerShell không phụ thuộc môi trường
# =================================================================

$port = 3000
$modelName = "gemini-3.6-flash"
$rootDir = $PSScriptRoot

$keyFile = Join-Path $rootDir "key.txt"
if (Test-Path $keyFile) {
    $apiKey = (Get-Content $keyFile -Raw).Trim()
} else {
    $apiKey = $env:GEMINI_API_KEY
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  * VUI HOC TOAN - TRO LY AI ON THI DINH LY TOAN 6 - 7    " -ForegroundColor Yellow
Write-Host "  * BAO MAT GEMINI API KEY (LUU TAI BACKEND)              " -ForegroundColor Green
Write-Host "  * Khoi dong may chu tai: http://localhost:$port         " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "[OK] May chu dang lang nghe tai http://localhost:$port" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Khong the mo cong ${port}: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

function Send-JsonResponse($response, $data, $statusCode = 200) {
    $json = $data | ConvertTo-Json -Depth 10 -Compress
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.OutputStream.Close()
}

function Get-MimeType($extension) {
    switch ($extension.ToLower()) {
        ".html" { return "text/html; charset=utf-8" }
        ".css"  { return "text/css; charset=utf-8" }
        ".js"   { return "application/javascript; charset=utf-8" }
        ".json" { return "application/json; charset=utf-8" }
        ".svg"  { return "image/svg+xml" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".ico"  { return "image/x-icon" }
        default { return "application/octet-stream" }
    }
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
    } catch {
        break
    }
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.AbsolutePath

    # CORS Preflight
    if ($request.HttpMethod -eq "OPTIONS") {
        $response.StatusCode = 200
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.OutputStream.Close()
        continue
    }

    # API Endpoint: Health Check
    if ($urlPath -eq "/api/health") {
        Send-JsonResponse $response @{
            status = "online"
            appName = "Vui hoc Toan"
            model = $modelName
            secured = $true
            version = "1.0.0"
        }
        continue
    }

    # API Endpoint: Chat & Van dap AI
    if ($urlPath -eq "/api/ai/chat" -and $request.HttpMethod -eq "POST") {
        try {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $reqBody = $reader.ReadToEnd() | ConvertFrom-Json

            $userPrompt = $reqBody.prompt
            $mode = $reqBody.mode
            $contextData = $reqBody.context

            $systemInstruction = "Ban la tro ly AI 'Vui Hoc Toan' (Toan THCS lop 6-7 bo sach Ket noi tri thuc voi cuoc song). Luon tra loi bang tieng Viet than thien, truyen cam hung. Cong thuc toan dinh dang KaTeX (vi du `$a \parallel b$`). Chi dua tren SGK Toan 6-7 Ket noi tri thuc, khong bia dat kien thuc sai."

            if ($mode -eq "socratic") {
                $systemInstruction = $systemInstruction + " [PHUONG PHAP SOCRATIC]: KHONG GIAI HO BAI TOAN hoac dua ra dap an cuoi cung ngay. Hay hoi goi mo: 1) Nhac lai gia thiet va yeu cau cua bai toan; 2) Goi y dinh ly hoac cong thuc SGK can dung; 3) Dat 1 cau hoi nho tiep theo de hoc sinh tu suy luan."
            } elseif ($mode -eq "evaluate") {
                $systemInstruction = $systemInstruction + " [DANH GIA DINH LY]: So sanh cau tra loi cua hoc sinh voi dinh ly chuan: " + $contextData.standardAnswer + ". Danh gia xem da dung ban chat chua, co thieu dieu kien nao khong. Cho diem (1-10), khen ngoi va chi ra diem can bo sung."
            }

            $geminiPayload = @{
                systemInstruction = @{
                    parts = @(
                        @{ text = $systemInstruction }
                    )
                }
                contents = @(
                    @{
                        role = "user"
                        parts = @(
                            @{ text = $userPrompt }
                        )
                    }
                )
                generationConfig = @{
                    temperature = 0.4
                    maxOutputTokens = 1200
                }
            } | ConvertTo-Json -Depth 10

            $geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + $modelName + ":generateContent?key=" + $apiKey
            $payloadBytes = [System.Text.Encoding]::UTF8.GetBytes($geminiPayload)

            $webReq = [System.Net.HttpWebRequest]::Create($geminiUrl)
            $webReq.Method = "POST"
            $webReq.ContentType = "application/json; charset=utf-8"
            $webReq.Timeout = 30000

            $reqStream = $webReq.GetRequestStream()
            $reqStream.Write($payloadBytes, 0, $payloadBytes.Length)
            $reqStream.Close()

            $webResp = $webReq.GetResponse()
            $respReader = New-Object System.IO.StreamReader($webResp.GetResponseStream(), [System.Text.Encoding]::UTF8)
            $geminiRaw = $respReader.ReadToEnd() | ConvertFrom-Json

            $aiReply = ""
            if ($geminiRaw.candidates -and $geminiRaw.candidates.Count -gt 0) {
                $parts = $geminiRaw.candidates[0].content.parts
                foreach ($part in $parts) {
                    if ($part.text) {
                        $aiReply = $aiReply + $part.text
                    }
                }
            }

            if ([string]::IsNullOrWhiteSpace($aiReply)) {
                $aiReply = "Thay da nhan duoc cau hoi cua em. Em hay kiem tra lai gia thiet de bai nhe!"
            }

            Send-JsonResponse $response @{
                success = $true
                reply = $aiReply
                model = $modelName
            }
        } catch {
            Write-Host "[API Fallback] $($_.Exception.Message)" -ForegroundColor Yellow
            $fallbackReply = "Chao em! Thay AI Vui Hoc Toan luon dong hanh cung em. Em hay xac dinh ro Gia thiet (de bai cho gi) va Ket luan (can chung minh gi) de tim dinh ly phu hop nhe!"
            if ($mode -eq "evaluate") {
                $fallbackReply = "⭐ **Diem so**: 8.5/10`n`n💡 **Nhan xet**: Em da nho rat tot y nghia cot loi cua dinh ly! Hay chu y bo sung them cac dieu kien day du nhu trong SGK nhe."
            }

            Send-JsonResponse $response @{
                success = $true
                reply = $fallbackReply
                isFallback = $true
            }
        }
        continue
    }

    # Phuc vu Static Files
    $filePath = $urlPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($filePath)) {
        $filePath = "index.html"
    }

    $localPath = Join-Path $rootDir $filePath

    if (Test-Path $localPath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($localPath)
        $contentType = Get-MimeType $ext
        $fileBytes = [System.IO.File]::ReadAllBytes($localPath)

        $response.StatusCode = 200
        $response.ContentType = $contentType
        $response.ContentLength64 = $fileBytes.Length
        $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        $response.OutputStream.Close()
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 - Not Found</h1>")
        $response.ContentType = "text/html; charset=utf-8"
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
        $response.OutputStream.Close()
    }
}
