locals {
  fpcdn_origin_id = "fpcdn.io"
}

resource "aws_cloudfront_distribution" "fpjs_cloudfront_distribution" {
  comment = "Fingerprint distribution (created via Terraform)"

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

  enabled = true

  http_version = "http1.1"

  price_class = "PriceClass_100"

  default_cache_behavior {
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

  # viewer_certificate {
  #   cloudfront_default_certificate = true
  # }

  aliases = ["cloudfront-via-terraform.juraj.click"]

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:013357491684:certificate/c3ffee8c-071b-4ff8-bec2-e222eff602bc"
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}


# Make the distribution avaialable on a subdomain of juraj.click
# Todo use a variable for the subdomain

resource "aws_route53_record" "cloudfront_terraform_new_distribution_record" {
  zone_id = "Z01869442YM5PGH51JDVA"
  name    = "cloudfront-via-terraform.juraj.click"
  type    = "CNAME"
  ttl     = 300
  records = [aws_cloudfront_distribution.fpjs_cloudfront_distribution.domain_name]
}
