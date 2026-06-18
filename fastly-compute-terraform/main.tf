    terraform {
        required_version = ">=1.5"
    }

    # Provide the token out-of-band, never in source (this repo is public):
    #   export TF_VAR_fastly_api_token=<your global-scope Fastly API token>
    variable "fastly_api_token" {
        type      = string
        nullable  = false
        sensitive = true
    }

    module "fingerprint_fastly_compute_integration" {
        source                     = "github.com/fingerprintjs/temp-fastly-compute-terraform"
        fastly_api_token           = var.fastly_api_token
        integration_domain         = "fastly-compute-tf.jurajuhlar.com"
        service_id                 = "52FYzRcQKQzSdcd1MZ7v0M"
        integration_name           = "fingerprint-fastly-compute-terraform-test"
        download_asset             = false
        agent_script_download_path = "agent"
        get_result_path            = "result"
    }