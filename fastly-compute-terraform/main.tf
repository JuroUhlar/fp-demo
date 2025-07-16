    terraform {
        required_version = ">=1.5"
    }
    
    module "fingerprint_fastly_compute_integration" {
        source                     = "github.com/fingerprintjs/temp-fastly-compute-terraform"
        fastly_api_key             = "X-pX7iQ4xMJ-4T_OYddQf4a0_dWRURvb"
        integration_domain         = "fastly-compute.jurajuhlar.eu"
        service_id                 = "qpRIe1OIuDfIMijt5udzL1"
        agent_script_download_path = "agent"
        get_result_path            = "result"
    }