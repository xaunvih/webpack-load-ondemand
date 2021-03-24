// Config assest path at run time
let path = PRODUCTION ? '/webpack-load-ondemand/' : '/docs/';
__webpack_public_path__ = window.location.origin + path;

// Config assest file name at run time
const __webpack_get_script_filename_old__ = __webpack_get_script_filename__;

__webpack_get_script_filename__ = function (chunk) {
    let src = __webpack_get_script_filename_old__(chunk);

    // Customize any params here
    // Url lib: https://unpkg.com/dragscroll-ts@1.0.4/build/dragscroll.min.js
    // Add params for some reasons: version
    // Like this: https://unpkg.com/dragscroll-ts@1.0.4/build/dragscroll.min.js?version=1.0.4
    src += '?version=1.0.0';

    return src;
};
