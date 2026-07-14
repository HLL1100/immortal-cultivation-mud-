# 修仙传 - Git上传脚本 (PowerShell)
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   修仙传 - Git上传脚本" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 检查git是否安装
try {
    $gitVersion = git --version 2>$null
    Write-Host "Git版本: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "错误：Git未安装！" -ForegroundColor Red
    Write-Host "请先下载安装Git：https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "按回车键退出"
    exit 1
}

# 输入GitHub用户名
$GITHUB_USER = Read-Host "请输入你的GitHub用户名"

# 输入仓库名
$REPO_NAME = Read-Host "请输入仓库名称（如 immortal-cultivation-mud）"

if ([string]::IsNullOrWhiteSpace($GITHUB_USER)) {
    Write-Host "错误：GitHub用户名不能为空！" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

if ([string]::IsNullOrWhiteSpace($REPO_NAME)) {
    Write-Host "错误：仓库名称不能为空！" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}

Write-Host ""
Write-Host "正在初始化Git仓库..." -ForegroundColor Yellow
git init

Write-Host ""
Write-Host "正在添加所有文件..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "正在提交..." -ForegroundColor Yellow
git commit -m "修仙传游戏初始版本"

Write-Host ""
Write-Host "正在创建main分支..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "正在连接远程仓库..." -ForegroundColor Yellow
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

Write-Host ""
Write-Host "正在推送到GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "   上传完成！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "请按以下步骤启用GitHub Pages：" -ForegroundColor Cyan
Write-Host "1. 打开 https://github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor White
Write-Host "2. 点击 Settings -> Pages" -ForegroundColor White
Write-Host "3. Source 选择 \"GitHub Actions\"" -ForegroundColor White
Write-Host "4. 等待1-2分钟自动部署" -ForegroundColor White
Write-Host ""
Write-Host "部署完成后，手机访问：" -ForegroundColor Green
Write-Host "https://$GITHUB_USER.github.io/$REPO_NAME/" -ForegroundColor Yellow
Write-Host ""
Read-Host "按回车键退出"