    terraform {
        required_version = ">=1.5"
    }

    module "fingerprint_fastly_compute_integration" {
        source                     = "github.com/fingerprintjs/temp-fastly-compute-terraform"
        fastly_api_token           = "X-pX7iQ4xMJ-4T_OYddQf4a0_dWRURvb"
        integration_domain         = "fastly-compute-tf.jurajuhlar.com"
        service_id                 = "52FYzRcQKQzSdcd1MZ7v0M"
        integration_name           = "fingerprint-fastly-compute-terraform-test"
        download_asset             = false
        agent_script_download_path = "agent"
        get_result_path            = "result"
    }