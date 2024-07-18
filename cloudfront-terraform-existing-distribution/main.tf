# Configure the AWS Provider
provider "aws" {
  region = "us-east-1" # CloudFront is a global service, but the API is in us-east-1
}

# Create CloudFront distribution
resource "aws_cloudfront_distribution" "jurajuhlar_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for jurajuhlar.eu"
  default_root_object = "index.html"

  origin {
    domain_name = "jurajuhlar.eu"
    origin_id   = "jurajuhlar-website"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "jurajuhlar-website"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Output the CloudFront domain name
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.jurajuhlar_distribution.domain_name
}
