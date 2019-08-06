(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_array = require("./caml_array.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function init(l, f) {
  if (l === 0) {
    return /* array */[];
  } else {
    if (l < 0) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Array.init"
          ];
    }
    var res = Caml_array.caml_make_vect(l, Curry._1(f, 0));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      res[i] = Curry._1(f, i);
    }
    return res;
  }
}

function make_matrix(sx, sy, init) {
  var res = Caml_array.caml_make_vect(sx, /* array */[]);
  for(var x = 0 ,x_finish = sx - 1 | 0; x <= x_finish; ++x){
    res[x] = Caml_array.caml_make_vect(sy, init);
  }
  return res;
}

function copy(a) {
  var l = a.length;
  if (l === 0) {
    return /* array */[];
  } else {
    return Caml_array.caml_array_sub(a, 0, l);
  }
}

function append(a1, a2) {
  var l1 = a1.length;
  if (l1 === 0) {
    return copy(a2);
  } else if (a2.length === 0) {
    return Caml_array.caml_array_sub(a1, 0, l1);
  } else {
    return a1.concat(a2);
  }
}

function sub(a, ofs, len) {
  if (len < 0 || ofs > (a.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.sub"
        ];
  }
  return Caml_array.caml_array_sub(a, ofs, len);
}

function fill(a, ofs, len, v) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.fill"
        ];
  }
  for(var i = ofs ,i_finish = (ofs + len | 0) - 1 | 0; i <= i_finish; ++i){
    a[i] = v;
  }
  return /* () */0;
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.blit"
        ];
  }
  return Caml_array.caml_array_blit(a1, ofs1, a2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._1(f, a[i]);
  }
  return /* () */0;
}

function map(f, a) {
  var l = a.length;
  if (l === 0) {
    return /* array */[];
  } else {
    var r = Caml_array.caml_make_vect(l, Curry._1(f, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._1(f, a[i]);
    }
    return r;
  }
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  return /* () */0;
}

function mapi(f, a) {
  var l = a.length;
  if (l === 0) {
    return /* array */[];
  } else {
    var r = Caml_array.caml_make_vect(l, Curry._2(f, 0, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, i, a[i]);
    }
    return r;
  }
}

function to_list(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    } else {
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
    }
  };
}

function list_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = accu + 1 | 0;
      continue ;
    } else {
      return accu;
    }
  };
}

function of_list(l) {
  if (l) {
    var a = Caml_array.caml_make_vect(list_length(0, l), l[0]);
    var _i = 1;
    var _param = l[1];
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        a[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return a;
      }
    };
  } else {
    return /* array */[];
  }
}

function fold_left(f, x, a) {
  var r = x;
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    r = Curry._2(f, r, a[i]);
  }
  return r;
}

function fold_right(f, a, x) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = Curry._2(f, a[i], r);
  }
  return r;
}

var Bottom = Caml_exceptions.create("Array.Bottom");

function sort(cmp, a) {
  var maxson = function (l, i) {
    var i31 = ((i + i | 0) + i | 0) + 1 | 0;
    var x = i31;
    if ((i31 + 2 | 0) < l) {
      if (Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, x), Caml_array.caml_array_get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }
      return x;
    } else if ((i31 + 1 | 0) < l && Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    } else if (i31 < l) {
      return i31;
    } else {
      throw [
            Bottom,
            i
          ];
    }
  };
  var trickle = function (l, i, e) {
    try {
      var l$1 = l;
      var _i = i;
      var e$1 = e;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        if (Curry._2(cmp, Caml_array.caml_array_get(a, j), e$1) > 0) {
          Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
          _i = j;
          continue ;
        } else {
          return Caml_array.caml_array_set(a, i$1, e$1);
        }
      };
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return Caml_array.caml_array_set(a, exn[1], e);
      } else {
        throw exn;
      }
    }
  };
  var bubble = function (l, i) {
    try {
      var l$1 = l;
      var _i = i;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
        _i = j;
        continue ;
      };
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return exn[1];
      } else {
        throw exn;
      }
    }
  };
  var trickleup = function (_i, e) {
    while(true) {
      var i = _i;
      var father = (i - 1 | 0) / 3 | 0;
      if (i === father) {
        throw [
              Caml_builtin_exceptions.assert_failure,
              /* tuple */[
                "array.ml",
                173,
                4
              ]
            ];
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, father), e) < 0) {
        Caml_array.caml_array_set(a, i, Caml_array.caml_array_get(a, father));
        if (father > 0) {
          _i = father;
          continue ;
        } else {
          return Caml_array.caml_array_set(a, 0, e);
        }
      } else {
        return Caml_array.caml_array_set(a, i, e);
      }
    };
  };
  var l = a.length;
  for(var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i){
    trickle(l, i, Caml_array.caml_array_get(a, i));
  }
  for(var i$1 = l - 1 | 0; i$1 >= 2; --i$1){
    var e = Caml_array.caml_array_get(a, i$1);
    Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }
  if (l > 1) {
    var e$1 = Caml_array.caml_array_get(a, 1);
    Caml_array.caml_array_set(a, 1, Caml_array.caml_array_get(a, 0));
    return Caml_array.caml_array_set(a, 0, e$1);
  } else {
    return 0;
  }
}

function stable_sort(cmp, a) {
  var merge = function (src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;
    var _s1 = Caml_array.caml_array_get(a, src1ofs);
    var _i2 = src2ofs;
    var _s2 = Caml_array.caml_array_get(src2, src2ofs);
    var _d = dstofs;
    while(true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;
      if (Curry._2(cmp, s1, s2) <= 0) {
        Caml_array.caml_array_set(dst, d, s1);
        var i1$1 = i1 + 1 | 0;
        if (i1$1 < src1r) {
          _d = d + 1 | 0;
          _s1 = Caml_array.caml_array_get(a, i1$1);
          _i1 = i1$1;
          continue ;
        } else {
          return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }
      } else {
        Caml_array.caml_array_set(dst, d, s2);
        var i2$1 = i2 + 1 | 0;
        if (i2$1 < src2r) {
          _d = d + 1 | 0;
          _s2 = Caml_array.caml_array_get(src2, i2$1);
          _i2 = i2$1;
          continue ;
        } else {
          return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
        }
      }
    };
  };
  var isortto = function (srcofs, dst, dstofs, len) {
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      var e = Caml_array.caml_array_get(a, srcofs + i | 0);
      var j = (dstofs + i | 0) - 1 | 0;
      while(j >= dstofs && Curry._2(cmp, Caml_array.caml_array_get(dst, j), e) > 0) {
        Caml_array.caml_array_set(dst, j + 1 | 0, Caml_array.caml_array_get(dst, j));
        j = j - 1 | 0;
      };
      Caml_array.caml_array_set(dst, j + 1 | 0, e);
    }
    return /* () */0;
  };
  var sortto = function (srcofs, dst, dstofs, len) {
    if (len <= 5) {
      return isortto(srcofs, dst, dstofs, len);
    } else {
      var l1 = len / 2 | 0;
      var l2 = len - l1 | 0;
      sortto(srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
      sortto(srcofs, a, srcofs + l2 | 0, l1);
      return merge(srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
    }
  };
  var l = a.length;
  if (l <= 5) {
    return isortto(0, a, 0, l);
  } else {
    var l1 = l / 2 | 0;
    var l2 = l - l1 | 0;
    var t = Caml_array.caml_make_vect(l2, Caml_array.caml_array_get(a, 0));
    sortto(l1, t, 0, l2);
    sortto(0, a, l2, l1);
    return merge(l2, l1, t, 0, l2, a, 0);
  }
}

var create_matrix = make_matrix;

var concat = Caml_array.caml_array_concat;

var fast_sort = stable_sort;

exports.init = init;
exports.make_matrix = make_matrix;
exports.create_matrix = create_matrix;
exports.append = append;
exports.concat = concat;
exports.sub = sub;
exports.copy = copy;
exports.fill = fill;
exports.blit = blit;
exports.to_list = to_list;
exports.of_list = of_list;
exports.iter = iter;
exports.map = map;
exports.iteri = iteri;
exports.mapi = mapi;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.fast_sort = fast_sort;
/* No side effect */

},{"./caml_array.js":4,"./caml_builtin_exceptions.js":5,"./caml_exceptions.js":7,"./caml_js_exceptions.js":13,"./curry.js":22}],2:[function(require,module,exports){
'use strict';


function __(tag, block) {
  block.tag = tag;
  return block;
}

function record(meta, xs) {
  return Object.defineProperty(xs, Symbol.for("BsRecord"), {
              value: meta
            });
}

function variant(meta, tag, xs) {
  xs.tag = tag;
  return Object.defineProperty(xs, Symbol.for("BsVariant"), {
              value: meta
            });
}

function simpleVariant(meta, xs) {
  return Object.defineProperty(xs, Symbol.for("BsVariant"), {
              value: meta
            });
}

function localModule(meta, xs) {
  return Object.defineProperty(xs, Symbol.for("BsLocalModule"), {
              value: meta
            });
}

function polyVar(meta, xs) {
  return Object.defineProperty(xs, Symbol.for("BsPolyVar"), {
              value: meta
            });
}

exports.__ = __;
exports.record = record;
exports.variant = variant;
exports.simpleVariant = simpleVariant;
exports.localModule = localModule;
exports.polyVar = polyVar;
/* No side effect */

},{}],3:[function(require,module,exports){
'use strict';

var Char = require("./char.js");
var List = require("./list.js");
var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_int32 = require("./caml_int32.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function make(n, c) {
  var s = Caml_bytes.caml_create_bytes(n);
  Caml_bytes.caml_fill_bytes(s, 0, n, c);
  return s;
}

function init(n, f) {
  var s = Caml_bytes.caml_create_bytes(n);
  for(var i = 0 ,i_finish = n - 1 | 0; i <= i_finish; ++i){
    s[i] = Curry._1(f, i);
  }
  return s;
}

var empty = [];

function copy(s) {
  var len = s.length;
  var r = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function to_string(b) {
  return Caml_bytes.bytes_to_string(copy(b));
}

function of_string(s) {
  return copy(Caml_bytes.bytes_of_string(s));
}

function sub(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.sub / Bytes.sub"
        ];
  }
  var r = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_bytes(s, ofs, r, 0, len);
  return r;
}

function sub_string(b, ofs, len) {
  return Caml_bytes.bytes_to_string(sub(b, ofs, len));
}

function extend(s, left, right) {
  var len = (s.length + left | 0) + right | 0;
  var r = Caml_bytes.caml_create_bytes(len);
  var match = left < 0 ? /* tuple */[
      -left | 0,
      0
    ] : /* tuple */[
      0,
      left
    ];
  var dstoff = match[1];
  var srcoff = match[0];
  var cpylen = Caml_primitive.caml_int_min(s.length - srcoff | 0, len - dstoff | 0);
  if (cpylen > 0) {
    Caml_bytes.caml_blit_bytes(s, srcoff, r, dstoff, cpylen);
  }
  return r;
}

function fill(s, ofs, len, c) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.fill / Bytes.fill"
        ];
  }
  return Caml_bytes.caml_fill_bytes(s, ofs, len, c);
}

function blit(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Bytes.blit"
        ];
  }
  return Caml_bytes.caml_blit_bytes(s1, ofs1, s2, ofs2, len);
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.blit / Bytes.blit_string"
        ];
  }
  return Caml_bytes.caml_blit_string(s1, ofs1, s2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._1(f, a[i]);
  }
  return /* () */0;
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  return /* () */0;
}

function concat(sep, l) {
  if (l) {
    var hd = l[0];
    var num = /* record */[/* contents */0];
    var len = /* record */[/* contents */0];
    List.iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = Caml_bytes.caml_create_bytes(len[0] + Caml_int32.imul(sep.length, num[0] - 1 | 0) | 0);
    Caml_bytes.caml_blit_bytes(hd, 0, r, 0, hd.length);
    var pos = /* record */[/* contents */hd.length];
    List.iter((function (s) {
            Caml_bytes.caml_blit_bytes(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            Caml_bytes.caml_blit_bytes(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return r;
  } else {
    return empty;
  }
}

function cat(s1, s2) {
  var l1 = s1.length;
  var l2 = s2.length;
  var r = Caml_bytes.caml_create_bytes(l1 + l2 | 0);
  Caml_bytes.caml_blit_bytes(s1, 0, r, 0, l1);
  Caml_bytes.caml_blit_bytes(s2, 0, r, l1, l2);
  return r;
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    return switcher === 23;
  } else {
    return switcher !== 2;
  }
}

function trim(s) {
  var len = s.length;
  var i = 0;
  while(i < len && is_space(s[i])) {
    i = i + 1 | 0;
  };
  var j = len - 1 | 0;
  while(j >= i && is_space(s[j])) {
    j = j - 1 | 0;
  };
  if (j >= i) {
    return sub(s, i, (j - i | 0) + 1 | 0);
  } else {
    return empty;
  }
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    var match = s[i];
    var tmp;
    if (match >= 32) {
      var switcher = match - 34 | 0;
      tmp = switcher > 58 || switcher < 0 ? (
          switcher >= 93 ? 4 : 1
        ) : (
          switcher > 57 || switcher < 1 ? 2 : 1
        );
    } else {
      tmp = match >= 11 ? (
          match !== 13 ? 4 : 2
        ) : (
          match >= 8 ? 2 : 4
        );
    }
    n = n + tmp | 0;
  }
  if (n === s.length) {
    return copy(s);
  } else {
    var s$prime = Caml_bytes.caml_create_bytes(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length - 1 | 0; i$1 <= i_finish$1; ++i$1){
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "b" */98;
              break;
          case 9 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "t" */116;
              break;
          case 10 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "n" */110;
              break;
          case 0 : 
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 11 : 
          case 12 : 
              exit = 1;
              break;
          case 13 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "r" */114;
              break;
          
        }
      }
      switch (exit) {
        case 1 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }
}

function map(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  } else {
    var r = Caml_bytes.caml_create_bytes(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._1(f, s[i]);
    }
    return r;
  }
}

function mapi(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  } else {
    var r = Caml_bytes.caml_create_bytes(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, i, s[i]);
    }
    return r;
  }
}

function uppercase(s) {
  return map(Char.uppercase, s);
}

function lowercase(s) {
  return map(Char.lowercase, s);
}

function apply1(f, s) {
  if (s.length === 0) {
    return s;
  } else {
    var r = copy(s);
    r[0] = Curry._1(f, s[0]);
    return r;
  }
}

function capitalize(s) {
  return apply1(Char.uppercase, s);
}

function uncapitalize(s) {
  return apply1(Char.lowercase, s);
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw Caml_builtin_exceptions.not_found;
    }
    if (s[i] === c) {
      return i;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.index_from / Bytes.index_from"
        ];
  }
  return index_rec(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw Caml_builtin_exceptions.not_found;
    }
    if (s[i] === c) {
      return i;
    } else {
      _i = i - 1 | 0;
      continue ;
    }
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rindex_from / Bytes.rindex_from"
        ];
  }
  return rindex_rec(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.contains_from / Bytes.contains_from"
        ];
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return false;
    } else {
      throw exn;
    }
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rcontains_from / Bytes.rcontains_from"
        ];
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return false;
    } else {
      throw exn;
    }
  }
}

var compare = Caml_obj.caml_compare;

var unsafe_to_string = Caml_bytes.bytes_to_string;

var unsafe_of_string = Caml_bytes.bytes_of_string;

exports.make = make;
exports.init = init;
exports.empty = empty;
exports.copy = copy;
exports.of_string = of_string;
exports.to_string = to_string;
exports.sub = sub;
exports.sub_string = sub_string;
exports.extend = extend;
exports.fill = fill;
exports.blit = blit;
exports.blit_string = blit_string;
exports.concat = concat;
exports.cat = cat;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.trim = trim;
exports.escaped = escaped;
exports.index = index;
exports.rindex = rindex;
exports.index_from = index_from;
exports.rindex_from = rindex_from;
exports.contains = contains;
exports.contains_from = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.capitalize = capitalize;
exports.uncapitalize = uncapitalize;
exports.compare = compare;
exports.unsafe_to_string = unsafe_to_string;
exports.unsafe_of_string = unsafe_of_string;
/* No side effect */

},{"./caml_builtin_exceptions.js":5,"./caml_bytes.js":6,"./caml_int32.js":10,"./caml_obj.js":14,"./caml_primitive.js":16,"./char.js":21,"./curry.js":22,"./list.js":25}],4:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  };
  return result;
}

function len(_acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    if (l) {
      _l = l[1];
      _acc = l[0].length + acc | 0;
      continue ;
    } else {
      return acc;
    }
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (l) {
      var x = l[0];
      var l$1 = x.length;
      var k = i;
      var j = 0;
      while(j < l$1) {
        arr[k] = x[j];
        k = k + 1 | 0;
        j = j + 1 | 0;
      };
      _l = l[1];
      _i = k;
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function caml_array_concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  xs[index] = newval;
  return /* () */0;
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return xs[index];
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}

function caml_make_float_vect(len) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = 0;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return /* () */0;
  } else {
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    return /* () */0;
  }
}

function caml_array_dup(prim) {
  return prim.slice(0);
}

exports.caml_array_dup = caml_array_dup;
exports.caml_array_sub = caml_array_sub;
exports.caml_array_concat = caml_array_concat;
exports.caml_make_vect = caml_make_vect;
exports.caml_make_float_vect = caml_make_float_vect;
exports.caml_array_blit = caml_array_blit;
exports.caml_array_get = caml_array_get;
exports.caml_array_set = caml_array_set;
/* No side effect */

},{"./caml_builtin_exceptions.js":5}],5:[function(require,module,exports){
'use strict';


var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;

exports.out_of_memory = out_of_memory;
exports.sys_error = sys_error;
exports.failure = failure;
exports.invalid_argument = invalid_argument;
exports.end_of_file = end_of_file;
exports.division_by_zero = division_by_zero;
exports.not_found = not_found;
exports.match_failure = match_failure;
exports.stack_overflow = stack_overflow;
exports.sys_blocked_io = sys_blocked_io;
exports.assert_failure = assert_failure;
exports.undefined_recursive_module = undefined_recursive_module;
/*  Not a pure module */

},{}],6:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l > 0) {
    for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
      s[k] = c;
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.create"
        ];
  }
  var result = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    result[i] = /* "\000" */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_to_string(a) {
  var bytes = a;
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null, bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    };
    return s;
  }
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len > 0) {
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return /* () */0;
    } else {
      for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
        s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
      }
      for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
        s2[i2 + i$2 | 0] = /* "\000" */0;
      }
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

exports.caml_create_bytes = caml_create_bytes;
exports.caml_fill_bytes = caml_fill_bytes;
exports.get = get;
exports.bytes_to_string = bytes_to_string;
exports.caml_blit_bytes = caml_blit_bytes;
exports.caml_blit_string = caml_blit_string;
exports.bytes_of_string = bytes_of_string;
/* No side effect */

},{"./caml_builtin_exceptions.js":5}],7:[function(require,module,exports){
'use strict';


var id = /* record */[/* contents */0];

function caml_set_oo_id(b) {
  b[1] = id[0];
  id[0] += 1;
  return b;
}

function caml_fresh_oo_id(param) {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = caml_fresh_oo_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function caml_is_extension(e) {
  if (e === undefined) {
    return false;
  } else if (e.tag === 248) {
    return true;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return slot.tag === 248;
    } else {
      return false;
    }
  }
}

exports.caml_set_oo_id = caml_set_oo_id;
exports.caml_fresh_oo_id = caml_fresh_oo_id;
exports.create = create;
exports.caml_is_extension = caml_is_extension;
/* No side effect */

},{}],8:[function(require,module,exports){
(function (global){
'use strict';


function getGlobalThis (){
  if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	if (typeof this !== 'undefined') return this;
	throw new Error('Unable to locate global `this`');
};

function resolve (s){
  var myGlobal = getGlobalThis();
  if (myGlobal[s] === undefined){
    throw new Error(s + " not polyfilled by BuckleScript yet\n")
  }
  return myGlobal[s]
};

function register (s,fn){
  var myGlobal = getGlobalThis();
  myGlobal[s] = fn 
  return 0
};

exports.getGlobalThis = getGlobalThis;
exports.resolve = resolve;
exports.register = register;
/* No side effect */

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
'use strict';

var Caml_int32 = require("./caml_int32.js");
var Caml_int64 = require("./caml_int64.js");
var Caml_utils = require("./caml_utils.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    case 3 : 
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  var match = s.charCodeAt(i);
  switch (match) {
    case 43 : 
        i = i + 1 | 0;
        break;
    case 44 : 
        break;
    case 45 : 
        sign = -1;
        i = i + 1 | 0;
        break;
    default:
      
  }
  if (s[i] === "0") {
    var match$1 = s.charCodeAt(i + 1 | 0);
    if (match$1 >= 89) {
      if (match$1 >= 111) {
        if (match$1 < 121) {
          switch (match$1 - 111 | 0) {
            case 0 : 
                base = /* Oct */0;
                i = i + 2 | 0;
                break;
            case 6 : 
                i = i + 2 | 0;
                break;
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 7 : 
            case 8 : 
                break;
            case 9 : 
                base = /* Hex */1;
                i = i + 2 | 0;
                break;
            
          }
        }
        
      } else if (match$1 === 98) {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
      
    } else if (match$1 !== 66) {
      if (match$1 >= 79) {
        switch (match$1 - 79 | 0) {
          case 0 : 
              base = /* Oct */0;
              i = i + 2 | 0;
              break;
          case 6 : 
              i = i + 2 | 0;
              break;
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 7 : 
          case 8 : 
              break;
          case 9 : 
              base = /* Hex */1;
              i = i + 2 | 0;
              break;
          
        }
      }
      
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return /* tuple */[
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
        } else {
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int_of_string"
                ];
          }
          var acc$1 = base * acc + v;
          if (acc$1 > threshold) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int_of_string"
                ];
          }
          _k = k + 1 | 0;
          _acc = acc$1;
          continue ;
        }
      }
    };
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
  }
  return or_res;
}

function caml_int64_of_string(s) {
  var match = parse_sign_and_base(s);
  var hbase = match[2];
  var i = match[0];
  var base = Caml_int64.of_int32(int_of_string_base(hbase));
  var sign = Caml_int64.of_int32(match[1]);
  var threshold;
  switch (hbase) {
    case 0 : 
        threshold = /* int64 */[
          /* hi */536870911,
          /* lo */4294967295
        ];
        break;
    case 1 : 
        threshold = /* int64 */[
          /* hi */268435455,
          /* lo */4294967295
        ];
        break;
    case 2 : 
        threshold = /* int64 */[
          /* hi */429496729,
          /* lo */2576980377
        ];
        break;
    case 3 : 
        threshold = /* int64 */[
          /* hi */2147483647,
          /* lo */4294967295
        ];
        break;
    
  }
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = Caml_int64.of_int32(parse_digit(c));
  if (Caml_int64.lt(d, /* int64 */[
          /* hi */0,
          /* lo */0
        ]) || Caml_int64.ge(d, base)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
        } else {
          var v = Caml_int64.of_int32(parse_digit(a));
          if (Caml_int64.lt(v, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ]) || Caml_int64.ge(v, base) || Caml_int64.gt(acc, threshold)) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int64_of_string"
                ];
          }
          var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
          _k = k + 1 | 0;
          _acc = acc$1;
          continue ;
        }
      }
    };
  };
  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, /* int64 */[
        /* hi */0,
        /* lo */0
      ]);
  if (Caml_int64.eq(base, /* int64 */[
          /* hi */0,
          /* lo */10
        ]) && Caml_int64.neq(res, or_res)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
  }
  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "format_int: format too long"
        ];
  }
  var f = /* record */[
    /* justify */"+",
    /* signstyle */"-",
    /* filter */" ",
    /* alternate */false,
    /* base : Dec */2,
    /* signedconv */false,
    /* width */0,
    /* uppercase */false,
    /* sign */1,
    /* prec */-1,
    /* conv */"f"
  ];
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 : 
                  f[/* base */4] = /* Hex */1;
                  f[/* uppercase */7] = true;
                  _i = i + 1 | 0;
                  continue ;
              case 13 : 
              case 14 : 
              case 15 : 
                  exit = 5;
                  break;
              case 12 : 
              case 17 : 
                  exit = 4;
                  break;
              case 23 : 
                  f[/* base */4] = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
              case 29 : 
                  f[/* base */4] = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
              case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit = 1;
                  break;
              case 32 : 
                  f[/* base */4] = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
              
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f[/* signedconv */5] = true;
          f[/* uppercase */7] = true;
          f[/* conv */10] = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
        }
      } else {
        switch (c) {
          case 35 : 
              f[/* alternate */3] = true;
              _i = i + 1 | 0;
              continue ;
          case 32 : 
          case 43 : 
              exit = 2;
              break;
          case 45 : 
              f[/* justify */0] = "-";
              _i = i + 1 | 0;
              continue ;
          case 46 : 
              f[/* prec */9] = 0;
              var j = i + 1 | 0;
              while((function(j){
                  return function () {
                    var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                    return w >= 0 && w <= 9;
                  }
                  }(j))()) {
                f[/* prec */9] = (Caml_int32.imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                j = j + 1 | 0;
              };
              _i = j;
              continue ;
          case 33 : 
          case 34 : 
          case 36 : 
          case 37 : 
          case 38 : 
          case 39 : 
          case 40 : 
          case 41 : 
          case 42 : 
          case 44 : 
          case 47 : 
              exit = 1;
              break;
          case 48 : 
              f[/* filter */2] = "0";
              _i = i + 1 | 0;
              continue ;
          case 49 : 
          case 50 : 
          case 51 : 
          case 52 : 
          case 53 : 
          case 54 : 
          case 55 : 
          case 56 : 
          case 57 : 
              exit = 3;
              break;
          default:
            exit = 1;
        }
      }
      switch (exit) {
        case 1 : 
            _i = i + 1 | 0;
            continue ;
        case 2 : 
            f[/* signstyle */1] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        case 3 : 
            f[/* width */6] = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j$1))()) {
              f[/* width */6] = (Caml_int32.imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            };
            _i = j$1;
            continue ;
        case 4 : 
            f[/* signedconv */5] = true;
            f[/* base */4] = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
        case 5 : 
            f[/* signedconv */5] = true;
            f[/* conv */10] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        
      }
    }
  };
}

