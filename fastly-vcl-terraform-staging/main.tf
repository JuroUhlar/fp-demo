terraform {
    required_version = ">=1.5"
}

module "fingerprint_fastly_vcl_integration" {
    source                     = "github.com/fingerprintjs/terraform-fastly-vcl-fingerprint-proxy-integration"
    fastly_api_token           = "c0RWGU6kBwcoTrszxhGfVMsOTM76Mvub"
    integration_domain         = "fastly-vcl.environment.test"
    agent_script_download_path = "agent"
    get_result_path            = "result"
    integration_path           = "fpjs"
    main_host                  = "fastly-vcl.environment.test"
    proxy_secret               = "P3UFpDPCHgBYN4HNHeIn"
    manage_fastly_dictionary_items = true
    download_asset = false
    vcl_asset_name = "fingerprint-pro-fastly-vcl-integration-staging.vcl"
}