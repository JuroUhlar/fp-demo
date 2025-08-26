
provider "aws" {
  region = "us-east-1"
}

locals {
  fpjs_agent_download_path = "agent"
  fpjs_get_result_path     = "result"

  // Staging main
  fpjs_pre_shared_secret       = "CsDzNeF6FL02q7B07MFs"
  fpjs_cdn_url_override           = "procdn.fpjs.sh"
  fpjs_ingress_base_host_override = "api.stage.fpjs.sh"
}

module "fingerprint_cloudfront_integration" {
  source = "fingerprintjs/fingerprint-cloudfront-proxy-integration/aws"

  fpjs_agent_download_path = local.fpjs_agent_download_path
  fpjs_get_result_path     = local.fpjs_get_result_path
  fpjs_shared_secret       = local.fpjs_pre_shared_secret
}

resource "aws_cloudfront_distribution" "fpjs_cloudfront_distribution" {
  comment = "Proxy integration for staging (created via Terraform)"

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

  enabled = true

  http_version = "http1.1"

  price_class = "PriceClass_100"

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

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Overwrite the existing secret 
resource "aws_secretsmanager_secret_version" "updated_secret" {
  secret_id = module.fingerprint_cloudfront_integration.fpjs_secret_manager_arn

  secret_string = jsonencode({
    fpjs_agent_download_path = local.fpjs_agent_download_path
    fpjs_get_result_path     = local.fpjs_get_result_path
    fpjs_pre_shared_secret   = local.fpjs_pre_shared_secret
    FPJS_CDN_URL             = local.fpjs_cdn_url_override
    FPJS_INGRESS_BASE_HOST   = local.fpjs_ingress_base_host_override
  })
}
