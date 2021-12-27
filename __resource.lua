resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

ui_page "html/index.html"

client_scripts {
    '@PolyZone/client.lua',
    'client/*.lua',
    'config.lua',
}

server_scripts {
    'server/*.lua',
    'config.lua',
}

files {
    'html/*.html',
    'html/js/*.js',
    'html/img/*.png',
    'html/css/*.css',
    'html/fonts/*.ttf',
    'html/fonts/*.otf',
    'html/fonts/*.woff',
    'html/img/backgrounds/*.png',
    'html/img/apps/*.png',
    -- '@vlast-vehicleshop/imgs/*.png'
}

exports {
    'InPhone',
    'Call'
}