function finish_formatting(config, rawbuffer) {
  var justify = config[/* justify */0];
  var signstyle = config[/* signstyle */1];
  var filter = config[/* filter */2];
  var alternate = config[/* alternate */3];
  var base = config[/* base */4];
  var signedconv = config[/* signedconv */5];
  var width = config[/* width */6];
  var uppercase = config[/* uppercase */7];
  var sign = config[/* sign */8];
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base === /* Oct */0) {
      len = len + 1 | 0;
    } else if (base === /* Hex */1) {
      len = len + 2 | 0;
    }
    
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  } else {
    var f = parse_format(fmt);
    var f$1 = f;
    var i$1 = i;
    var i$2 = i$1 < 0 ? (
        f$1[/* signedconv */5] ? (f$1[/* sign */8] = -1, -i$1) : (i$1 >>> 0)
      ) : i$1;
    var s = i$2.toString(int_of_base(f$1[/* base */4]));
    if (f$1[/* prec */9] >= 0) {
      f$1[/* filter */2] = " ";
      var n = f$1[/* prec */9] - s.length | 0;
      if (n > 0) {
        s = Caml_utils.repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f$1, s);
  }
}

function caml_int64_format(fmt, x) {
  var f = parse_format(fmt);
  var x$1 = f[/* signedconv */5] && Caml_int64.lt(x, /* int64 */[
        /* hi */0,
        /* lo */0
      ]) ? (f[/* sign */8] = -1, Caml_int64.neg(x)) : x;
  var s = "";
  var match = f[/* base */4];
  switch (match) {
    case 0 : 
        var wbase = /* int64 */[
          /* hi */0,
          /* lo */8
        ];
        var cvtbl = "01234567";
        if (Caml_int64.lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y = Caml_int64.discard_sign(x$1);
          var match$1 = Caml_int64.div_mod(y, wbase);
          var quotient = Caml_int64.add(/* int64 */[
                /* hi */268435456,
                /* lo */0
              ], match$1[0]);
          var modulus = match$1[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          while(Caml_int64.neq(quotient, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$2 = Caml_int64.div_mod(quotient, wbase);
            quotient = match$2[0];
            modulus = match$2[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          };
        } else {
          var match$3 = Caml_int64.div_mod(x$1, wbase);
          var quotient$1 = match$3[0];
          var modulus$1 = match$3[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          while(Caml_int64.neq(quotient$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$4 = Caml_int64.div_mod(quotient$1, wbase);
            quotient$1 = match$4[0];
            modulus$1 = match$4[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          };
        }
        break;
    case 1 : 
        s = Caml_int64.to_hex(x$1) + s;
        break;
    case 2 : 
        var wbase$1 = /* int64 */[
          /* hi */0,
          /* lo */10
        ];
        var cvtbl$1 = "0123456789";
        if (Caml_int64.lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y$1 = Caml_int64.discard_sign(x$1);
          var match$5 = Caml_int64.div_mod(y$1, wbase$1);
          var match$6 = Caml_int64.div_mod(Caml_int64.add(/* int64 */[
                    /* hi */0,
                    /* lo */8
                  ], match$5[1]), wbase$1);
          var quotient$2 = Caml_int64.add(Caml_int64.add(/* int64 */[
                    /* hi */214748364,
                    /* lo */3435973836
                  ], match$5[0]), match$6[0]);
          var modulus$2 = match$6[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          while(Caml_int64.neq(quotient$2, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$7 = Caml_int64.div_mod(quotient$2, wbase$1);
            quotient$2 = match$7[0];
            modulus$2 = match$7[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          };
        } else {
          var match$8 = Caml_int64.div_mod(x$1, wbase$1);
          var quotient$3 = match$8[0];
          var modulus$3 = match$8[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          while(Caml_int64.neq(quotient$3, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$9 = Caml_int64.div_mod(quotient$3, wbase$1);
            quotient$3 = match$9[0];
            modulus$3 = match$9[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          };
        }
        break;
    
  }
  if (f[/* prec */9] >= 0) {
    f[/* filter */2] = " ";
    var n = f[/* prec */9] - s.length | 0;
    if (n > 0) {
      s = Caml_utils.repeat(n, "0") + s;
    }
    
  }
  return finish_formatting(f, s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
  var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f[/* filter */2] = " ";
  } else if (isFinite(x$1)) {
    var match = f[/* conv */10];
    switch (match) {
      case "e" : 
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" : 
          s = x$1.toFixed(prec);
          break;
      case "g" : 
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            };
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return s.length > (prec$1 + 1 | 0);
                    })()) {
                p = p - 1 | 0;
              };
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              };
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f[/* filter */2] = " ";
  }
  return finish_formatting(f, s);
}

function float_of_string (s,exn){ 

    var res = +s;
    if ((s.length > 0) && (res === res))
        return res;
    s = s.replace(/_/g, "");
    res = +s;
    if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
        return res;
    };
    if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
    if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
    throw exn;

};

function caml_float_of_string(s) {
  return float_of_string(s, [
              Caml_builtin_exceptions.failure,
              "float_of_string"
            ]);
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;

var caml_int32_of_string = caml_int_of_string;

var caml_nativeint_of_string = caml_int_of_string;

exports.caml_format_float = caml_format_float;
exports.caml_format_int = caml_format_int;
exports.caml_nativeint_format = caml_nativeint_format;
exports.caml_int32_format = caml_int32_format;
exports.caml_float_of_string = caml_float_of_string;
exports.caml_int64_format = caml_int64_format;
exports.caml_int_of_string = caml_int_of_string;
exports.caml_int32_of_string = caml_int32_of_string;
exports.caml_int64_of_string = caml_int64_of_string;
exports.caml_nativeint_of_string = caml_nativeint_of_string;
/* No side effect */

},{"./caml_builtin_exceptions.js":5,"./caml_int32.js":10,"./caml_int64.js":11,"./caml_utils.js":19}],10:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function div(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  }
  return x / y | 0;
}

function mod_(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  }
  return x % y;
}

function caml_bswap16(x) {
  return ((x & 255) << 8) | ((x & 65280) >>> 8);
}

function caml_int32_bswap(x) {
  return ((x & 255) << 24) | ((x & 65280) << 8) | ((x & 16711680) >>> 8) | ((x & 4278190080) >>> 24);
}

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);

var caml_nativeint_bswap = caml_int32_bswap;

exports.div = div;
exports.mod_ = mod_;
exports.caml_bswap16 = caml_bswap16;
exports.caml_int32_bswap = caml_int32_bswap;
exports.caml_nativeint_bswap = caml_nativeint_bswap;
exports.imul = imul;
/* imul Not a pure module */

},{"./caml_builtin_exceptions.js":5}],11:[function(require,module,exports){
'use strict';

var Caml_int32 = require("./caml_int32.js");
var Caml_utils = require("./caml_utils.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var min_int = /* record */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int = /* record */[
  /* hi */2147483647,
  /* lo */1
];

var one = /* record */[
  /* hi */0,
  /* lo */1
];

var zero = /* record */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* record */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return (x & 2147483648) !== 0;
}

function add(param, param$1) {
  var other_low_ = param$1[/* lo */1];
  var this_low_ = param[/* lo */1];
  var lo = this_low_ + other_low_ & 4294967295;
  var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function not(param) {
  var hi = param[/* hi */0] ^ -1;
  var lo = param[/* lo */1] ^ -1;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return x[/* lo */1] === y[/* lo */1];
  } else {
    return false;
  }
}

function equal_null(x, y) {
  if (y !== null) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_undefined(x, y) {
  if (y !== undefined) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_nullable(x, y) {
  if (y == null) {
    return false;
  } else {
    return eq(x, y);
  }
}

function neg(x) {
  if (eq(x, min_int)) {
    return min_int;
  } else {
    return add(not(x), one);
  }
}

function sub(x, y) {
  return add(x, neg(y));
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* record */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* record */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var hi = x[/* hi */0];
    var offset = numBits - 32 | 0;
    if (offset === 0) {
      return /* record */[
              /* hi */0,
              /* lo */(hi >>> 0)
            ];
    } else if (offset > 0) {
      var lo = (hi >>> offset);
      return /* record */[
              /* hi */0,
              /* lo */(lo >>> 0)
            ];
    } else {
      var hi$1 = (hi >>> numBits);
      var lo$1 = (hi << (-offset | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* record */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return false;
  } else {
    return true;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var exit = 0;
    var lo;
    var this_hi = $$this[/* hi */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    if (this_hi !== 0 || $$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        lo = other[/* lo */1];
        exit = 1;
      }
    }
    if (exit$1 === 2) {
      var other_hi = other[/* hi */0];
      var lo$1 = $$this[/* lo */1];
      var exit$4 = 0;
      if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
        exit$4 = 3;
      } else {
        lo = lo$1;
        exit = 1;
      }
      if (exit$4 === 3) {
        var other_lo = other[/* lo */1];
        if (this_hi < 0) {
          if (other_hi < 0) {
            _other = neg(other);
            _this = neg($$this);
            continue ;
          } else {
            return neg(mul(neg($$this), other));
          }
        } else if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        } else {
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 += (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 += (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          var hi = c32 | (c48 << 16);
          var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
          return /* record */[
                  /* hi */hi,
                  /* lo */(lo$2 >>> 0)
                ];
        }
      }
      
    }
    if (exit === 1) {
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int;
      }
    }
    
  };
}

function swap(param) {
  var hi = Caml_int32.caml_int32_bswap(param[/* lo */1]);
  var lo = Caml_int32.caml_int32_bswap(param[/* hi */0]);
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function xor(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] ^ param$1[/* hi */0],
          /* lo */((param[/* lo */1] ^ param$1[/* lo */1]) >>> 0)
        ];
}

function or_(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] | param$1[/* hi */0],
          /* lo */((param[/* lo */1] | param$1[/* lo */1]) >>> 0)
        ];
}

function and_(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] & param$1[/* hi */0],
          /* lo */((param[/* lo */1] & param$1[/* lo */1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[/* lo */1] >= param$1[/* lo */1];
  }
}

function neq(x, y) {
  return !eq(x, y);
}

function lt(x, y) {
  return !ge(x, y);
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return true;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return false;
  } else {
    return x[/* lo */1] > y[/* lo */1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function min(x, y) {
  if (ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function max(x, y) {
  if (gt(x, y)) {
    return x;
  } else {
    return y;
  }
}

function to_float(param) {
  return param[/* hi */0] * (0x100000000) + param[/* lo */1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= -9.22337203685477581e+18) {
    return min_int;
  } else if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / 4294967296 | 0;
    var lo = x % 4294967296 | 0;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[/* hi */0];
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw Caml_builtin_exceptions.division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0 || self[/* lo */1] !== 0) {
          exit = 1;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 1;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int)) {
        return one;
      } else {
        var other_hi = other[/* hi */0];
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0 || approx[/* lo */1] !== 0) {
          exit$2 = 3;
        } else if (other_hi < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 3) {
          var y = mul(other, approx);
          var rem = add(self, neg(y));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi$1 = other[/* hi */0];
      var exit$3 = 0;
      if (other_hi$1 !== -2147483648 || other[/* lo */1] !== 0) {
        exit$3 = 2;
      } else {
        return zero;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi$1 < 0) {
            _other = neg(other);
            _self = neg(self);
            continue ;
          } else {
            return neg(div(neg(self), other));
          }
        } else if (other_hi$1 < 0) {
          return neg(div(self, neg(other)));
        } else {
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var approx$1 = Caml_primitive.caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            };
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = add(rem$1, neg(approxRem));
          };
          return res;
        }
      }
      
    }
    
  };
}

function mod_(self, other) {
  var y = mul(div(self, other), other);
  return add(self, neg(y));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  var y = mul(quotient, other);
  return /* tuple */[
          quotient,
          add(self, neg(y))
        ];
}

function compare(self, other) {
  var v = Caml_primitive.caml_nativeint_compare(self[/* hi */0], other[/* hi */0]);
  if (v === 0) {
    return Caml_primitive.caml_nativeint_compare(self[/* lo */1], other[/* lo */1]);
  } else {
    return v;
  }
}

function of_int32(lo) {
  return /* record */[
          /* hi */lo < 0 ? -1 : 0,
          /* lo */(lo >>> 0)
        ];
}

function to_int32(x) {
  return x[/* lo */1] | 0;
}

function to_hex(x) {
  var x_lo = x[/* lo */1];
  var x_hi = x[/* hi */0];
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  var exit = 0;
  if (x_hi !== 0 || x_lo !== 0) {
    exit = 1;
  } else {
    return "0";
  }
  if (exit === 1) {
    if (x_lo !== 0) {
      if (x_hi !== 0) {
        var lo = aux(x_lo);
        var pad = 8 - lo.length | 0;
        if (pad <= 0) {
          return aux(x_hi) + lo;
        } else {
          return aux(x_hi) + (Caml_utils.repeat(pad, "0") + lo);
        }
      } else {
        return aux(x_lo);
      }
    } else {
      return aux(x_hi) + "00000000";
    }
  }
  
}

function discard_sign(x) {
  return /* record */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}

function float_of_bits (x){ 
  return new Float64Array(new Int32Array([x[1],x[0]]).buffer)[0]
};

function bits_of_float(x) {
  var buf = (new Int32Array(new Float64Array([x]).buffer));
  return /* record */[
          /* hi */buf[1],
          /* lo */(buf[0] >>> 0)
        ];
}

function get64(s, i) {
  var hi = (s.charCodeAt(i + 4 | 0) << 32) | (s.charCodeAt(i + 5 | 0) << 40) | (s.charCodeAt(i + 6 | 0) << 48) | (s.charCodeAt(i + 7 | 0) << 56);
  var lo = s.charCodeAt(i) | (s.charCodeAt(i + 1 | 0) << 8) | (s.charCodeAt(i + 2 | 0) << 16) | (s.charCodeAt(i + 3 | 0) << 24);
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

exports.min_int = min_int;
exports.max_int = max_int;
exports.one = one;
exports.zero = zero;
exports.not = not;
exports.of_int32 = of_int32;
exports.to_int32 = to_int32;
exports.add = add;
exports.neg = neg;
exports.sub = sub;
exports.lsl_ = lsl_;
exports.lsr_ = lsr_;
exports.asr_ = asr_;
exports.is_zero = is_zero;
exports.mul = mul;
exports.xor = xor;
exports.or_ = or_;
exports.and_ = and_;
exports.swap = swap;
exports.ge = ge;
exports.eq = eq;
exports.neq = neq;
exports.lt = lt;
exports.gt = gt;
exports.le = le;
exports.equal_null = equal_null;
exports.equal_undefined = equal_undefined;
exports.equal_nullable = equal_nullable;
exports.min = min;
exports.max = max;
exports.to_float = to_float;
exports.of_float = of_float;
exports.div = div;
exports.mod_ = mod_;
exports.compare = compare;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.get64 = get64;
exports.div_mod = div_mod;
exports.to_hex = to_hex;
exports.discard_sign = discard_sign;
/* Caml_int32 Not a pure module */

},{"./caml_builtin_exceptions.js":5,"./caml_int32.js":10,"./caml_primitive.js":16,"./caml_utils.js":19}],12:[function(require,module,exports){
(function (process){
'use strict';

var Curry = require("./curry.js");

var stdout = /* record */[
  /* buffer */"",
  /* output */(function (param, s) {
      var v = s.length - 1 | 0;
      if (( (typeof process !== "undefined") && process.stdout && process.stdout.write)) {
        return ( process.stdout.write )(s);
      } else if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
];

var stderr = /* record */[
  /* buffer */"",
  /* output */(function (param, s) {
      var v = s.length - 1 | 0;
      if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
];

function caml_ml_flush(oc) {
  if (oc[/* buffer */0] !== "") {
    Curry._2(oc[/* output */1], oc, oc[/* buffer */0]);
    oc[/* buffer */0] = "";
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
  if (( (typeof process !== "undefined") && process.stdout && process.stdout.write ) && oc === stdout) {
    return ( process.stdout.write )(str$1);
  } else {
    var id = str$1.lastIndexOf("\n");
    if (id < 0) {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1;
      return /* () */0;
    } else {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(0, id + 1 | 0);
      caml_ml_flush(oc);
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(id + 1 | 0);
      return /* () */0;
    }
  }
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}

function caml_ml_out_channels_list(param) {
  return /* :: */[
          stdout,
          /* :: */[
            stderr,
            /* [] */0
          ]
        ];
}

var stdin = undefined;

exports.stdin = stdin;
exports.stdout = stdout;
exports.stderr = stderr;
exports.caml_ml_flush = caml_ml_flush;
exports.caml_ml_output = caml_ml_output;
exports.caml_ml_output_char = caml_ml_output_char;
exports.caml_ml_out_channels_list = caml_ml_out_channels_list;
/* No side effect */

}).call(this,require('_process'))
},{"./curry.js":22,"_process":40}],13:[function(require,module,exports){
'use strict';

var Caml_option = require("./caml_option.js");
var Caml_exceptions = require("./caml_exceptions.js");

var $$Error = Caml_exceptions.create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (Caml_exceptions.caml_is_extension(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}

function caml_as_js_exn(exn) {
  if (exn[0] === $$Error) {
    return Caml_option.some(exn[1]);
  }
  
}

exports.$$Error = $$Error;
exports.internalToOCamlException = internalToOCamlException;
exports.caml_as_js_exn = caml_as_js_exn;
/* No side effect */

},{"./caml_exceptions.js":7,"./caml_option.js":15}],14:[function(require,module,exports){
'use strict';

var Block = require("./block.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_obj_block(tag, size) {
  var v = new Array(size);
  v.tag = tag;
  return v;
}

function caml_obj_dup(x) {
  var len = x.length | 0;
  var v = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    v[i] = x[i];
  }
  v.tag = x.tag | 0;
  return v;
}

function caml_obj_truncate(x, new_size) {
  var len = x.length | 0;
  if (new_size <= 0 || new_size > len) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Obj.truncate"
        ];
  }
  if (len !== new_size) {
    for(var i = new_size ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      x[i] = 0;
    }
    x.length = new_size;
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_lazy_make_forward(x) {
  return Block.__(250, [x]);
}

function caml_update_dummy(x, y) {
  var len = y.length | 0;
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    x[i] = y[i];
  }
  var y_tag = y.tag | 0;
  if (y_tag !== 0) {
    x.tag = y_tag;
    return /* () */0;
  } else {
    return 0;
  }
}

function for_in (o,foo){
        for (var x in o) { foo(x) }
      };

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return 0;
    } else {
      var a_type = typeof a;
      var b_type = typeof b;
      var exit = 0;
      switch (a_type) {
        case "boolean" : 
            if (b_type === "boolean") {
              return Caml_primitive.caml_bool_compare(a, b);
            } else {
              exit = 1;
            }
            break;
        case "function" : 
            if (b_type === "function") {
              throw [
                    Caml_builtin_exceptions.invalid_argument,
                    "compare: functional value"
                  ];
            } else {
              exit = 1;
            }
            break;
        case "number" : 
            if (b_type === "number") {
              return Caml_primitive.caml_int_compare(a, b);
            } else {
              exit = 1;
            }
            break;
        case "string" : 
            if (b_type === "string") {
              return Caml_primitive.caml_string_compare(a, b);
            } else {
              return 1;
            }
        case "undefined" : 
            return -1;
        default:
          exit = 1;
      }
      if (exit === 1) {
        switch (b_type) {
          case "string" : 
              return -1;
          case "undefined" : 
              return 1;
          default:
            if (a_type === "boolean") {
              return 1;
            } else if (b_type === "boolean") {
              return -1;
            } else if (a_type === "function") {
              return 1;
            } else if (b_type === "function") {
              return -1;
            } else if (a_type === "number") {
              if (b === null || b.tag === 256) {
                return 1;
              } else {
                return -1;
              }
            } else if (b_type === "number") {
              if (a === null || a.tag === 256) {
                return -1;
              } else {
                return 1;
              }
            } else if (a === null) {
              if (b.tag === 256) {
                return 1;
              } else {
                return -1;
              }
            } else if (b === null) {
              if (a.tag === 256) {
                return -1;
              } else {
                return 1;
              }
            } else {
              var tag_a = a.tag | 0;
              var tag_b = b.tag | 0;
              if (tag_a === 250) {
                _a = a[0];
                continue ;
              } else if (tag_b === 250) {
                _b = b[0];
                continue ;
              } else if (tag_a === 256) {
                if (tag_b === 256) {
                  return Caml_primitive.caml_int_compare(a[1], b[1]);
                } else {
                  return -1;
                }
              } else if (tag_a === 248) {
                return Caml_primitive.caml_int_compare(a[1], b[1]);
              } else {
                if (tag_a === 251) {
                  throw [
                        Caml_builtin_exceptions.invalid_argument,
                        "equal: abstract value"
                      ];
                }
                if (tag_a !== tag_b) {
                  if (tag_a < tag_b) {
                    return -1;
                  } else {
                    return 1;
                  }
                } else {
                  var len_a = a.length | 0;
                  var len_b = b.length | 0;
                  if (len_a === len_b) {
                    if (Array.isArray(a)) {
                      var a$1 = a;
                      var b$1 = b;
                      var _i = 0;
                      var same_length = len_a;
                      while(true) {
                        var i = _i;
                        if (i === same_length) {
                          return 0;
                        } else {
                          var res = caml_compare(a$1[i], b$1[i]);
                          if (res !== 0) {
                            return res;
                          } else {
                            _i = i + 1 | 0;
                            continue ;
                          }
                        }
                      };
                    } else if ((a instanceof Date && b instanceof Date)) {
                      return (a - b);
                    } else {
                      var a$2 = a;
                      var b$2 = b;
                      var min_key_lhs = /* record */[/* contents */undefined];
                      var min_key_rhs = /* record */[/* contents */undefined];
                      var do_key = function (param, key) {
                        var min_key = param[2];
                        var b = param[1];
                        if (!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0) {
                          var match = min_key[0];
                          if (match !== undefined && key >= match) {
                            return 0;
                          } else {
                            min_key[0] = key;
                            return /* () */0;
                          }
                        } else {
                          return 0;
                        }
                      };
                      var partial_arg = /* tuple */[
                        a$2,
                        b$2,
                        min_key_rhs
                      ];
                      var do_key_a = (function(partial_arg){
                      return function do_key_a(param) {
                        return do_key(partial_arg, param);
                      }
                      }(partial_arg));
                      var partial_arg$1 = /* tuple */[
                        b$2,
                        a$2,
                        min_key_lhs
                      ];
                      var do_key_b = (function(partial_arg$1){
                      return function do_key_b(param) {
                        return do_key(partial_arg$1, param);
                      }
                      }(partial_arg$1));
                      for_in(a$2, do_key_a);
                      for_in(b$2, do_key_b);
                      var match = min_key_lhs[0];
                      var match$1 = min_key_rhs[0];
                      if (match !== undefined) {
                        if (match$1 !== undefined) {
                          return Caml_primitive.caml_string_compare(match, match$1);
                        } else {
                          return -1;
                        }
                      } else if (match$1 !== undefined) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }
                  } else if (len_a < len_b) {
                    var a$3 = a;
                    var b$3 = b;
                    var _i$1 = 0;
                    var short_length = len_a;
                    while(true) {
                      var i$1 = _i$1;
                      if (i$1 === short_length) {
                        return -1;
                      } else {
                        var res$1 = caml_compare(a$3[i$1], b$3[i$1]);
                        if (res$1 !== 0) {
                          return res$1;
                        } else {
                          _i$1 = i$1 + 1 | 0;
                          continue ;
                        }
                      }
                    };
                  } else {
                    var a$4 = a;
                    var b$4 = b;
                    var _i$2 = 0;
                    var short_length$1 = len_b;
                    while(true) {
                      var i$2 = _i$2;
                      if (i$2 === short_length$1) {
                        return 1;
                      } else {
                        var res$2 = caml_compare(a$4[i$2], b$4[i$2]);
                        if (res$2 !== 0) {
                          return res$2;
                        } else {
                          _i$2 = i$2 + 1 | 0;
                          continue ;
                        }
                      }
                    };
                  }
                }
              }
            }
        }
      }
      
    }
  };
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return true;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "equal: functional value"
              ];
        }
        if (b_type === "number" || b_type === "undefined" || b === null) {
          return false;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
          } else if (tag_a === 248) {
            return a[1] === b[1];
          } else {
            if (tag_a === 251) {
              throw [
                    Caml_builtin_exceptions.invalid_argument,
                    "equal: abstract value"
                  ];
            }
            if (tag_a !== tag_b) {
              return false;
            } else if (tag_a === 256) {
              return a[1] === b[1];
            } else {
              var len_a = a.length | 0;
              var len_b = b.length | 0;
              if (len_a === len_b) {
                if (Array.isArray(a)) {
                  var a$1 = a;
                  var b$1 = b;
                  var _i = 0;
                  var same_length = len_a;
                  while(true) {
                    var i = _i;
                    if (i === same_length) {
                      return true;
                    } else if (caml_equal(a$1[i], b$1[i])) {
                      _i = i + 1 | 0;
                      continue ;
                    } else {
                      return false;
                    }
                  };
                } else if ((a instanceof Date && b instanceof Date)) {
                  return !(a > b || a < b);
                } else {
                  var a$2 = a;
                  var b$2 = b;
                  var result = /* record */[/* contents */true];
                  var do_key_a = (function(b$2,result){
                  return function do_key_a(key) {
                    if (b$2.hasOwnProperty(key)) {
                      return 0;
                    } else {
                      result[0] = false;
                      return /* () */0;
                    }
                  }
                  }(b$2,result));
                  var do_key_b = (function(a$2,b$2,result){
                  return function do_key_b(key) {
                    if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
                      result[0] = false;
                      return /* () */0;
                    } else {
                      return 0;
                    }
                  }
                  }(a$2,b$2,result));
                  for_in(a$2, do_key_a);
                  if (result[0]) {
                    for_in(b$2, do_key_b);
                  }
                  return result[0];
                }
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  };
}

function caml_equal_null(x, y) {
  if (y !== null) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_undefined(x, y) {
  if (y !== undefined) {
    return caml_equal(x, y);
  } else {
    return x === y;
  }
}

function caml_equal_nullable(x, y) {
  if (y == null) {
    return x === y;
  } else {
    return caml_equal(x, y);
  }
}

function caml_notequal(a, b) {
  return !caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return caml_compare(a, b) >= 0;
}

function caml_greaterthan(a, b) {
  return caml_compare(a, b) > 0;
}

function caml_lessequal(a, b) {
  return caml_compare(a, b) <= 0;
}

function caml_lessthan(a, b) {
  return caml_compare(a, b) < 0;
}

function caml_min(x, y) {
  if (caml_compare(x, y) <= 0) {
    return x;
  } else {
    return y;
  }
}

function caml_max(x, y) {
  if (caml_compare(x, y) >= 0) {
    return x;
  } else {
    return y;
  }
}

function caml_obj_set_tag(prim, prim$1) {
  prim.tag = prim$1;
  return /* () */0;
}

exports.caml_obj_block = caml_obj_block;
exports.caml_obj_dup = caml_obj_dup;
exports.caml_obj_truncate = caml_obj_truncate;
exports.caml_lazy_make_forward = caml_lazy_make_forward;
exports.caml_update_dummy = caml_update_dummy;
exports.caml_compare = caml_compare;
exports.caml_equal = caml_equal;
exports.caml_equal_null = caml_equal_null;
exports.caml_equal_undefined = caml_equal_undefined;
exports.caml_equal_nullable = caml_equal_nullable;
exports.caml_notequal = caml_notequal;
exports.caml_greaterequal = caml_greaterequal;
exports.caml_greaterthan = caml_greaterthan;
exports.caml_lessthan = caml_lessthan;
exports.caml_lessequal = caml_lessequal;
exports.caml_min = caml_min;
exports.caml_max = caml_max;
exports.caml_obj_set_tag = caml_obj_set_tag;
/* No side effect */

},{"./block.js":2,"./caml_builtin_exceptions.js":5,"./caml_primitive.js":16}],15:[function(require,module,exports){
'use strict';


var undefinedHeader = /* array */[];

function some(x) {
  if (x === undefined) {
    var block = /* tuple */[
      undefinedHeader,
      0
    ];
    block.tag = 256;
    return block;
  } else if (x !== null && x[0] === undefinedHeader) {
    var nid = x[1] + 1 | 0;
    var block$1 = /* tuple */[
      undefinedHeader,
      nid
    ];
    block$1.tag = 256;
    return block$1;
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x === null || x === undefined) {
    return undefined;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return undefined;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return undefined;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (x !== null && x[0] === undefinedHeader) {
    var depth = x[1];
    if (depth === 0) {
      return undefined;
    } else {
      return /* tuple */[
              undefinedHeader,
              depth - 1 | 0
            ];
    }
  } else {
    return x;
  }
}

function option_get(x) {
  if (x === undefined) {
    return undefined;
  } else {
    return valFromOption(x);
  }
}

function option_get_unwrap(x) {
  if (x === undefined) {
    return undefined;
  } else {
    return valFromOption(x)[1];
  }
}

exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.option_get = option_get;
exports.option_get_unwrap = option_get_unwrap;
/* No side effect */

},{}],16:[function(require,module,exports){
'use strict';


function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while(true) {
    var off = _off;
    if (off < len) {
      var a = s1[off];
      var b = s2[off];
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        _off = off + 1 | 0;
        continue ;
      }
    } else {
      return def;
    }
  };
}

function caml_bytes_compare(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
  } else if (len1 < len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
  } else {
    return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
  }
}

function caml_bytes_equal(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    var s1$1 = s1;
    var s2$1 = s2;
    var _off = 0;
    var len = len1;
    while(true) {
      var off = _off;
      if (off === len) {
        return true;
      } else {
        var a = s1$1[off];
        var b = s2$1[off];
        if (a === b) {
          _off = off + 1 | 0;
          continue ;
        } else {
          return false;
        }
      }
    };
  } else {
    return false;
  }
}

