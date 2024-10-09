terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.57"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}


module "fingerprint_cloudfront_integration" {
  source = "fingerprintjs/fingerprint-cloudfront-proxy-integration/aws"

  fpjs_agent_download_path = "agent"
  fpjs_get_result_path     = "result"
  fpjs_shared_secret       = "GX3UybSIs0PDQ9fywL2e"

  // Replaced this with the code above
  # providers = {
  #   aws = aws.us-east-1
  # }
}

resource "aws_cloudfront_distribution" "fpjs_cloudfront_distribution" {
  provider = aws
  comment = "Fingerprint proxy integration distribution (created via Terraform)"

  enabled = true

  price_class = "PriceClass_100"

  origin {
    domain_name = module.fingerprint_cloudfront_integration.fpjs_origin_name
    origin_id   = module.fingerprint_cloudfront_integration.fpjs_origin_id
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

  default_cache_behavior {
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = module.fingerprint_cloudfront_integration.fpjs_cache_policy_id
    origin_request_policy_id = module.fingerprint_cloudfront_integration.fpjs_origin_request_policy_id
    target_origin_id         = module.fingerprint_cloudfront_integration.fpjs_origin_id
    viewer_protocol_policy   = "https-only"
    compress                 = true

    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = module.fingerprint_cloudfront_integration.fpjs_proxy_lambda_arn
      include_body = true
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

    #   aliases = ["metrics.${data.aws_route53_zone.staging_bvnk_com.name}"]
    #   viewer_certificate {
    #     acm_certificate_arn = data.aws_acm_certificate.staging_bvnk_com.arn
    #     ssl_support_method  = "sni-only"
    #   }

    // Added this 
  viewer_certificate {
    cloudfront_default_certificate = true
  }

}


# resource "aws_route53_record" "cloudfront_terraform_new_distribution_record" {
#   zone_id = data.aws_route53_zone.staging_bvnk_com.zone_id
#   name    = "metrics.${data.aws_route53_zone.staging_bvnk_com.name}"
#   type    = "CNAME"
#   ttl     = 300
#   records = [aws_cloudfront_distribution.fpjs_cloudfront_distribution.domain_name]
# }