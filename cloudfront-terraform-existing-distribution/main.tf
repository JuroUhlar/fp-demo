# Configure the AWS Provide
# Create CloudFront distribution
resource "aws_cloudfront_distribution" "main_website_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for cloudfrontterraform.netlify.app"
  default_root_object = "index.html"

  origin {
    domain_name = "cloudfrontterraform.netlify.app"
    origin_id   = "netlify-website"

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
    target_origin_id = "netlify-website"

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

  aliases = ["${var.subdomain}.${var.root_domain}"]

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:013357491684:certificate/c3ffee8c-071b-4ff8-bec2-e222eff602bc"
    ssl_support_method  = "sni-only"
  }




  #region Fingerprint CloudFront Integration start
  origin {
    domain_name = "fpcdn.io"
    origin_id   = local.fpcdn_origin_id
    custom_origin_config {
      origin_protocol_policy = "https-only"
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
    }
    custom_header {
      name  = "FPJS_SECRET_NAME"
      value = module.fingerprint_cloudfront_integration.fpjs_secret_manager_arn
    }
  }

  ordered_cache_behavior {
    path_pattern = "fpjs/*"

    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = module.fingerprint_cloudfront_integration.fpjs_cache_policy_id
    origin_request_policy_id = "216adef6-5c7f-47e4-b989-5492eafa07d3" # Default AllViewer policy
    target_origin_id         = local.fpcdn_origin_id
    viewer_protocol_policy   = "https-only"
    compress                 = true

    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = module.fingerprint_cloudfront_integration.fpjs_proxy_lambda_arn
      include_body = true
    }
  }
  #endregion
}

# Make the distribution avaialable on a subdomain of juraj.click
resource "aws_route53_record" "cloudfront_terraform_existing_distribution_record" {
  zone_id = "Z01869442YM5PGH51JDVA"
  name    = "${var.subdomain}.${var.root_domain}"
  type    = "CNAME"
  ttl     = 300
  records = [aws_cloudfront_distribution.main_website_distribution.domain_name]
}


# Output the CloudFront domain name
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.main_website_distribution.domain_name
}