function caml_bool_min(x, y) {
  if (x) {
    return y;
  } else {
    return x;
  }
}

function caml_int_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_nativeint_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_bool_max(x, y) {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_nativeint_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

var caml_nativeint_compare = caml_int_compare;

var caml_int32_compare = caml_int_compare;

exports.caml_bytes_compare = caml_bytes_compare;
exports.caml_bytes_equal = caml_bytes_equal;
exports.caml_int_compare = caml_int_compare;
exports.caml_bool_compare = caml_bool_compare;
exports.caml_float_compare = caml_float_compare;
exports.caml_nativeint_compare = caml_nativeint_compare;
exports.caml_string_compare = caml_string_compare;
exports.caml_int32_compare = caml_int32_compare;
exports.caml_bool_min = caml_bool_min;
exports.caml_int_min = caml_int_min;
exports.caml_float_min = caml_float_min;
exports.caml_string_min = caml_string_min;
exports.caml_nativeint_min = caml_nativeint_min;
exports.caml_int32_min = caml_int32_min;
exports.caml_bool_max = caml_bool_max;
exports.caml_int_max = caml_int_max;
exports.caml_float_max = caml_float_max;
exports.caml_string_max = caml_string_max;
exports.caml_nativeint_max = caml_nativeint_max;
exports.caml_int32_max = caml_int32_max;
/* No side effect */

},{}],17:[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_string_get(s, i) {
  if (i >= s.length || i < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return s.charCodeAt(i);
}

function caml_string_get16(s, i) {
  return s.charCodeAt(i) + (s.charCodeAt(i + 1 | 0) << 8) | 0;
}

function caml_string_get32(s, i) {
  return ((s.charCodeAt(i) + (s.charCodeAt(i + 1 | 0) << 8) | 0) + (s.charCodeAt(i + 2 | 0) << 16) | 0) + (s.charCodeAt(i + 3 | 0) << 24) | 0;
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  }
  return s.charCodeAt(i);
}

exports.caml_string_get = caml_string_get;
exports.caml_string_get16 = caml_string_get16;
exports.caml_string_get32 = caml_string_get32;
exports.get = get;
/* No side effect */

},{"./caml_builtin_exceptions.js":5}],18:[function(require,module,exports){
(function (process){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_sys_getenv(s) {
  if (typeof process === "undefined" || (process.env) === undefined) {
    throw Caml_builtin_exceptions.not_found;
  }
  var match = (process.env)[s];
  if (match !== undefined) {
    return match;
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function caml_sys_time(param) {
  if (typeof process === "undefined" || (process.uptime) === undefined) {
    return -1;
  } else {
    return process.uptime();
  }
}

function caml_sys_random_seed(param) {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}

function caml_sys_system_command(_cmd) {
  return 127;
}

function caml_sys_getcwd(param) {
  if (typeof process === "undefined") {
    return "/";
  } else {
    return process.cwd();
  }
}

function caml_sys_get_argv(param) {
  if (typeof process === "undefined") {
    return /* tuple */[
            "",
            /* array */[""]
          ];
  } else {
    var argv = (process.argv);
    if (argv == null) {
      return /* tuple */[
              "",
              /* array */[""]
            ];
    } else {
      return /* tuple */[
              argv[0],
              argv
            ];
    }
  }
}

function caml_sys_exit(exit_code) {
  if (typeof process !== "undefined") {
    return process.exit(exit_code);
  } else {
    return 0;
  }
}

function caml_sys_is_directory(_s) {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_is_directory not implemented"
      ];
}

function caml_sys_file_exists(_s) {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_file_exists not implemented"
      ];
}

exports.caml_sys_getenv = caml_sys_getenv;
exports.caml_sys_time = caml_sys_time;
exports.caml_sys_random_seed = caml_sys_random_seed;
exports.caml_sys_system_command = caml_sys_system_command;
exports.caml_sys_getcwd = caml_sys_getcwd;
exports.caml_sys_get_argv = caml_sys_get_argv;
exports.caml_sys_exit = caml_sys_exit;
exports.caml_sys_is_directory = caml_sys_is_directory;
exports.caml_sys_file_exists = caml_sys_file_exists;
/* No side effect */

}).call(this,require('_process'))
},{"./caml_builtin_exceptions.js":5,"_process":40}],19:[function(require,module,exports){
'use strict';


function repeat (count,self){
    if (self.repeat){
        return self.repeat(count)
    }
    if (self.length == 0 || count == 0) {
            return '';
        }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (self.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
            if ((count & 1) == 1) {
                rpt += self;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            self += self;
    }
    return rpt;

};

exports.repeat = repeat;
/* No side effect */

},{}],20:[function(require,module,exports){
'use strict';

var Block = require("./block.js");

function erase_rel(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */Block.__(0, [erase_rel(param[0])]);
      case 1 : 
          return /* String_ty */Block.__(1, [erase_rel(param[0])]);
      case 2 : 
          return /* Int_ty */Block.__(2, [erase_rel(param[0])]);
      case 3 : 
          return /* Int32_ty */Block.__(3, [erase_rel(param[0])]);
      case 4 : 
          return /* Nativeint_ty */Block.__(4, [erase_rel(param[0])]);
      case 5 : 
          return /* Int64_ty */Block.__(5, [erase_rel(param[0])]);
      case 6 : 
          return /* Float_ty */Block.__(6, [erase_rel(param[0])]);
      case 7 : 
          return /* Bool_ty */Block.__(7, [erase_rel(param[0])]);
      case 8 : 
          return /* Format_arg_ty */Block.__(8, [
                    param[0],
                    erase_rel(param[1])
                  ]);
      case 9 : 
          var ty1 = param[0];
          return /* Format_subst_ty */Block.__(9, [
                    ty1,
                    ty1,
                    erase_rel(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */Block.__(10, [erase_rel(param[0])]);
      case 11 : 
          return /* Theta_ty */Block.__(11, [erase_rel(param[0])]);
      case 12 : 
          return /* Any_ty */Block.__(12, [erase_rel(param[0])]);
      case 13 : 
          return /* Reader_ty */Block.__(13, [erase_rel(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */Block.__(14, [erase_rel(param[0])]);
      
    }
  }
}

function concat_fmtty(fmtty1, fmtty2) {
  if (typeof fmtty1 === "number") {
    return fmtty2;
  } else {
    switch (fmtty1.tag | 0) {
      case 0 : 
          return /* Char_ty */Block.__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 1 : 
          return /* String_ty */Block.__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 2 : 
          return /* Int_ty */Block.__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 3 : 
          return /* Int32_ty */Block.__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 4 : 
          return /* Nativeint_ty */Block.__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 5 : 
          return /* Int64_ty */Block.__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 6 : 
          return /* Float_ty */Block.__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 7 : 
          return /* Bool_ty */Block.__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 8 : 
          return /* Format_arg_ty */Block.__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case 9 : 
          return /* Format_subst_ty */Block.__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case 10 : 
          return /* Alpha_ty */Block.__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 11 : 
          return /* Theta_ty */Block.__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 12 : 
          return /* Any_ty */Block.__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 13 : 
          return /* Reader_ty */Block.__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 14 : 
          return /* Ignored_reader_ty */Block.__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }
}

function concat_fmt(fmt1, fmt2) {
  if (typeof fmt1 === "number") {
    return fmt2;
  } else {
    switch (fmt1.tag | 0) {
      case 0 : 
          return /* Char */Block.__(0, [concat_fmt(fmt1[0], fmt2)]);
      case 1 : 
          return /* Caml_char */Block.__(1, [concat_fmt(fmt1[0], fmt2)]);
      case 2 : 
          return /* String */Block.__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 3 : 
          return /* Caml_string */Block.__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 4 : 
          return /* Int */Block.__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 5 : 
          return /* Int32 */Block.__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 6 : 
          return /* Nativeint */Block.__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 7 : 
          return /* Int64 */Block.__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 8 : 
          return /* Float */Block.__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 9 : 
          return /* Bool */Block.__(9, [concat_fmt(fmt1[0], fmt2)]);
      case 10 : 
          return /* Flush */Block.__(10, [concat_fmt(fmt1[0], fmt2)]);
      case 11 : 
          return /* String_literal */Block.__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 12 : 
          return /* Char_literal */Block.__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 13 : 
          return /* Format_arg */Block.__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 14 : 
          return /* Format_subst */Block.__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 15 : 
          return /* Alpha */Block.__(15, [concat_fmt(fmt1[0], fmt2)]);
      case 16 : 
          return /* Theta */Block.__(16, [concat_fmt(fmt1[0], fmt2)]);
      case 17 : 
          return /* Formatting_lit */Block.__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 18 : 
          return /* Formatting_gen */Block.__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 19 : 
          return /* Reader */Block.__(19, [concat_fmt(fmt1[0], fmt2)]);
      case 20 : 
          return /* Scan_char_set */Block.__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 21 : 
          return /* Scan_get_counter */Block.__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 22 : 
          return /* Scan_next_char */Block.__(22, [concat_fmt(fmt1[0], fmt2)]);
      case 23 : 
          return /* Ignored_param */Block.__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 24 : 
          return /* Custom */Block.__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
}

exports.concat_fmtty = concat_fmtty;
exports.erase_rel = erase_rel;
exports.concat_fmt = concat_fmt;
/* No side effect */

},{"./block.js":2}],21:[function(require,module,exports){
'use strict';

var Caml_bytes = require("./caml_bytes.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function chr(n) {
  if (n < 0 || n > 255) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Char.chr"
        ];
  }
  return n;
}

function escaped(c) {
  var exit = 0;
  if (c >= 40) {
    if (c !== 92) {
      exit = c >= 127 ? 1 : 2;
    } else {
      return "\\\\";
    }
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    } else {
      exit = 2;
    }
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 : 
          return "\\b";
      case 9 : 
          return "\\t";
      case 10 : 
          return "\\n";
      case 0 : 
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 11 : 
      case 12 : 
          exit = 1;
          break;
      case 13 : 
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 : 
        var s = [
          0,
          0,
          0,
          0
        ];
        s[0] = /* "\\" */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return Caml_bytes.bytes_to_string(s);
    case 2 : 
        var s$1 = [0];
        s$1[0] = c;
        return Caml_bytes.bytes_to_string(s$1);
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase(c) {
  if (c >= /* "a" */97 && c <= /* "z" */122 || c >= /* "\224" */224 && c <= /* "\246" */246 || c >= /* "\248" */248 && c <= /* "\254" */254) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function compare(c1, c2) {
  return c1 - c2 | 0;
}

exports.chr = chr;
exports.escaped = escaped;
exports.lowercase = lowercase;
exports.uppercase = uppercase;
exports.compare = compare;
/* No side effect */

},{"./caml_builtin_exceptions.js":5,"./caml_bytes.js":6}],22:[function(require,module,exports){
'use strict';

var Caml_array = require("./caml_array.js");

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    } else if (d < 0) {
      _args = Caml_array.caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
      continue ;
    } else {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat(/* array */[x]));
      }
      }(f,args));
    }
  };
}

function curry_1(o, a0, arity) {
  switch (arity) {
    case 1 : 
        return o(a0);
    case 2 : 
        return (function (param) {
            return o(a0, param);
          });
    case 3 : 
        return (function (param, param$1) {
            return o(a0, param, param$1);
          });
    case 4 : 
        return (function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          });
    case 5 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          });
    case 6 : 
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          });
    default:
      return app(o, /* array */[a0]);
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return (function (a0) {
        return _1(o, a0);
      });
  }
}

function curry_2(o, a0, a1, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[a1]);
    case 2 : 
        return o(a0, a1);
    case 3 : 
        return (function (param) {
            return o(a0, a1, param);
          });
    case 4 : 
        return (function (param, param$1) {
            return o(a0, a1, param, param$1);
          });
    case 5 : 
        return (function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          });
    case 6 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1
                ]);
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return (function (a0, a1) {
        return _2(o, a0, a1);
      });
  }
}

function curry_3(o, a0, a1, a2, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[a2]);
    case 3 : 
        return o(a0, a1, a2);
    case 4 : 
        return (function (param) {
            return o(a0, a1, a2, param);
          });
    case 5 : 
        return (function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          });
    case 6 : 
        return (function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2
                ]);
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    return curry_3(o, a0, a1, a2, arity);
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return (function (a0, a1, a2) {
        return _3(o, a0, a1, a2);
      });
  }
}

function curry_4(o, a0, a1, a2, a3, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2,
                    a3
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[
                    a2,
                    a3
                  ]);
    case 3 : 
        return app(o(a0, a1, a2), /* array */[a3]);
    case 4 : 
        return o(a0, a1, a2, a3);
    case 5 : 
        return (function (param) {
            return o(a0, a1, a2, a3, param);
          });
    case 6 : 
        return (function (param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          });
    case 7 : 
        return (function (param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3
                ]);
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    return curry_4(o, a0, a1, a2, a3, arity);
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return (function (a0, a1, a2, a3) {
        return _4(o, a0, a1, a2, a3);
      });
  }
}

function curry_5(o, a0, a1, a2, a3, a4, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2,
                    a3,
                    a4
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[
                    a2,
                    a3,
                    a4
                  ]);
    case 3 : 
        return app(o(a0, a1, a2), /* array */[
                    a3,
                    a4
                  ]);
    case 4 : 
        return app(o(a0, a1, a2, a3), /* array */[a4]);
    case 5 : 
        return o(a0, a1, a2, a3, a4);
    case 6 : 
        return (function (param) {
            return o(a0, a1, a2, a3, a4, param);
          });
    case 7 : 
        return (function (param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4
                ]);
  }
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    return curry_5(o, a0, a1, a2, a3, a4, arity);
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4) {
        return _5(o, a0, a1, a2, a3, a4);
      });
  }
}

function curry_6(o, a0, a1, a2, a3, a4, a5, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2,
                    a3,
                    a4,
                    a5
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[
                    a2,
                    a3,
                    a4,
                    a5
                  ]);
    case 3 : 
        return app(o(a0, a1, a2), /* array */[
                    a3,
                    a4,
                    a5
                  ]);
    case 4 : 
        return app(o(a0, a1, a2, a3), /* array */[
                    a4,
                    a5
                  ]);
    case 5 : 
        return app(o(a0, a1, a2, a3, a4), /* array */[a5]);
    case 6 : 
        return o(a0, a1, a2, a3, a4, a5);
    case 7 : 
        return (function (param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4,
                  a5
                ]);
  }
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    return curry_6(o, a0, a1, a2, a3, a4, a5, arity);
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5) {
        return _6(o, a0, a1, a2, a3, a4, a5);
      });
  }
}

function curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[
                    a2,
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    case 3 : 
        return app(o(a0, a1, a2), /* array */[
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    case 4 : 
        return app(o(a0, a1, a2, a3), /* array */[
                    a4,
                    a5,
                    a6
                  ]);
    case 5 : 
        return app(o(a0, a1, a2, a3, a4), /* array */[
                    a5,
                    a6
                  ]);
    case 6 : 
        return app(o(a0, a1, a2, a3, a4, a5), /* array */[a6]);
    case 7 : 
        return o(a0, a1, a2, a3, a4, a5, a6);
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4,
                  a5,
                  a6
                ]);
  }
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    return curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity);
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6) {
        return _7(o, a0, a1, a2, a3, a4, a5, a6);
      });
  }
}

function curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    case 3 : 
        return app(o(a0, a1, a2), /* array */[
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    case 4 : 
        return app(o(a0, a1, a2, a3), /* array */[
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    case 5 : 
        return app(o(a0, a1, a2, a3, a4), /* array */[
                    a5,
                    a6,
                    a7
                  ]);
    case 6 : 
        return app(o(a0, a1, a2, a3, a4, a5), /* array */[
                    a6,
                    a7
                  ]);
    case 7 : 
        return app(o(a0, a1, a2, a3, a4, a5, a6), /* array */[a7]);
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4,
                  a5,
                  a6,
                  a7
                ]);
  }
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    return curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity);
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
      });
  }
}

exports.app = app;
exports.curry_1 = curry_1;
exports._1 = _1;
exports.__1 = __1;
exports.curry_2 = curry_2;
exports._2 = _2;
exports.__2 = __2;
exports.curry_3 = curry_3;
exports._3 = _3;
exports.__3 = __3;
exports.curry_4 = curry_4;
exports._4 = _4;
exports.__4 = __4;
exports.curry_5 = curry_5;
exports._5 = _5;
exports.__5 = __5;
exports.curry_6 = curry_6;
exports._6 = _6;
exports.__6 = __6;
exports.curry_7 = curry_7;
exports._7 = _7;
exports.__7 = __7;
exports.curry_8 = curry_8;
exports._8 = _8;
exports.__8 = __8;
/* No side effect */

},{"./caml_array.js":4}],23:[function(require,module,exports){
'use strict';

var Caml_option = require("./caml_option.js");

function get(dict, k) {
  if ((k in dict)) {
    return Caml_option.some(dict[k]);
  }
  
}

function unsafeDeleteKey (dict,key){
     delete dict[key];
     return 0
  };

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    values[i] = /* tuple */[
      key,
      dict[key]
    ];
  }
  return values;
}

function values(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values$1 = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    values$1[i] = dict[keys[i]];
  }
  return values$1;
}

function fromList(entries) {
  var dict = { };
  var _param = entries;
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      dict[match[0]] = match[1];
      _param = param[1];
      continue ;
    } else {
      return dict;
    }
  };
}

function fromArray(entries) {
  var dict = { };
  var l = entries.length;
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var match = entries[i];
    dict[match[0]] = match[1];
  }
  return dict;
}

function map(f, source) {
  var target = { };
  var keys = Object.keys(source);
  var l = keys.length;
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    target[key] = f(source[key]);
  }
  return target;
}

exports.get = get;
exports.unsafeDeleteKey = unsafeDeleteKey;
exports.entries = entries;
exports.values = values;
exports.fromList = fromList;
exports.fromArray = fromArray;
exports.map = map;
/* No side effect */

},{"./caml_option.js":15}],24:[function(require,module,exports){
'use strict';

var Block = require("./block.js");
var Caml_option = require("./caml_option.js");

function classify(x) {
  var ty = typeof x;
  if (ty === "string") {
    return /* JSONString */Block.__(0, [x]);
  } else if (ty === "number") {
    return /* JSONNumber */Block.__(1, [x]);
  } else if (ty === "boolean") {
    if (x === true) {
      return /* JSONTrue */1;
    } else {
      return /* JSONFalse */0;
    }
  } else if (x === null) {
    return /* JSONNull */2;
  } else if (Array.isArray(x)) {
    return /* JSONArray */Block.__(3, [x]);
  } else {
    return /* JSONObject */Block.__(2, [x]);
  }
}

function test(x, v) {
  switch (v) {
    case 0 : 
        return typeof x === "string";
    case 1 : 
        return typeof x === "number";
    case 2 : 
        if (x !== null && typeof x === "object") {
          return !Array.isArray(x);
        } else {
          return false;
        }
    case 3 : 
        return Array.isArray(x);
    case 4 : 
        return typeof x === "boolean";
    case 5 : 
        return x === null;
    
  }
}

function decodeString(json) {
  if (typeof json === "string") {
    return json;
  }
  
}

function decodeNumber(json) {
  if (typeof json === "number") {
    return json;
  }
  
}

function decodeObject(json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    return Caml_option.some(json);
  }
  
}

function decodeArray(json) {
  if (Array.isArray(json)) {
    return json;
  }
  
}

function decodeBoolean(json) {
  if (typeof json === "boolean") {
    return json;
  }
  
}

function decodeNull(json) {
  if (json === null) {
    return null;
  }
  
}

exports.classify = classify;
exports.test = test;
exports.decodeString = decodeString;
exports.decodeNumber = decodeNumber;
exports.decodeObject = decodeObject;
exports.decodeArray = decodeArray;
exports.decodeBoolean = decodeBoolean;
exports.decodeNull = decodeNull;
/* No side effect */

},{"./block.js":2,"./caml_option.js":15}],25:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_obj = require("./caml_obj.js");
var Pervasives = require("./pervasives.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
    } else {
      return len;
    }
  };
}

