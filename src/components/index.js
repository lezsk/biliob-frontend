import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context("@/components", true, /\.vue$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

  Vue.prototype.zipPic = function(url) {
    if (url === undefined) {
      return url;
    }
    var subUrl = url.split("bfs/");
    if (subUrl.length < 2) {
      return url;
    }
    var c = subUrl[1].split("/")[0];
    var t = url.slice(3);
    var postfix = "";
    if (c === "face" && t === "jpg") {
      postfix = `@40w_40h.webp`;
    } else if (c === "archive") {
      postfix = "@160w_100h.jpg";
    }
    return `${url}${postfix}`;
  };
  Vue.component(componentName, componentConfig.default || componentConfig);
});
