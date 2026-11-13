# =======================================================================
# Automated AWS S3 & CloudFront Deployment Script (PowerShell)
# =======================================================================
# Usage:
#   $env:S3_BUCKET = "your-s3-bucket-name"
#   $env:CLOUDFRONT_DISTRIBUTION_ID = "your-distribution-id"
#   .\aws\deploy-s3.ps1
# =======================================================================

param (
  [string]$Bucket = $env:S3_BUCKET,
  [string]$DistributionId = $env:CLOUDFRONT_DISTRIBUTION_ID
)

if (-not $Bucket) {
  Write-Error "❌ Error: S3 Bucket name is required. Set `$env:S3_BUCKET or pass -Bucket 'your-bucket-name'."
  exit 1
}

Write-Host "🚀 Step 1: Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Error "Build failed. Aborting deployment."
  exit 1
}

Write-Host "📦 Step 2: Uploading hashed static assets to S3 (Cache: 1 Year Immutable)..." -ForegroundColor Cyan
aws s3 sync dist/assets "s3://$Bucket/assets" --delete --cache-control "public, max-age=31536000, immutable"

Write-Host "📄 Step 3: Uploading root documents (Cache: No-Cache / Must-Revalidate)..." -ForegroundColor Cyan
aws s3 sync dist "s3://$Bucket" --exclude "assets/*" --delete --cache-control "public, max-age=0, must-revalidate"

if ($DistributionId) {
  Write-Host "⚡ Step 4: Creating CloudFront cache invalidation for /*..." -ForegroundColor Cyan
  aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Host "✅ Deployment to AWS S3 & CloudFront completed successfully!" -ForegroundColor Green