function hd(param) {
  if (param) {
    return param[0];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "hd"
        ];
  }
}

function tl(param) {
  if (param) {
    return param[1];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "tl"
        ];
  }
}

function nth(l, n) {
  if (n < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.nth"
        ];
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (l$1) {
      if (n$1 === 0) {
        return l$1[0];
      } else {
        _n = n$1 - 1 | 0;
        _l = l$1[1];
        continue ;
      }
    } else {
      throw [
            Caml_builtin_exceptions.failure,
            "nth"
          ];
    }
  };
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
    } else {
      return l2;
    }
  };
}

function rev(l) {
  return rev_append(l, /* [] */0);
}

function flatten(param) {
  if (param) {
    return Pervasives.$at(param[0], flatten(param[1]));
  } else {
    return /* [] */0;
  }
}

function map(f, param) {
  if (param) {
    var r = Curry._1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi(i, f, param) {
  if (param) {
    var r = Curry._2(f, i, param[0]);
    return /* :: */[
            r,
            mapi(i + 1 | 0, f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function rev_map(f, l) {
  var _accu = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = /* :: */[
        Curry._1(f, param[0]),
        accu
      ];
      continue ;
    } else {
      return accu;
    }
  };
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      Curry._1(f, param[0]);
      _param = param[1];
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function iteri(f, l) {
  var _i = 0;
  var f$1 = f;
  var _param = l;
  while(true) {
    var param = _param;
    var i = _i;
    if (param) {
      Curry._2(f$1, i, param[0]);
      _param = param[1];
      _i = i + 1 | 0;
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = Curry._2(f, accu, l[0]);
      continue ;
    } else {
      return accu;
    }
  };
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l[0], fold_right(f, l[1], accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1[0], l2[0]);
      return /* :: */[
              r,
              map2(f, l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.map2"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.map2"
        ];
  } else {
    return /* [] */0;
  }
}

function rev_map2(f, l1, l2) {
  var _accu = /* [] */0;
  var _l1 = l1;
  var _l2 = l2;
  while(true) {
    var l2$1 = _l2;
    var l1$1 = _l1;
    var accu = _accu;
    if (l1$1) {
      if (l2$1) {
        _l2 = l2$1[1];
        _l1 = l1$1[1];
        _accu = /* :: */[
          Curry._2(f, l1$1[0], l2$1[0]),
          accu
        ];
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.rev_map2"
            ];
      }
    } else {
      if (l2$1) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.rev_map2"
            ];
      }
      return accu;
    }
  };
}

function iter2(f, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        Curry._2(f, l1[0], l2[0]);
        _l2 = l2[1];
        _l1 = l1[1];
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.iter2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.iter2"
          ];
    } else {
      return /* () */0;
    }
  };
}

function fold_left2(f, _accu, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;
    if (l1) {
      if (l2) {
        _l2 = l2[1];
        _l1 = l1[1];
        _accu = Curry._3(f, accu, l1[0], l2[0]);
        continue ;
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.fold_left2"
            ];
      }
    } else {
      if (l2) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.fold_left2"
            ];
      }
      return accu;
    }
  };
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1[0], l2[0], fold_right2(f, l1[1], l2[1], accu));
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_right2"
          ];
    }
  } else {
    if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_right2"
          ];
    }
    return accu;
  }
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        _param = param[1];
        continue ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function for_all2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
        } else {
          return false;
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.for_all2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.for_all2"
          ];
    } else {
      return true;
    }
  };
}

function exists2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          return true;
        } else {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.exists2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.exists2"
          ];
    } else {
      return false;
    }
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_equal(param[0], x)) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function memq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0] === x) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (match[0] === x) {
        return match[1];
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function mem_assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_equal(param[0][0], x)) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function mem_assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0][0] === x) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function remove_assoc(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (Caml_obj.caml_equal(pair[0], x)) {
      return l;
    } else {
      return /* :: */[
              pair,
              remove_assoc(x, l)
            ];
    }
  } else {
    return /* [] */0;
  }
}

function remove_assq(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (pair[0] === x) {
      return l;
    } else {
      return /* :: */[
              pair,
              remove_assq(x, l)
            ];
    }
  } else {
    return /* [] */0;
  }
}

function find(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param[0];
      if (Curry._1(p, x)) {
        return x;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (Curry._1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
          } else {
            _param = l;
            continue ;
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      };
    });
}

function partition(p, l) {
  var _yes = /* [] */0;
  var _no = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var no = _no;
    var yes = _yes;
    if (param) {
      var l$1 = param[1];
      var x = param[0];
      if (Curry._1(p, x)) {
        _param = l$1;
        _yes = /* :: */[
          x,
          yes
        ];
        continue ;
      } else {
        _param = l$1;
        _no = /* :: */[
          x,
          no
        ];
        continue ;
      }
    } else {
      return /* tuple */[
              rev_append(yes, /* [] */0),
              rev_append(no, /* [] */0)
            ];
    }
  };
}

function split(param) {
  if (param) {
    var match = param[0];
    var match$1 = split(param[1]);
    return /* tuple */[
            /* :: */[
              match[0],
              match$1[0]
            ],
            /* :: */[
              match[1],
              match$1[1]
            ]
          ];
  } else {
    return /* tuple */[
            /* [] */0,
            /* [] */0
          ];
  }
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return /* :: */[
              /* tuple */[
                l1[0],
                l2[0]
              ],
              combine(l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.combine"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.combine"
        ];
  } else {
    return /* [] */0;
  }
}

function merge(cmp, l1, l2) {
  if (l1) {
    if (l2) {
      var h2 = l2[0];
      var h1 = l1[0];
      if (Curry._2(cmp, h1, h2) <= 0) {
        return /* :: */[
                h1,
                merge(cmp, l1[1], l2)
              ];
      } else {
        return /* :: */[
                h2,
                merge(cmp, l1, l2[1])
              ];
      }
    } else {
      return l1;
    }
  } else {
    return l2;
  }
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k === 0) {
      return l;
    } else if (l) {
      _l = l[1];
      _k = k - 1 | 0;
      continue ;
    } else {
      throw [
            Caml_builtin_exceptions.assert_failure,
            /* tuple */[
              "list.ml",
              223,
              11
            ]
          ];
    }
  };
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3 || !l) {
        exit = 1;
      } else {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (Curry._2(cmp, h1, h2) > 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var rev_sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3 || !l) {
        exit = 1;
      } else {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (Curry._2(cmp, h1, h2) <= 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3 || !l) {
        exit = 1;
      } else {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              } else if (c$1 < 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              }
            } else if (c < 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              } else if (c$2 < 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$3 < 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            } else {
              var c$4 = Curry._2(cmp, x1, x3);
              if (c$4 === 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ];
              } else if (c$4 < 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$5 = Curry._2(cmp, x2, x3);
                if (c$5 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$5 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        } else if (c$6 < 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = Curry._2(cmp, h1, h2);
            if (c$7 === 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
            } else if (c$7 > 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = t1;
              continue ;
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = t2;
              continue ;
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var rev_sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3 || !l) {
        exit = 1;
      } else {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              } else if (c$1 > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              }
            } else if (c > 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* [] */0
                        ]
                      ];
              } else if (c$2 > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$3 > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            } else {
              var c$4 = Curry._2(cmp, x1, x3);
              if (c$4 === 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ];
              } else if (c$4 > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                var c$5 = Curry._2(cmp, x2, x3);
                if (c$5 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$5 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              }
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        } else if (c$6 > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = Curry._2(cmp, h1, h2);
            if (c$7 === 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
            } else if (c$7 < 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = t1;
              continue ;
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = t2;
              continue ;
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

var append = Pervasives.$at;

var concat = flatten;

var filter = find_all;

var sort = stable_sort;

var fast_sort = stable_sort;

exports.length = length;
exports.hd = hd;
exports.tl = tl;
exports.nth = nth;
exports.rev = rev;
exports.append = append;
exports.rev_append = rev_append;
exports.concat = concat;
exports.flatten = flatten;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi$1;
exports.rev_map = rev_map;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.iter2 = iter2;
exports.map2 = map2;
exports.rev_map2 = rev_map2;
exports.fold_left2 = fold_left2;
exports.fold_right2 = fold_right2;
exports.for_all = for_all;
exports.exists = exists;
exports.for_all2 = for_all2;
exports.exists2 = exists2;
exports.mem = mem;
exports.memq = memq;
exports.find = find;
exports.filter = filter;
exports.find_all = find_all;
exports.partition = partition;
exports.assoc = assoc;
exports.assq = assq;
exports.mem_assoc = mem_assoc;
exports.mem_assq = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq = remove_assq;
exports.split = split;
exports.combine = combine;
exports.sort = sort;
exports.stable_sort = stable_sort;
exports.fast_sort = fast_sort;
exports.sort_uniq = sort_uniq;
exports.merge = merge;
/* No side effect */

},{"./caml_builtin_exceptions.js":5,"./caml_obj.js":14,"./curry.js":22,"./pervasives.js":26}],26:[function(require,module,exports){
'use strict';

var Curry = require("./curry.js");
var Caml_io = require("./caml_io.js");
var Caml_sys = require("./caml_sys.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_format = require("./caml_format.js");
var Caml_string = require("./caml_string.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_external_polyfill = require("./caml_external_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");
var CamlinternalFormatBasics = require("./camlinternalFormatBasics.js");

function failwith(s) {
  throw [
        Caml_builtin_exceptions.failure,
        s
      ];
}

function invalid_arg(s) {
  throw [
        Caml_builtin_exceptions.invalid_argument,
        s
      ];
}

var Exit = Caml_exceptions.create("Pervasives.Exit");

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

function lnot(x) {
  return x ^ -1;
}

var min_int = -2147483648;

function classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.2250738585072014e-308) {
      return /* FP_normal */0;
    } else if (x !== 0) {
      return /* FP_subnormal */1;
    } else {
      return /* FP_zero */2;
    }
  } else if (isNaN(x)) {
    return /* FP_nan */4;
  } else {
    return /* FP_infinite */3;
  }
}

function char_of_int(n) {
  if (n < 0 || n > 255) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "char_of_int"
        ];
  }
  return n;
}

function string_of_bool(b) {
  if (b) {
    return "true";
  } else {
    return "false";
  }
}

function bool_of_string(param) {
  switch (param) {
    case "false" : 
        return false;
    case "true" : 
        return true;
    default:
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "bool_of_string"
          ];
  }
}

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= l) {
      return s + ".";
    } else {
      var match = Caml_string.get(s, i);
      if (match >= 48) {
        if (match >= 58) {
          return s;
        } else {
          _i = i + 1 | 0;
          continue ;
        }
      } else if (match !== 45) {
        return s;
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }
  };
}

function string_of_float(f) {
  return valid_float_lexem(Caml_format.caml_format_float("%.12g", f));
}

function $at(l1, l2) {
  if (l1) {
    return /* :: */[
            l1[0],
            $at(l1[1], l2)
          ];
  } else {
    return l2;
  }
}

var stdin = Caml_io.stdin;

var stdout = Caml_io.stdout;

var stderr = Caml_io.stderr;

function open_out_gen(mode, perm, name) {
  return Caml_external_polyfill.resolve("caml_ml_open_descriptor_out")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
}

function open_out(name) {
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_text */7,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function open_out_bin(name) {
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_binary */6,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function flush_all(param) {
  var _param = Caml_io.caml_ml_out_channels_list(/* () */0);
  while(true) {
    var param$1 = _param;
    if (param$1) {
      try {
        Caml_io.caml_ml_flush(param$1[0]);
      }
      catch (exn){
        
      }
      _param = param$1[1];
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function output_bytes(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output_string(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output"
        ];
  }
  return Caml_io.caml_ml_output(oc, s, ofs, len);
}

function output_substring(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output_substring"
        ];
  }
  return Caml_io.caml_ml_output(oc, s, ofs, len);
}

function output_value(chan, v) {
  return Caml_external_polyfill.resolve("caml_output_value")(chan, v, /* [] */0);
}

function close_out(oc) {
  Caml_io.caml_ml_flush(oc);
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
}

function close_out_noerr(oc) {
  try {
    Caml_io.caml_ml_flush(oc);
  }
  catch (exn){
    
  }
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(oc);
  }
  catch (exn$1){
    return /* () */0;
  }
}

function open_in_gen(mode, perm, name) {
  return Caml_external_polyfill.resolve("caml_ml_open_descriptor_in")(Caml_external_polyfill.resolve("caml_sys_open")(name, mode, perm));
}

function open_in(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_text */7,
                /* [] */0
              ]
            ], 0, name);
}

function open_in_bin(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_binary */6,
                /* [] */0
              ]
            ], 0, name);
}

function input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "input"
        ];
  }
  return Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
}

function unsafe_really_input(ic, s, _ofs, _len) {
  while(true) {
    var len = _len;
    var ofs = _ofs;
    if (len <= 0) {
      return /* () */0;
    } else {
      var r = Caml_external_polyfill.resolve("caml_ml_input")(ic, s, ofs, len);
      if (r === 0) {
        throw Caml_builtin_exceptions.end_of_file;
      }
      _len = len - r | 0;
      _ofs = ofs + r | 0;
      continue ;
    }
  };
}

function really_input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "really_input"
        ];
  }
  return unsafe_really_input(ic, s, ofs, len);
}

function really_input_string(ic, len) {
  var s = Caml_bytes.caml_create_bytes(len);
  really_input(ic, s, 0, len);
  return Caml_bytes.bytes_to_string(s);
}

function input_line(chan) {
  var build_result = function (buf, _pos, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (param) {
        var hd = param[0];
        var len = hd.length;
        Caml_bytes.caml_blit_bytes(hd, 0, buf, pos - len | 0, len);
        _param = param[1];
        _pos = pos - len | 0;
        continue ;
      } else {
        return buf;
      }
    };
  };
  var scan = function (_accu, _len) {
    while(true) {
      var len = _len;
      var accu = _accu;
      var n = Caml_external_polyfill.resolve("caml_ml_input_scan_line")(chan);
      if (n === 0) {
        if (accu) {
          return build_result(Caml_bytes.caml_create_bytes(len), len, accu);
        } else {
          throw Caml_builtin_exceptions.end_of_file;
        }
      } else if (n > 0) {
        var res = Caml_bytes.caml_create_bytes(n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, res, 0, n - 1 | 0);
        Caml_external_polyfill.resolve("caml_ml_input_char")(chan);
        if (accu) {
          var len$1 = (len + n | 0) - 1 | 0;
          return build_result(Caml_bytes.caml_create_bytes(len$1), len$1, /* :: */[
                      res,
                      accu
                    ]);
        } else {
          return res;
        }
      } else {
        var beg = Caml_bytes.caml_create_bytes(-n | 0);
        Caml_external_polyfill.resolve("caml_ml_input")(chan, beg, 0, -n | 0);
        _len = len - n | 0;
        _accu = /* :: */[
          beg,
          accu
        ];
        continue ;
      }
    };
  };
  return Caml_bytes.bytes_to_string(scan(/* [] */0, 0));
}

function close_in_noerr(ic) {
  try {
    return Caml_external_polyfill.resolve("caml_ml_close_channel")(ic);
  }
  catch (exn){
    return /* () */0;
  }
}

function print_char(c) {
  return Caml_io.caml_ml_output_char(stdout, c);
}

function print_string(s) {
  return output_string(stdout, s);
}

function print_bytes(s) {
  return output_bytes(stdout, s);
}

function print_int(i) {
  return output_string(stdout, String(i));
}

function print_float(f) {
  return output_string(stdout, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function print_newline(param) {
  Caml_io.caml_ml_output_char(stdout, /* "\n" */10);
  return Caml_io.caml_ml_flush(stdout);
}

function prerr_char(c) {
  return Caml_io.caml_ml_output_char(stderr, c);
}

function prerr_string(s) {
  return output_string(stderr, s);
}

function prerr_bytes(s) {
  return output_bytes(stderr, s);
}

function prerr_int(i) {
  return output_string(stderr, String(i));
}

function prerr_float(f) {
  return output_string(stderr, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function prerr_newline(param) {
  Caml_io.caml_ml_output_char(stderr, /* "\n" */10);
  return Caml_io.caml_ml_flush(stderr);
}

function read_line(param) {
  Caml_io.caml_ml_flush(stdout);
  return input_line(stdin);
}

function read_int(param) {
  return Caml_format.caml_int_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float(param) {
  return Caml_format.caml_float_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function string_of_format(param) {
  return param[1];
}

function $caret$caret(param, param$1) {
  return /* Format */[
          CamlinternalFormatBasics.concat_fmt(param[0], param$1[0]),
          param[1] + ("%," + param$1[1])
        ];
}

var exit_function = /* record */[/* contents */flush_all];

function at_exit(f) {
  var g = exit_function[0];
  exit_function[0] = (function (param) {
      Curry._1(f, /* () */0);
      return Curry._1(g, /* () */0);
    });
  return /* () */0;
}

function do_at_exit(param) {
  return Curry._1(exit_function[0], /* () */0);
}

function exit(retcode) {
  do_at_exit(/* () */0);
  return Caml_sys.caml_sys_exit(retcode);
}

var max_int = 2147483647;

var epsilon_float = 2.220446049250313e-16;

var flush = Caml_io.caml_ml_flush;

var output_char = Caml_io.caml_ml_output_char;

var output_byte = Caml_io.caml_ml_output_char;

function output_binary_int(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_output_int")(prim, prim$1);
}

function seek_out(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out")(prim, prim$1);
}

function pos_out(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out")(prim);
}

function out_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function set_binary_mode_out(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim, prim$1);
}

function input_char(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_byte(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_char")(prim);
}

function input_binary_int(prim) {
  return Caml_external_polyfill.resolve("caml_ml_input_int")(prim);
}

function input_value(prim) {
  return Caml_external_polyfill.resolve("caml_input_value")(prim);
}

function seek_in(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in")(prim, prim$1);
}

function pos_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in")(prim);
}

function in_channel_length(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size")(prim);
}

function close_in(prim) {
  return Caml_external_polyfill.resolve("caml_ml_close_channel")(prim);
}

function set_binary_mode_in(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_set_binary_mode")(prim, prim$1);
}

function LargeFile_000(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_out_64")(prim, prim$1);
}

function LargeFile_001(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_out_64")(prim);
}

function LargeFile_002(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

function LargeFile_003(prim, prim$1) {
  return Caml_external_polyfill.resolve("caml_ml_seek_in_64")(prim, prim$1);
}

function LargeFile_004(prim) {
  return Caml_external_polyfill.resolve("caml_ml_pos_in_64")(prim);
}

function LargeFile_005(prim) {
  return Caml_external_polyfill.resolve("caml_ml_channel_size_64")(prim);
}

var LargeFile = [
  LargeFile_000,
  LargeFile_001,
  LargeFile_002,
  LargeFile_003,
  LargeFile_004,
  LargeFile_005
];

exports.invalid_arg = invalid_arg;
exports.failwith = failwith;
exports.Exit = Exit;
exports.abs = abs;
exports.max_int = max_int;
exports.min_int = min_int;
exports.lnot = lnot;
exports.epsilon_float = epsilon_float;
exports.classify_float = classify_float;
exports.char_of_int = char_of_int;
exports.string_of_bool = string_of_bool;
exports.bool_of_string = bool_of_string;
exports.string_of_float = string_of_float;
exports.$at = $at;
exports.stdin = stdin;
exports.stdout = stdout;
exports.stderr = stderr;
exports.print_char = print_char;
exports.print_string = print_string;
exports.print_bytes = print_bytes;
exports.print_int = print_int;
exports.print_float = print_float;
exports.print_newline = print_newline;
exports.prerr_char = prerr_char;
exports.prerr_string = prerr_string;
exports.prerr_bytes = prerr_bytes;
exports.prerr_int = prerr_int;
exports.prerr_float = prerr_float;
exports.prerr_newline = prerr_newline;
exports.read_line = read_line;
exports.read_int = read_int;
exports.read_float = read_float;
exports.open_out = open_out;
exports.open_out_bin = open_out_bin;
exports.open_out_gen = open_out_gen;
exports.flush = flush;
exports.flush_all = flush_all;
exports.output_char = output_char;
exports.output_string = output_string;
exports.output_bytes = output_bytes;
exports.output = output;
exports.output_substring = output_substring;
exports.output_byte = output_byte;
exports.output_binary_int = output_binary_int;
exports.output_value = output_value;
exports.seek_out = seek_out;
exports.pos_out = pos_out;
exports.out_channel_length = out_channel_length;
exports.close_out = close_out;
exports.close_out_noerr = close_out_noerr;
exports.set_binary_mode_out = set_binary_mode_out;
exports.open_in = open_in;
exports.open_in_bin = open_in_bin;
exports.open_in_gen = open_in_gen;
exports.input_char = input_char;
exports.input_line = input_line;
exports.input = input;
exports.really_input = really_input;
exports.really_input_string = really_input_string;
exports.input_byte = input_byte;
exports.input_binary_int = input_binary_int;
exports.input_value = input_value;
exports.seek_in = seek_in;
exports.pos_in = pos_in;
exports.in_channel_length = in_channel_length;
exports.close_in = close_in;
exports.close_in_noerr = close_in_noerr;
exports.set_binary_mode_in = set_binary_mode_in;
exports.LargeFile = LargeFile;
exports.string_of_format = string_of_format;
exports.$caret$caret = $caret$caret;
exports.exit = exit;
exports.at_exit = at_exit;
exports.valid_float_lexem = valid_float_lexem;
exports.unsafe_really_input = unsafe_really_input;
exports.do_at_exit = do_at_exit;
/* No side effect */

},{"./caml_builtin_exceptions.js":5,"./caml_bytes.js":6,"./caml_exceptions.js":7,"./caml_external_polyfill.js":8,"./caml_format.js":9,"./caml_io.js":12,"./caml_string.js":17,"./caml_sys.js":18,"./camlinternalFormatBasics.js":20,"./curry.js":22}],27:[function(require,module,exports){
'use strict';

var List = require("./list.js");
var Bytes = require("./bytes.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_int32 = require("./caml_int32.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function make(n, c) {
  return Caml_bytes.bytes_to_string(Bytes.make(n, c));
}

function init(n, f) {
  return Caml_bytes.bytes_to_string(Bytes.init(n, f));
}

function copy(s) {
  return Caml_bytes.bytes_to_string(Bytes.copy(Caml_bytes.bytes_of_string(s)));
}

function sub(s, ofs, len) {
  return Caml_bytes.bytes_to_string(Bytes.sub(Caml_bytes.bytes_of_string(s), ofs, len));
}

function concat(sep, l) {
  if (l) {
    var hd = l[0];
    var num = /* record */[/* contents */0];
    var len = /* record */[/* contents */0];
    List.iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = Caml_bytes.caml_create_bytes(len[0] + Caml_int32.imul(sep.length, num[0] - 1 | 0) | 0);
    Caml_bytes.caml_blit_string(hd, 0, r, 0, hd.length);
    var pos = /* record */[/* contents */hd.length];
    List.iter((function (s) {
            Caml_bytes.caml_blit_string(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            Caml_bytes.caml_blit_string(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return Caml_bytes.bytes_to_string(r);
  } else {
    return "";
  }
}

function iter(f, s) {
  return Bytes.iter(f, Caml_bytes.bytes_of_string(s));
}

function iteri(f, s) {
  return Bytes.iteri(f, Caml_bytes.bytes_of_string(s));
}

function map(f, s) {
  return Caml_bytes.bytes_to_string(Bytes.map(f, Caml_bytes.bytes_of_string(s)));
}

function mapi(f, s) {
  return Caml_bytes.bytes_to_string(Bytes.mapi(f, Caml_bytes.bytes_of_string(s)));
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    return switcher === 23;
  } else {
    return switcher !== 2;
  }
}

function trim(s) {
  if (s === "" || !(is_space(s.charCodeAt(0)) || is_space(s.charCodeAt(s.length - 1 | 0)))) {
    return s;
  } else {
    return Caml_bytes.bytes_to_string(Bytes.trim(Caml_bytes.bytes_of_string(s)));
  }
}

function escaped(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return false;
      } else {
        var match = s.charCodeAt(i);
        if (match >= 32) {
          var switcher = match - 34 | 0;
          if (switcher > 58 || switcher < 0) {
            if (switcher >= 93) {
              return true;
            } else {
              _i = i + 1 | 0;
              continue ;
            }
          } else if (switcher > 57 || switcher < 1) {
            return true;
          } else {
            _i = i + 1 | 0;
            continue ;
          }
        } else {
          return true;
        }
      }
    };
  };
  if (needs_escape(0)) {
    return Caml_bytes.bytes_to_string(Bytes.escaped(Caml_bytes.bytes_of_string(s)));
  } else {
    return s;
  }
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw Caml_builtin_exceptions.not_found;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.index_from / Bytes.index_from"
        ];
  }
  return index_rec(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw Caml_builtin_exceptions.not_found;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    } else {
      _i = i - 1 | 0;
      continue ;
    }
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rindex_from / Bytes.rindex_from"
        ];
  }
  return rindex_rec(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.contains_from / Bytes.contains_from"
        ];
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return false;
    } else {
      throw exn;
    }
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rcontains_from / Bytes.rcontains_from"
        ];
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return false;
    } else {
      throw exn;
    }
  }
}

