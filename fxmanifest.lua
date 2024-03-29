fx_version 'cerulean'
games { 'gta5', 'rdr3' }

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'Elena Winters'
description 'A Team Fortress 2 inspired killfeed with multiple styles to choose from'
version 'dev_0.1.0+23.10.21'

dependencies {
    'twiliCore'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/killfeed.css',
    'html/killfeed.js',
    
    'icons/*.png'
}

shared_scripts {
    '@twiliCore/shared/u_common.js'
}

server_scripts {
    'server/s_enums.js',
    'server/s_utils.js',
    'server/s_events.js',
    'server/s_commands.js'
}

client_scripts {
    '@twiliCore/client/c_globals.js',
    'client/c_events.js'
}

