terraform {
  required_version = ">=1.5"
}

# Latest single-backend Fastly Compute proxy integration deployed via the
# Terraform module on `main`:
# https://github.com/fingerprintjs/terraform-fastly-compute-fingerprint-proxy-integration
#
# Both services are created empty via the Fastly API first, then imported and
# configured by this module (per docs PR #289). The locally built `main`
# package is placed in ./assets and used with download_asset = false, because
# the latest GitHub release is stale (v0.3.1 / v0.4.0-rc.0 prerelease) and does
# not contain the single-backend code.

# Provide the token out-of-band, never in source. This repo is public:
#   export TF_VAR_fastly_api_token=<your global-scope Fastly API token>
# (or a gitignored *.auto.tfvars file).
variable "fastly_api_token" {
  type      = string
  nullable  = false
  sensitive = true
}

# US subscription (SUBS.openResponse) -> region "us" -> api.fpjs.io
module "fingerprint_us" {
  source                     = "github.com/fingerprintjs/terraform-fastly-compute-fingerprint-proxy-integration"
  fastly_api_token           = var.fastly_api_token
  integration_domain         = "crisp-walnut-harbor.edgecompute.app"
  service_id                 = "hvP0tc7uht2CZfUdLfpiUN"
  integration_name           = "fingerprint-fastly-compute-terraform-us"
  region                     = "us"
  download_asset             = false
  agent_script_download_path = "agent"
  get_result_path            = "result"
}

# EU subscription (SUBS.main) -> region "eu" -> eu.api.fpjs.io
module "fingerprint_eu" {
  source                     = "github.com/fingerprintjs/terraform-fastly-compute-fingerprint-proxy-integration"
  fastly_api_token           = var.fastly_api_token
  integration_domain         = "mellow-cedar-meadow.edgecompute.app"
  service_id                 = "YUrRol6y49g4Tmet6pcxWp"
  integration_name           = "fingerprint-fastly-compute-terraform-eu"
  region                     = "eu"
  download_asset             = false
  agent_script_download_path = "agent"
  get_result_path            = "result"
}