function uppercase(s) {
  return Caml_bytes.bytes_to_string(Bytes.uppercase(Caml_bytes.bytes_of_string(s)));
}

function lowercase(s) {
  return Caml_bytes.bytes_to_string(Bytes.lowercase(Caml_bytes.bytes_of_string(s)));
}

function capitalize(s) {
  return Caml_bytes.bytes_to_string(Bytes.capitalize(Caml_bytes.bytes_of_string(s)));
}

function uncapitalize(s) {
  return Caml_bytes.bytes_to_string(Bytes.uncapitalize(Caml_bytes.bytes_of_string(s)));
}

var compare = Caml_primitive.caml_string_compare;

var fill = Bytes.fill;

var blit = Bytes.blit_string;

exports.make = make;
exports.init = init;
exports.copy = copy;
exports.sub = sub;
exports.fill = fill;
exports.blit = blit;
exports.concat = concat;
exports.iter = iter;
exports.iteri = iteri;
exports.map = map;
exports.mapi = mapi;
exports.trim = trim;
exports.escaped = escaped;
exports.index = index;
exports.rindex = rindex;
exports.index_from = index_from;
exports.rindex_from = rindex_from;
exports.contains = contains;
exports.contains_from = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase = uppercase;
exports.lowercase = lowercase;
exports.capitalize = capitalize;
exports.uncapitalize = uncapitalize;
exports.compare = compare;
/* No side effect */

},{"./bytes.js":3,"./caml_builtin_exceptions.js":5,"./caml_bytes.js":6,"./caml_int32.js":10,"./caml_primitive.js":16,"./list.js":25}],28:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Web = require("./web.js");
var List = require("bs-platform/lib/js/list.js");
var Vdom = require("./vdom.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Tea_cmd = require("./tea_cmd.js");
var Tea_sub = require("./tea_sub.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function programStateWrapper(initModel, pump, shutdown) {
  var model = /* record */[/* contents */initModel];
  var callbacks = /* record */[/* contents : record */[/* enqueue */(function (_msg) {
          console.log("INVALID enqueue CALL!");
          return /* () */0;
        })]];
  var pumperInterface = Curry._1(pump, callbacks);
  var pending = /* record */[/* contents */undefined];
  var handler = function (msg) {
    var match = pending[0];
    if (match !== undefined) {
      pending[0] = /* :: */[
        msg,
        match
      ];
      return /* () */0;
    } else {
      pending[0] = /* [] */0;
      var newModel = Curry._2(pumperInterface[/* handleMsg */2], model[0], msg);
      model[0] = newModel;
      var match$1 = pending[0];
      if (match$1 !== undefined) {
        var msgs = match$1;
        if (msgs) {
          pending[0] = undefined;
          return List.iter(handler, List.rev(msgs));
        } else {
          pending[0] = undefined;
          return /* () */0;
        }
      } else {
        throw [
              Caml_builtin_exceptions.failure,
              "INVALID message queue state, should never be None during message processing!"
            ];
      }
    }
  };
  var finalizedCBs = /* record */[/* enqueue */handler];
  callbacks[0] = finalizedCBs;
  var pi_requestShutdown = function (param) {
    callbacks[0] = /* record */[/* enqueue */(function (_msg) {
          console.log("INVALID message enqueued when shut down");
          return /* () */0;
        })];
    var cmd = Curry._1(shutdown, model[0]);
    Curry._1(pumperInterface[/* shutdown */3], cmd);
    return /* () */0;
  };
  var render_string = function (param) {
    return Curry._1(pumperInterface[/* render_string */1], model[0]);
  };
  Curry._1(pumperInterface[/* startup */0], /* () */0);
  return {
          pushMsg: handler,
          shutdown: pi_requestShutdown,
          getHtmlString: render_string
        };
}

function programLoop(update, view, subscriptions, initModel, initCmd, param) {
  if (param !== undefined) {
    var parentNode = Caml_option.valFromOption(param);
    return (function (callbacks) {
        var priorRenderedVdom = /* record */[/* contents : [] */0];
        var latestModel = /* record */[/* contents */initModel];
        var nextFrameID = /* record */[/* contents */undefined];
        var doRender = function (_delta) {
          var match = nextFrameID[0];
          if (match !== undefined) {
            var newVdom_000 = Curry._1(view, latestModel[0]);
            var newVdom = /* :: */[
              newVdom_000,
              /* [] */0
            ];
            var justRenderedVdom = Vdom.patchVNodesIntoElement(callbacks, parentNode, priorRenderedVdom[0], newVdom);
            priorRenderedVdom[0] = justRenderedVdom;
            nextFrameID[0] = undefined;
            return /* () */0;
          } else {
            return /* () */0;
          }
        };
        var scheduleRender = function (param) {
          var match = nextFrameID[0];
          if (match !== undefined) {
            return /* () */0;
          } else {
            var id = window.requestAnimationFrame(doRender);
            nextFrameID[0] = id;
            return /* () */0;
          }
        };
        var clearPnode = function (param) {
          while(parentNode.childNodes.length > 0) {
            var match = parentNode.firstChild;
            if (match !== null) {
              parentNode.removeChild(match);
            }
            
          };
          return /* () */0;
        };
        var oldSub = /* record */[/* contents : NoSub */0];
        var handleSubscriptionChange = function (model) {
          var newSub = Curry._1(subscriptions, model);
          oldSub[0] = Tea_sub.run(callbacks, callbacks, oldSub[0], newSub);
          return /* () */0;
        };
        var handlerStartup = function (param) {
          clearPnode(/* () */0);
          Tea_cmd.run(callbacks, initCmd);
          handleSubscriptionChange(latestModel[0]);
          nextFrameID[0] = -1;
          doRender(16);
          return /* () */0;
        };
        var render_string = function (model) {
          return Vdom.renderToHtmlString(Curry._1(view, model));
        };
        var handler = function (model, msg) {
          var match = Curry._2(update, model, msg);
          var newModel = match[0];
          latestModel[0] = newModel;
          Tea_cmd.run(callbacks, match[1]);
          scheduleRender(/* () */0);
          handleSubscriptionChange(newModel);
          return newModel;
        };
        var handlerShutdown = function (cmd) {
          nextFrameID[0] = undefined;
          Tea_cmd.run(callbacks, cmd);
          oldSub[0] = Tea_sub.run(callbacks, callbacks, oldSub[0], /* NoSub */0);
          priorRenderedVdom[0] = /* [] */0;
          clearPnode(/* () */0);
          return /* () */0;
        };
        return /* record */[
                /* startup */handlerStartup,
                /* render_string */render_string,
                /* handleMsg */handler,
                /* shutdown */handlerShutdown
              ];
      });
  } else {
    return (function (callbacks) {
        var oldSub = /* record */[/* contents : NoSub */0];
        var handleSubscriptionChange = function (model) {
          var newSub = Curry._1(subscriptions, model);
          oldSub[0] = Tea_sub.run(callbacks, callbacks, oldSub[0], newSub);
          return /* () */0;
        };
        return /* record */[
                /* startup */(function (param) {
                    Tea_cmd.run(callbacks, initCmd);
                    handleSubscriptionChange(initModel);
                    return /* () */0;
                  }),
                /* render_string */(function (model) {
                    return Vdom.renderToHtmlString(Curry._1(view, model));
                  }),
                /* handleMsg */(function (model, msg) {
                    var match = Curry._2(update, model, msg);
                    var newModel = match[0];
                    Tea_cmd.run(callbacks, match[1]);
                    handleSubscriptionChange(newModel);
                    return newModel;
                  }),
                /* shutdown */(function (cmd) {
                    Tea_cmd.run(callbacks, cmd);
                    oldSub[0] = Tea_sub.run(callbacks, callbacks, oldSub[0], /* NoSub */0);
                    return /* () */0;
                  })
              ];
      });
  }
}

function program(param, pnode, flags) {
  Web.polyfills(/* () */0);
  var match = Curry._1(param[/* init */0], flags);
  var initModel = match[0];
  var opnode = (pnode == null) ? undefined : Caml_option.some(pnode);
  var pumpInterface = programLoop(param[/* update */1], param[/* view */2], param[/* subscriptions */3], initModel, match[1], opnode);
  return programStateWrapper(initModel, pumpInterface, param[/* shutdown */4]);
}

function standardProgram(param, pnode, args) {
  return program(/* record */[
              /* init */param[/* init */0],
              /* update */param[/* update */1],
              /* view */param[/* view */2],
              /* subscriptions */param[/* subscriptions */3],
              /* shutdown */(function (_model) {
                  return /* NoCmd */0;
                })
            ], pnode, args);
}

function beginnerProgram(param, pnode, param$1) {
  var update = param[/* update */1];
  var model = param[/* model */0];
  return standardProgram(/* record */[
              /* init */(function (param) {
                  return /* tuple */[
                          model,
                          /* NoCmd */0
                        ];
                }),
              /* update */(function (model, msg) {
                  return /* tuple */[
                          Curry._2(update, model, msg),
                          /* NoCmd */0
                        ];
                }),
              /* view */param[/* view */2],
              /* subscriptions */(function (_model) {
                  return /* NoSub */0;
                })
            ], pnode, /* () */0);
}

var map = Vdom.map;

exports.programStateWrapper = programStateWrapper;
exports.programLoop = programLoop;
exports.program = program;
exports.standardProgram = standardProgram;
exports.beginnerProgram = beginnerProgram;
exports.map = map;
/* No side effect */

},{"./tea_cmd.js":29,"./tea_sub.js":33,"./vdom.js":34,"./web.js":35,"bs-platform/lib/js/caml_builtin_exceptions.js":5,"bs-platform/lib/js/caml_option.js":15,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/list.js":25}],29:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("./vdom.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");

function batch(cmds) {
  return /* Batch */Block.__(1, [cmds]);
}

function call(call$1) {
  return /* EnqueueCall */Block.__(2, [call$1]);
}

function fnMsg(fnMsg$1) {
  return /* EnqueueCall */Block.__(2, [(function (callbacks) {
                return Curry._1(callbacks[0][/* enqueue */0], Curry._1(fnMsg$1, /* () */0));
              })]);
}

function msg(msg$1) {
  return /* EnqueueCall */Block.__(2, [(function (callbacks) {
                return Curry._1(callbacks[0][/* enqueue */0], msg$1);
              })]);
}

function run(callbacks, param) {
  if (typeof param === "number") {
    return /* () */0;
  } else {
    switch (param.tag | 0) {
      case 1 : 
          return List.fold_left((function (param, cmd) {
                        return run(callbacks, cmd);
                      }), /* () */0, param[0]);
      case 0 : 
      case 2 : 
          return Curry._1(param[0], callbacks);
      
    }
  }
}

function map(func, cmd) {
  return /* Tagger */Block.__(0, [(function (callbacks) {
                return run(Vdom.wrapCallbacks(func, callbacks), cmd);
              })]);
}

var none = /* NoCmd */0;

exports.none = none;
exports.batch = batch;
exports.call = call;
exports.fnMsg = fnMsg;
exports.msg = msg;
exports.run = run;
exports.map = map;
/* No side effect */

},{"./vdom.js":34,"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/list.js":25}],30:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("./vdom.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Tea_app = require("./tea_app.js");
var Tea_json = require("./tea_json.js");
var Tea_result = require("./tea_result.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function text(str) {
  return /* Text */Block.__(1, [str]);
}

var lazy1 = Vdom.lazyGen;

function node($staropt$star, tagName, $staropt$star$1, $staropt$star$2, props, nodes) {
  var namespace = $staropt$star !== undefined ? $staropt$star : "";
  var key = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var unique = $staropt$star$2 !== undefined ? $staropt$star$2 : "";
  return Vdom.fullnode(namespace, tagName, key, unique, props, nodes);
}

function br(props) {
  return Vdom.fullnode("", "br", "br", "br", props, /* [] */0);
}

function br$prime($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "br", key, unique, props, nodes);
}

function div($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "div", key, unique, props, nodes);
}

function span($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "span", key, unique, props, nodes);
}

function p($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "p", key, unique, props, nodes);
}

function pre($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "pre", key, unique, props, nodes);
}

function a($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "a", key, unique, props, nodes);
}

function section($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "section", key, unique, props, nodes);
}

function header($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "header", key, unique, props, nodes);
}

function footer($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "footer", key, unique, props, nodes);
}

function h1($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h1", key, unique, props, nodes);
}

function h2($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h2", key, unique, props, nodes);
}

function h3($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h3", key, unique, props, nodes);
}

function h4($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h4", key, unique, props, nodes);
}

function h5($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h5", key, unique, props, nodes);
}

function h6($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "h6", key, unique, props, nodes);
}

function i($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "i", key, unique, props, nodes);
}

function strong($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "strong", key, unique, props, nodes);
}

function button($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "button", key, unique, props, nodes);
}

function input$prime($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "input", key, unique, props, nodes);
}

function textarea($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "textarea", key, unique, props, nodes);
}

function label($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "label", key, unique, props, nodes);
}

function ul($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "ul", key, unique, props, nodes);
}

function ol($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "ol", key, unique, props, nodes);
}

function li($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "li", key, unique, props, nodes);
}

function table($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "table", key, unique, props, nodes);
}

function thead($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "thead", key, unique, props, nodes);
}

function tfoot($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "tfoot", key, unique, props, nodes);
}

function tbody($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "tbody", key, unique, props, nodes);
}

function th($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "th", key, unique, props, nodes);
}

function tr($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "tr", key, unique, props, nodes);
}

function td($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "td", key, unique, props, nodes);
}

function progress($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "progress", key, unique, props, nodes);
}

function img($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "img", key, unique, props, nodes);
}

function select($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "select", key, unique, props, nodes);
}

function option$prime($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "option", key, unique, props, nodes);
}

function form($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "form", key, unique, props, nodes);
}

function nav($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "nav", key, unique, props, nodes);
}

function main($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "main", key, unique, props, nodes);
}

function aside($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "aside", key, unique, props, nodes);
}

function article($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "article", key, unique, props, nodes);
}

function details($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "details", key, unique, props, nodes);
}

function figcaption($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "figcaption", key, unique, props, nodes);
}

function figure($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "figure", key, unique, props, nodes);
}

function mark($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "mark", key, unique, props, nodes);
}

function summary($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "summary", key, unique, props, nodes);
}

function time($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "time", key, unique, props, nodes);
}

function hr($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "hr", key, unique, props, nodes);
}

function blockquote($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "blockquote", key, unique, props, nodes);
}

function code($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "code", key, unique, props, nodes);
}

function em($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "em", key, unique, props, nodes);
}

function b($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "b", key, unique, props, nodes);
}

function u($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "u", key, unique, props, nodes);
}

function sub($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "sub", key, unique, props, nodes);
}

function sup($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "sup", key, unique, props, nodes);
}

function dl($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "dl", key, unique, props, nodes);
}

function dt($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "dt", key, unique, props, nodes);
}

function dd($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "dd", key, unique, props, nodes);
}

function iframe($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "iframe", key, unique, props, nodes);
}

function canvas($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "canvas", key, unique, props, nodes);
}

function address($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "address", key, unique, props, nodes);
}

function caption($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "caption", key, unique, props, nodes);
}

function colgroup($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "colgroup", key, unique, props, nodes);
}

function col($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "col", key, unique, props, nodes);
}

function fieldset($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "fieldset", key, unique, props, nodes);
}

function legend($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "legend", key, unique, props, nodes);
}

function datalist($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "datalist", key, unique, props, nodes);
}

function optgroup($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "optgroup", key, unique, props, nodes);
}

function output($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "output", key, unique, props, nodes);
}

function meter($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "meter", key, unique, props, nodes);
}

function audio($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "audio", key, unique, props, nodes);
}

function video($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "video", key, unique, props, nodes);
}

function source($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "source", key, unique, props, nodes);
}

function track($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "track", key, unique, props, nodes);
}

function embed($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "embed", key, unique, props, nodes);
}

function object$prime($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "object", key, unique, props, nodes);
}

function param($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "param", key, unique, props, nodes);
}

function ins($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "ins", key, unique, props, nodes);
}

function del($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "del", key, unique, props, nodes);
}

function small($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "small", key, unique, props, nodes);
}

function cite($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "cite", key, unique, props, nodes);
}

function dfn($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "dfn", key, unique, props, nodes);
}

function abbr($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "abbr", key, unique, props, nodes);
}

function var$prime($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "var", key, unique, props, nodes);
}

function samp($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "samp", key, unique, props, nodes);
}

function kbd($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "kbd", key, unique, props, nodes);
}

function s($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "s", key, unique, props, nodes);
}

function q($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "q", key, unique, props, nodes);
}

function rt($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "rt", key, unique, props, nodes);
}

function bdi($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "bdi", key, unique, props, nodes);
}

function bdo($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "bdo", key, unique, props, nodes);
}

function wbr($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "wbr", key, unique, props, nodes);
}

function menuitem($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "menuitem", key, unique, props, nodes);
}

function menu($staropt$star, $staropt$star$1, props, nodes) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  var unique = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  return Vdom.fullnode("", "menu", key, unique, props, nodes);
}

function id(str) {
  return /* RawProp */Block.__(0, [
            "id",
            str
          ]);
}

function href(str) {
  return /* Attribute */Block.__(1, [
            "",
            "href",
            str
          ]);
}

function src(str) {
  return /* Attribute */Block.__(1, [
            "",
            "src",
            str
          ]);
}

function title(str) {
  return /* Attribute */Block.__(1, [
            "",
            "title",
            str
          ]);
}

function class$prime(name) {
  return /* RawProp */Block.__(0, [
            "className",
            name
          ]);
}

function classList(classes) {
  var name = $$String.concat(" ", List.map((function (param) {
              return param[0];
            }), List.filter((function (param) {
                    return param[1];
                  }))(classes)));
  return /* RawProp */Block.__(0, [
            "className",
            name
          ]);
}

function type$prime(typ) {
  return /* RawProp */Block.__(0, [
            "type",
            typ
          ]);
}

var style = Vdom.style;

function styles(s) {
  return /* Style */Block.__(4, [s]);
}

function placeholder(str) {
  return /* RawProp */Block.__(0, [
            "placeholder",
            str
          ]);
}

function autofocus(b) {
  if (b) {
    return /* RawProp */Block.__(0, [
              "autofocus",
              "autofocus"
            ]);
  } else {
    return /* NoProp */0;
  }
}

function value(str) {
  return /* RawProp */Block.__(0, [
            "value",
            str
          ]);
}

function name(str) {
  return /* RawProp */Block.__(0, [
            "name",
            str
          ]);
}

function checked(b) {
  if (b) {
    return /* RawProp */Block.__(0, [
              "checked",
              "checked"
            ]);
  } else {
    return /* NoProp */0;
  }
}

function for$prime(str) {
  return /* RawProp */Block.__(0, [
            "htmlFor",
            str
          ]);
}

function hidden(b) {
  if (b) {
    return /* RawProp */Block.__(0, [
              "hidden",
              "hidden"
            ]);
  } else {
    return /* NoProp */0;
  }
}

function target(t) {
  return /* RawProp */Block.__(0, [
            "target",
            t
          ]);
}

function action(a) {
  return /* RawProp */Block.__(0, [
            "action",
            a
          ]);
}

function method$prime(m) {
  return /* RawProp */Block.__(0, [
            "method",
            m
          ]);
}

var onCB = Vdom.onCB;

var onMsg = Vdom.onMsg;

function onInputOpt($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return Vdom.onCB("input", key, (function (ev) {
                var match = ev.target;
                if (match !== undefined) {
                  var match$1 = match.value;
                  if (match$1 !== undefined) {
                    return Curry._1(msg, match$1);
                  } else {
                    return undefined;
                  }
                }
                
              }));
}

function onInput($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return onInputOpt(key, (function (ev) {
                return Caml_option.some(Curry._1(msg, ev));
              }));
}

function onChangeOpt($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return Vdom.onCB("change", key, (function (ev) {
                var match = ev.target;
                if (match !== undefined) {
                  var match$1 = match.value;
                  if (match$1 !== undefined) {
                    return Curry._1(msg, match$1);
                  } else {
                    return undefined;
                  }
                }
                
              }));
}

function onChange($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return onChangeOpt(key, (function (ev) {
                return Caml_option.some(Curry._1(msg, ev));
              }));
}

function onClick(msg) {
  return Vdom.onMsg("click", msg);
}

function onDoubleClick(msg) {
  return Vdom.onMsg("dblclick", msg);
}

function onBlur(msg) {
  return Vdom.onMsg("blur", msg);
}

function onFocus(msg) {
  return Vdom.onMsg("focus", msg);
}

function onCheckOpt($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return Vdom.onCB("change", key, (function (ev) {
                var match = ev.target;
                if (match !== undefined) {
                  var match$1 = match.checked;
                  if (match$1 !== undefined) {
                    return Curry._1(msg, match$1);
                  } else {
                    return undefined;
                  }
                }
                
              }));
}

function onCheck($staropt$star, msg) {
  var key = $staropt$star !== undefined ? $staropt$star : "";
  return onCheckOpt(key, (function (ev) {
                return Caml_option.some(Curry._1(msg, ev));
              }));
}

function onMouseDown(msg) {
  return Vdom.onMsg("mousedown", msg);
}

function onMouseUp(msg) {
  return Vdom.onMsg("mouseup", msg);
}

function onMouseEnter(msg) {
  return Vdom.onMsg("mouseenter", msg);
}

function onMouseLeave(msg) {
  return Vdom.onMsg("mouseleave", msg);
}

function onMouseOver(msg) {
  return Vdom.onMsg("mouseover", msg);
}

function onMouseOut(msg) {
  return Vdom.onMsg("mouseout", msg);
}

var defaultOptions = /* record */[
  /* stopPropagation */false,
  /* preventDefault */false
];

function onWithOptions(key, eventName, options, decoder) {
  return Vdom.onCB(eventName, key, (function ($$event) {
                if (options[/* stopPropagation */0]) {
                  $$event.stopPropagation();
                }
                if (options[/* preventDefault */1]) {
                  $$event.preventDefault();
                }
                return Tea_result.result_to_option(Tea_json.Decoder[/* decodeEvent */31](decoder, $$event));
              }));
}

function on(key, eventName, decoder) {
  return onWithOptions(key, eventName, defaultOptions, decoder);
}

var targetValue = Tea_json.Decoder[/* at */12](/* :: */[
      "target",
      /* :: */[
        "value",
        /* [] */0
      ]
    ], Tea_json.Decoder[/* string */2]);

var targetChecked = Tea_json.Decoder[/* at */12](/* :: */[
      "target",
      /* :: */[
        "checked",
        /* [] */0
      ]
    ], Tea_json.Decoder[/* bool */5]);

var keyCode = Tea_json.Decoder[/* field */11]("keyCode", Tea_json.Decoder[/* int */3]);

function max(value) {
  return /* Attribute */Block.__(1, [
            "",
            "max",
            value
          ]);
}

function min(value) {
  return /* Attribute */Block.__(1, [
            "",
            "min",
            value
          ]);
}

function step(value) {
  return /* Attribute */Block.__(1, [
            "",
            "step",
            value
          ]);
}

function disabled(b) {
  if (b) {
    return /* Attribute */Block.__(1, [
              "",
              "disabled",
              "true"
            ]);
  } else {
    return /* NoProp */0;
  }
}

function selected(b) {
  if (b) {
    return /* Attribute */Block.__(1, [
              "",
              "selected",
              "true"
            ]);
  } else {
    return /* NoProp */0;
  }
}

function acceptCharset(c) {
  return /* Attribute */Block.__(1, [
            "",
            "accept-charset",
            c
          ]);
}

function rel(value) {
  return /* Attribute */Block.__(1, [
            "",
            "rel",
            value
          ]);
}

var Attributes = /* module */[
  /* max */max,
  /* min */min,
  /* step */step,
  /* disabled */disabled,
  /* selected */selected,
  /* acceptCharset */acceptCharset,
  /* rel */rel
];

var Cmds = 0;

var map = Tea_app.map;

var noNode = Vdom.noNode;

var noProp = /* NoProp */0;

