terraform {
    required_version = ">=1.5"
}

module "fingerprint_fastly_vcl_integration" {
    source                     = "github.com/fingerprintjs/terraform-fastly-vcl-fingerprint-proxy-integration"
    fastly_api_token           = "c0RWGU6kBwcoTrszxhGfVMsOTM76Mvub"
    integration_domain         = "fastly-vcl-default.environment.test"
    integration_name           = "fastly-vcl-staging-default-env"
    agent_script_download_path = "agent"
    get_result_path            = "result"
    integration_path           = "fpjs"
    main_host                  = "fastly-vcl-default.environment.test"
    proxy_secret               = "6pGAkeCcldUf3CkrdHgt" // default environment
    manage_fastly_dictionary_items = true
    download_asset = false
    vcl_asset_name = "fingerprint-pro-fastly-vcl-integration-staging.vcl"
}