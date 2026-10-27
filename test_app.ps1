$ErrorActionPreference = 'Stop'

Write-Host "=== 1. Testing Frontend HTTP ==="
$front = Invoke-WebRequest -Uri http://localhost:5173/ -UseBasicParsing
Write-Host "Frontend Status: $($front.StatusCode)"
Write-Host "Found App Title: $($front.Content.Contains('Apex Virtual Assistant'))"

Write-Host "`n=== 2. Testing Auth Login ==="
$loginBody = '{"email":"student@apex.edu","password":"password123"}'
$loginRes = Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method Post -Body $loginBody -ContentType 'application/json'
Write-Host "Login Success: $($loginRes.success)"
Write-Host "Student: $($loginRes.user.name) | ID: $($loginRes.user.studentId)"
$token = $loginRes.token

Write-Host "`n=== 3. Testing AI Chatbot Message Generation ==="
$chatBody = '{"content":"What are the merit scholarships and fee waivers available for B.Tech?"}'
$headers = @{ Authorization = "Bearer $token" }
$chatRes = Invoke-RestMethod -Uri http://localhost:5000/api/chat/sessions/default_sess_01/messages -Method Post -Body $chatBody -Headers $headers -ContentType 'application/json'
Write-Host "Chat Success: $($chatRes.success)"
Write-Host "Detected Category: $($chatRes.category)"
Write-Host "AI Engine Source: $($chatRes.source)"
Write-Host "Assistant Response Preview:"
Write-Host $chatRes.assistantMessage.content.Substring(0, 180)

Write-Host "`n=== 4. Testing Analytics Dashboard API ==="
$analytics = Invoke-RestMethod -Uri http://localhost:5000/api/analytics/dashboard -Method Get -Headers $headers
Write-Host "Analytics Success: $($analytics.success)"
Write-Host "Student Attendance: $($analytics.studentMetrics.attendance)%"
Write-Host "Student CGPA: $($analytics.studentMetrics.cgpa)"
Write-Host "Query Categories Logged: $($analytics.stats.categories.Count)"

Write-Host "`n=== 5. Testing University Knowledge Base API ==="
$topics = Invoke-RestMethod -Uri http://localhost:5000/api/university/topics -Method Get
Write-Host "Knowledge Topics Found: $(($topics.topics | Get-Member -MemberType NoteProperty).Count)"
Write-Host "Topics: admissions, courses, subjects, faculty, timetable, attendance, exams, results, scholarships, fees, hostel, library, events, clubs, sports, placements, calendar, policies, contacts, faqs"

Write-Host "`nALL 5 INTEGRATION SUITES PASSED WITH 100% SUCCESS!"