exports.Cmds = Cmds;
exports.map = map;
exports.noNode = noNode;
exports.text = text;
exports.lazy1 = lazy1;
exports.node = node;
exports.br = br;
exports.br$prime = br$prime;
exports.div = div;
exports.span = span;
exports.p = p;
exports.pre = pre;
exports.a = a;
exports.section = section;
exports.header = header;
exports.footer = footer;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.i = i;
exports.strong = strong;
exports.button = button;
exports.input$prime = input$prime;
exports.textarea = textarea;
exports.label = label;
exports.ul = ul;
exports.ol = ol;
exports.li = li;
exports.table = table;
exports.thead = thead;
exports.tfoot = tfoot;
exports.tbody = tbody;
exports.th = th;
exports.tr = tr;
exports.td = td;
exports.progress = progress;
exports.img = img;
exports.select = select;
exports.option$prime = option$prime;
exports.form = form;
exports.nav = nav;
exports.main = main;
exports.aside = aside;
exports.article = article;
exports.details = details;
exports.figcaption = figcaption;
exports.figure = figure;
exports.mark = mark;
exports.summary = summary;
exports.time = time;
exports.hr = hr;
exports.blockquote = blockquote;
exports.code = code;
exports.em = em;
exports.b = b;
exports.u = u;
exports.sub = sub;
exports.sup = sup;
exports.dl = dl;
exports.dt = dt;
exports.dd = dd;
exports.iframe = iframe;
exports.canvas = canvas;
exports.address = address;
exports.caption = caption;
exports.colgroup = colgroup;
exports.col = col;
exports.fieldset = fieldset;
exports.legend = legend;
exports.datalist = datalist;
exports.optgroup = optgroup;
exports.output = output;
exports.meter = meter;
exports.audio = audio;
exports.video = video;
exports.source = source;
exports.track = track;
exports.embed = embed;
exports.object$prime = object$prime;
exports.param = param;
exports.ins = ins;
exports.del = del;
exports.small = small;
exports.cite = cite;
exports.dfn = dfn;
exports.abbr = abbr;
exports.var$prime = var$prime;
exports.samp = samp;
exports.kbd = kbd;
exports.s = s;
exports.q = q;
exports.rt = rt;
exports.bdi = bdi;
exports.bdo = bdo;
exports.wbr = wbr;
exports.menuitem = menuitem;
exports.menu = menu;
exports.noProp = noProp;
exports.id = id;
exports.href = href;
exports.src = src;
exports.title = title;
exports.class$prime = class$prime;
exports.classList = classList;
exports.type$prime = type$prime;
exports.style = style;
exports.styles = styles;
exports.placeholder = placeholder;
exports.autofocus = autofocus;
exports.value = value;
exports.name = name;
exports.checked = checked;
exports.for$prime = for$prime;
exports.hidden = hidden;
exports.target = target;
exports.action = action;
exports.method$prime = method$prime;
exports.onCB = onCB;
exports.onMsg = onMsg;
exports.onInputOpt = onInputOpt;
exports.onInput = onInput;
exports.onChangeOpt = onChangeOpt;
exports.onChange = onChange;
exports.onClick = onClick;
exports.onDoubleClick = onDoubleClick;
exports.onBlur = onBlur;
exports.onFocus = onFocus;
exports.onCheckOpt = onCheckOpt;
exports.onCheck = onCheck;
exports.onMouseDown = onMouseDown;
exports.onMouseUp = onMouseUp;
exports.onMouseEnter = onMouseEnter;
exports.onMouseLeave = onMouseLeave;
exports.onMouseOver = onMouseOver;
exports.onMouseOut = onMouseOut;
exports.defaultOptions = defaultOptions;
exports.onWithOptions = onWithOptions;
exports.on = on;
exports.targetValue = targetValue;
exports.targetChecked = targetChecked;
exports.keyCode = keyCode;
exports.Attributes = Attributes;
/* targetValue Not a pure module */

},{"./tea_app.js":28,"./tea_json.js":31,"./tea_result.js":32,"./vdom.js":34,"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/caml_option.js":15,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/list.js":25,"bs-platform/lib/js/string.js":27}],31:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Web_json = require("./web_json.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Tea_result = require("./tea_result.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function height(param) {
  if (param) {
    return param[4];
  } else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */[
          l,
          x,
          d,
          r,
          hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        ];
}

function singleton(x, d) {
  return /* Node */[
          /* Empty */0,
          x,
          d,
          /* Empty */0,
          1
        ];
}

function bal(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      } else if (lr) {
        return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else if (hr > (hl + 2 | 0)) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height(rr) >= height(rl)) {
        return create(create(l, x, d, rl), rv, rd, rr);
      } else if (rl) {
        return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else {
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }
}

function is_empty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function add(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_primitive.caml_string_compare(x, v);
    if (c === 0) {
      return /* Node */[
              l,
              x,
              data,
              r,
              param[4]
            ];
    } else if (c < 0) {
      return bal(add(x, data, l), v, d, r);
    } else {
      return bal(l, v, d, add(x, data, r));
    }
  } else {
    return /* Node */[
            /* Empty */0,
            x,
            data,
            /* Empty */0,
            1
          ];
  }
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_primitive.caml_string_compare(x, param[1]);
      if (c === 0) {
        return param[2];
      } else {
        _param = c < 0 ? param[0] : param[3];
        continue ;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_primitive.caml_string_compare(x, param[1]);
      if (c === 0) {
        return true;
      } else {
        _param = c < 0 ? param[0] : param[3];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function min_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var l = param[0];
      if (l) {
        _param = l;
        continue ;
      } else {
        return /* tuple */[
                param[1],
                param[2]
              ];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function max_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var r = param[3];
      if (r) {
        _param = r;
        continue ;
      } else {
        return /* tuple */[
                param[1],
                param[2]
              ];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function remove_min_binding(param) {
  if (param) {
    var l = param[0];
    if (l) {
      return bal(remove_min_binding(l), param[1], param[2], param[3]);
    } else {
      return param[3];
    }
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Map.remove_min_elt"
        ];
  }
}

function remove(x, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_primitive.caml_string_compare(x, v);
    if (c === 0) {
      var t1 = l;
      var t2 = r;
      if (t1) {
        if (t2) {
          var match = min_binding(t2);
          return bal(t1, match[0], match[1], remove_min_binding(t2));
        } else {
          return t1;
        }
      } else {
        return t2;
      }
    } else if (c < 0) {
      return bal(remove(x, l), v, d, r);
    } else {
      return bal(l, v, d, remove(x, r));
    }
  } else {
    return /* Empty */0;
  }
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      iter(f, param[0]);
      Curry._2(f, param[1], param[2]);
      _param = param[3];
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function map(f, param) {
  if (param) {
    var l$prime = map(f, param[0]);
    var d$prime = Curry._1(f, param[2]);
    var r$prime = map(f, param[3]);
    return /* Node */[
            l$prime,
            param[1],
            d$prime,
            r$prime,
            param[4]
          ];
  } else {
    return /* Empty */0;
  }
}

function mapi(f, param) {
  if (param) {
    var v = param[1];
    var l$prime = mapi(f, param[0]);
    var d$prime = Curry._2(f, v, param[2]);
    var r$prime = mapi(f, param[3]);
    return /* Node */[
            l$prime,
            v,
            d$prime,
            r$prime,
            param[4]
          ];
  } else {
    return /* Empty */0;
  }
}

function fold(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (m) {
      _accu = Curry._3(f, m[1], m[2], fold(f, m[0], accu));
      _m = m[3];
      continue ;
    } else {
      return accu;
    }
  };
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._2(p, param[1], param[2]) && for_all(p, param[0])) {
        _param = param[3];
        continue ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._2(p, param[1], param[2]) || exists(p, param[0])) {
        return true;
      } else {
        _param = param[3];
        continue ;
      }
    } else {
      return false;
    }
  };
}

function add_min_binding(k, v, param) {
  if (param) {
    return bal(add_min_binding(k, v, param[0]), param[1], param[2], param[3]);
  } else {
    return singleton(k, v);
  }
}

function add_max_binding(k, v, param) {
  if (param) {
    return bal(param[0], param[1], param[2], add_max_binding(k, v, param[3]));
  } else {
    return singleton(k, v);
  }
}

function join(l, v, d, r) {
  if (l) {
    if (r) {
      var rh = r[4];
      var lh = l[4];
      if (lh > (rh + 2 | 0)) {
        return bal(l[0], l[1], l[2], join(l[3], v, d, r));
      } else if (rh > (lh + 2 | 0)) {
        return bal(join(l, v, d, r[0]), r[1], r[2], r[3]);
      } else {
        return create(l, v, d, r);
      }
    } else {
      return add_max_binding(v, d, l);
    }
  } else {
    return add_min_binding(v, d, r);
  }
}

function concat(t1, t2) {
  if (t1) {
    if (t2) {
      var match = min_binding(t2);
      return join(t1, match[0], match[1], remove_min_binding(t2));
    } else {
      return t1;
    }
  } else {
    return t2;
  }
}

function concat_or_join(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function split(x, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_primitive.caml_string_compare(x, v);
    if (c === 0) {
      return /* tuple */[
              l,
              Caml_option.some(d),
              r
            ];
    } else if (c < 0) {
      var match = split(x, l);
      return /* tuple */[
              match[0],
              match[1],
              join(match[2], v, d, r)
            ];
    } else {
      var match$1 = split(x, r);
      return /* tuple */[
              join(l, v, d, match$1[0]),
              match$1[1],
              match$1[2]
            ];
    }
  } else {
    return /* tuple */[
            /* Empty */0,
            undefined,
            /* Empty */0
          ];
  }
}

function merge(f, s1, s2) {
  var exit = 0;
  if (s1) {
    var v1 = s1[1];
    if (s1[4] >= height(s2)) {
      var match = split(v1, s2);
      return concat_or_join(merge(f, s1[0], match[0]), v1, Curry._3(f, v1, Caml_option.some(s1[2]), match[1]), merge(f, s1[3], match[2]));
    } else {
      exit = 1;
    }
  } else if (s2) {
    exit = 1;
  } else {
    return /* Empty */0;
  }
  if (exit === 1) {
    if (s2) {
      var v2 = s2[1];
      var match$1 = split(v2, s1);
      return concat_or_join(merge(f, match$1[0], s2[0]), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2[2])), merge(f, match$1[2], s2[3]));
    } else {
      throw [
            Caml_builtin_exceptions.assert_failure,
            /* tuple */[
              "map.ml",
              270,
              10
            ]
          ];
    }
  }
  
}

function filter(p, param) {
  if (param) {
    var d = param[2];
    var v = param[1];
    var l$prime = filter(p, param[0]);
    var pvd = Curry._2(p, v, d);
    var r$prime = filter(p, param[3]);
    if (pvd) {
      return join(l$prime, v, d, r$prime);
    } else {
      return concat(l$prime, r$prime);
    }
  } else {
    return /* Empty */0;
  }
}

function partition(p, param) {
  if (param) {
    var d = param[2];
    var v = param[1];
    var match = partition(p, param[0]);
    var lf = match[1];
    var lt = match[0];
    var pvd = Curry._2(p, v, d);
    var match$1 = partition(p, param[3]);
    var rf = match$1[1];
    var rt = match$1[0];
    if (pvd) {
      return /* tuple */[
              join(lt, v, d, rt),
              concat(lf, rf)
            ];
    } else {
      return /* tuple */[
              concat(lt, rt),
              join(lf, v, d, rf)
            ];
    }
  } else {
    return /* tuple */[
            /* Empty */0,
            /* Empty */0
          ];
  }
}

function cons_enum(_m, _e) {
  while(true) {
    var e = _e;
    var m = _m;
    if (m) {
      _e = /* More */[
        m[1],
        m[2],
        m[3],
        e
      ];
      _m = m[0];
      continue ;
    } else {
      return e;
    }
  };
}

function compare(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (e1) {
      if (e2) {
        var c = Caml_primitive.caml_string_compare(e1[0], e2[0]);
        if (c !== 0) {
          return c;
        } else {
          var c$1 = Curry._2(cmp, e1[1], e2[1]);
          if (c$1 !== 0) {
            return c$1;
          } else {
            _e2 = cons_enum(e2[2], e2[3]);
            _e1 = cons_enum(e1[2], e1[3]);
            continue ;
          }
        }
      } else {
        return 1;
      }
    } else if (e2) {
      return -1;
    } else {
      return 0;
    }
  };
}

function equal(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (e1) {
      if (e2 && Caml_primitive.caml_string_compare(e1[0], e2[0]) === 0 && Curry._2(cmp, e1[1], e2[1])) {
        _e2 = cons_enum(e2[2], e2[3]);
        _e1 = cons_enum(e1[2], e1[3]);
        continue ;
      } else {
        return false;
      }
    } else if (e2) {
      return false;
    } else {
      return true;
    }
  };
}

function cardinal(param) {
  if (param) {
    return (cardinal(param[0]) + 1 | 0) + cardinal(param[3]) | 0;
  } else {
    return 0;
  }
}

function bindings_aux(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[0];
      _accu = /* :: */[
        /* tuple */[
          param[1],
          param[2]
        ],
        bindings_aux(accu, param[3])
      ];
      continue ;
    } else {
      return accu;
    }
  };
}

function bindings(s) {
  return bindings_aux(/* [] */0, s);
}

var ObjectDict = [
  /* Empty */0,
  is_empty,
  mem,
  add,
  singleton,
  remove,
  merge,
  compare,
  equal,
  iter,
  fold,
  for_all,
  exists,
  filter,
  partition,
  cardinal,
  bindings,
  min_binding,
  max_binding,
  min_binding,
  split,
  find,
  map,
  mapi
];

var ParseFail = Caml_exceptions.create("Tea_json.Decoder.ParseFail");

var string = /* Decoder */[(function (value) {
      var match = Web_json.classify(value);
      if (typeof match === "number" || match.tag) {
        return /* Error */Block.__(1, ["Non-string value"]);
      } else {
        return /* Ok */Block.__(0, [match[0]]);
      }
    })];

var $$int = /* Decoder */[(function (value) {
      var match = Web_json.classify(value);
      if (typeof match === "number" || match.tag !== 1) {
        return /* Error */Block.__(1, ["Non-int value"]);
      } else {
        var n = match[0];
        if (n > Pervasives.min_int && n < Pervasives.max_int) {
          return /* Ok */Block.__(0, [n | 0]);
        } else {
          return /* Error */Block.__(1, ["number out of int range"]);
        }
      }
    })];

var $$float = /* Decoder */[(function (value) {
      var match = Web_json.classify(value);
      if (typeof match === "number" || match.tag !== 1) {
        return /* Error */Block.__(1, ["Non-float-value"]);
      } else {
        return /* Ok */Block.__(0, [match[0]]);
      }
    })];

var bool = /* Decoder */[(function (value) {
      var match = Web_json.classify(value);
      if (typeof match === "number") {
        switch (match) {
          case 0 : 
              return /* Ok */Block.__(0, [false]);
          case 1 : 
              return /* Ok */Block.__(0, [true]);
          case 2 : 
              return /* Error */Block.__(1, ["Non-boolean value"]);
          
        }
      } else {
        return /* Error */Block.__(1, ["Non-boolean value"]);
      }
    })];

function $$null(v) {
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" && match >= 2) {
                return /* Ok */Block.__(0, [v]);
              } else {
                return /* Error */Block.__(1, ["Non-null value"]);
              }
            })];
}

function list(param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 3) {
                return /* Error */Block.__(1, ["Non-list value"]);
              } else {
                var parse = function (v) {
                  var match = Curry._1(decoder, v);
                  if (match.tag) {
                    throw [
                          ParseFail,
                          match[0]
                        ];
                  } else {
                    return match[0];
                  }
                };
                try {
                  return /* Ok */Block.__(0, [List.map(parse, $$Array.to_list(match[0]))]);
                }
                catch (raw_exn){
                  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                  if (exn[0] === ParseFail) {
                    return /* Error */Block.__(1, ["list -> " + exn[1]]);
                  } else {
                    throw exn;
                  }
                }
              }
            })];
}

function array(param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 3) {
                return /* Error */Block.__(1, ["Non-array value"]);
              } else {
                var parse = function (v) {
                  var match = Curry._1(decoder, v);
                  if (match.tag) {
                    throw [
                          ParseFail,
                          match[0]
                        ];
                  } else {
                    return match[0];
                  }
                };
                try {
                  return /* Ok */Block.__(0, [$$Array.map(parse, match[0])]);
                }
                catch (raw_exn){
                  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                  if (exn[0] === ParseFail) {
                    return /* Error */Block.__(1, ["array -> " + exn[1]]);
                  } else {
                    throw exn;
                  }
                }
              }
            })];
}

function keyValuePairs(param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 2) {
                return /* Error */Block.__(1, ["Non-keyValuePair value"]);
              } else {
                var o = match[0];
                var keys = Object.keys(o);
                var parse = function (k, l) {
                  var match = Js_dict.get(o, k);
                  if (match !== undefined) {
                    var match$1 = Curry._1(decoder, Caml_option.valFromOption(match));
                    if (match$1.tag) {
                      throw [
                            ParseFail,
                            match$1[0]
                          ];
                    } else {
                      return /* :: */[
                              /* tuple */[
                                k,
                                match$1[0]
                              ],
                              l
                            ];
                    }
                  } else {
                    throw [
                          ParseFail,
                          "Key is undefined: " + k
                        ];
                  }
                };
                try {
                  return /* Ok */Block.__(0, [$$Array.fold_right(parse, keys, /* [] */0)]);
                }
                catch (raw_exn){
                  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                  if (exn[0] === ParseFail) {
                    return /* Error */Block.__(1, ["Invalid keyValuePair parsing: " + exn[1]]);
                  } else {
                    throw exn;
                  }
                }
              }
            })];
}

function dict(param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 2) {
                return /* Error */Block.__(1, ["Non-dict value"]);
              } else {
                var o = match[0];
                var keys = Object.keys(o);
                var parse = function (k, d) {
                  var match = Js_dict.get(o, k);
                  if (match !== undefined) {
                    var match$1 = Curry._1(decoder, Caml_option.valFromOption(match));
                    if (match$1.tag) {
                      throw [
                            ParseFail,
                            match$1[0]
                          ];
                    } else {
                      return add(k, match$1[0], d);
                    }
                  } else {
                    throw [
                          ParseFail,
                          "Key is undefined: " + k
                        ];
                  }
                };
                try {
                  return /* Ok */Block.__(0, [$$Array.fold_right(parse, keys, /* Empty */0)]);
                }
                catch (raw_exn){
                  var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                  if (exn[0] === ParseFail) {
                    return /* Error */Block.__(1, ["Invalid dict parsing: " + exn[1]]);
                  } else {
                    throw exn;
                  }
                }
              }
            })];
}

function field(key, param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 2) {
                return /* Error */Block.__(1, ["Non-fieldable value"]);
              } else {
                var match$1 = Js_dict.get(match[0], key);
                if (match$1 !== undefined) {
                  var o = Curry._1(decoder, Caml_option.valFromOption(match$1));
                  if (o.tag) {
                    return /* Error */Block.__(1, ["field `" + (key + ("` -> " + o[0]))]);
                  } else {
                    return o;
                  }
                } else {
                  return /* Error */Block.__(1, ["Field Value is undefined: " + key]);
                }
              }
            })];
}

function at(fields, dec) {
  return List.fold_right(field, fields, dec);
}

function index(idx, param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Web_json.classify(value);
              if (typeof match === "number" || match.tag !== 3) {
                return /* Error */Block.__(1, ["Non-array value"]);
              } else {
                var a = match[0];
                if (idx < 0 || idx > a.length) {
                  return /* Error */Block.__(1, ["Array index out of range: " + String(idx)]);
                } else {
                  return Curry._1(decoder, Caml_array.caml_array_get(a, idx));
                }
              }
            })];
}

function maybe(param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder, value);
              if (match.tag) {
                return /* Ok */Block.__(0, [undefined]);
              } else {
                return /* Ok */Block.__(0, [Caml_option.some(match[0])]);
              }
            })];
}

function oneOf(decoders) {
  return /* Decoder */[(function (value) {
              var parse = function (v, _param) {
                while(true) {
                  var param = _param;
                  if (param) {
                    var rest = param[1];
                    try {
                      var ok = Curry._1(param[0][0], v);
                      if (ok.tag) {
                        return parse(v, rest);
                      } else {
                        return ok;
                      }
                    }
                    catch (exn){
                      _param = rest;
                      continue ;
                    }
                  } else {
                    return /* Error */Block.__(1, ["No one-of's matched"]);
                  }
                };
              };
              return parse(value, decoders);
            })];
}

function map$1(mapper, param) {
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              if (match.tag) {
                return /* Error */Block.__(1, ["map " + match[0]]);
              } else {
                return /* Ok */Block.__(0, [Curry._1(mapper, match[0])]);
              }
            })];
}

