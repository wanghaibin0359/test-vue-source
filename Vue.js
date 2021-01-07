class Vue {
  constructor(opts) {
    this.$options = opts;
    this.proxy(this.$options.data);
    this.proxy(this.$options.methods);
    observe(this.$options.data);
    initWatch.call(this, this.$options.watch);
    initComputed(this, this.$options.computed);
    new Compile(this, this.$options.el);
  }
  proxy(obj) {
    Object.keys(obj).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return obj[key];
        },
        set(val) {
          obj[key] = val;
        },
      });
    });
  }
}

function observe(obj) {
  if (typeof obj != "object") return;
  Object.keys(obj).forEach((key) => {
    defineProperty(obj, key);
  });
}

function defineProperty(obj, key) {
  let dep = new Dep();
  let oldValue = obj[key];
  observe(oldValue);
  Object.defineProperty(obj, key, {
    get() {
      //这添加watch放入dep
      if (Dep.target) {
        dep.depend();
      }

      return oldValue;
    },
    set(val) {
      if (oldValue != val) {
        observe(val);
        oldValue = val;
        obj[key] = val;
        dep.update();
      }
    },
  });
}

function Dep() {
  this.watchs = [];
}
Dep.prototype.addWatch = function (watch) {
  if (this.watchs.indexOf(watch) > -1) return;
  this.watchs.push(watch);
};
Dep.prototype.update = function () {
  this.watchs.forEach((watch) => {
    watch.update();
  });
};
Dep.prototype.depend = function () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
Dep.target = null;
let watchs = [];
class Watch {
  constructor($vm, express, cb, options) {
    this.$vm = $vm;
    this.express = express;
    this.cb = cb;
    this.deps = [];
    if (options) {
      this.dirty = this.lazy = options.lazy;
    } else {
      this.dirty = this.lazy = false;
    }
    this.getter =
      typeof this.express == "function"
        ? this.express
        : () => this.$vm[this.express];
    this.value = this.lazy ? undefined : this.get();
    watchs.push(this);
  }
  get() {
    Dep.target = this;
    /*    if (this.dirty) {
      debugger;
    } */
    let value = this.getter.call(this.$vm);
    Dep.target = null;
    return value;
  }
  addDep(dep) {
    if (!this.deps.includes(dep)) {
      this.deps.push(dep);
      dep.addWatch(this);
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }
  run() {
    let oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.$vm, this.value, oldValue);
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}

class Compile {
  constructor($vm, $el) {
    this.$vm = $vm;
    this.$el = document.querySelector($el);
    this.compile(this.$el);
  }
  compile(el) {
    let childrenNodes = el.childNodes;
    if (childrenNodes.length) {
      Array.from(childrenNodes).forEach((node) => {
        if (node.nodeType == 1) {
          this.compileElement(node);
        } else if (node.nodeType == 3) {
          this.compileText(node);
        }
      });
    }
  }
  compileText(node) {
    this.compile(node);
    // {{}}
    let reg = /{{(.*)}}/;
    if (reg.test(node.textContent)) {
      let exp = RegExp.$1;
      let temp = node.textContent;
      let cb = function ($vm, exp, node) {
        let text = temp.replace(reg, $vm[exp]);
        node.textContent = text;
      };
      cb(this.$vm, exp, node);
      new Watch(this.$vm, exp, () => {
        cb(this.$vm, exp, node);
      });
    }
  }
  compileElement(node) {
    this.compile(node);
    let attrs = Array.from(node.attributes);
    attrs.length &&
      attrs.forEach((key) => {
        if (key.name.indexOf("v-") > -1) {
          if (key.name.indexOf("v-on:") > -1) {
            let order = key.name.slice(5);
            let exp = key.value;
            node.addEventListener(order, () => {
              this.$vm[exp]();
            });
          } else {
            let order = key.name.slice(2);
            let exp = key.value;
            complieHelp[order] &&
              complieHelp[order](this.$vm, this.$vm[exp], node);
            new Watch(this.$vm, exp, () => {
              complieHelp[order](this.$vm, this.$vm[exp], node);
            });
          }
        }
      });
  }
}

const noop = () => {};
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

var complieHelp = {
  html($vm, exp, node) {
    node.innerHTML = exp;
  },
  text($vm, text, node) {
    node.innerText = text;
  },
};
Vue.prototype.$watch = function () {};
// watch
function initWatch(opts) {
  for (let key in opts) {
    new Watch(this, key, opts[key]);
  }
}

function initComputed(vm, opts) {
  let watchs = (vm._watchs = Object.create(null));
  for (let key in opts) {
    let useDef = opts[key];
    watchs[key] = new Watch(vm, useDef, noop, { lazy: true });
    defineComputed(vm, key);
  }
}

function defineComputed(target, key) {
  sharedPropertyDefinition.get = createComputedGetter(key);
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
let computedWachddd;
function createComputedGetter(key) {
  return function () {
    let watch = this._watchs[key];
    if (watch.dirty) {
      watch.evaluate();
    }
    if (Dep.target) {
      //这是为了在 computed属性 用在 compile里的watach, 让 当前 watch的dep进行依赖收集，否则 compile上的函数将无法更新
      watch.depend();
    }
    computedWachddd = watch;
    return watch.value;
  };
}

let queue = [],
  isCalld = false;
function queueWatcher(watch) {
  if (!queue.indexOf(watch) > -1) {
    queue.push(watch);
  }
  callback();
}

function callback() {
  if (!isCalld) {
    Promise.resolve().then((noop) => {
      while (queue.length) {
        let watch = queue.shift();
        typeof watch == "function" ? watch() : watch.run();
      }
      isCalld = false;
    });
  }

  isCalld = true;
}

Vue.prototype.$nextTick = function (cb) {
  queue.push(cb);
};
