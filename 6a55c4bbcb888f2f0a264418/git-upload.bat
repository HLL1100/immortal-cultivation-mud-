@echo off
chcp 65001 >nul
echo =========================================
echo   修仙传 - Git上传脚本
echo =========================================
echo.

REM 检查git是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo 错误：Git未安装！
    echo 请先下载安装Git：https://git-scm.com/download/win
    pause
    exit /b 1
)

REM 输入GitHub用户名
echo 请输入你的GitHub用户名：
set /p GITHUB_USER=

REM 输入仓库名
echo 请输入仓库名称（如 immortal-cultivation-mud）：
set /p REPO_NAME=

if "%GITHUB_USER%"=="" (
    echo 错误：GitHub用户名不能为空！
    pause
    exit /b 1
)

if "%REPO_NAME%"=="" (
    echo 错误：仓库名称不能为空！
    pause
    exit /b 1
)

echo.
echo 正在初始化Git仓库...
git init

echo.
echo 正在添加所有文件...
git add .

echo.
echo 正在提交...
git commit -m "修仙传游戏初始版本"

echo.
echo 正在创建main分支...
git branch -M main

echo.
echo 正在连接远程仓库...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo.
echo 正在推送到GitHub...
git push -u origin main

echo.
echo =========================================
echo   上传完成！
echo =========================================
echo.
echo 请按以下步骤启用GitHub Pages：
echo 1. 打开 https://github.com/%GITHUB_USER%/%REPO_NAME%
echo 2. 点击 Settings -> Pages
echo 3. Source 选择 "GitHub Actions"
echo 4. 等待1-2分钟自动部署
echo.
echo 部署完成后，手机访问：
echo https://%GITHUB_USER%.github.io/%REPO_NAME%/
echo.
pause