function map2(mapper, param, param$1) {
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var exit = 0;
              if (match.tag || match$1.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._2(mapper, match[0], match$1[0])]);
              }
              if (exit === 1) {
                var match$2 = Tea_result.error_of_first(match, match$1);
                if (match$2 !== undefined) {
                  return /* Error */Block.__(1, ["map2 -> " + match$2]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map3(mapper, param, param$1, param$2) {
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._3(mapper, match[0], match$1[0], match$2[0])]);
              }
              if (exit === 1) {
                var match$3 = Tea_result.first(match$2, Tea_result.first(match$1, match));
                if (match$3.tag) {
                  return /* Error */Block.__(1, ["map3 -> " + match$3[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map4(mapper, param, param$1, param$2, param$3) {
  var decoder4 = param$3[0];
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var match$3 = Curry._1(decoder4, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag || match$3.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._4(mapper, match[0], match$1[0], match$2[0], match$3[0])]);
              }
              if (exit === 1) {
                var match$4 = Tea_result.first(match$3, Tea_result.first(match$2, Tea_result.first(match$1, match)));
                if (match$4.tag) {
                  return /* Error */Block.__(1, ["map4 -> " + match$4[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map5(mapper, param, param$1, param$2, param$3, param$4) {
  var decoder5 = param$4[0];
  var decoder4 = param$3[0];
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var match$3 = Curry._1(decoder4, value);
              var match$4 = Curry._1(decoder5, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag || match$3.tag || match$4.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._5(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0])]);
              }
              if (exit === 1) {
                var match$5 = Tea_result.first(match$4, Tea_result.first(match$3, Tea_result.first(match$2, Tea_result.first(match$1, match))));
                if (match$5.tag) {
                  return /* Error */Block.__(1, ["map5 -> " + match$5[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map6(mapper, param, param$1, param$2, param$3, param$4, param$5) {
  var decoder6 = param$5[0];
  var decoder5 = param$4[0];
  var decoder4 = param$3[0];
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var match$3 = Curry._1(decoder4, value);
              var match$4 = Curry._1(decoder5, value);
              var match$5 = Curry._1(decoder6, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag || match$3.tag || match$4.tag || match$5.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._6(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0])]);
              }
              if (exit === 1) {
                var match$6 = Tea_result.first(match$5, Tea_result.first(match$4, Tea_result.first(match$3, Tea_result.first(match$2, Tea_result.first(match$1, match)))));
                if (match$6.tag) {
                  return /* Error */Block.__(1, ["map6 -> " + match$6[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map7(mapper, param, param$1, param$2, param$3, param$4, param$5, param$6) {
  var decoder7 = param$6[0];
  var decoder6 = param$5[0];
  var decoder5 = param$4[0];
  var decoder4 = param$3[0];
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var match$3 = Curry._1(decoder4, value);
              var match$4 = Curry._1(decoder5, value);
              var match$5 = Curry._1(decoder6, value);
              var match$6 = Curry._1(decoder7, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag || match$3.tag || match$4.tag || match$5.tag || match$6.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._7(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0], match$6[0])]);
              }
              if (exit === 1) {
                var match$7 = Tea_result.first(match$6, Tea_result.first(match$5, Tea_result.first(match$4, Tea_result.first(match$3, Tea_result.first(match$2, Tea_result.first(match$1, match))))));
                if (match$7.tag) {
                  return /* Error */Block.__(1, ["map7 -> " + match$7[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function map8(mapper, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7) {
  var decoder8 = param$7[0];
  var decoder7 = param$6[0];
  var decoder6 = param$5[0];
  var decoder5 = param$4[0];
  var decoder4 = param$3[0];
  var decoder3 = param$2[0];
  var decoder2 = param$1[0];
  var decoder1 = param[0];
  return /* Decoder */[(function (value) {
              var match = Curry._1(decoder1, value);
              var match$1 = Curry._1(decoder2, value);
              var match$2 = Curry._1(decoder3, value);
              var match$3 = Curry._1(decoder4, value);
              var match$4 = Curry._1(decoder5, value);
              var match$5 = Curry._1(decoder6, value);
              var match$6 = Curry._1(decoder7, value);
              var match$7 = Curry._1(decoder8, value);
              var exit = 0;
              if (match.tag || match$1.tag || match$2.tag || match$3.tag || match$4.tag || match$5.tag || match$6.tag || match$7.tag) {
                exit = 1;
              } else {
                return /* Ok */Block.__(0, [Curry._8(mapper, match[0], match$1[0], match$2[0], match$3[0], match$4[0], match$5[0], match$6[0], match$7[0])]);
              }
              if (exit === 1) {
                var match$8 = Tea_result.first(match$7, Tea_result.first(match$6, Tea_result.first(match$5, Tea_result.first(match$4, Tea_result.first(match$3, Tea_result.first(match$2, Tea_result.first(match$1, match)))))));
                if (match$8.tag) {
                  return /* Error */Block.__(1, ["map8 -> " + match$8[0]]);
                } else {
                  throw [
                        Caml_builtin_exceptions.failure,
                        "Impossible case"
                      ];
                }
              }
              
            })];
}

function succeed(v) {
  return /* Decoder */[(function (_value) {
              return /* Ok */Block.__(0, [v]);
            })];
}

function fail(e) {
  return /* Decoder */[(function (_value) {
              return /* Error */Block.__(1, [e]);
            })];
}

var value = /* Decoder */[(function (value) {
      return /* Ok */Block.__(0, [value]);
    })];

function andThen(func, param) {
  var decoder = param[0];
  return /* Decoder */[(function (value) {
              var err = Curry._1(decoder, value);
              if (err.tag) {
                return err;
              } else {
                var match = Curry._1(func, err[0]);
                return Curry._1(match[0], value);
              }
            })];
}

function lazy_(func) {
  return andThen(func, /* Decoder */[(function (_value) {
                  return /* Ok */Block.__(0, [/* () */0]);
                })]);
}

function nullable(decoder) {
  return oneOf(/* :: */[
              $$null(undefined),
              /* :: */[
                map$1((function (v) {
                        return Caml_option.some(v);
                      }), decoder),
                /* [] */0
              ]
            ]);
}

function decodeValue(param, value) {
  try {
    return Curry._1(param[0], value);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === ParseFail) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      return /* Error */Block.__(1, ["Unknown JSON parsing error"]);
    }
  }
}

function decodeEvent(param, value) {
  try {
    return Curry._1(param[0], value);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === ParseFail) {
      return /* Error */Block.__(1, [exn[1]]);
    } else {
      return /* Error */Block.__(1, ["Unknown JSON parsing error"]);
    }
  }
}

function decodeString(decoder, string) {
  try {
    var value = JSON.parse(string);
    return decodeValue(decoder, value);
  }
  catch (exn){
    return /* Error */Block.__(1, ["Invalid JSON string"]);
  }
}

var Decoder = /* module */[
  /* ObjectDict */ObjectDict,
  /* ParseFail */ParseFail,
  /* string */string,
  /* int */$$int,
  /* float */$$float,
  /* bool */bool,
  /* null */$$null,
  /* list */list,
  /* array */array,
  /* keyValuePairs */keyValuePairs,
  /* dict */dict,
  /* field */field,
  /* at */at,
  /* index */index,
  /* maybe */maybe,
  /* oneOf */oneOf,
  /* map */map$1,
  /* map2 */map2,
  /* map3 */map3,
  /* map4 */map4,
  /* map5 */map5,
  /* map6 */map6,
  /* map7 */map7,
  /* map8 */map8,
  /* succeed */succeed,
  /* fail */fail,
  /* value */value,
  /* andThen */andThen,
  /* lazy_ */lazy_,
  /* nullable */nullable,
  /* decodeValue */decodeValue,
  /* decodeEvent */decodeEvent,
  /* decodeString */decodeString
];

function encode(indentLevel, value) {
  return Web_json.string_of_json(indentLevel, value);
}

function string$1(v) {
  return v;
}

function $$int$1(v) {
  return v;
}

function $$float$1(v) {
  return v;
}

function bool$1(v) {
  return v;
}

function object_(v) {
  var aux = function (o, param) {
    o[param[0]] = param[1];
    return o;
  };
  return List.fold_left(aux, { }, v);
}

function array$1(v) {
  return v;
}

var list$1 = $$Array.of_list;

var Encoder = /* module */[
  /* encode */encode,
  /* string */string$1,
  /* int */$$int$1,
  /* float */$$float$1,
  /* bool */bool$1,
  /* null */Web_json.$$null,
  /* object_ */object_,
  /* array */array$1,
  /* list */list$1
];

exports.Decoder = Decoder;
exports.Encoder = Encoder;
/* No side effect */

},{"./tea_result.js":32,"./web_json.js":37,"bs-platform/lib/js/array.js":1,"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/caml_array.js":4,"bs-platform/lib/js/caml_builtin_exceptions.js":5,"bs-platform/lib/js/caml_exceptions.js":7,"bs-platform/lib/js/caml_js_exceptions.js":13,"bs-platform/lib/js/caml_option.js":15,"bs-platform/lib/js/caml_primitive.js":16,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/js_dict.js":23,"bs-platform/lib/js/list.js":25,"bs-platform/lib/js/pervasives.js":26}],32:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function result_to_option(param) {
  if (param.tag) {
    return undefined;
  } else {
    return Caml_option.some(param[0]);
  }
}

function option_of_result(param) {
  if (param.tag) {
    return undefined;
  } else {
    return Caml_option.some(param[0]);
  }
}

function ok(param) {
  if (param.tag) {
    return undefined;
  } else {
    return Caml_option.some(param[0]);
  }
}

function error(param) {
  if (param.tag) {
    return Caml_option.some(param[0]);
  }
  
}

function last_of(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var tl = param[1];
      var last = param[0];
      if (tl && !last.tag) {
        _param = tl;
        continue ;
      } else {
        return last;
      }
    } else {
      throw [
            Caml_builtin_exceptions.failure,
            "`Tea.Result.do` must never be passed the empty list"
          ];
    }
  };
}

function accumulate(param) {
  if (param) {
    var tl = param[1];
    var last = param[0];
    if (tl) {
      if (last.tag) {
        return last;
      } else {
        var e = accumulate(tl);
        if (e.tag) {
          return e;
        } else {
          return /* Ok */Block.__(0, [/* :: */[
                      last[0],
                      e[0]
                    ]]);
        }
      }
    } else if (last.tag) {
      return last;
    } else {
      return /* Ok */Block.__(0, [/* :: */[
                  last[0],
                  /* [] */0
                ]]);
    }
  } else {
    return /* Ok */Block.__(0, [/* [] */0]);
  }
}

function first(fst, e) {
  if (e.tag) {
    return e;
  } else {
    return fst;
  }
}

function error_of_any(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var hd = param[0];
      if (hd.tag) {
        return Caml_option.some(hd[0]);
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return undefined;
    }
  };
}

function error_of_first(fst, param) {
  if (param.tag) {
    return Caml_option.some(param[0]);
  } else {
    return error(fst);
  }
}

exports.result_to_option = result_to_option;
exports.option_of_result = option_of_result;
exports.ok = ok;
exports.error = error;
exports.last_of = last_of;
exports.accumulate = accumulate;
exports.first = first;
exports.error_of_any = error_of_any;
exports.error_of_first = error_of_first;
/* No side effect */

},{"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/caml_builtin_exceptions.js":5,"bs-platform/lib/js/caml_option.js":15}],33:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");

function batch(subs) {
  return /* Batch */Block.__(0, [subs]);
}

function registration(key, enableCall) {
  return /* Registration */Block.__(1, [
            key,
            (function (callbacks) {
                return Curry._1(enableCall, callbacks[0]);
              }),
            /* record */[/* contents */undefined]
          ]);
}

function map(msgMapper, sub) {
  var func = function (callbacks) {
    return /* record */[/* contents : record */[/* enqueue */(function (userMsg) {
                  return Curry._1(callbacks[0][/* enqueue */0], Curry._1(msgMapper, userMsg));
                })]];
  };
  return /* Mapper */Block.__(2, [
            func,
            sub
          ]);
}

function mapFunc(func, sub) {
  return /* Mapper */Block.__(2, [
            func,
            sub
          ]);
}

function run(oldCallbacks, newCallbacks, oldSub, newSub) {
  var enable = function (_callbacks, _param) {
    while(true) {
      var param = _param;
      var callbacks = _callbacks;
      if (typeof param === "number") {
        return /* () */0;
      } else {
        switch (param.tag | 0) {
          case 0 : 
              var subs = param[0];
              if (subs) {
                return List.iter((function(callbacks){
                          return function (param) {
                            return enable(callbacks, param);
                          }
                          }(callbacks)), subs);
              } else {
                return /* () */0;
              }
          case 1 : 
              param[2][0] = Curry._1(param[1], callbacks);
              return /* () */0;
          case 2 : 
              var subCallbacks = Curry._1(param[0], callbacks);
              _param = param[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }
    };
  };
  var disable = function (_callbacks, _param) {
    while(true) {
      var param = _param;
      var callbacks = _callbacks;
      if (typeof param === "number") {
        return /* () */0;
      } else {
        switch (param.tag | 0) {
          case 0 : 
              var subs = param[0];
              if (subs) {
                return List.iter((function(callbacks){
                          return function (param) {
                            return disable(callbacks, param);
                          }
                          }(callbacks)), subs);
              } else {
                return /* () */0;
              }
          case 1 : 
              var diCB = param[2];
              var match = diCB[0];
              if (match !== undefined) {
                diCB[0] = undefined;
                return Curry._1(match, /* () */0);
              } else {
                return /* () */0;
              }
          case 2 : 
              var subCallbacks = Curry._1(param[0], callbacks);
              _param = param[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }
    };
  };
  var exit = 0;
  if (typeof oldSub === "number") {
    if (typeof newSub === "number") {
      return newSub;
    } else {
      exit = 1;
    }
  } else {
    switch (oldSub.tag | 0) {
      case 0 : 
          if (typeof newSub === "number" || newSub.tag) {
            exit = 1;
          } else {
            var aux = function (_oldList, _newList) {
              while(true) {
                var newList = _newList;
                var oldList = _oldList;
                if (oldList) {
                  var oldRest = oldList[1];
                  var oldSubSub = oldList[0];
                  if (newList) {
                    run(oldCallbacks, newCallbacks, oldSubSub, newList[0]);
                    _newList = newList[1];
                    _oldList = oldRest;
                    continue ;
                  } else {
                    disable(oldCallbacks, oldSubSub);
                    _newList = /* [] */0;
                    _oldList = oldRest;
                    continue ;
                  }
                } else if (newList) {
                  enable(newCallbacks, newList[0]);
                  _newList = newList[1];
                  _oldList = /* [] */0;
                  continue ;
                } else {
                  return /* () */0;
                }
              };
            };
            aux(oldSub[0], newSub[0]);
            return newSub;
          }
          break;
      case 1 : 
          if (typeof newSub === "number" || !(newSub.tag === 1 && oldSub[0] === newSub[0])) {
            exit = 1;
          } else {
            newSub[2][0] = oldSub[2][0];
            return newSub;
          }
          break;
      case 2 : 
          if (typeof newSub === "number" || newSub.tag !== 2) {
            exit = 1;
          } else {
            var olderCallbacks = Curry._1(oldSub[0], oldCallbacks);
            var newerCallbacks = Curry._1(newSub[0], newCallbacks);
            run(olderCallbacks, newerCallbacks, oldSub[1], newSub[1]);
            return newSub;
          }
          break;
      
    }
  }
  if (exit === 1) {
    disable(oldCallbacks, oldSub);
    enable(newCallbacks, newSub);
    return newSub;
  }
  
}

var none = /* NoSub */0;

exports.none = none;
exports.batch = batch;
exports.registration = registration;
exports.map = map;
exports.mapFunc = mapFunc;
exports.run = run;
/* No side effect */

},{"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/list.js":25}],34:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Web_node = require("./web_node.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Web_document = require("./web_document.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var noNode = /* CommentNode */Block.__(0, [""]);

function comment(s) {
  return /* CommentNode */Block.__(0, [s]);
}

function text(s) {
  return /* Text */Block.__(1, [s]);
}

function fullnode(namespace, tagName, key, unique, props, vdoms) {
  return /* Node */Block.__(2, [
            namespace,
            tagName,
            key,
            unique,
            props,
            vdoms
          ]);
}

function node($staropt$star, tagName, $staropt$star$1, $staropt$star$2, props, vdoms) {
  var namespace = $staropt$star !== undefined ? $staropt$star : "";
  var key = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var unique = $staropt$star$2 !== undefined ? $staropt$star$2 : "";
  return fullnode(namespace, tagName, key, unique, props, vdoms);
}

function lazyGen(key, fn) {
  return /* LazyGen */Block.__(3, [
            key,
            fn,
            /* record */[/* contents */noNode]
          ]);
}

function prop(key, value) {
  return /* RawProp */Block.__(0, [
            key,
            value
          ]);
}

function onCB(name, key, cb) {
  return /* Event */Block.__(3, [
            name,
            /* EventHandlerCallback */Block.__(0, [
                key,
                cb
              ]),
            /* record */[/* contents */undefined]
          ]);
}

function onMsg(name, msg) {
  return /* Event */Block.__(3, [
            name,
            /* EventHandlerMsg */Block.__(1, [msg]),
            /* record */[/* contents */undefined]
          ]);
}

function attribute(namespace, key, value) {
  return /* Attribute */Block.__(1, [
            namespace,
            key,
            value
          ]);
}

function data(key, value) {
  return /* Data */Block.__(2, [
            key,
            value
          ]);
}

function style(key, value) {
  return /* Style */Block.__(4, [/* :: */[
              /* tuple */[
                key,
                value
              ],
              /* [] */0
            ]]);
}

function styles(s) {
  return /* Style */Block.__(4, [s]);
}

function renderToHtmlString(_param) {
  while(true) {
    var param = _param;
    switch (param.tag | 0) {
      case 0 : 
          return "<!-- " + (param[0] + " -->");
      case 1 : 
          return param[0];
      case 2 : 
          var tagName = param[1];
          var namespace = param[0];
          return $$String.concat("", /* :: */[
                      "<",
                      /* :: */[
                        namespace,
                        /* :: */[
                          namespace === "" ? "" : ":",
                          /* :: */[
                            tagName,
                            /* :: */[
                              $$String.concat("", List.map((function (p) {
                                          var param = p;
                                          if (typeof param === "number") {
                                            return "";
                                          } else {
                                            switch (param.tag | 0) {
                                              case 0 : 
                                                  return $$String.concat("", /* :: */[
                                                              " ",
                                                              /* :: */[
                                                                param[0],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    param[1],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case 1 : 
                                                  return $$String.concat("", /* :: */[
                                                              " ",
                                                              /* :: */[
                                                                param[1],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    param[2],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case 2 : 
                                                  return $$String.concat("", /* :: */[
                                                              " data-",
                                                              /* :: */[
                                                                param[0],
                                                                /* :: */[
                                                                  "=\"",
                                                                  /* :: */[
                                                                    param[1],
                                                                    /* :: */[
                                                                      "\"",
                                                                      /* [] */0
                                                                    ]
                                                                  ]
                                                                ]
                                                              ]
                                                            ]);
                                              case 3 : 
                                                  return "";
                                              case 4 : 
                                                  return $$String.concat("", /* :: */[
                                                              " style=\"",
                                                              /* :: */[
                                                                $$String.concat(";", List.map((function (param) {
                                                                            return $$String.concat("", /* :: */[
                                                                                        param[0],
                                                                                        /* :: */[
                                                                                          ":",
                                                                                          /* :: */[
                                                                                            param[1],
                                                                                            /* :: */[
                                                                                              ";",
                                                                                              /* [] */0
                                                                                            ]
                                                                                          ]
                                                                                        ]
                                                                                      ]);
                                                                          }), param[0])),
                                                                /* :: */[
                                                                  "\"",
                                                                  /* [] */0
                                                                ]
                                                              ]
                                                            ]);
                                              
                                            }
                                          }
                                        }), param[4])),
                              /* :: */[
                                ">",
                                /* :: */[
                                  $$String.concat("", List.map(renderToHtmlString, param[5])),
                                  /* :: */[
                                    "</",
                                    /* :: */[
                                      tagName,
                                      /* :: */[
                                        ">",
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]);
      case 3 : 
          _param = Curry._1(param[1], /* () */0);
          continue ;
      case 4 : 
          _param = param[1];
          continue ;
      
    }
  };
}

function emptyEventHandler(_ev) {
  return /* () */0;
}

function emptyEventCB(_ev) {
  return undefined;
}

function eventHandler(callbacks, cb) {
  return (function (ev) {
      var match = Curry._1(cb[0], ev);
      if (match !== undefined) {
        return Curry._1(callbacks[0][/* enqueue */0], Caml_option.valFromOption(match));
      } else {
        return /* () */0;
      }
    });
}

function eventHandler_GetCB(param) {
  if (param.tag) {
    var msg = param[0];
    return (function (_ev) {
        return Caml_option.some(msg);
      });
  } else {
    return param[1];
  }
}

function compareEventHandlerTypes(left, param) {
  if (param.tag) {
    if (left.tag && Caml_obj.caml_equal(param[0], left[0])) {
      return true;
    } else {
      return false;
    }
  } else if (left.tag) {
    return false;
  } else {
    return param[0] === left[0];
  }
}

function eventHandler_Register(callbacks, elem, name, handlerType) {
  var cb = /* record */[/* contents */eventHandler_GetCB(handlerType)];
  var handler = eventHandler(callbacks, cb);
  Web_node.addEventListener(elem, name, handler, false);
  return /* record */[
          /* handler */handler,
          /* cb */cb
        ];
}

function eventHandler_Unregister(elem, name, param) {
  if (param !== undefined) {
    Web_node.removeEventListener(elem, name, param[/* handler */0], false);
    return undefined;
  }
  
}

function eventHandler_Mutate(callbacks, elem, oldName, newName, oldHandlerType, newHandlerType, oldCache, newCache) {
  var match = oldCache[0];
  if (match !== undefined) {
    if (oldName === newName) {
      newCache[0] = oldCache[0];
      if (compareEventHandlerTypes(oldHandlerType, newHandlerType)) {
        return /* () */0;
      } else {
        var cb = eventHandler_GetCB(newHandlerType);
        match[/* cb */1][0] = cb;
        return /* () */0;
      }
    } else {
      oldCache[0] = eventHandler_Unregister(elem, oldName, oldCache[0]);
      newCache[0] = eventHandler_Register(callbacks, elem, newName, newHandlerType);
      return /* () */0;
    }
  } else {
    newCache[0] = eventHandler_Register(callbacks, elem, newName, newHandlerType);
    return /* () */0;
  }
}

function patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, _idx, param) {
  if (typeof param === "number") {
    return /* () */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          elem[param[0]] = param[1];
          return /* () */0;
      case 1 : 
          return Web_node.setAttributeNsOptional(elem, param[0], param[1], param[2]);
      case 2 : 
          console.log(/* tuple */[
                "TODO:  Add Data Unhandled",
                param[0],
                param[1]
              ]);
          throw [
                Caml_builtin_exceptions.failure,
                "TODO:  Add Data Unhandled"
              ];
      case 3 : 
          param[2][0] = eventHandler_Register(callbacks, elem, param[0], param[1]);
          return /* () */0;
      case 4 : 
          return List.fold_left((function (param, param$1) {
                        return Web_node.setStyleProperty(elem, undefined, param$1[0], param$1[1]);
                      }), /* () */0, param[0]);
      
    }
  }
}

function patchVNodesOnElems_PropertiesApply_Remove(_callbacks, elem, _idx, param) {
  if (typeof param === "number") {
    return /* () */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          elem[param[0]] = undefined;
          return /* () */0;
      case 1 : 
          return Web_node.removeAttributeNsOptional(elem, param[0], param[1]);
      case 2 : 
          console.log(/* tuple */[
                "TODO:  Remove Data Unhandled",
                param[0],
                param[1]
              ]);
          throw [
                Caml_builtin_exceptions.failure,
                "TODO:  Remove Data Unhandled"
              ];
      case 3 : 
          var cache = param[2];
          cache[0] = eventHandler_Unregister(elem, param[0], cache[0]);
          return /* () */0;
      case 4 : 
          return List.fold_left((function (param, param$1) {
                        return Web_node.setStyleProperty(elem, undefined, param$1[0], null);
                      }), /* () */0, param[0]);
      
    }
  }
}

function patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, oldProp, newProp) {
  patchVNodesOnElems_PropertiesApply_Remove(callbacks, elem, idx, oldProp);
  patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, idx, newProp);
  return /* () */0;
}

function patchVNodesOnElems_PropertiesApply_Mutate(_callbacks, elem, _idx, oldProp, _newProp) {
  if (typeof _newProp === "number") {
    throw [
          Caml_builtin_exceptions.failure,
          "This should never be called as all entries through NoProp are gated."
        ];
  } else {
    switch (_newProp.tag | 0) {
      case 0 : 
          elem[_newProp[0]] = _newProp[1];
          return /* () */0;
      case 1 : 
          return Web_node.setAttributeNsOptional(elem, _newProp[0], _newProp[1], _newProp[2]);
      case 2 : 
          console.log(/* tuple */[
                "TODO:  Mutate Data Unhandled",
                _newProp[0],
                _newProp[1]
              ]);
          throw [
                Caml_builtin_exceptions.failure,
                "TODO:  Mutate Data Unhandled"
              ];
      case 3 : 
          throw [
                Caml_builtin_exceptions.failure,
                "This will never be called because it is gated"
              ];
      case 4 : 
          if (typeof oldProp === "number") {
            throw [
                  Caml_builtin_exceptions.failure,
                  "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!"
                ];
          } else if (oldProp.tag === 4) {
            return List.fold_left2((function (param, param$1, param$2) {
                          var nv = param$2[1];
                          var nk = param$2[0];
                          var ok = param$1[0];
                          if (ok === nk) {
                            if (param$1[1] === nv) {
                              return /* () */0;
                            } else {
                              return Web_node.setStyleProperty(elem, undefined, nk, nv);
                            }
                          } else {
                            Web_node.setStyleProperty(elem, undefined, ok, null);
                            return Web_node.setStyleProperty(elem, undefined, nk, nv);
                          }
                        }), /* () */0, oldProp[0], _newProp[0]);
          } else {
            throw [
                  Caml_builtin_exceptions.failure,
                  "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!"
                ];
          }
      
    }
  }
}

function patchVNodesOnElems_PropertiesApply(callbacks, elem, _idx, _oldProperties, _newProperties) {
  while(true) {
    var newProperties = _newProperties;
    var oldProperties = _oldProperties;
    var idx = _idx;
    if (oldProperties) {
      var _oldProp = oldProperties[0];
      var exit = 0;
      if (newProperties) {
        if (typeof _oldProp === "number") {
          if (typeof newProperties[0] === "number") {
            _newProperties = newProperties[1];
            _oldProperties = oldProperties[1];
            _idx = idx + 1 | 0;
            continue ;
          } else {
            exit = 1;
          }
        } else {
          switch (_oldProp.tag | 0) {
            case 0 : 
                var newProp = newProperties[0];
                if (typeof newProp === "number" || newProp.tag) {
                  exit = 1;
                } else {
                  if (!(_oldProp[0] === newProp[0] && _oldProp[1] === newProp[1])) {
                    patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp);
                  }
                  _newProperties = newProperties[1];
                  _oldProperties = oldProperties[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                break;
            case 1 : 
                var newProp$1 = newProperties[0];
                if (typeof newProp$1 === "number" || newProp$1.tag !== 1) {
                  exit = 1;
                } else {
                  if (!(_oldProp[0] === newProp$1[0] && _oldProp[1] === newProp$1[1] && _oldProp[2] === newProp$1[2])) {
                    patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$1);
                  }
                  _newProperties = newProperties[1];
                  _oldProperties = oldProperties[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                break;
            case 2 : 
                var newProp$2 = newProperties[0];
                if (typeof newProp$2 === "number" || newProp$2.tag !== 2) {
                  exit = 1;
                } else {
                  if (!(_oldProp[0] === newProp$2[0] && _oldProp[1] === newProp$2[1])) {
                    patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$2);
                  }
                  _newProperties = newProperties[1];
                  _oldProperties = oldProperties[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                break;
            case 3 : 
                var _newProp = newProperties[0];
                if (typeof _newProp === "number" || _newProp.tag !== 3) {
                  exit = 1;
                } else {
                  eventHandler_Mutate(callbacks, elem, _oldProp[0], _newProp[0], _oldProp[1], _newProp[1], _oldProp[2], _newProp[2]);
                  _newProperties = newProperties[1];
                  _oldProperties = oldProperties[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                break;
            case 4 : 
                var newProp$3 = newProperties[0];
                if (typeof newProp$3 === "number" || newProp$3.tag !== 4) {
                  exit = 1;
                } else {
                  if (!Caml_obj.caml_equal(_oldProp[0], newProp$3[0])) {
                    patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$3);
                  }
                  _newProperties = newProperties[1];
                  _oldProperties = oldProperties[1];
                  _idx = idx + 1 | 0;
                  continue ;
                }
                break;
            
          }
        }
      } else {
        return false;
      }
      if (exit === 1) {
        patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, _oldProp, newProperties[0]);
        _newProperties = newProperties[1];
        _oldProperties = oldProperties[1];
        _idx = idx + 1 | 0;
        continue ;
      }
      
    } else if (newProperties) {
      return false;
    } else {
      return true;
    }
  };
}

function patchVNodesOnElems_Properties(callbacks, elem, oldProperties, newProperties) {
  return patchVNodesOnElems_PropertiesApply(callbacks, elem, 0, oldProperties, newProperties);
}

function genEmptyProps(length) {
  var _lst = /* [] */0;
  var _len = length;
  while(true) {
    var len = _len;
    var lst = _lst;
    if (len !== 0) {
      _len = len - 1 | 0;
      _lst = /* :: */[
        /* NoProp */0,
        lst
      ];
      continue ;
    } else {
      return lst;
    }
  };
}

function mapEmptyProps(props) {
  return List.map((function (param) {
                return /* NoProp */0;
              }), props);
}

function patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, param) {
  if (param.tag === 2) {
    var newProperties = param[4];
    var oldChild = Caml_array.caml_array_get(elems, idx);
    var newChild = Web_document.createElementNsOptional(param[0], param[1]);
    var match = patchVNodesOnElems_Properties(callbacks, newChild, List.map((function (param) {
                return /* NoProp */0;
              }), newProperties), newProperties);
    if (match) {
      var childChildren = newChild.childNodes;
      patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, param[5]);
      Web_node.insertBefore(elem, newChild, oldChild);
      elem.removeChild(oldChild);
      return /* () */0;
    } else {
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "vdom.ml",
              383,
              30
            ]
          ];
    }
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "Node replacement should never be passed anything but a node itself"
        ];
  }
}

function patchVNodesOnElems_CreateElement(_callbacks, _param) {
  while(true) {
    var param = _param;
    var callbacks = _callbacks;
    switch (param.tag | 0) {
      case 0 : 
          var text = param[0];
          return document.createComment(text);
      case 1 : 
          var text$1 = param[0];
          return document.createTextNode(text$1);
      case 2 : 
          var newProperties = param[4];
          var newChild = Web_document.createElementNsOptional(param[0], param[1]);
          var match = patchVNodesOnElems_Properties(callbacks, newChild, List.map((function (param) {
                      return /* NoProp */0;
                    }), newProperties), newProperties);
          if (match) {
            var childChildren = newChild.childNodes;
            patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, param[5]);
            return newChild;
          } else {
            throw [
                  Caml_builtin_exceptions.match_failure,
                  /* tuple */[
                    "vdom.ml",
                    400,
                    30
                  ]
                ];
          }
      case 3 : 
          var vdom = Curry._1(param[1], /* () */0);
          param[2][0] = vdom;
          _param = vdom;
          continue ;
      case 4 : 
          _param = param[1];
          _callbacks = Curry._1(param[0], callbacks);
          continue ;
      
    }
  };
}

function patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode) {
  if (oldNode.tag === 2) {
    if (newNode.tag === 2) {
      if (oldNode[3] !== newNode[3] || oldNode[1] !== newNode[1]) {
        return patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
      } else {
        var child = Caml_array.caml_array_get(elems, idx);
        var childChildren = child.childNodes;
        if (!patchVNodesOnElems_Properties(callbacks, child, oldNode[4], newNode[4])) {
          console.log("VDom:  Failed swapping properties because the property list length changed, use `noProp` to swap properties instead, not by altering the list structure.  This is a massive inefficiency until this issue is resolved.");
          patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        return patchVNodesOnElems(callbacks, child, childChildren, 0, oldNode[5], newNode[5]);
      }
    } else {
      throw [
            Caml_builtin_exceptions.failure,
            "Non-node passed to patchVNodesOnElems_MutateNode"
          ];
    }
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "Non-node passed to patchVNodesOnElems_MutateNode"
        ];
  }
}

function patchVNodesOnElems(callbacks, elem, elems, _idx, _oldVNodes, _newVNodes) {
  while(true) {
    var newVNodes = _newVNodes;
    var oldVNodes = _oldVNodes;
    var idx = _idx;
    if (oldVNodes) {
      var oldNode = oldVNodes[0];
      var exit = 0;
      switch (oldNode.tag | 0) {
        case 0 : 
            if (newVNodes) {
              var match = newVNodes[0];
              if (match.tag || oldNode[0] !== match[0]) {
                exit = 1;
              } else {
                _newVNodes = newVNodes[1];
                _oldVNodes = oldVNodes[1];
                _idx = idx + 1 | 0;
                continue ;
              }
            } else {
              exit = 1;
            }
            break;
        case 1 : 
            if (newVNodes) {
              var match$1 = newVNodes[0];
              if (match$1.tag === 1) {
                var newText = match$1[0];
                if (oldNode[0] !== newText) {
                  var child = Caml_array.caml_array_get(elems, idx);
                  child.nodeValue = newText;
                }
                _newVNodes = newVNodes[1];
                _oldVNodes = oldVNodes[1];
                _idx = idx + 1 | 0;
                continue ;
              } else {
                exit = 1;
              }
            } else {
              exit = 1;
            }
            break;
        case 2 : 
            if (newVNodes) {
              var newNode = newVNodes[0];
              if (newNode.tag === 2) {
                var newRest = newVNodes[1];
                var newKey = newNode[2];
                var newTagName = newNode[1];
                var newNamespace = newNode[0];
                var oldRest = oldVNodes[1];
                var oldKey = oldNode[2];
                var oldTagName = oldNode[1];
                var oldNamespace = oldNode[0];
                if (oldKey === newKey && oldKey !== "") {
                  _newVNodes = newRest;
                  _oldVNodes = oldRest;
                  _idx = idx + 1 | 0;
                  continue ;
                } else if (oldKey === "" || newKey === "") {
                  patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                  _newVNodes = newRest;
                  _oldVNodes = oldRest;
                  _idx = idx + 1 | 0;
                  continue ;
                } else {
                  var exit$1 = 0;
                  var exit$2 = 0;
                  if (oldRest) {
                    var match$2 = oldRest[0];
                    if (match$2.tag === 2) {
                      var olderRest = oldRest[1];
                      var olderKey = match$2[2];
                      var olderTagName = match$2[1];
                      var olderNamespace = match$2[0];
                      var exit$3 = 0;
                      if (newRest) {
                        var match$3 = newRest[0];
                        if (match$3.tag === 2 && olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey && oldNamespace === match$3[0] && oldTagName === match$3[1] && oldKey === match$3[2]) {
                          var firstChild = Caml_array.caml_array_get(elems, idx);
                          var secondChild = Caml_array.caml_array_get(elems, idx + 1 | 0);
                          elem.removeChild(secondChild);
                          Web_node.insertBefore(elem, secondChild, firstChild);
                          _newVNodes = newRest[1];
                          _oldVNodes = olderRest;
                          _idx = idx + 2 | 0;
                          continue ;
                        } else {
                          exit$3 = 4;
                        }
                      } else {
                        exit$3 = 4;
                      }
                      if (exit$3 === 4) {
                        if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey) {
                          var oldChild = Caml_array.caml_array_get(elems, idx);
                          elem.removeChild(oldChild);
                          _newVNodes = newRest;
                          _oldVNodes = olderRest;
                          _idx = idx + 1 | 0;
                          continue ;
                        } else {
                          exit$2 = 3;
                        }
                      }
                      
                    } else {
                      exit$2 = 3;
                    }
                  } else {
                    exit$2 = 3;
                  }
                  if (exit$2 === 3) {
                    if (newRest) {
                      var match$4 = newRest[0];
                      if (match$4.tag === 2 && oldNamespace === match$4[0] && oldTagName === match$4[1] && oldKey === match$4[2]) {
                        var oldChild$1 = Caml_array.caml_array_get(elems, idx);
                        var newChild = patchVNodesOnElems_CreateElement(callbacks, newNode);
                        Web_node.insertBefore(elem, newChild, oldChild$1);
                        _newVNodes = newRest;
                        _idx = idx + 1 | 0;
                        continue ;
                      } else {
                        exit$1 = 2;
                      }
                    } else {
                      exit$1 = 2;
                    }
                  }
                  if (exit$1 === 2) {
                    patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  
                }
              } else {
                exit = 1;
              }
            } else {
              exit = 1;
            }
            break;
        case 3 : 
            if (newVNodes) {
              var match$5 = newVNodes[0];
              if (match$5.tag === 3) {
                var newRest$1 = newVNodes[1];
                var newCache = match$5[2];
                var newGen = match$5[1];
                var newKey$1 = match$5[0];
                var oldRest$1 = oldVNodes[1];
                var oldCache = oldNode[2];
                var oldKey$1 = oldNode[0];
                if (oldKey$1 === newKey$1) {
                  newCache[0] = oldCache[0];
                  _newVNodes = newRest$1;
                  _oldVNodes = oldRest$1;
                  _idx = idx + 1 | 0;
                  continue ;
                } else {
                  var exit$4 = 0;
                  var exit$5 = 0;
                  if (oldRest$1) {
                    var match$6 = oldRest$1[0];
                    if (match$6.tag === 3) {
                      var olderRest$1 = oldRest$1[1];
                      var olderKey$1 = match$6[0];
                      var exit$6 = 0;
                      if (newRest$1) {
                        var match$7 = newRest$1[0];
                        if (match$7.tag === 3 && olderKey$1 === newKey$1 && oldKey$1 === match$7[0]) {
                          var firstChild$1 = Caml_array.caml_array_get(elems, idx);
                          var secondChild$1 = Caml_array.caml_array_get(elems, idx + 1 | 0);
                          elem.removeChild(secondChild$1);
                          Web_node.insertBefore(elem, secondChild$1, firstChild$1);
                          _newVNodes = newRest$1[1];
                          _oldVNodes = olderRest$1;
                          _idx = idx + 2 | 0;
                          continue ;
                        } else {
                          exit$6 = 4;
                        }
                      } else {
                        exit$6 = 4;
                      }
                      if (exit$6 === 4) {
                        if (olderKey$1 === newKey$1) {
                          var oldChild$2 = Caml_array.caml_array_get(elems, idx);
                          elem.removeChild(oldChild$2);
                          var oldVdom = match$6[2][0];
                          newCache[0] = oldVdom;
                          _newVNodes = newRest$1;
                          _oldVNodes = olderRest$1;
                          _idx = idx + 1 | 0;
                          continue ;
                        } else {
                          exit$5 = 3;
                        }
                      }
                      
                    } else {
                      exit$5 = 3;
                    }
                  } else {
                    exit$5 = 3;
                  }
                  if (exit$5 === 3) {
                    if (newRest$1) {
                      var match$8 = newRest$1[0];
                      if (match$8.tag === 3 && match$8[0] === oldKey$1) {
                        var oldChild$3 = Caml_array.caml_array_get(elems, idx);
                        var newVdom = Curry._1(newGen, /* () */0);
                        newCache[0] = newVdom;
                        var newChild$1 = patchVNodesOnElems_CreateElement(callbacks, newVdom);
                        Web_node.insertBefore(elem, newChild$1, oldChild$3);
                        _newVNodes = newRest$1;
                        _idx = idx + 1 | 0;
                        continue ;
                      } else {
                        exit$4 = 2;
                      }
                    } else {
                      exit$4 = 2;
                    }
                  }
                  if (exit$4 === 2) {
                    var oldVdom$1 = oldCache[0];
                    var newVdom$1 = Curry._1(newGen, /* () */0);
                    newCache[0] = newVdom$1;
                    _newVNodes = /* :: */[
                      newVdom$1,
                      newRest$1
                    ];
                    _oldVNodes = /* :: */[
                      oldVdom$1,
                      oldRest$1
                    ];
                    continue ;
                  }
                  
                }
              } else {
                exit = 1;
              }
            } else {
              exit = 1;
            }
            break;
        case 4 : 
            _oldVNodes = /* :: */[
              oldNode[1],
              oldVNodes[1]
            ];
            continue ;
        
      }
      if (exit === 1) {
        var oldRest$2 = oldVNodes[1];
        if (newVNodes) {
          var newNode$1 = newVNodes[0];
          if (newNode$1.tag === 4) {
            patchVNodesOnElems(Curry._1(newNode$1[0], callbacks), elem, elems, idx, /* :: */[
                  oldNode,
                  /* [] */0
                ], /* :: */[
                  newNode$1[1],
                  /* [] */0
                ]);
            _newVNodes = newVNodes[1];
            _oldVNodes = oldRest$2;
            _idx = idx + 1 | 0;
            continue ;
          } else {
            var oldChild$4 = Caml_array.caml_array_get(elems, idx);
            var newChild$2 = patchVNodesOnElems_CreateElement(callbacks, newNode$1);
            Web_node.insertBefore(elem, newChild$2, oldChild$4);
            elem.removeChild(oldChild$4);
            _newVNodes = newVNodes[1];
            _oldVNodes = oldRest$2;
            _idx = idx + 1 | 0;
            continue ;
          }
        } else {
          var child$1 = Caml_array.caml_array_get(elems, idx);
          elem.removeChild(child$1);
          _newVNodes = /* [] */0;
          _oldVNodes = oldRest$2;
          continue ;
        }
      }
      
    } else if (newVNodes) {
      var newChild$3 = patchVNodesOnElems_CreateElement(callbacks, newVNodes[0]);
      elem.appendChild(newChild$3);
      _newVNodes = newVNodes[1];
      _oldVNodes = /* [] */0;
      _idx = idx + 1 | 0;
      continue ;
    } else {
      return /* () */0;
    }
  };
}

function patchVNodesIntoElement(callbacks, elem, oldVNodes, newVNodes) {
  var elems = elem.childNodes;
  patchVNodesOnElems(callbacks, elem, elems, 0, oldVNodes, newVNodes);
  return newVNodes;
}

function patchVNodeIntoElement(callbacks, elem, oldVNode, newVNode) {
  return patchVNodesIntoElement(callbacks, elem, /* :: */[
              oldVNode,
              /* [] */0
            ], /* :: */[
              newVNode,
              /* [] */0
            ]);
}

function wrapCallbacks(func, callbacks) {
  return /* record */[/* contents : record */[/* enqueue */(function (msg) {
                return Curry._1(callbacks[0][/* enqueue */0], Curry._1(func, msg));
              })]];
}

function map(func, vdom) {
  var tagger = function (callbacks) {
    return /* record */[/* contents : record */[/* enqueue */(function (msg) {
                  return Curry._1(callbacks[0][/* enqueue */0], Curry._1(func, msg));
                })]];
  };
  return /* Tagger */Block.__(4, [
            tagger,
            vdom
          ]);
}

var noProp = /* NoProp */0;

exports.noNode = noNode;
exports.comment = comment;
exports.text = text;
exports.fullnode = fullnode;
exports.node = node;
exports.lazyGen = lazyGen;
exports.noProp = noProp;
exports.prop = prop;
exports.onCB = onCB;
exports.onMsg = onMsg;
exports.attribute = attribute;
exports.data = data;
exports.style = style;
exports.styles = styles;
exports.renderToHtmlString = renderToHtmlString;
exports.emptyEventHandler = emptyEventHandler;
exports.emptyEventCB = emptyEventCB;
exports.eventHandler = eventHandler;
exports.eventHandler_GetCB = eventHandler_GetCB;
exports.compareEventHandlerTypes = compareEventHandlerTypes;
exports.eventHandler_Register = eventHandler_Register;
exports.eventHandler_Unregister = eventHandler_Unregister;
exports.eventHandler_Mutate = eventHandler_Mutate;
exports.patchVNodesOnElems_PropertiesApply_Add = patchVNodesOnElems_PropertiesApply_Add;
exports.patchVNodesOnElems_PropertiesApply_Remove = patchVNodesOnElems_PropertiesApply_Remove;
exports.patchVNodesOnElems_PropertiesApply_RemoveAdd = patchVNodesOnElems_PropertiesApply_RemoveAdd;
exports.patchVNodesOnElems_PropertiesApply_Mutate = patchVNodesOnElems_PropertiesApply_Mutate;
exports.patchVNodesOnElems_PropertiesApply = patchVNodesOnElems_PropertiesApply;
exports.patchVNodesOnElems_Properties = patchVNodesOnElems_Properties;
exports.genEmptyProps = genEmptyProps;
exports.mapEmptyProps = mapEmptyProps;
exports.patchVNodesOnElems_ReplaceNode = patchVNodesOnElems_ReplaceNode;
exports.patchVNodesOnElems_CreateElement = patchVNodesOnElems_CreateElement;
exports.patchVNodesOnElems_MutateNode = patchVNodesOnElems_MutateNode;
exports.patchVNodesOnElems = patchVNodesOnElems;
exports.patchVNodesIntoElement = patchVNodesIntoElement;
exports.patchVNodeIntoElement = patchVNodeIntoElement;
exports.wrapCallbacks = wrapCallbacks;
exports.map = map;
/* No side effect */

},{"./web_document.js":36,"./web_node.js":38,"bs-platform/lib/js/block.js":2,"bs-platform/lib/js/caml_array.js":4,"bs-platform/lib/js/caml_builtin_exceptions.js":5,"bs-platform/lib/js/caml_obj.js":14,"bs-platform/lib/js/caml_option.js":15,"bs-platform/lib/js/curry.js":22,"bs-platform/lib/js/list.js":25,"bs-platform/lib/js/string.js":27}],35:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Web_node = require("./web_node.js");
var Web_window = require("./web_window.js");

function polyfills(param) {
  Web_node.remove_polyfill(/* () */0);
  Web_window.requestAnimationFrame_polyfill(/* () */0);
  return /* () */0;
}

var $$Event = 0;

var $$Node = 0;

var $$Document = 0;

var $$Date = 0;

var $$Window = 0;

var $$Location = 0;

var Json = 0;

var $$XMLHttpRequest = 0;

var $$FormData = 0;

exports.$$Event = $$Event;
exports.$$Node = $$Node;
exports.$$Document = $$Document;
exports.$$Date = $$Date;
exports.$$Window = $$Window;
exports.$$Location = $$Location;
exports.Json = Json;
exports.$$XMLHttpRequest = $$XMLHttpRequest;
exports.$$FormData = $$FormData;
exports.polyfills = polyfills;
/* No side effect */

},{"./web_node.js":38,"./web_window.js":39}],36:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';


function body(param) {
  return document.body;
}

function createElement(typ) {
  return document.createElement(typ);
}

function createElementNS(namespace, key) {
  return document.createElementNS(namespace, key);
}

function createComment(text) {
  return document.createComment(text);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function getElementById(id) {
  return document.getElementById(id);
}

function createElementNsOptional(namespace, tagName) {
  if (namespace === "") {
    return document.createElement(tagName);
  } else {
    return document.createElementNS(namespace, tagName);
  }
}

function $$location(param) {
  return document.location;
}

exports.body = body;
exports.createElement = createElement;
exports.createElementNS = createElementNS;
exports.createComment = createComment;
exports.createTextNode = createTextNode;
exports.getElementById = getElementById;
exports.createElementNsOptional = createElementNsOptional;
exports.$$location = $$location;
/* No side effect */

},{}],37:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Js_json = require("bs-platform/lib/js/js_json.js");

function string_of_json($staropt$star, value) {
  var indent = $staropt$star !== undefined ? $staropt$star : 2;
  if (value !== undefined) {
    try {
      return JSON.stringify(value, null, indent);
    }
    catch (exn){
      return "";
    }
  } else {
    return "undefined";
  }
}

function of_type(_v, x) {
  return x;
}

var classify = Js_json.classify;

var test = Js_json.test;

var decodeString = Js_json.decodeString;

var decodeNumber = Js_json.decodeNumber;

var decodeObject = Js_json.decodeObject;

var decodeArray = Js_json.decodeArray;

var decodeBoolean = Js_json.decodeBoolean;

var decodeNull = Js_json.decodeNull;

var $$null = null;

exports.classify = classify;
exports.test = test;
exports.decodeString = decodeString;
exports.decodeNumber = decodeNumber;
exports.decodeObject = decodeObject;
exports.decodeArray = decodeArray;
exports.decodeBoolean = decodeBoolean;
exports.decodeNull = decodeNull;
exports.string_of_json = string_of_json;
exports.of_type = of_type;
exports.$$null = $$null;
/* No side effect */

},{"bs-platform/lib/js/js_json.js":24}],38:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';


function style(n) {
  return n.style;
}

function getStyle(n, key) {
  return n.style[key];
}

function setStyle(n, key, value) {
  n.style[key] = value;
  return /* () */0;
}

function setStyleProperty(n, $staropt$star, key, value) {
  var priority = $staropt$star !== undefined ? $staropt$star : false;
  var style = n.style;
  var match = style.setProperty;
  if (match !== undefined) {
    return style.setProperty(key, value, priority ? "important" : null);
  } else {
    return setStyle(n, key, value);
  }
}

function childNodes(n) {
  return n.childNodes;
}

function firstChild(n) {
  return n.firstChild;
}

function appendChild(n, child) {
  return n.appendChild(child);
}

function removeChild(n, child) {
  return n.removeChild(child);
}

function insertBefore(n, child, refNode) {
  return n.insertBefore(child, refNode);
}

function remove(n, child) {
  return n.remove(child);
}

function setAttributeNS(n, namespace, key, value) {
  return n.setAttributeNS(namespace, key, value);
}

function setAttribute(n, key, value) {
  return n.setAttribute(key, value);
}

function setAttributeNsOptional(n, namespace, key, value) {
  if (namespace === "") {
    return n.setAttribute(key, value);
  } else {
    return n.setAttributeNS(namespace, key, value);
  }
}

function removeAttributeNS(n, namespace, key) {
  return n.removeAttributeNS(namespace, key);
}

function removeAttribute(n, key) {
  return n.removeAttribute(key);
}

function removeAttributeNsOptional(n, namespace, key) {
  if (namespace === "") {
    return n.removeAttribute(key);
  } else {
    return n.removeAttributeNS(namespace, key);
  }
}

function addEventListener(n, typ, listener, options) {
  return n.addEventListener(typ, listener, options);
}

function removeEventListener(n, typ, listener, options) {
  return n.removeEventListener(typ, listener, options);
}

function focus(n) {
  return n.focus();
}

function set_nodeValue(n, text) {
  n.nodeValue = text;
  return /* () */0;
}

function get_nodeValue(n) {
  return n.nodeValue;
}

function remove_polyfill(param) {
  return (
  // remove polyfill
  (function() {
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    };
  }())
  );
}

exports.style = style;
exports.getStyle = getStyle;
exports.setStyle = setStyle;
exports.setStyleProperty = setStyleProperty;
exports.childNodes = childNodes;
exports.firstChild = firstChild;
exports.appendChild = appendChild;
exports.removeChild = removeChild;
exports.insertBefore = insertBefore;
exports.remove = remove;
exports.setAttributeNS = setAttributeNS;
exports.setAttribute = setAttribute;
exports.setAttributeNsOptional = setAttributeNsOptional;
exports.removeAttributeNS = removeAttributeNS;
exports.removeAttribute = removeAttribute;
exports.removeAttributeNsOptional = removeAttributeNsOptional;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.focus = focus;
exports.set_nodeValue = set_nodeValue;
exports.get_nodeValue = get_nodeValue;
exports.remove_polyfill = remove_polyfill;
/* No side effect */

},{}],39:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';


function history(param) {
  return window.history;
}

function localStorage(param) {
  return window.localStorage;
}

function $$location(param) {
  return window.location;
}

function requestAnimationFrame(callback) {
  return window.requestAnimationFrame(callback);
}

function cancelAnimationFrame(id) {
  return window.cancelAnimationFrame(id);
}

function $$clearTimeout(id) {
  return window.clearTimeout(id);
}

function $$setInterval(cb, msTime) {
  return window.setInterval(cb, msTime);
}

function $$setTimeout(cb, msTime) {
  return window.setTimeout(cb, msTime);
}

function addEventListener(typ, listener, options) {
  return window.addEventListener(typ, listener, options);
}

function removeEventListener(typ, listener, options) {
  return window.removeEventListener(typ, listener, options);
}

function requestAnimationFrame_polyfill(param) {
  return (
  // requestAnimationFrame polyfill
  (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                     || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
  }())
  );
}

var $$History = 0;

var LocalStorage = 0;

exports.$$History = $$History;
exports.LocalStorage = LocalStorage;
exports.history = history;
exports.localStorage = localStorage;
exports.$$location = $$location;
exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
exports.$$clearTimeout = $$clearTimeout;
exports.$$setInterval = $$setInterval;
exports.$$setTimeout = $$setTimeout;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.requestAnimationFrame_polyfill = requestAnimationFrame_polyfill;
/* No side effect */

},{}],40:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],41:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Tea_app = require("bucklescript-tea/src-ocaml/tea_app.js");
var Tea_html = require("bucklescript-tea/src-ocaml/tea_html.js");

function set(param_0) {
  return /* Set */[param_0];
}

function init(param) {
  return 4;
}

function update(model, param) {
  if (typeof param === "number") {
    switch (param) {
      case 0 : 
          return model + 1 | 0;
      case 1 : 
          return model - 1 | 0;
      case 2 : 
          return 0;
      
    }
  } else {
    return param[0];
  }
}

function view_button(title, msg) {
  return Tea_html.button(undefined, undefined, /* :: */[
              Tea_html.onClick(msg),
              /* [] */0
            ], /* :: */[
              Tea_html.text(title),
              /* [] */0
            ]);
}

function view(model) {
  return Tea_html.div(undefined, undefined, /* [] */0, /* :: */[
              Tea_html.span(undefined, undefined, /* :: */[
                    Tea_html.style("text-weight", "bold"),
                    /* [] */0
                  ], /* :: */[
                    Tea_html.text(String(model)),
                    /* [] */0
                  ]),
              /* :: */[
                Tea_html.br(/* [] */0),
                /* :: */[
                  view_button("Increment", /* Increment */0),
                  /* :: */[
                    Tea_html.br(/* [] */0),
                    /* :: */[
                      view_button("Decrement", /* Decrement */1),
                      /* :: */[
                        Tea_html.br(/* [] */0),
                        /* :: */[
                          view_button("Set to 42", /* Set */[42]),
                          /* :: */[
                            Tea_html.br(/* [] */0),
                            /* :: */[
                              model !== 0 ? view_button("Reset", /* Reset */2) : Tea_html.noNode,
                              /* [] */0
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var partial_arg = /* record */[
  /* model */4,
  /* update */update,
  /* view */view
];

function main(param, param$1) {
  return Tea_app.beginnerProgram(partial_arg, param, param$1);
}

var increment = /* Increment */0;

var decrement = /* Decrement */1;

var reset = /* Reset */2;

exports.increment = increment;
exports.decrement = decrement;
exports.reset = reset;
exports.set = set;
exports.init = init;
exports.update = update;
exports.view_button = view_button;
exports.view = view;
exports.main = main;
/* Tea_html Not a pure module */

},{"bucklescript-tea/src-ocaml/tea_app.js":28,"bucklescript-tea/src-ocaml/tea_html.js":30}],42:[function(require,module,exports){
// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';


console.log("Hello, BuckleScript");

/*  Not a pure module */

},{}]},{},[41,42]);
