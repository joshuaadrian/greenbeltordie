const mix     = require('laravel-mix');
const local   = require('./assets/js/utils/local-config');
const homedir = require('os').homedir();
require('laravel-mix-versionhash');
require('laravel-mix-tailwind');

mix.setPublicPath('./build');

mix.webpackConfig({
    externals: {
        "jquery": "jQuery",
    }
});

if (local.proxy) {
    mix.browserSync({

        proxy: {
            target: 'https://greenbeltordie.test'
        },
        injectChanges: true,
        host: 'greenbeltordie.test',
        open: 'external',
        https: {
        key: homedir + '/.config/valet/Certificates/greenbeltordie.test.key',
            cert: homedir + '/.config/valet/Certificates/greenbeltordie.test.crt',
        },
        files : [
            '**/*.php',
            '**/*.html',
            'build/**/*.css',
            'build/**/*.js'
        ],
        notify: false

    });
}

mix.tailwind();
mix.js('assets/js/app.js', 'js');
mix.sass('assets/scss/app.scss', 'css');

if (mix.inProduction()) {
    mix.versionHash();
    mix.sourceMaps();
}
