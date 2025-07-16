terraform {
    required_version = ">=1.5"
}

module "fingerprint_fastly_vcl_integration" {
    source                     = "github.com/fingerprintjs/temp-fastly-vcl-terraform"
    fastly_api_key             = "c0RWGU6kBwcoTrszxhGfVMsOTM76Mvub"
    integration_domain         = "fastly-vcl.jurajuhlar.site"
    agent_script_download_path = "agent"
    get_result_path            = "result"
    integration_path           = "fpjs"
    main_host                  = "fastly-vcl.jurajuhlar.site"
    proxy_secret               = "G6kvT3V3s7MWZOinycdN"
}