// Dynamic path
__webpack_public_path__ = window.location.origin + '/docs/';

// Dynamic chunk file
const __oldWebpackGetScriptFileName = __webpack_get_script_filename__;

// eslint-disable-line
__webpack_get_script_filename__ = function (chunk) {
    let src = __oldWebpackGetScriptFileName(chunk);

    // Customize any params here
    // Url lib: https://unpkg.com/dragscroll-ts@1.0.4/build/dragscroll.min.js
    // Add params for some reasons: version
    // Like this: https://unpkg.com/dragscroll-ts@1.0.4/build/dragscroll.min.js?version=1.0.4
    src += '?version=1.0.0';

    return src;
};
