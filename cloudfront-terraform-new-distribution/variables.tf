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
