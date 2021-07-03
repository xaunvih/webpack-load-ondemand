# Webpack Load Ondemand | Dynamic Chunk

### Webpack 05

With `webpack 05`, Make customizable assest path easier with `__webpack_get_script_filename__` function at run time

Live demo here: https://xaunvih.github.io/webpack-load-ondemand/

```js
// Config assest path at run time
let path = PRODUCTION ? '/webpack-load-ondemand/' : '/docs/';
__webpack_public_path__ = window.location.origin + path;

// Dynamic chunk file:
// Run time global variable: https://github1s.com/webpack/webpack/blob/HEAD/lib/APIPlugin.js
// Its test case: https://github1s.com/webpack/webpack/blob/HEAD/test/configCases/filename-template/script-src-filename/index.js

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
```

### Webpack 04

We still have to maintain with `webpack` 04. Fortunately, We come up with another solution which is created plugin to tap on COMPILE time. Its purpose is to customize `jsonpScriptSrc` of webpack to return adjusted assest path.

```js
const assert = require('assert');
const pluginName = 'JsonpScriptSrcPlugin';

class JsonpScriptSrcPlugin {
    constructor() {}

    applyMainTemplate(mainTemplate) {
        mainTemplate.hooks.localVars.tap({ name: pluginName, stage: 1 }, (source, chunk, hash) => {
            const message = "JsonpScriptSrcPlugin: main template bootstrap source doesn't have function jsonpScriptSrc";
            assert(source.includes('function jsonpScriptSrc'), message);

            const modSource = source.replace('function jsonpScriptSrc', 'function webpackJsonpScriptSrc');
            return `${modSource}
                function jsonpScriptSrc(chunkId) {
                    var getScriptSrc = window.__webpack_get_script_src__;
                    var src = webpackJsonpScriptSrc(chunkId);

                    if(getScriptSrc) {
                        return getScriptSrc(chunkId, ${mainTemplate.requireFn}.p, src));
                    }

                    return src;
                }`;
        });
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            this.applyMainTemplate(compilation.mainTemplate);
        });
    }
}

exports.JsonpScriptSrcPlugin = JsonpScriptSrcPlugin;
```

And, add it to webpack configuration as plugin:

```js
...
plugins: [new JsonpScriptSrcPlugin()],
...
```

Finally, defining `__webpack_get_script_src__` in your main javascript file and customize something you want.

```js
window.__webpack_get_script_src__ = function (chunkId, sourceDir, sourcePath) {
    let src = sourcePath;
    src += '?version=1.0.0';

    return src;
};
```
