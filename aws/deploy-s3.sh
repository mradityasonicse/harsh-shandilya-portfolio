#!/usr/bin/env bash
# =======================================================================
# Automated AWS S3 & CloudFront Deployment Script for Harsh Portfolio
# =======================================================================
# Usage:
#   export S3_BUCKET="your-s3-bucket-name"
#   export CLOUDFRONT_DISTRIBUTION_ID="your-distribution-id"
#   ./aws/deploy-s3.sh
# =======================================================================

set -e

if [ -z "$S3_BUCKET" ]; then
  echo "❌ Error: S3_BUCKET environment variable is not set."
  echo "   Run: export S3_BUCKET=\"your-s3-bucket-name\""
  exit 1
fi

echo "🚀 Step 1: Building production bundle..."
npm run build

echo "📦 Step 2: Uploading hashed static assets to S3 (Cache: 1 Year Immutable)..."
aws s3 sync dist/assets "s3://${S3_BUCKET}/assets" \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

echo "📄 Step 3: Uploading HTML documents, sitemap, and root assets (Cache: No-Cache / Must-Revalidate)..."
aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --exclude "assets/*" \
  --delete \
  --cache-control "public, max-age=0, must-revalidate"

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "⚡ Step 4: Creating CloudFront cache invalidation for /*..."
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "/*"
fi

echo "✅ Deployment to AWS S3 & CloudFront completed successfully!"

