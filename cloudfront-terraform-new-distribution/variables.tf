variable "proxy_secret" {
  description = "The proxy secret for the Fingerprint proxy integration"
  type        = string
}

variable "subdomain" {
  description = "The subdomain for the CloudFront distribution"
  type        = string
  default     = "cloudfront-via-terraform"
}

variable "root_domain" {
  description = "The root domain for the CloudFront distribution"
  type        = string
  default     = "juraj.click"
}
