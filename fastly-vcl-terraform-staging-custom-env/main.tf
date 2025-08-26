terraform {
    required_version = ">=1.5"
}

module "fingerprint_fastly_vcl_integration" {
    source                     = "github.com/fingerprintjs/terraform-fastly-vcl-fingerprint-proxy-integration"
    fastly_api_token           = "c0RWGU6kBwcoTrszxhGfVMsOTM76Mvub"
    integration_domain         = "fastly-vcl-custom.environment.test"
    integration_name           = "fastly-vcl-staging-custom-env"
    agent_script_download_path = "agent"
    get_result_path            = "result"
    integration_path           = "fpjs"
    main_host                  = "fastly-vcl-custom.environment.test"
    proxy_secret               = "MTcojQU3f3SgbMlxBRIl" // custom environment
    manage_fastly_dictionary_items = true
    download_asset = false
    vcl_asset_name = "fingerprint-pro-fastly-vcl-integration-staging.vcl"
}