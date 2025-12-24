var Weglot = (function () {
  "use strict";
  var e,
    t = {},
    n = {
      v1: [],
      v2: [
        "ABBR",
        "ACRONYM",
        "B",
        "BDO",
        "BIG",
        "CITE",
        "EM",
        "I",
        "KBD",
        "Q",
        "SMALL",
        "STRONG",
        "SUB",
        "SUP",
        "U",
      ],
      v3: ["A", "BDI", "BR", "WBR", "DEL", "DFN", "INS", "S", "SPAN"],
    };
  var r = (function () {
      if (e) return t;
      e = 1;
      var r = n;
      return r.v2.unshift("#text"), (t.mergeNodesList = r), t;
    })(),
    a = function (e) {
      return document.getElementById(e);
    },
    o = function () {
      var e = a("weglot-data");
      if (!e) return null;
      try {
        return JSON.parse(e.textContent);
      } catch (e) {
        return null;
      }
    };
  function i(e, t) {
    var n = document.createElement("style");
    s(a(t)),
      (n.id = t),
      (n.type = "text/css"),
      n.styleSheet
        ? (n.styleSheet.cssText = e)
        : n.appendChild(document.createTextNode(e)),
      document.head && document.head.appendChild(n);
  }
  function s(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  var l = function (e) {
      return "function" == typeof ShadowRoot && e instanceof ShadowRoot;
    },
    u = {
      excluded_blocks: [],
      excluded_attributes: [],
      media_enabled: !1,
      external_enabled: !1,
      extra_definitions: [],
      translation_engine: 2,
      noTranslateAttribute: "data-wg-notranslate",
      mergeNodes: [],
    },
    c = (function () {
      try {
        return JSON.parse(
          '{"TRANSLATION":"translations.weglot.io","SWITCHER":"switchers.weglot.io","EXCLUSION":"exclusions.weglot.io","DEFINITION":"definitions.weglot.io"}'
        );
      } catch (e) {
        return {};
      }
    })(),
    d = Object.keys(c).map(function (e) {
      return c[e];
    });
  function f(e) {
    for (var t = 0, n = d; t < n.length; t += 1) {
      var r = n[t];
      if (-1 !== e.indexOf(r)) return !0;
    }
    return !1;
  }
  var g = {
      ddtags: "env:prod,version:5.75.0",
      clientToken: "pub4efaec96ce2494088ba70a2049d58dc3",
      site: "datadoghq.com",
      version: "5.75.0",
    },
    p = {
      "dd-api-key": "pub4efaec96ce2494088ba70a2049d58dc3",
      ddsource: "browser",
    },
    h = "prod";
  function _(e) {
    var t = e.service;
    function n(e, n, r) {
      var a =
          "undefined" != typeof window &&
          window &&
          window.Weglot &&
          window.Weglot.options &&
          window.Weglot.options.disable_datadog_logging,
        o = r.sendToConsole;
      void 0 === o && (o = !0);
      var i = r.consoleOverride,
        s = r.sendToDatadog;
      if (
        (void 0 === s && (s = !a),
        s &&
          "dev" !== h &&
          (function (e, t, n) {
            "string" == typeof t && (t = { message: t });
            var r = Object.assign(
              {},
              t,
              { service: e, status: n },
              "undefined" != typeof window &&
                window &&
                window.location && { view: { url: window.location.href } },
              (t.message || t.stack) && {
                error: { message: t.message, stack: t.stack },
              },
              t.status && { logStatus: t.status },
              g
            );
            "undefined" != typeof window &&
              window &&
              window.Weglot &&
              window.Weglot.options &&
              (r.projectInfo = [
                "host",
                "api_key",
                "url_type",
                "technology_name",
                "technology_id",
                "is_connect",
                "auto_switch",
              ].reduce(function (e, t) {
                var n;
                return Object.assign(
                  {},
                  e,
                  (((n = {})[t] = window.Weglot.options[t]), n)
                );
              }, {}));
            var a = Object.keys(p)
              .map(function (e) {
                return e + "=" + p[e];
              })
              .join("&");
            fetch("https://http-intake.logs.datadoghq.com/api/v2/logs?" + a, {
              method: "POST",
              body: JSON.stringify(r),
              headers: { "Content-Type": "application/json" },
            });
          })(t, e, n),
        o)
      ) {
        var l = i || e,
          u = ["notice", "info"].includes(n) ? "log" : n;
        console[u]("[Weglot] " + l);
      }
    }
    var r = function (e) {
      return function (t, r) {
        return void 0 === r && (r = {}), n(t, e, r);
      };
    };
    return {
      log: r("info"),
      info: r("info"),
      notice: r("notice"),
      warn: r("warn"),
      error: r("error"),
    };
  }
  var v = _({ service: "html-parser-engine" });
  function m(e, t, n) {
    var r = t && t[e];
    if (r && r.textContent === t.textContent) return r.result;
    var a = n(t);
    return t ? ((t[e] = { result: a, textContent: t.textContent }), a) : a;
  }
  function y(e) {
    return m("__validMergeNodes", e, function (e) {
      return (
        e &&
        k(e) &&
        w(e) &&
        !(function (e) {
          return m("__containsNoTranslateNodes", e, function (e) {
            return (
              1 === e.nodeType &&
              (!!e.querySelector("[" + u.noTranslateAttribute + "]") || x(e))
            );
          });
        })(e)
      );
    });
  }
  function w(e, t) {
    return (
      void 0 === t && (t = !0),
      m("__validTextNodes", e, function (e) {
        return !(
          !e.textContent ||
          (t && !e.textContent.trim()) ||
          -1 !== e.textContent.indexOf("BESbswy") ||
          (e.parentNode &&
            e.parentNode.nodeName &&
            -1 !==
              ["script", "style", "noscript", "textarea"].indexOf(
                e.parentNode.nodeName.toLowerCase()
              )) ||
          (function (e) {
            if (!(e = e.trim())) return !1;
            var t = e.charAt(0);
            if ("[" !== t && "{" !== t) return !1;
            var n = e[e.length - 1];
            if ("]" !== n && "}" !== n) return !1;
            return (
              (e = e
                .replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")),
              /^[\],:{}\s]*$/.test(e)
            );
          })(e.textContent)
        );
      })
    );
  }
  function b(e) {
    try {
      if (
        u.mergedSelectorRemove &&
        T(e.closest ? e : e.parentNode, u.mergedSelectorRemove)
      )
        return !1;
    } catch (e) {}
    return (
      !(!u.mergeNodes || -1 === u.mergeNodes.indexOf(e.nodeName)) ||
      (e.dataset && void 0 !== e.dataset.wgMerge) ||
      (u.selectorMerging && e.matches && e.matches(u.selectorMerging))
    );
  }
  function k(e) {
    return m("__onlyInlineChildsNodes", e, function (e) {
      if (!e.childNodes) return !0;
      for (var t = 0, n = e.childNodes; t < n.length; t += 1) {
        var r = n[t];
        if (r.weglot || !b(r) || !k(r)) return !1;
      }
      return !0;
    });
  }
  function x(e) {
    if (!e.children) return !1;
    for (var t = 0, n = e.children; t < n.length; t += 1) {
      var r = n[t];
      if (("wgNoTranslate" in r && r.wgNoTranslate) || x(r)) return !0;
    }
    return !1;
  }
  function S(e) {
    return (
      !!e && (!(!("wgNoTranslate" in e) || !e.wgNoTranslate) || S(e.parentNode))
    );
  }
  function E(e) {
    if (!e) return !1;
    var t = e.closest ? e : e.parentNode;
    return !(!t || !T(t, "[" + u.noTranslateAttribute + "]")) || S(e);
  }
  var L = function (e, t) {
      return function (n, r) {
        try {
          if (!n) return t;
          var a = r;
          return (
            -1 !== a.indexOf(":") && (a = a.replace(/([^\\]):/g, "$1\\:")),
            n[e] ? n[e](a) : t
          );
        } catch (a) {
          try {
            return n[e] ? n[e](r) : t;
          } catch (e) {
            v.warn(e, {
              consoleOverride: "Your CSS rules are incorrect: " + r,
              sendToDatadog: !1,
            });
          }
        }
        return t;
      };
    },
    C = L("querySelectorAll", []),
    O = L("matches", !1),
    T = L("closest", null);
  function N(e) {
    return e.indexOf("<") > -1 && e.indexOf(">") > -1;
  }
  function j(e) {
    var t = e.style.backgroundImage ? "background-image" : "background";
    if (!e.style[t]) return "";
    var n = e.style[t].match(/url\((['"]?)(.*?)\1\)/);
    return n && n[2] ? n[2] : "";
  }
  function A(e, t, n) {
    var r = e.style.backgroundImage ? "background-image" : "background";
    e.style[r] = e.style[r].replace(t, n);
  }
  var R = new WeakMap();
  function P(e) {
    if (!e) return [];
    var t = e.querySelectorAll ? e : e.parentNode;
    if (!t) return [];
    if ((F(t), !u.whitelist || !u.whitelist.length))
      return [].concat(
        (function (e) {
          var t = document.getElementsByTagName("title")[0];
          if (e !== document.documentElement || !document.title || !t || E(t))
            return [];
          return [
            {
              element: t.firstChild,
              type: 9,
              words: t.textContent,
              properties: {},
            },
          ];
        })(t),
        I(t)
      );
    var n = u.whitelist
      .map(function (e) {
        return e.value;
      })
      .join(",");
    if (T(t, n)) return I(t);
    for (var r = [], a = 0, o = C(t, n); a < o.length; a += 1) {
      var i = o[a];
      [].push.apply(r, I(i));
    }
    return r;
  }
  function I(e) {
    return [].concat(
      (function (e) {
        var t = [];
        return (
          ne.forEach(function (n) {
            for (
              var r,
                a,
                o,
                i = n.attribute,
                s = n.type,
                l = n.selectors,
                u = 0,
                c =
                  ((r = e),
                  (a = []),
                  (o = l.join(",")),
                  r.matches && r.matches(o) && a.push(r),
                  r.childElementCount > 0 &&
                    a.push.apply(a, r.querySelectorAll(o)),
                  a);
              u < c.length;
              u += 1
            ) {
              var d = c[u];
              if (d && !E(d) && !z(d, i.name)) {
                var f = i.get(d);
                B(f) ||
                  t.push({
                    element: d,
                    words: f,
                    type: s,
                    attrSetter: i.set,
                    attrName: i.name,
                  });
              }
            }
          }),
          t
        );
      })(e),
      (function (e) {
        var t,
          n = [],
          r = u.translation_engine >= 2,
          a = document.createTreeWalker(e, 4, D, !1);
        for (; (t = a.nextNode()); ) {
          var o = (
            r && (b(t.parentNode) || t.parentNode.childNodes.length > 1) ? M : W
          )(t, a);
          o && n.push(o);
        }
        return n;
      })(e)
    );
  }
  function D(e) {
    return !w(e) || E(e) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }
  function M(e, t) {
    var n = (function (e) {
      if (e.wgResolved) return !1;
      var t = e;
      do {
        if (t.wgResolved) return t;
        t = t.parentElement || t.parentNode;
      } while (null !== t && 1 === t.nodeType);
      return !1;
    })(e);
    if (n && R.has(n)) {
      var r = R.get(n);
      return { element: r[0], words: r[1], type: 1, properties: r[2] };
    }
    var a = (function (e, t) {
      var n = [],
        r = e;
      for (; y(e.parentNode); )
        (e = e.parentNode),
          r.textContent.trim() !== e.textContent.trim() && (r = e);
      r.textContent.trim() === e.textContent.trim() && (e = r);
      for (; t.nextNode(); )
        if (!e.contains || !e.contains(t.currentNode)) {
          t.previousNode();
          break;
        }
      var a =
        l(e) && !e.clonable
          ? ((o = e),
            (i = document.createDocumentFragment()),
            o.childNodes.forEach(function (e) {
              return i.appendChild(e.cloneNode(!0));
            }),
            i)
          : e.cloneNode(!0);
      var o, i;
      if (u.translation_engine > 2) {
        H(e, function (e) {
          if (1 === e.nodeType) {
            var t = (function (e) {
              for (var t = [], n = 0, r = e.attributes; n < r.length; n += 1) {
                var a = r[n];
                t.push(a);
              }
              return t;
            })(e);
            n.push({ attributes: t, child: e });
          }
        });
        var s = 1;
        H(a, function (e) {
          1 === e.nodeType &&
            (!(function (e) {
              if (!e.attributes) return e;
              for (; e.attributes.length > 0; )
                e.removeAttribute(e.attributes[0].name);
            })(e),
            e.setAttribute("wg-" + s++, ""));
        });
      }
      if (e) {
        return (
          (e.wgResolved = !0),
          [
            e,
            (a.innerHTML || a.textContent || "").replace(/<!--[^>]*-->/g, ""),
            n,
          ]
        );
      }
    })(e, t);
    if (a) {
      var o = a[0],
        i = a[1],
        s = a[2];
      if (!B(i))
        return R.set(o, a), { element: o, words: i, type: 1, properties: s };
    }
  }
  function W(e) {
    var t = e.textContent;
    if (!B(t)) return { element: e, words: t, type: 1, properties: {} };
  }
  function z(e, t) {
    var n = u.excluded_attributes;
    if (!n || !n.length) return !1;
    for (var r = 0, a = n; r < a.length; r += 1) {
      var o = a[r];
      if (o) {
        var i = o.selector,
          s = o.attributes;
        if (i && s && Array.isArray(s) && s.includes(t) && O(e, i)) return !0;
      }
    }
    return !1;
  }
  function q(e, t) {
    e.wgNoTranslate =
      !u.private_mode ||
      "Excluded by selector: " +
        t.find(function (t) {
          return O(e, t);
        });
  }
  function U(e, t) {
    if (
      ("wgNoTranslate" in e &&
        e.wgNoTranslate &&
        !O(e, t) &&
        (e.wgNoTranslate = !1),
      e.children)
    )
      for (var n = 0, r = e.children; n < r.length; n += 1) {
        U(r[n], t);
      }
  }
  function F(e) {
    var t = u.excluded_blocks;
    if (t && t.length) {
      var n = t.map(function (e) {
          return e.value;
        }),
        r = n.join(",");
      O(e, r) ? q(e, n) : (e.wgNoTranslate = !1);
      for (var a = 0, o = C(e, r); a < o.length; a += 1) {
        q(o[a], n);
      }
      U(e, r);
    } else e.wgNoTranslate = !1;
  }
  function H(e, t) {
    if (e.childNodes)
      for (var n = 0, r = e.childNodes; n < r.length; n += 1) {
        var a = r[n];
        if (!a) return;
        t(a), H(a, t);
      }
  }
  function B(e) {
    return !e || !e.trim() || !isNaN(e) || "​" === e;
  }
  function $(e, t) {
    for (var n = 0, r = e; n < r.length; n += 1) {
      var a = r[n],
        o = a.weglot.content;
      if (o && a.isConnected) {
        for (var i = 0, s = o; i < s.length; i += 1) {
          var l = s[i],
            u = l.original,
            c = l.properties,
            d = l.attrSetter,
            f = l.translations,
            g = f[l.currentLang] || u,
            p = f[t] || u;
          g !== p &&
            (c && (a.weglot.isSet = V(a, p, c, u, e)),
            d && ((a.weglot.isSet = !0), d(a, p, u)),
            a.weglot.isSet && (l.currentLang = t));
        }
        a.wgResolved = !1;
      }
    }
  }
  function V(e, t, n, r, a) {
    if (e.nodeType === Node.ELEMENT_NODE) {
      if (
        u.enable_in_place_setters &&
        (function (e, t) {
          var n = document.createElement("div");
          return (n.innerHTML = t), J(e, n);
        })(e, t)
      )
        return (e.wgSetHTML = e.outerHTML), !0;
      var o = (function (e, t, n) {
        var r = document.createElement("div");
        return (r.innerHTML = e), G(t, r, n);
      })(t, e, n);
      return (
        (e.innerHTML = ""), e.appendChild(o), (e.wgSetHTML = e.outerHTML), !0
      );
    }
    if (!N(t) || N(r)) return (e.textContent = t), (e.wgSetHTML = t), !0;
    var i = e.parentNode;
    if (!i)
      return (
        v.warn(
          "Unable to translate some words, please contact support@weglot.com."
        ),
        v.warn(e, { sendToDatadog: !1 }),
        !1
      );
    if (1 === i.childNodes.length)
      return (
        (i.weglot = e.weglot), a ? (a.push(e.parentNode), !1) : V(i, t, n, r)
      );
    var s =
      (e.closest && e.closest("[data-wg-translation-wrapper]")) ||
      i.closest("[data-wg-translation-wrapper]");
    if (s && s.innerHTML === t) return !1;
    var l = document.createElement("span");
    return (
      (l.dataset.wgTranslationWrapper = ""),
      (l.weglot = e.weglot),
      i.replaceChild(l, e),
      a ? (a.push(l), !1) : V(i, t, n, r)
    );
  }
  function G(e, t, n) {
    var r = document.createDocumentFragment();
    if (1 !== e.nodeType) return r.appendChild(t), r;
    for (var a = t.childNodes.length, o = 0; o < a; o++) {
      var i,
        s = t.firstChild;
      if ((i = K(s))) {
        var l = n[i - 1];
        if (!l) continue;
        var u = l.used ? l.child.cloneNode(!0) : l.child,
          c = G(u, s, n);
        if (c.contains(u))
          return (
            v.warn(
              "There is an HTML error in the translation of: " +
                e.innerHTML.toString(),
              { sendToDatadog: !1 }
            ),
            r
          );
        (u.innerHTML = ""),
          u.appendChild(c),
          r.appendChild(u),
          document.createDocumentFragment().appendChild(s),
          (l.used = !0);
      } else r.appendChild(s);
    }
    return r;
  }
  function K(e) {
    if (
      e &&
      e.nodeType === Node.ELEMENT_NODE &&
      e.attributes &&
      e.attributes[0]
    ) {
      var t = parseInt(e.attributes[0].name.split("wg-")[1]);
      return isNaN(t) ? void 0 : t;
    }
  }
  function J(e, t) {
    var n = Array.from(e.childNodes),
      r = Array.from(t.childNodes),
      a = X(n),
      o = X(r);
    if (a.length !== o.length) return !1;
    for (var i = 0; i < a.length; i++) {
      var s = a[i],
        l = o[i];
      if (s.type !== l.type) return !1;
      if ("text" === s.type) Y(s.nodes, l.nodes);
      else {
        var u = s.nodes[0],
          c = l.nodes[0];
        if (u.nodeType !== c.nodeType) return !1;
        if (u.nodeType === Node.ELEMENT_NODE) {
          if (u.tagName !== c.tagName) return !1;
          if (!J(u, c)) return !1;
        }
      }
    }
    return !0;
  }
  function X(e) {
    for (var t = [], n = null, r = 0, a = e; r < a.length; r += 1) {
      var o = a[r];
      o.nodeType === Node.TEXT_NODE
        ? (n || (n = { type: "text", nodes: [] }), n.nodes.push(o))
        : (n && (t.push(n), (n = null)),
          t.push({ type: "element", nodes: [o] }));
    }
    return n && t.push(n), t;
  }
  function Y(e, t) {
    for (
      var n = t
          .map(function (e) {
            return e.textContent || "";
          })
          .join(""),
        r = e.map(function (e) {
          return (e.textContent || "").length;
        }),
        a = r.reduce(function (e, t) {
          return e + t;
        }, 0),
        o = 0,
        i = 0;
      i < e.length;
      i++
    ) {
      var s = void 0;
      if (i === e.length - 1) s = n.length - o;
      else if (a === n.length) s = r[i];
      else {
        var l = 0 === a ? 1 / e.length : r[i] / a;
        s = Math.round(n.length * l);
      }
      var u = n.slice(o, o + s);
      (e[i].textContent = u), (o += s);
    }
  }
  function Z(e) {
    return {
      name: e,
      get: function (t) {
        return t.getAttribute(e);
      },
      set: function (t, n) {
        return t.getAttribute(e) !== n && t.setAttribute(e, n);
      },
    };
  }
  function Q(e, t) {
    if (e.parentNode && "PICTURE" === e.parentNode.tagName)
      for (var n = 0, r = e.parentNode.children; n < r.length; n += 1) {
        var a = r[n];
        "SOURCE" === a.tagName &&
          a.getAttribute("srcset") &&
          a.setAttribute("srcset", t);
      }
  }
  function ee(e) {
    return (e && e.split && e.split("www.")[1]) || e;
  }
  function te(e) {
    var t = [
      { type: 1, selectors: ["[title]"], attribute: Z("title") },
      {
        type: 2,
        selectors: ["input[type='submit']", "input[type='button']", "button"],
        attribute: Z("value"),
      },
      {
        type: 3,
        selectors: ["input[placeholder]", "textarea[placeholder]"],
        attribute: Z("placeholder"),
      },
      {
        type: 4,
        selectors: [
          "meta[name='description']",
          "meta[property='og:description']",
          "meta[property='og:site_name']",
          "meta[property='og:image:alt']",
          "meta[name='twitter:description']",
          "meta[itemprop='description']",
          "meta[itemprop='name']",
        ],
        attribute: Z("content"),
      },
      { type: 7, selectors: ["img"], attribute: Z("alt") },
      {
        type: 8,
        selectors: ["[href$='.pdf']", "[href$='.docx']", "[href$='.doc']"],
        attribute: Z("href"),
      },
      {
        type: 9,
        selectors: ["meta[property='og:title']", "meta[name='twitter:title']"],
        attribute: Z("content"),
      },
    ];
    if (!e) return t;
    if (
      (e.media_enabled &&
        t.push(
          {
            type: 5,
            selectors: [
              "youtube.com",
              "youtu.be",
              "vimeo.com",
              "dailymotion.com",
            ].map(function (e) {
              return "iframe[src*='" + e + "']";
            }),
            attribute: Z("src"),
          },
          {
            type: 6,
            selectors: ["img", "source"],
            attribute: {
              name: "src",
              get: function (e) {
                var t = e.getAttribute("src");
                if (!t || !t.split) return "";
                if (0 === t.indexOf("data:image")) return "";
                var n = t.split("?");
                return n[1] && (e.queryString = n[1]), n[0];
              },
              set: function (e, t, n) {
                var r = e.getAttribute("src"),
                  a = e.getAttribute("srcset");
                if (t === n) {
                  if ((e.removeAttribute("data-wgtranslated"), e.isChanged)) {
                    var o = "" + t + (e.queryString ? "?" + e.queryString : "");
                    e.setAttribute("src", o),
                      Q(e, o),
                      e.hasAttribute("wgsrcset") &&
                        (e.setAttribute(
                          "srcset",
                          e.getAttribute("wgsrcset") || e.dataset.srcset
                        ),
                        e.removeAttribute("wgsrcset"));
                  }
                } else
                  r.split("?")[0] !== t &&
                    n !== t &&
                    (e.setAttribute("src", t),
                    Q(e, t),
                    e.hasAttribute("srcset") &&
                      (e.setAttribute("wgsrcset", a),
                      e.setAttribute("srcset", "")),
                    (e.dataset.wgtranslated = !0),
                    (e.isChanged = !0));
              },
            },
          },
          {
            type: 6,
            selectors: [
              "meta[property='og:image']",
              "meta[property='og:logo']",
            ],
            attribute: Z("content"),
          },
          { type: 6, selectors: ["img"], attribute: Z("srcset") },
          { type: 6, selectors: ["video"], attribute: Z("src") },
          {
            type: 6,
            selectors: ["[style*='url']"],
            attribute: {
              name: "src",
              get: function (e) {
                var t = j(e);
                if (!t) return "";
                var n = t.split("?");
                return n[1] && (e.queryString = n[1]), n[0];
              },
              set: function (e, t, n) {
                var r = j(e);
                if (!r) return "";
                t === n
                  ? (e.removeAttribute("data-wgtranslated"),
                    e.isChanged &&
                      A(
                        e,
                        r,
                        "" + t + (e.queryString ? "?" + e.queryString : "")
                      ))
                  : r.split("?")[0] !== t &&
                    n !== t &&
                    (A(e, r, t),
                    (e.dataset.wgtranslated = !0),
                    (e.isChanged = !0));
              },
            },
          }
        ),
      e.translate_aria &&
        t.push({
          type: 1,
          selectors: ["[aria-label]"],
          attribute: Z("aria-label"),
        }),
      e.external_enabled)
    ) {
      var n = ee(
        (function () {
          var e = window.location,
            t = e.hostname,
            n = e.search;
          if (!f(t) || !n) return t;
          var r = o();
          if (r && r.editorCurrentURL)
            return new URL(r.editorCurrentURL).hostname;
          var a = decodeURIComponent(n).match(/url=https?:\/\/([^/]+)/);
          return a
            ? a[1]
            : (v.warn("[Weglot] Unable to get current hostname"), t);
        })()
      );
      t.push(
        { type: 10, selectors: ["iframe"], attribute: Z("src") },
        { type: 10, selectors: ["a[rel=external]"], attribute: Z("href") },
        { type: 10, selectors: ['[href^="mailto"]'], attribute: Z("href") },
        { type: 10, selectors: ['[href^="tel"]'], attribute: Z("href") },
        {
          type: 10,
          selectors: ["http:", "https:", "//"].map(function (e) {
            return '[href^="' + e + '"]:not(link)';
          }),
          attribute: {
            name: "href",
            get: function (e) {
              if (!e.href || !e.href.split) return "";
              var t = e.href.split("/")[2];
              return t && ee(t) !== n ? e.getAttribute("href") : "";
            },
            set: function (e, t) {
              return e.setAttribute("href", t);
            },
          },
        }
      );
    }
    if (e.extra_definitions && e.extra_definitions.length)
      for (
        var r = function () {
            var e = i[a],
              n = e.type,
              r = e.selector,
              o = e.attribute;
            o && r
              ? t.push({
                  type: n,
                  selectors: [r],
                  attribute: {
                    name: o,
                    get: function (e) {
                      return e.getAttribute(o);
                    },
                    set: function (e, t) {
                      return e.setAttribute(o, t);
                    },
                  },
                })
              : v.warn(
                  "Each extra definition option needs at least {attribute,selector} https://bit.ly/2yDsLxy",
                  { sendToDatadog: !1 }
                );
          },
          a = 0,
          i = e.extra_definitions;
        a < i.length;
        a += 1
      )
        r();
    return t;
  }
  D.acceptNode = D;
  var ne = [];
  function re(e, t) {
    if (!t || !t.translation_engine) throw "translation_engine is required";
    var n;
    return (
      Object.assign(u, t),
      (u.document = e),
      (u.mergeNodes =
        ((n = t.translation_engine),
        r.mergeNodesList.v2.unshift("#text", "#comment"),
        Object.keys(r.mergeNodesList).reduce(function (e, t, a) {
          return n >= a + 1 && [].push.apply(e, r.mergeNodesList[t]), e;
        }, []))),
      Array.isArray(u.extra_merged_selectors) &&
        (u.selectorMerging = t.extra_merged_selectors
          .filter(function (e) {
            return e && "string" == typeof e;
          })
          .join(",")),
      t.merged_selectors_remove &&
        (u.mergedSelectorRemove = t.merged_selectors_remove
          .map(function (e) {
            return e.value;
          })
          .join(",")),
      { getTextNodes: P, setTextNodes: $, definitions: (ne = te(u)) }
    );
  }
  function ae(e) {
    "loading" !== document.readyState
      ? e()
      : document.addEventListener("DOMContentLoaded", function () {
          return e();
        });
  }
  var oe,
    ie = {};
  try {
    document.cookie, (oe = !0);
  } catch (mr) {
    oe = !1;
  }
  (ie.set = function (e) {
    var t = e.name,
      n = e.value,
      r = e.domain;
    void 0 === r && (r = null);
    var a = e.path;
    void 0 === a && (a = null);
    var o = e.expires;
    void 0 === o && (o = null);
    var i = e.partitioned;
    void 0 === i && (i = null);
    var s = e.options;
    if (oe && t) {
      var l = s.host,
        u = s.is_connect,
        c = s.subdirectory;
      (t = t
        .replace(/[^+#$&^`|]/g, encodeURIComponent)
        .replace("(", "%28")
        .replace(")", "%29")),
        (n = n.toString().replace(/[^+#$&/:<-[\]-}]/g, encodeURIComponent)),
        !r && u && l && (r = c ? l : l.split("www.").pop());
      var d = r ? ";domain=" + r : "",
        f = o ? ";expires=" + o : "",
        g = ";path=/" + (a || ""),
        p = i ? ";Partitioned" : "";
      document.cookie = t + "=" + n + d + g + f + p + ";SameSite=None;Secure";
    }
  }),
    (ie.get = function (e) {
      if (!oe) return null;
      for (var t = document.cookie.split(";"); t.length; ) {
        var n = t.pop(),
          r = n.indexOf("=");
        if (
          ((r = r < 0 ? n.length : r),
          decodeURIComponent(n.slice(0, r).replace(/^\s+/, "")) === e)
        )
          return decodeURIComponent(n.slice(r + 1));
      }
      return null;
    }),
    (ie.erase = function (e) {
      var t = e.name,
        n = e.domain;
      void 0 === n && (n = null);
      var r = e.path;
      void 0 === r && (r = null);
      var a = e.options;
      ie.set({
        name: t,
        value: "",
        domain: n,
        path: r,
        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
        options: a,
      });
    });
  var se = _({ service: "js-library" }),
    le = {};
  function ue(e) {
    Object.assign(le, e);
  }
  function ce(e, t) {
    var n = e.custom_settings;
    void 0 === n && (n = {});
    var r = (function (e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            -1 === t.indexOf(r) &&
            (n[r] = e[r]);
        return n;
      })(e, ["custom_settings"]),
      a = r,
      o = {};
    if (n) {
      var i = n.button_style,
        s = n.localeRules;
      i &&
        (o.button_style = Object.assign(
          Object.assign({}, n.button_style, t.button_style)
        )),
        s && (o.localeRules = s);
    }
    return (
      "languages" in e && (o.languages = e.languages),
      "language_from" in e && (o.language_from = e.language_from),
      ["excluded_blocks", "dynamics"].forEach(function (r) {
        o[r] = [];
        var a = {};
        [e, n, t].map(function (e) {
          e[r] &&
            e[r].forEach(function (e) {
              a[e.value] || ((a[e.value] = !0), o[r].push(e));
            });
        });
      }),
      t.switchers && (o.scriptParamSwitcher = !0),
      t.button_style && t.button_style.custom_css && (o.scriptParamStyle = !0),
      Object.assign({}, a, n, t, o)
    );
  }
  var de = "wgVeExtension",
    fe = "getCurrentLanguage",
    ge = "setCurrentLanguage",
    pe = "languageChanged",
    he = "library",
    _e = "extension",
    ve = "proxy.weglot.com",
    me = "wg-cgi",
    ye = "INIT_WORKER",
    we = "SET_LANGUAGE",
    be = "proxy_internal",
    ke = "proxy_dedicated",
    xe = [
      "reverse_handle_link",
      "proxify_link",
      "reverse_translate",
      "parse_child",
    ],
    Se = ["regex", "json", "form_multipart", "form_urlencoded", "url_query"],
    Ee = {
      api_domain: Ne,
      api_key: Ne,
      language_from_custom_flag: Ne,
      language_from_custom_name: Ne,
      host: Ne,
      language_from: Ne,
      custom_css: Ne,
      url_type: Ne,
      technology_name: Ne,
      auto_switch_fallback: Ne,
      cloudflare_resolve_override: Ne,
      fastly_origin_backend: Ne,
      dangerously_force_dynamic: Ne,
      search_forms: Ne,
      search_parameter: Ne,
      website: Ne,
      uid: Ne,
      translate_iframes: Ae,
      dynamic: Ae,
      force_translation: Ae,
      dangerously_bypass_dynamic_limit: Ae,
      translation_engine: Te,
      pageview_sample_rate: Te,
      deleted_at: Te,
      technology_id: Te,
      auto_inject_script: Re,
      use_template_integrity: Re,
      auto_switch: Re,
      allow_http: Re,
      allow_render: Re,
      customer_tag: Re,
      order_tag: Re,
      delayStart: Re,
      disable_dynamics_on_browser_translation: Re,
      client_translation_only: Re,
      geo_auto_switch: Re,
      fix_shopify_checkout_locale: Re,
      shopify_skip_shop_pay: Re,
      hide_switcher: Re,
      hide_switcher_watermark: Re,
      wait_transition: Re,
      prevent_retranslation: Re,
      index_with_trailing_slash: Re,
      page_views_enabled: Re,
      is_https: Re,
      is_dns_set: Re,
      media_enabled: Re,
      external_enabled: Re,
      multilingual_sitemap: Re,
      override_csp: Re,
      override_bot_agent: Re,
      override_hreflang: Re,
      prevent_default_locale_rule: Re,
      saas: Re,
      translate_aria: Re,
      translate_images: Re,
      ignoreDynamicFragments: Re,
      ve_inject_library: Re,
      disable_internal_proxy: Re,
      disable_origin_ssl_verification: Re,
      disable_remove_numeric_slugs: Re,
      disable_local_cache: Re,
      loading_bar: Re,
      dangerously_enable_cross_domain_cookies: Re,
      original_shopify_checkout: Re,
      shopifyCheckout: Re,
      translate_search: Re,
      translate_amp: Re,
      translate_email: Re,
      dynamicPushState: Re,
      remove_unused_link_hooks: Re,
      translate_shadow_roots: Re,
      disable_datadog_logging: Re,
      squarespace_official_integration: Re,
      shopify_theme_app_extension: Re,
      shopify_extension_connected: Re,
      squarespace_extension_connected: Re,
      wix_extension_connected: Re,
      squareonline_extension_connected: Re,
      rendered: Re,
      inject_weglot_css: Re,
      extra_merged_selectors: De,
      cart_attributes: De,
      proxify_iframes: De,
      excluded_blocks_remove: De,
      dynamics_remove: De,
      merged_selectors_remove: Ie,
      translate_inside_exclusions: Ie,
      whitelist: Ie,
      dynamics: Ie,
      excluded_blocks: Ie,
      switchers: Pe,
      translate_forms: Pe,
      languages: Pe,
      xhr_hooks: Pe,
      sw_hooks: Pe,
      translate_event: Pe,
      localeRules: Pe,
      locale_rules_regex: Pe,
      excluded_attributes: Pe,
      extra_definitions: Pe,
      excluded_paths: Pe,
      http_monitoring: je,
      button_style: je,
      versions: je,
      service_worker: je,
      network_overrides: je,
    };
  function Le(e) {
    var t = {};
    if ("object" != typeof e || !e) throw new Error("Invalid settings object");
    return (
      Object.keys(e).forEach(function (n) {
        if ("custom_settings" !== n) {
          var r = e[n];
          t[n] = Oe(n, r);
        } else {
          var a = Le(e[n]);
          t.custom_settings = Ce(a);
        }
      }),
      t
    );
  }
  function Ce(e) {
    var t = e.search_forms,
      n = e.search_parameter,
      r = e.translate_search,
      a = e.translate_forms;
    void 0 === a && (a = []);
    var o = Object.assign({}, e);
    return (
      t &&
        n &&
        r &&
        (a.push({ selector: t, parameter: n }),
        delete o.search_forms,
        delete o.search_parameter,
        delete o.translate_search,
        (o.translate_forms = a)),
      o
    );
  }
  function Oe(e, t) {
    var n = Ee[e];
    if (n) return n(e, t);
  }
  function Te(e, t) {
    if ("number" == typeof t) return t;
    if ("string" == typeof t) {
      if ("pageview_sample_rate" === e) {
        var n = parseFloat(t);
        if (!isNaN(n)) return n;
      }
      var r = parseInt(t, 10);
      if (!isNaN(r)) return r;
    }
  }
  function Ne(e, t) {
    return "string" == typeof t ? t : void 0;
  }
  function je(e, t) {
    if (t && "object" == typeof t)
      switch (e) {
        case "http_monitoring":
          var n = {};
          return (
            ["20X", "40X", "50X"].forEach(function (e) {
              t[e] && (n[e] = !0);
            }),
            ["include", "exclude"].forEach(function (e) {
              Array.isArray(t[e]) && (n[e] = t[e].map(Te).filter(Boolean));
            }),
            n
          );
        case "button_style":
          var r = t;
          return (
            ["flag_type", "custom_css"].forEach(function (e) {
              r[e] && "string" != typeof r[e] && delete r[e];
            }),
            r
          );
        case "service_worker":
          var a = t,
            o = { enabled: !1, path_override: "" };
          return (
            (o.enabled = !!a.enabled),
            a.path_override &&
              "string" == typeof a.path_override &&
              (o.path_override = a.path_override),
            o
          );
        case "network_overrides":
          var i = t;
          if (!Array.isArray(i.hooks)) return;
          return {
            fetch: !!i.fetch,
            xhr: !!i.xhr,
            hooks: i.hooks.map(Me).filter(Boolean),
          };
        case "versions":
          var s = t;
          return (
            s.translation &&
              "number" != typeof s.translation &&
              delete s.translation,
            s.slugTranslation &&
              "number" != typeof s.slugTranslation &&
              delete s.slugTranslation,
            s
          );
        default:
          return e;
      }
  }
  function Ae(e, t) {
    if ("string" == typeof t) return t;
    if (Array.isArray(t))
      switch (e) {
        case "dangerously_bypass_dynamic_limit":
          return t
            .map(function (e) {
              return (e && e.value) || e;
            })
            .filter(Boolean)
            .join(",");
        case "dynamic":
        case "force_translation":
        case "translate_iframes":
          return t.join(",");
        default:
          return e;
      }
  }
  function Re(e, t) {
    return "boolean" == typeof t ? t : !!t;
  }
  function Pe(e, t) {
    if ("string" == typeof t) {
      if ("excluded_paths" !== e) return;
      return t.split(",").map(function (e) {
        return { type: "MATCH_REGEX", value: e };
      });
    }
    if (Array.isArray(t)) {
      var n = t.filter(function (e) {
        return "object" == typeof e && !Array.isArray(e);
      });
      switch (e) {
        case "extra_definitions":
          return n.filter(function (e) {
            var t = e.type,
              n = e.selector,
              r = e.attribute;
            return (
              (!n || "string" == typeof n) &&
              (!r || "string" == typeof r) &&
              (!t || "number" == typeof t)
            );
          });
        case "localeRules":
          return n.filter(function (e) {
            return (
              (!e.originalFormat || "string" == typeof e.originalFormat) &&
              (!e.translatedFormat || "string" == typeof e.translatedFormat) &&
              (!e.pathTest || "string" == typeof e.pathTest) &&
              (!e.position || "number" == typeof e.position)
            );
          });
        case "locale_rules_regex":
          return n.filter(function (e) {
            return (
              !(!e.detection || !e.rewrite) &&
              "string" == typeof e.detection &&
              "string" == typeof e.rewrite &&
              (!e.detectionMap ||
                ("object" == typeof e.detectionMap &&
                  !Object.keys(e.detectionMap).some(function (t) {
                    return "string" != typeof e.detectionMap[t];
                  }))) &&
              (!e.rewriteMap ||
                ("object" == typeof e.rewriteMap &&
                  !Object.keys(e.rewriteMap).some(function (t) {
                    return "string" != typeof e.rewriteMap[t];
                  })))
            );
          });
        case "switchers":
          return (
            n.forEach(function (e) {
              ["style", "location", "opts", "colour"].forEach(function (t) {
                "object" != typeof e[t] && delete e[t];
              });
            }),
            n
          );
        case "languages":
          return n;
        case "sw_hooks":
          return n
            .map(function (e) {
              return Me(e);
            })
            .filter(Boolean);
        case "xhr_hooks":
          return n
            .map(function (e) {
              var t = e.url_wildcard,
                n = e.action,
                r = e.target_source,
                a = e.target_key;
              if (
                (!t || "string" == typeof t) &&
                (!n ||
                  [
                    "proxify",
                    "reverse_translate",
                    "reverse_handle_path",
                  ].includes(n))
              ) {
                var o = Array.isArray(r)
                    ? r.filter(function (e) {
                        return [
                          "url",
                          "url_query",
                          "json_payload",
                          "form_data_payload",
                          "url_encoded_form_payload",
                        ].includes(e);
                      })
                    : "string" == typeof r
                    ? [r]
                    : void 0,
                  i = Array.isArray(a)
                    ? a.filter(function (e) {
                        return "string" == typeof e;
                      })
                    : "string" == typeof a
                    ? [a]
                    : void 0;
                return {
                  url_wildcard: t,
                  action: n,
                  target_source: o,
                  target_key: i,
                };
              }
            })
            .filter(Boolean);
        case "excluded_attributes":
          return n
            .map(function (e) {
              var t = e.selector,
                n = e.attributes;
              if ((!t || "string" == typeof t) && (!n || Array.isArray(n)))
                return {
                  selector: t,
                  attributes: n.filter(function (e) {
                    return "string" == typeof e;
                  }),
                };
            })
            .filter(Boolean);
        case "excluded_paths":
          return n.filter(function (e) {
            return ["type", "value"].every(function (t) {
              return t in e && "string" == typeof e[t];
            });
          });
        case "translate_event":
          return n.filter(function (e) {
            return e.selector && "string" == typeof e.selector;
          });
        case "translate_forms":
          return n.filter(function (e) {
            return (
              !!e.selector &&
              !!e.parameter &&
              "string" == typeof e.selector &&
              "string" == typeof e.parameter
            );
          });
        default:
          return e;
      }
    }
  }
  function Ie(e, t) {
    return Array.isArray(t)
      ? t
          .map(function (e) {
            if (e)
              return "object" == typeof e &&
                e.value &&
                "string" == typeof e.value
                ? { value: e.value }
                : "string" == typeof e
                ? { value: e }
                : void 0;
          })
          .filter(Boolean)
      : "whitelist" === e && "string" == typeof t
      ? t.split(",").map(function (e) {
          return { value: e };
        })
      : void 0;
  }
  function De(e, t) {
    if (Array.isArray(t))
      return t.filter(function (e) {
        return "string" == typeof e;
      });
  }
  function Me(e) {
    var t = e.url_match,
      n = e.body,
      r = e.url;
    if (
      t &&
      "*" !== t &&
      "string" == typeof t &&
      !((n && "object" != typeof n) || (r && "object" != typeof r))
    ) {
      var a = { url_match: t };
      return (
        n &&
          "object" == typeof n &&
          "string" == typeof n.parser &&
          Se.includes(n.parser) &&
          Array.isArray(n.actions) &&
          (a.body = Object.assign({}, n, {
            actions: n.actions
              .map(function (e) {
                return We(e);
              })
              .filter(Boolean),
          })),
        r &&
          "object" == typeof r &&
          "string" == typeof r.parser &&
          Se.includes(r.parser) &&
          Array.isArray(r.actions) &&
          (a.url = Object.assign({}, r, {
            actions: r.actions
              .map(function (e) {
                return We(e);
              })
              .filter(Boolean),
          })),
        a
      );
    }
  }
  function We(e) {
    if ("object" == typeof e) {
      var t = e.action_type,
        n = e.key;
      if (t && xe.includes(t) && n && "string" == typeof n) {
        if ("parse_child" !== t) return { key: e.key, action_type: t };
        var r = e.child_parser,
          a = e.child_actions;
        if (r && Se.includes(r) && a && Array.isArray(a)) {
          var o = a.map(We).filter(Boolean);
          if (o.length) return Object.assign({}, e, { child_actions: o });
        }
      }
    }
  }
  var ze = "preview.weglot.io",
    qe = "wglang",
    Ue = "wg-style-trans",
    Fe = "data-wg-notranslate",
    He = "proxy.weglot.com",
    Be = "wg-cgi",
    $e = "wg-translations",
    Ve = "wg-slugs",
    Ge = {
      wordpress: { name: "WordPress", id: 1 },
      shopify: { name: "Shopify", id: 2 },
      bigcommerce: { name: "BigCommerce", id: 3 },
      jimdo: { name: "Jimdo", id: 4 },
      squarespace: { name: "Squarespace", id: 5 },
      wix: { name: "Wix", id: 6 },
      weebly: { name: "Weebly", id: 9 },
      drupal: { name: "Drupal", id: 10 },
      other: { name: "Other", id: 12 },
      webflow: { name: "Webflow", id: 13 },
      prestashop: { name: "Prestashop", id: 14 },
      magento: { name: "Magento", id: 15 },
      squareonline: { name: "Square Online", id: 16 },
      bubble: { name: "Bubble", id: 17 },
      salesforce: { name: "Salesforce", id: 18 },
    },
    Ke = [
      "polyfillReady",
      "languageChanged",
      "initialized",
      "start",
      "switchersReady",
    ],
    Je = {
      button_style: {
        full_name: !0,
        with_name: !0,
        is_dropdown: !0,
        with_flags: !1,
        flag_type: "",
      },
      switchers: [],
      host: "",
      auto_switch: !1,
      auto_switch_fallback: "",
      excluded_blocks: [],
      excluded_blocks_remove: [],
      excluded_paths: [],
      dynamics: [],
      whitelist: [],
      inject_weglot_css: !0,
      translate_event: [
        { selector: "[data-wg-translate-event]", eventName: void 0 },
      ],
      customer_tag: !1,
      languages: [],
      order_tag: !0,
      wait_transition: !0,
      hide_switcher: !1,
      translate_search: !1,
      media_enabled: !1,
      search_forms: "",
      loading_bar: !0,
      search_parameter: "",
      translation_engine: 2,
      service_worker: { enabled: !1, path_override: "wg-sw.js" },
      override_hreflang: !0,
    },
    Xe = ["none", "shiny", "square", "circle", "rectangle_mat"];
  function Ye(e) {
    return "string" != typeof e
      ? e
      : e.split(",").map(function (e) {
          return {
            language_to: e,
            provider: null,
            automatic_translation_enabled: !0,
          };
        });
  }
  function Ze(e) {
    return e
      ? "string" != typeof e
        ? e
        : e
            .split(",")
            .filter(function (e) {
              return !!e;
            })
            .map(function (e) {
              return { value: e, type: "CONTAIN" };
            })
      : [];
  }
  function Qe(e) {
    return e
      ? "string" != typeof e
        ? e
        : e.split(",").map(function (e) {
            return { value: e };
          })
      : [];
  }
  function et(e) {
    return "SUBDIRECTORY" === e.url_type && !!e.is_dns_set;
  }
  function tt(e) {
    var t;
    return (
      et(e) ||
      !!(null === (t = e.languages) || void 0 === t
        ? void 0
        : t.some(function (e) {
            return (
              e.connect_host_destination &&
              e.connect_host_destination.is_dns_set &&
              e.connect_host_destination.created_on_aws
            );
          }))
    );
  }
  function nt(e) {
    if (!e || "object" != typeof e)
      throw {
        wgErrMsg:
          "Invalid initialization options provided. Contact support@weglot.com",
      };
    var t = Object.keys(e).reduce(function (t, n) {
      var r = (function (e, t) {
        if ("switchers" === e) {
          var n =
            ("string" == typeof t &&
              (function (e) {
                try {
                  return JSON.parse(e);
                } catch (e) {
                  return null;
                }
              })(t)) ||
            t;
          if (!Array.isArray(n)) return;
          if (!n.length) return;
          var r = n.some(function (e) {
            return "styleOpt" in e;
          });
          return {
            key: "switchers",
            value: r
              ? n.map(function (e) {
                  return (
                    (n = (t = e).styleOpt),
                    (r = t.containerCss),
                    (a = t.target),
                    (o = t.sibling),
                    { style: rt(n, r), location: { target: a, sibling: o } }
                  );
                  var t, n, r, a, o;
                })
              : n,
          };
        }
        var a = [
          { from: "originalLanguage", to: "language_from" },
          { from: "autoSwitch", to: "auto_switch" },
          { from: "autoSwitchFallback", to: "auto_switch_fallback" },
          { from: "waitTransition", to: "wait_transition" },
          { from: "translateSearch", to: "translate_search" },
          { from: "searchsForms", to: "search_forms" },
          { from: "searchParameter", to: "search_parameter" },
          { from: "hideSwitcher", to: "hide_switcher" },
          { from: "dangerouslyForceDynamic", to: "dangerously_force_dynamic" },
          { from: "loadingBar", to: "loading_bar" },
          { from: "customerTag", to: "customer_tag" },
          { from: "orderTag", to: "order_tag" },
          { from: "translateImages", to: "media_enabled" },
          { from: "translate_images", to: "media_enabled" },
          { from: "extraDefinitions", to: "extra_definitions" },
          { from: "excludePaths", to: "excluded_paths", func: Ze },
          { from: "exceptions", to: "excluded_blocks", func: Qe },
          { from: "whiteList", to: "whitelist", func: Qe },
          { from: "styleOpt", to: "button_style", func: rt },
          { from: "destinationLanguages", to: "languages", func: Ye },
        ].find(function (t) {
          return t.from === e;
        });
        if (a) {
          var o = a.to,
            i = a.func;
          return { key: o, value: i ? i(t) : t };
        }
        return { key: e, value: t };
      })(n, e[n]);
      if (void 0 === r) return t;
      var a = r.key,
        o = Oe(a, r.value);
      return void 0 !== o && (t[a] = o), t;
    }, {});
    return Ce(t);
  }
  function rt(e, t) {
    if ((void 0 === t && (t = ""), !e)) return Je.button_style;
    var n = e.classF || "",
      r = n.match(/flag-(\d)/),
      a = r && r[1],
      o = {
        with_name: e.withname,
        full_name: !!e.fullname,
        is_dropdown: !!e.is_dropdown,
        with_flags: -1 !== n.indexOf("wg-flags"),
        flag_type: (a && Xe[a]) || "",
        invert_flags: !0,
        custom_css: "",
      };
    return t && (o.custom_css = t), o;
  }
  var at = [];
  function ot(e, t, n) {
    if (e) return n();
    it(t, n, !0);
  }
  function it(e, t, n) {
    return "function" != typeof t
      ? (se.error("You should provide a callback function as second argument", {
          sendToDatadog: n,
        }),
        !1)
      : !n && Ke.indexOf(e) < 0
      ? (se.error("No Weglot event is named " + e, { sendToDatadog: !1 }), !1)
      : (at.push({ name: e, callback: t, internal: n }), !0);
  }
  function st(e) {
    for (var t = [], n = arguments.length - 1; n-- > 0; )
      t[n] = arguments[n + 1];
    for (
      var r = 0,
        a = at.filter(function (t) {
          return t.name === e;
        });
      r < a.length;
      r += 1
    ) {
      var o = a[r];
      try {
        o.callback.apply(o, t);
      } catch (e) {
        if (o.internal) throw e;
        se.error("Error triggering callback function: " + e, {
          sendToDatadog: !1,
        });
      }
    }
  }
  var lt = {};
  !(function (e) {
    var t = (function () {
        try {
          return !!Symbol.iterator;
        } catch (e) {
          return !1;
        }
      })(),
      n = function (e) {
        var n = {
          next: function () {
            var t = e.shift();
            return { done: void 0 === t, value: t };
          },
        };
        return (
          t &&
            (n[Symbol.iterator] = function () {
              return n;
            }),
          n
        );
      },
      r = function (e) {
        try {
          return encodeURIComponent(e).replace(/%20/g, "+");
        } catch (t) {
          return e;
        }
      },
      a = function (e) {
        try {
          return decodeURIComponent(String(e).replace(/\+/g, " "));
        } catch (t) {
          return e;
        }
      };
    (function () {
      try {
        var t = e.URLSearchParams;
        return (
          "a=1" === new t("?a=1").toString() &&
          "function" == typeof t.prototype.set &&
          "function" == typeof t.prototype.entries
        );
      } catch (e) {
        return !1;
      }
    })() ||
      (function () {
        var a = function (e) {
            Object.defineProperty(this, "_entries", {
              writable: !0,
              value: {},
            });
            var t = typeof e;
            if ("undefined" === t);
            else if ("string" === t) "" !== e && this._fromString(e);
            else if (e instanceof a) {
              var n = this;
              e.forEach(function (e, t) {
                n.append(t, e);
              });
            } else {
              if (null === e || "object" !== t)
                throw new TypeError(
                  "Unsupported input's type for URLSearchParams"
                );
              if ("[object Array]" === Object.prototype.toString.call(e))
                for (var r = 0; r < e.length; r++) {
                  var o = e[r];
                  if (
                    "[object Array]" !== Object.prototype.toString.call(o) &&
                    2 === o.length
                  )
                    throw new TypeError(
                      "Expected [string, any] as entry at index " +
                        r +
                        " of URLSearchParams's input"
                    );
                  this.append(o[0], o[1]);
                }
              else
                for (var i = 0, s = Object.keys(e); i < s.length; i += 1) {
                  var l = s[i];
                  this.append(l, e[l]);
                }
            }
          },
          o = a.prototype;
        (o.append = function (e, t) {
          e in this._entries
            ? this._entries[e].push(String(t))
            : (this._entries[e] = [String(t)]);
        }),
          (o.delete = function (e) {
            delete this._entries[e];
          }),
          (o.get = function (e) {
            return e in this._entries ? this._entries[e][0] : null;
          }),
          (o.getAll = function (e) {
            return e in this._entries ? this._entries[e].slice(0) : [];
          }),
          (o.has = function (e) {
            return e in this._entries;
          }),
          (o.set = function (e, t) {
            this._entries[e] = [String(t)];
          }),
          (o.forEach = function (e, t) {
            for (
              var n, r = 0, a = Object.keys(this._entries);
              r < a.length;
              r += 1
            ) {
              var o = a[r];
              n = this._entries[o];
              for (var i = 0; i < n.length; i++) e.call(t, n[i], o, this);
            }
          }),
          (o.keys = function () {
            var e = [];
            return (
              this.forEach(function (t, n) {
                e.push(n);
              }),
              n(e)
            );
          }),
          (o.values = function () {
            var e = [];
            return (
              this.forEach(function (t) {
                e.push(t);
              }),
              n(e)
            );
          }),
          (o.entries = function () {
            var e = [];
            return (
              this.forEach(function (t, n) {
                e.push([n, t]);
              }),
              n(e)
            );
          }),
          t && (o[Symbol.iterator] = o.entries),
          (o.toString = function () {
            var e = [];
            return (
              this.forEach(function (t, n) {
                e.push(r(n) + "=" + r(t));
              }),
              e.join("&")
            );
          }),
          (e.URLSearchParams = a);
      })();
    var o = e.URLSearchParams.prototype;
    "function" != typeof o.sort &&
      (o.sort = function () {
        var e = this,
          t = [];
        this.forEach(function (n, r) {
          t.push([r, n]), e._entries || e.delete(r);
        }),
          t.sort(function (e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
          }),
          e._entries && (e._entries = {});
        for (var n = 0; n < t.length; n++) this.append(t[n][0], t[n][1]);
      }),
      "function" != typeof o._fromString &&
        Object.defineProperty(o, "_fromString", {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: function (e) {
            if (this._entries) this._entries = {};
            else {
              var t = [];
              this.forEach(function (e, n) {
                t.push(n);
              });
              for (var n = 0; n < t.length; n++) this.delete(t[n]);
            }
            for (
              var r, o = (e = e.replace(/^\?/, "")).split("&"), i = 0;
              i < o.length;
              i++
            )
              (r = o[i].split("=")),
                this.append(a(r[0]), r.length > 1 ? a(r[1]) : "");
          },
        });
  })(lt),
    (function (e) {
      if (
        ((function () {
          try {
            var t = new e.URL("b", "http://a");
            return (
              (t.pathname = "c d"),
              "http://a/c%20d" === t.href && t.searchParams
            );
          } catch (e) {
            return !1;
          }
        })() ||
          (function () {
            var t = e.URL,
              n = function (t, n) {
                "string" != typeof t && (t = String(t)),
                  n && "string" != typeof n && (n = String(n)),
                  0 === t.indexOf("blob:http") &&
                    (t = t.replace("blob:http", "http"));
                var r,
                  a = document;
                if (n && (void 0 === e.location || n !== e.location.href)) {
                  (n = n.toLowerCase()),
                    ((r = (a =
                      document.implementation.createHTMLDocument(
                        ""
                      )).createElement("base")).href = n),
                    a.head.appendChild(r);
                  try {
                    if (0 !== r.href.indexOf(n)) throw new Error(r.href);
                  } catch (e) {
                    throw new Error(
                      "URL unable to set base " + n + " due to " + e
                    );
                  }
                }
                var o = a.createElement("a");
                (o.href = t), r && (a.body.appendChild(o), (o.href = o.href));
                var i = a.createElement("input");
                if (
                  ((i.type = "url"),
                  (i.value = t),
                  ":" === o.protocol ||
                    !/:/.test(o.href) ||
                    (!i.checkValidity() && !n))
                )
                  throw new TypeError("Invalid URL: " + t);
                Object.defineProperty(this, "_anchorElement", { value: o });
                var s = new e.URLSearchParams(this.search),
                  l = !0,
                  u = !0,
                  c = this;
                ["append", "delete", "set"].forEach(function (e) {
                  var t = s[e];
                  s[e] = function () {
                    t.apply(s, arguments),
                      l && ((u = !1), (c.search = s.toString()), (u = !0));
                  };
                }),
                  Object.defineProperty(this, "searchParams", {
                    value: s,
                    enumerable: !0,
                  });
                var d = void 0;
                Object.defineProperty(this, "_updateSearchParams", {
                  enumerable: !1,
                  configurable: !1,
                  writable: !1,
                  value: function () {
                    this.search !== d &&
                      ((d = this.search),
                      u &&
                        ((l = !1),
                        this.searchParams._fromString(this.search),
                        (l = !0)));
                  },
                });
              },
              r = n.prototype;
            ["hash", "host", "hostname", "port", "protocol"].forEach(function (
              e
            ) {
              !(function (e) {
                Object.defineProperty(r, e, {
                  get: function () {
                    return this._anchorElement[e];
                  },
                  set: function (t) {
                    this._anchorElement[e] = t;
                  },
                  enumerable: !0,
                });
              })(e);
            }),
              Object.defineProperty(r, "search", {
                get: function () {
                  return this._anchorElement.search;
                },
                set: function (e) {
                  (this._anchorElement.search = e), this._updateSearchParams();
                },
                enumerable: !0,
              }),
              Object.defineProperties(r, {
                toString: {
                  get: function () {
                    var e = this;
                    return function () {
                      return e.href;
                    };
                  },
                },
                href: {
                  get: function () {
                    return this._anchorElement.href.replace(/\?$/, "");
                  },
                  set: function (e) {
                    (this._anchorElement.href = e), this._updateSearchParams();
                  },
                  enumerable: !0,
                },
                pathname: {
                  get: function () {
                    return this._anchorElement.pathname.replace(/(^\/?)/, "/");
                  },
                  set: function (e) {
                    this._anchorElement.pathname = e;
                  },
                  enumerable: !0,
                },
                origin: {
                  get: function () {
                    var e = { "http:": 80, "https:": 443, "ftp:": 21 }[
                        this._anchorElement.protocol
                      ],
                      t =
                        this._anchorElement.port != e &&
                        "" !== this._anchorElement.port;
                    return (
                      this._anchorElement.protocol +
                      "//" +
                      this._anchorElement.hostname +
                      (t ? ":" + this._anchorElement.port : "")
                    );
                  },
                  enumerable: !0,
                },
                password: {
                  get: function () {
                    return "";
                  },
                  set: function () {},
                  enumerable: !0,
                },
                username: {
                  get: function () {
                    return "";
                  },
                  set: function () {},
                  enumerable: !0,
                },
              }),
              (n.createObjectURL = function () {
                return t.createObjectURL.apply(t, arguments);
              }),
              (n.revokeObjectURL = function () {
                return t.revokeObjectURL.apply(t, arguments);
              }),
              (e.URL = n);
          })(),
        void 0 !== e.location && !("origin" in e.location))
      ) {
        var t = function () {
          return (
            e.location.protocol +
            "//" +
            e.location.hostname +
            (e.location.port ? ":" + e.location.port : "")
          );
        };
        try {
          Object.defineProperty(e.location, "origin", {
            get: t,
            enumerable: !0,
          });
        } catch (n) {
          setInterval(function () {
            e.location.origin = t();
          }, 100);
        }
      }
    })(lt);
  var ut = lt.URL,
    ct = function (e, t) {
      return function (n, r) {
        if (!n || !n[e] || !r) return t;
        try {
          return n[e](r);
        } catch (e) {
          se.error(e, {
            consoleOverride:
              "The CSS selectors that you provided are incorrect: " + r,
            sendToDatadog: !1,
          });
        }
        return t;
      };
    },
    dt = ct("querySelectorAll", []),
    ft = ct("querySelector", null),
    gt = ct("closest", null);
  function pt(e) {
    e = "" + e;
    return ["&nbsp;", "&amp;", "&quot;", "&lt;", "&gt;"].some(function (t) {
      return -1 !== e.indexOf(t);
    })
      ? e
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
      : e;
  }
  function ht(e) {
    return (
      e && e.replace && e.replace(/wg-(\d+)=""(\s*)\/(\s*)>/g, 'wg-$1="">')
    );
  }
  function _t(e) {
    var t = window.location.search
      .slice(1)
      .split("&")
      .map(function (e) {
        return e && e.split("=");
      })
      .find(function (t) {
        return t[0] === e;
      });
    return t && t[1];
  }
  function vt() {
    try {
      if (window.frameElement || window.self !== window.top)
        return "with-window-top";
    } catch (e) {
      return "no-window-top";
    }
  }
  var mt = function () {
    return /google|facebook|bing|yahoo|baidu|yandex|lighthouse/i.test(
      navigator.userAgent
    );
  };
  function yt(e) {
    try {
      document.createDocumentFragment().querySelector(e);
    } catch (e) {
      return !1;
    }
    return !0;
  }
  var wt = function (e, t, n) {
      var r = new ut(e, location.href);
      return r.searchParams.set(t, n), "" + r.pathname + r.search;
    },
    bt = function (e, t) {
      var n;
      return (
        void 0 === t && (t = 1e3),
        function () {
          for (var r = this, a = [], o = arguments.length; o--; )
            a[o] = arguments[o];
          clearTimeout(n),
            (n = setTimeout(function () {
              e.apply(r, a);
            }, t));
        }
      );
    },
    kt = function (e) {
      var t = new Date().getTime().toString();
      try {
        var n = e.contentWindow;
        return (n[t] = "asd"), "asd" === n[t];
      } catch (e) {
        return !1;
      }
    };
  function xt(e) {
    var t, n;
    st("onOptionsReady"),
      e.custom_css && i(e.custom_css, "weglot-custom-style"),
      e.inject_weglot_css &&
        ((t = "https://cdn.weglot.com/weglot.min.css?v=11"),
        ((n = document.createElement("link")).rel = "stylesheet"),
        (n.type = "text/css"),
        (n.href = t),
        document.head.appendChild(n)),
      ae(function () {
        var e = o();
        e && (delete e.settings, ue({ injectedData: e }));
      });
  }
  var St = {
      getItem: function (e) {
        return ie.get(e);
      },
      setItem: function (e, t, n) {
        void 0 === n && (n = {});
        var r = n.domain,
          a = n.path,
          o = n.expires;
        ie.set({
          name: e,
          value: t,
          domain: r,
          path: a,
          expires: o,
          options: le,
        });
      },
      removeItem: function (e) {
        return ie.erase({ name: e, options: le });
      },
    },
    Et = {
      getItem: function () {},
      setItem: function () {},
      removeItem: function () {},
    };
  function Lt(e) {
    var t = e || "local";
    try {
      return "cookie" === t ? St : window[t + "Storage"];
    } catch (e) {}
    return e ? Et : Lt("local" === t ? "cookie" : "local");
  }
  var Ct = {},
    Ot = function (e, t) {
      Ct[e] || (Ct[e] = []), Ct[e].push(t);
    },
    Tt = function (e, t) {
      if (Ct[e])
        for (var n = 0, r = Ct[e]; n < r.length; n += 1) {
          (0, r[n])(t);
        }
    };
  function Nt() {
    if (!f(window.location.hostname) || !document.baseURI) {
      var e = window.location;
      return {
        url: e.href,
        hostname: e.hostname,
        pathname: e.pathname,
        search: e.search,
      };
    }
    var t = o();
    if (t && t.editorCurrentURL) {
      var n = new ut(t.editorCurrentURL),
        r = n.hostname,
        a = n.pathname,
        i = n.search;
      return { url: document.baseURI, hostname: r, pathname: a, search: i };
    }
    se.error("Problem finding editor page location", { sendToConsole: !1 });
    var s = new ut(document.baseURI),
      l = s.hostname,
      u = s.pathname,
      c = s.search;
    return { url: document.baseURI, hostname: l, pathname: u, search: c };
  }
  function jt(e) {
    return e.custom_code || e.language_to;
  }
  ot(le && Object.keys(le).length > 0, "onOptionsReady", function () {
    if (le.dynamicPushState) {
      var e = history.pushState;
      history.pushState = function () {
        for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n];
        e.apply(history, t), st("onCurrentLocationChanged");
      };
    }
  });
  var At,
    Rt = function (e) {
      var t = this,
        n = e.pathname,
        r = e.options;
      (this.detectedLanguage = null),
        (this.translationRegex = null),
        (this.advancedMode = !1),
        (this.convertLocale = function (e, n, r, a) {
          return (
            void 0 === n && (n = t.pathname),
            void 0 === r && (r = t.language || t.options.language_from),
            void 0 === a && (a = null),
            t.advancedMode
              ? t.advancedConvertLocale(e, n, r)
              : t.standardConvertLocale(e, n, r, a)
          );
        }),
        (this.options = r),
        (this.pathname = n),
        this.setAdvancedLocaleRule(),
        this.localeRule || this.setLocaleRule();
    };
  function Pt(e) {
    return new Rt({ options: le, pathname: e || Nt().pathname });
  }
  function It() {
    var e = Nt().hostname,
      t = le.languages.find(function (t) {
        return (
          t.connect_host_destination && t.connect_host_destination.host === e
        );
      });
    return t ? t.custom_code || t.language_to : le.language_from;
  }
  function Dt() {
    return Pt().language;
  }
  function Mt() {
    var e = o(),
      t = le.languages || [],
      n =
        (e && e.current_language) ||
        (document.documentElement &&
          document.documentElement.getAttribute("lang"));
    if (!n) return null;
    var r = t.find(function (e) {
      return e.language_to === n || e.custom_code === n;
    });
    return r ? r.custom_code || r.language_to : null;
  }
  function Wt() {
    if (At) return At;
    if (le.is_connect) {
      var e = document.documentElement.dataset.wgTranslated;
      return e ? ((At = e), e) : (At = le.subdirectory ? Dt() : It());
    }
    if ("WordPress" === le.technology_name) {
      var t = Mt();
      if (t) return (At = t), t;
    }
    return (At = le.language_from);
  }
  function zt(e, t) {
    var n = t;
    n || (n = Wt());
    for (var r = 0, a = e; r < a.length; r += 1) {
      var o = a[r];
      if (!o || !o.dataset || !o.dataset.wgOnlyDisplay) return;
      o.hidden = o.dataset.wgOnlyDisplay !== n;
    }
  }
  (Rt.prototype.setAdvancedLocaleRule = function () {
    var e,
      t = this,
      n = this.options,
      r = n.locale_rules_regex;
    void 0 === r && (r = []);
    var a = n.languages,
      o = n.language_from;
    if (r.length) {
      var i = void 0,
        s = null,
        l = void 0,
        u = r.find(function (e) {
          try {
            var n = e.detection,
              r = e.detectionMap;
            if (
              r &&
              (l = Object.keys(r).find(function (e) {
                return e !== o && !!t.pathname.match(new RegExp(r[e]));
              }))
            )
              return !0;
            var u = a
                .map(function (e) {
                  return jt(e);
                })
                .join("|"),
              c = n.replace(/CODE/g, u),
              d = new RegExp(c);
            if ((s = t.pathname.match(d))) return (i = c), !0;
            var f = null == r ? void 0 : r[o];
            if (void 0 !== f && t.pathname.match(new RegExp(f)))
              return (l = o), !0;
          } catch (e) {}
          return !1;
        });
      if (u) {
        this.advancedMode = !0;
        var c =
          l || (null === (e = s.groups) || void 0 === e ? void 0 : e.code);
        (this.localeRule = Object.assign({}, u, {
          detection: i || u.detection,
        })),
          (this.detectedLanguage =
            c &&
            a.find(function (e) {
              return jt(e) === c;
            })
              ? c
              : null),
          (this.language = this.detectedLanguage || this.options.language_from);
      }
    }
  }),
    (Rt.prototype.advancedConvertLocale = function (e, t, n) {
      if ((void 0 === t && (t = this.pathname), !t.startsWith("/") || n === e))
        return t;
      var r = this.localeRule,
        a = r.detection,
        o = r.detectionMap,
        i = r.rewrite,
        s = r.rewriteMap,
        l = this.options.languages.find(function (e) {
          return e.language_to === n;
        }),
        u = (null == l ? void 0 : l.custom_code) || n,
        c = null == o ? void 0 : o[u],
        d = void 0 !== c ? c : a,
        f = (null == s ? void 0 : s[e]) || i.replace(/CODE/g, e),
        g = new RegExp(d);
      return t.replace(g, f);
    }),
    (Rt.prototype.getRegexPositions = function (e) {
      var t = 1;
      return e.replace(/\((.*?)\)/g, function () {
        return "$" + t++;
      });
    }),
    (Rt.prototype.setLocaleRule = function () {
      var e = this,
        t = this.options,
        n = t.localeRules;
      void 0 === n && (n = []);
      var r = t.languages,
        a = {
          position: 0,
          translatedFormat: "CODE",
          originalFormat: "",
          addedByDefault: !0,
        },
        o = this.options.language_from;
      if (n.length) {
        var i = [];
        n.map(function (e) {
          var t = e.position,
            n = e.translatedFormat;
          n && "CODE" !== n && i.push(t || 0);
        });
        var s = i
          .filter(function (e, t, n) {
            return n.indexOf(e) === t;
          })
          .map(function (e) {
            return Object.assign({}, a, { position: e });
          });
        n.unshift.apply(n, s);
      } else n.push(a);
      var l = n.find(function (t) {
        var n = t.position;
        void 0 === n && (n = 0);
        var a = t.translatedFormat;
        void 0 === a && (a = "CODE");
        var i = t.originalFormat;
        void 0 === i && (i = "");
        var s = t.addedByDefault;
        if (!a.includes("CODE")) return !1;
        var l = e.pathname.split("/");
        if (l.length <= n) return !1;
        var u = l[n + 1],
          c = r.find(function (t) {
            var n = jt(t),
              r = a.replace("CODE", n),
              o = new RegExp("^" + r + "$", "g");
            return !!o.test(u) && ((e.translationRegex = o), !0);
          });
        if (c) return (e.detectedLanguage = jt(c)), !0;
        if (i) {
          var d = i.replace("CODE", o);
          return new RegExp("^" + d + "$", "g").test(u);
        }
        return !s;
      });
      (this.localeRule = l || a), (this.language = this.detectedLanguage || o);
    }),
    (Rt.prototype.standardConvertLocale = function (e, t, n, r) {
      void 0 === t && (t = this.pathname), void 0 === r && (r = null);
      var a = this.options.language_from,
        o = this.options.prevent_default_locale_rule;
      void 0 === o && (o = !1);
      var i = this.localeRule;
      if (!t.startsWith("/") || (i.addedByDefault && o) || n === e) return t;
      var s = i.position;
      void 0 === s && (s = 0);
      var l = i.originalFormat;
      void 0 === l && (l = "");
      var u = i.translatedFormat;
      void 0 === u && (u = "CODE");
      var c = t.split("/");
      if (c.length <= s) return t;
      var d = c[s + 1];
      if (n === a) {
        var f = u.replace(/CODE/g, e),
          g = !1;
        if (l) {
          var p = l.replace(/CODE/g, a),
            h = new RegExp("^" + p + "$", "g"),
            _ = this.getRegexPositions(f);
          (f = d.replace(h, _)),
            r && !h.test(d) && ((g = !0), (f = r.split("/")[s + 1]));
        }
        var v = l && !g ? 2 : 1;
        return c
          .slice(0, s + 1)
          .concat([f], c.slice(s + v))
          .join("/");
      }
      if (e === a && !l)
        return c
          .slice(0, s + 1)
          .concat(c.slice(s + 2))
          .join("/");
      var m = e === a ? l : u,
        y = this.getRegexPositions(m.replace(/CODE/g, e)),
        w = d.replace(this.translationRegex, y);
      return c
        .slice(0, s + 1)
        .concat([w], c.slice(s + 2))
        .join("/");
    });
  var qt = { slugs: {}, pendingRequest: void 0, requestResolved: !1 };
  function Ut(e, t) {
    void 0 === t && (t = 0);
    var n = le.api_key,
      r = le.versions;
    if (!r || !r.slugTranslation) return Promise.resolve({});
    var a =
      "https://" +
      (le.api_domain || "cdn-api-weglot.com") +
      "/translations/slugs?api_key=" +
      n +
      "&language_to=" +
      e +
      "&v=" +
      r.slugTranslation;
    return fetch(a)
      .then(function (e) {
        if (!e.ok) throw new Error("HTTP " + e.status + ": " + e.statusText);
        return e.json();
      })
      .then(function (e) {
        return !e || Array.isArray(e) ? {} : e;
      })
      .catch(function (n) {
        if (0 === t) {
          var r = 200 + 50 * Math.random();
          return new Promise(function (n) {
            setTimeout(function () {
              n(Ut(e, t + 1));
            }, r);
          });
        }
        throw n;
      });
  }
  function Ft(e) {
    return Promise.all(
      e.map(function (e) {
        var t = e.custom_code,
          n = e.language_to;
        return Ut(n)
          .then(function (e) {
            !(function (e, t) {
              var n,
                r = {
                  slugs: Object.assign({}, qt.slugs, ((n = {}), (n[e] = t), n)),
                };
              Ht(r), Object.assign(qt, r);
            })(t || n, { version: le.versions.slugTranslation, slugs: e });
          })
          .catch(function () {});
      })
    );
  }
  function Ht(e) {
    try {
      var t = Lt("local");
      t && t.setItem(Ve, JSON.stringify(e));
    } catch (e) {
      se.warn(e);
    }
  }
  function Bt() {
    if (!qt.slugs) return {};
    var e = Wt() === le.language_from;
    return Object.keys(qt.slugs).reduce(function (t, n) {
      var r = qt.slugs[n],
        a = r.slugs,
        o = r.version < le.versions.slugTranslation && e ? {} : a;
      return (
        (t[n] = (function (e) {
          return Object.keys(e).reduce(
            function (t, n) {
              return (
                e[n] && ((t.original[n] = e[n]), (t.translated[e[n]] = n)), t
              );
            },
            { original: {}, translated: {} }
          );
        })(o)),
        t
      );
    }, {});
  }
  function $t(e) {
    var t = le.versions;
    if (t && t.slugTranslation) {
      var n = le.languages.filter(function (e) {
        var n = e.custom_code,
          r = e.language_to,
          a = n || r;
        return !qt.slugs[a] || qt.slugs[a].version < t.slugTranslation;
      });
      n.length
        ? qt.requestResolved
          ? e(Bt())
          : !qt.pendingRequest || qt.requestResolved
          ? (qt.pendingRequest = Ft(n)
              .then(function () {
                (qt.requestResolved = !0), e(Bt());
              })
              .catch(function () {
                (qt.requestResolved = !0), e(Bt());
              }))
          : qt.pendingRequest.then(function () {
              return e(Bt());
            })
        : e(Bt());
    } else e({});
  }
  function Vt(e, t) {
    if (e && e.toLowerCase) {
      var n = e.toLowerCase(),
        r = t.languages.find(function (e) {
          var t = e.language_to,
            r = e.custom_code;
          return t === n || (r ? r.toLowerCase() === n : void 0);
        });
      return r ? r.language_to : e;
    }
  }
  !(function () {
    if (Object.keys(qt.slugs).length) return;
    try {
      var e = Lt("local");
      if (!e) return;
      var t = e.getItem(Ve);
      if (!t) return;
      var n = JSON.parse(t);
      if (void 0 !== n.version) {
        var r = Object.keys(n.slugs || {}).reduce(function (e, t) {
          var r;
          return Object.assign(
            {},
            e,
            (((r = {})[t] = { version: n.version, slugs: n.slugs[t] }), r)
          );
        }, {});
        return (qt.slugs = r), void Ht({ slugs: r });
      }
      return void Object.assign(qt, n);
    } catch (e) {
      return;
    }
  })();
  var Gt = {};
  function Kt(e, t) {
    var n = (function (e, t) {
      void 0 === t && (t = {});
      var n = t.encode;
      return (
        void 0 === n && (n = !1),
        function t(r) {
          var a = r.split(".");
          if (1 === a.length) {
            var o = "";
            try {
              o = e[decodeURIComponent(r)];
            } catch (t) {
              o = e[r];
            }
            return o ? (n ? encodeURIComponent(o) : o) : r;
          }
          var i = a.pop(),
            s = a.join("."),
            l = t(s);
          return s !== l ? l + "." + i : r;
        }
      );
    })(t);
    return e
      .split("/")
      .map(function (e) {
        return n(e);
      })
      .join("/");
  }
  function Jt(e, t) {
    (le.auto_switch || le.geo_auto_switch) &&
      (le.is_tld || le.rendered) &&
      (e === le.language_from
        ? t.searchParams.set("no_redirect", "true")
        : t.searchParams.delete("no_redirect"));
  }
  function Xt(e, t, n) {
    var r = !1;
    if (n) {
      r = n.startsWith("/") && "/" !== n.charAt(1);
      try {
        n = new ut(n, window.location.origin);
      } catch (e) {
        return n;
      }
    } else
      (n = new ut(Nt().url)),
        le.visual_editor &&
          n.searchParams.has("url") &&
          (n = new ut(n.searchParams.get("url"))),
        n.searchParams.has("lang") && n.searchParams.delete("lang"),
        Jt(e, n);
    var a = (function (e) {
      if (le.subdirectory) return !1;
      var t = le.language_from,
        n = le.host,
        r = le.languages;
      if (e === t) return n;
      var a =
          r.find(function (t) {
            return t.custom_code === e || t.language_to === e;
          }) || {},
        o = a.connect_host_destination;
      return o && o.host;
    })(e);
    return (
      a && (n.hostname = a),
      (n.pathname = (function (e, t, n) {
        if (!Object.keys(e).length) return t;
        if ((Gt[t] || (Gt[t] = {}), !Gt[t].originalPath)) {
          var r = Wt();
          if (r !== le.language_from && e[r]) {
            var a = e[r].translated;
            Gt[t].originalPath = Kt(t, a);
          } else Gt[t].originalPath = t;
        }
        return n === le.language_from
          ? Gt[t].originalPath
          : e[n] && e[n].original
          ? Kt(Gt[t].originalPath, e[n].original)
          : t;
      })(t, n.pathname, e)),
      le.subdirectory &&
        e &&
        (n.pathname = Pt(n.pathname).convertLocale(e, n.pathname)),
      r ? "" + n.pathname + n.search + n.hash : n.toString()
    );
  }
  function Yt(e, t) {
    if ("WordPress" === le.technology_name && !le.is_connect) {
      if (le.injectedData && le.injectedData.switcher_links) {
        var n = Vt(e, le);
        return t(le.injectedData.switcher_links[n]);
      }
      var r = (function (e) {
        var t = document.querySelector('link[hreflang*="' + e + '"]');
        if (!t) {
          var n = e.slice(0, 2);
          t = document.querySelector('link[hreflang*="' + n + '"]');
        }
        return t && t.href;
      })(e);
      return r
        ? t(r)
        : (se.error("No switcher_links or hreflang elements found.", {
            sendToDatadog: !1,
          }),
          t("#"));
    }
    if (!le.is_connect || !e) return t("#");
    var a = le.dynamicPushState,
      o = le.injectedData;
    void 0 === o && (o = {});
    var i = o.allLanguageUrls;
    if ((void 0 === i && (i = {}), !a && i && i[e])) {
      var s = new ut(i[e]);
      return Jt(e, s), t(s.toString());
    }
    $t(function (n) {
      return t(Xt(e, n));
    });
  }
  var Zt = {};
  function Qt() {
    var e = le.host;
    return (
      void 0 === e && (e = window.location.hostname),
      0 === e.indexOf("www.") ? e.slice(3) : "." + e
    );
  }
  function en() {
    var e = document.cookie.match(/(^cart=[^;]+|[\W]cart=[^;]+)/g);
    if (e) {
      var t = e.map(function (e) {
        return decodeURIComponent(e.split("=").slice(1).join("="));
      });
      (1 !== t.length && t[0] === t[1]) ||
        ie.set({ name: "cart", value: t[0], domain: Qt(), options: le });
    } else setTimeout(en, 100);
  }
  function tn(e) {
    var t =
      "/checkout?locale=" +
      e +
      (le.shopify_skip_shop_pay ? "&skip_shop_pay=true" : "");
    fetch(t)
      .then(function (e) {
        document.location.href = encodeURI(e.url);
      })
      .catch(function () {
        document.location.href = encodeURI(t);
      });
  }
  function nn(e) {
    var t = e || Wt(),
      n = rn(t),
      r = [{ name: "locale", value: n }].concat(
        le.shopify_skip_shop_pay
          ? [{ name: "skip_shop_pay", value: "true" }]
          : []
      );
    [
      {
        name: "action",
        selector: [
          'form[method="post"][action*="/cart"]',
          'form[method="post"][action*="/checkout"]',
        ],
        testRegex: /\/(cart|checkout|)\/?(\?|$)/,
        event: "submit",
      },
      {
        name: "href",
        selector: ['a[href*="/checkout"]', 'a[href*="/cart/checkout"]'],
        testRegex: /\/(cart\/)?checkout\/?(\?|$)/,
        event: "click",
      },
    ].forEach(function (e) {
      for (
        var a = e.name,
          o = e.selector,
          i = e.testRegex,
          s = e.event,
          l = document.querySelectorAll(o.join(",")),
          u = function () {
            var e = d[c],
              o = e.getAttribute(a);
            if (
              i.test(o) &&
              !r.every(function (e) {
                return o.includes(e.name + "=" + e.value);
              })
            ) {
              for (var l = 0, u = r; l < u.length; l += 1) {
                var f = u[l];
                o = wt(o, f.name, f.value);
              }
              e.setAttribute(a, o),
                e.wgCheckoutListener &&
                  e.removeEventListener(s, e.wgCheckoutListener),
                t !== le.language_from &&
                  le.fix_shopify_checkout_locale &&
                  ((e.wgCheckoutListener = function (e) {
                    return (
                      e.preventDefault(),
                      e.stopPropagation(),
                      le.is_connect && !le.subdirectory
                        ? (Lt("cookie").setItem("wg_checkout_redirect", t),
                          (document.location.href = encodeURI(
                            (le.is_https ? "https:" : "http:") + "//" + le.host
                          )))
                        : tn(n),
                      !1
                    );
                  }),
                  e.addEventListener(s, e.wgCheckoutListener));
            }
          },
          c = 0,
          d = l;
        c < d.length;
        c += 1
      )
        u();
    });
  }
  function rn(e) {
    var t = {
      br: "pt-BR",
      no: "nb",
      pt: "pt-PT",
      ro: "ro-RO",
      fl: "fil",
      sa: "sr-lt",
      zh: "zh-CN",
      tw: "zh-TW",
    };
    return t[e] ? t[e] : e.substr(0, 2);
  }
  function an(e) {
    var t,
      n,
      r,
      a = e || Wt(),
      o =
        document.getElementById("create_customer") ||
        document.querySelector(
          'form[action="' +
            ((t = a),
            (n = "/account"),
            (le.is_connect && t !== le.language_from
              ? Zt[n]
                ? Zt[n]
                : ($t(function (e) {
                    var a = e && e[t] ? Kt(n, e[t].original) : n;
                    r = le.subdirectory
                      ? Pt().convertLocale(t, a, le.language_from)
                      : a;
                  }),
                  (Zt[n] = r),
                  r)
              : n) + '"]')
        ) ||
        ("string" == typeof le.customer_tag && ft(document, le.customer_tag));
    if (o) {
      var i = document.getElementById("weglot-lang-form");
      i && i.parentNode.removeChild(i);
      var s = document.createElement("input");
      Object.assign(s, {
        type: "hidden",
        id: "weglot-lang-form",
        name: "customer[tags]",
        value: "#wg" + a + "#wg",
      }),
        o.appendChild(s);
    }
  }
  function on(e) {
    var t = (function () {
      var e = document.getElementById("shopify-features");
      if (!e) return null;
      var t = e.textContent.match(/"shopId":(\d*)/);
      return t ? t[1] : null;
    })();
    t &&
      ie.set({ name: "checkout_locale", value: rn(e), path: t, options: le });
  }
  function sn(e) {
    var t = e || Wt();
    if (!le.visual_editor && !vt()) {
      var n = le.cart_attributes,
        r = le.is_connect,
        a = le.original_shopify_checkout,
        o = le.subdirectory,
        i = le.language_from,
        s =
          Lt("cookie").getItem("cart") &&
          decodeURIComponent(Lt("cookie").getItem("cart") || ""),
        l =
          Lt("session").getItem("wg-cart-update-token") &&
          decodeURIComponent(
            Lt("session").getItem("wg-cart-update-token") || ""
          ),
        u = Lt("session").getItem("wg-cart-update-lang");
      if (n && n.length && (u !== rn(t) || s !== l)) {
        var c = n
            .map(function (e) {
              return "attributes[" + e + "]=" + rn(t);
            })
            .join("&"),
          d = fetch("/cart/update.js", {
            method: "POST",
            body: c,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }).catch(function () {});
        !1 !== a &&
          r &&
          !o &&
          i === Wt() &&
          d
            .then(function (e) {
              return e.json();
            })
            .then(function (e) {
              var t = e.token;
              return ie.set({
                name: "cart",
                value: t,
                domain: Qt(),
                options: le,
              });
            }),
          Lt("session").setItem("wg-cart-update-token", s),
          Lt("session").setItem("wg-cart-update-lang", rn(t));
      }
      for (
        var f = document.querySelectorAll('a[href*="/cart/"]'),
          g = "attributes[lang]=" + t,
          p = 0,
          h = f;
        p < h.length;
        p += 1
      ) {
        var _ = h[p],
          v = _.getAttribute("href");
        if (v) {
          var m = v.match(/\/cart\/\d+:\d+(\?)?/);
          m &&
            ((v = v.replace(/&?attributes\[lang\]=([a-zA-Z-]+)/g, "")),
            _.setAttribute("href", v + (m[1] ? "&" : "?") + g));
        }
      }
    }
  }
  function ln(e) {
    if (le.language_from !== e) {
      window.Shopify &&
        ((window.Shopify.locale = e), !mt() && le.order_tag && sn(e)),
        nn(e),
        on(e);
      var t = document.querySelectorAll("[data-wg-only-display]");
      t.length && zt(t, e), le.customer_tag && an(e);
    }
  }
  it(
    "onCurrentLocationChanged",
    function () {
      Zt = {};
    },
    !0
  );
  var un,
    cn = {};
  function dn(e) {
    return {
      START_WITH: function (t) {
        return 0 === e.indexOf(t);
      },
      NOT_START_WITH: function (t) {
        return 0 !== e.indexOf(t);
      },
      END_WITH: function (t) {
        return -1 !== e.indexOf(t, e.length - t.length);
      },
      NOT_END_WITH: function (t) {
        return -1 === e.indexOf(t, e.length - t.length);
      },
      CONTAIN: function (t) {
        return -1 !== e.indexOf(t);
      },
      NOT_CONTAIN: function (t) {
        return -1 === e.indexOf(t);
      },
      IS_EXACTLY: function (t) {
        return e === t;
      },
      NOT_IS_EXACTLY: function (t) {
        return e !== t;
      },
      MATCH_REGEX: function (t) {
        try {
          return new RegExp(t, "i").test(e);
        } catch (e) {
          return (
            se.warn(e, {
              consoleOverride: t + " is an invalid regex",
              sendToDatadog: !1,
            }),
            !1
          );
        }
      },
    };
  }
  function fn(e, t) {
    var n = le.excluded_paths;
    if (!n || !n.length) return !1;
    if (
      ((t = (function (e) {
        return (
          e ||
          (!le.dynamicPushState &&
          le.injectedData &&
          le.injectedData.originalPath
            ? le.injectedData.originalPath
            : Nt().pathname)
        );
      })(t).toLowerCase()),
      (e = Vt(e || Wt(), le)),
      cn[t] && cn[t][e])
    )
      return cn[t][e];
    cn[t] || (cn[t] = {});
    var r = (function (e, t) {
      var n = le.excluded_paths.find(function (n) {
        var r = n.type,
          a = n.value,
          o = n.excluded_languages;
        if (!o || !o.length || o.includes(e)) {
          if (dn(t)[r](a)) return n;
          var i = t;
          try {
            i = decodeURIComponent(t);
          } catch (e) {
            return;
          }
          if (i !== t) return dn(i)[r](a) ? n : void 0;
        }
      });
      return n
        ? {
            language_button_displayed: n.language_button_displayed,
            allExcluded:
              !n.excluded_languages ||
              !n.excluded_languages.length ||
              n.excluded_languages.length >= le.languages.length,
          }
        : null;
    })(e, t);
    return (cn[t][e] = r), r;
  }
  function gn() {
    if (un) return un;
    if (!le.api_key)
      return (
        se.warn("Weglot must be initialized to use it.", { sendToDatadog: !1 }),
        []
      );
    var e = (le.languages || [])
        .filter(function (e) {
          var t = fn(e.language_to),
            n = !t || t.language_button_displayed;
          return (
            (!1 !== e.enabled || le.private_mode) &&
            n &&
            (le.subdirectory ||
              !le.is_connect ||
              (e.connect_host_destination &&
                e.connect_host_destination.created_on_aws))
          );
        })
        .map(function (e) {
          return e.custom_code || e.language_to;
        }),
      t = [le.language_from].concat(e);
    return (
      (un = t.filter(function (e, n) {
        return e && t.indexOf(e) == n;
      })),
      e.length ||
        se.log("No public language available.", { sendToDatadog: !1 }),
      un
    );
  }
  function pn() {
    var e = Lt().getItem(qe);
    if (e && gn().includes(e)) return e;
  }
  it(
    "onCurrentLocationChanged",
    function () {
      un = null;
    },
    !0
  );
  var hn = function (e) {
    return e && Lt().setItem(qe, e);
  };
  function _n(e) {
    var t,
      n = e.body,
      r = e.options,
      a = e.logger,
      o = (r.versions && r.versions.translation) || 1,
      i = ["api_key=" + r.api_key, "v=" + o],
      s =
        "https://" +
        (r.api_domain || "cdn-api-weglot.com") +
        "/translate?" +
        i.join("&"),
      l = r.previewHash ? { "weglot-source": "preview" } : {};
    return fetch(s, {
      method: "POST",
      body:
        ((t = JSON.stringify(n)),
        t.replace(/[\u007F-\uFFFF]/g, function (e) {
          return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).substr(-4);
        })),
      headers: l,
    })
      .then(vn)
      .then(function (e) {
        return e.json();
      })
      .then(function (e) {
        if (!e || !e.to_words)
          throw (
            (a.warn(e, { sendToDatadog: !1 }),
            Error("An error occurred, please try again later"))
          );
        return e;
      });
  }
  function vn(e) {
    if (400 === e.status)
      throw Error("You reached Weglot limitation. Please upgrade your plan.");
    if (401 === e.status) throw Error("Your Weglot API key seems wrong.");
    if (e.status >= 402) throw Error(e.statusText);
    return e;
  }
  var mn = $e + "-v",
    yn = Lt("local"),
    wn = xn(yn.getItem(mn)),
    bn = xn(yn.getItem($e)),
    kn = {};
  function xn(e) {
    if (!e) return {};
    try {
      var t = JSON.parse(e);
      return "object" != typeof t ? {} : t;
    } catch (e) {
      return {};
    }
  }
  try {
    Object.keys(bn).forEach(function (e) {
      Object.keys(bn[e]).forEach(function (t) {
        Object.keys(bn[e][t]).forEach(function (n) {
          if (2 === n.length) {
            kn[e] || (kn[e] = {}), kn[e][n] || (kn[e][n] = {});
            var r = bn[e][t][n];
            kn[e][n][r] = t;
          }
        });
      });
    });
  } catch (mr) {
    Object.keys(bn).forEach(function (e) {
      delete bn[e];
    }),
      Object.keys(wn).forEach(function (e) {
        delete wn[e];
      }),
      Ln();
  }
  function Sn(e, t) {
    return !(!kn[le.api_key] || !kn[le.api_key][t]) && kn[le.api_key][t][e];
  }
  function En(e) {
    return bn[le.api_key] && bn[le.api_key][e];
  }
  function Ln() {
    try {
      yn.setItem(mn, JSON.stringify(wn)), yn.setItem($e, JSON.stringify(bn));
    } catch (e) {}
  }
  var Cn = [
      {
        $schema: "../../schemas/urls.schema.json",
        title: "Shopify",
        technology_id: 2,
        urls: [
          {
            condition: [
              {
                type: "PATH_MATCH",
                payload: {
                  type: "MATCH_REGEX",
                  value: "^/checkouts/(?:[\\w]{32})(/.*)?$",
                },
              },
            ],
            value: [
              {
                original: "^/checkouts/(?:[\\w]{32})(/.*)?$",
                formatted: "/checkouts$1",
              },
              {
                original: "^/account/(orders|activate)/(?:[\\w]{32})$",
                formatted: "/account/$1/",
              },
              { original: "^/orders/(?:[\\w]{32})$", formatted: "/orders/" },
              {
                original: "^/wallets/checkouts/(?:.*)$",
                formatted: "/wallets/checkouts/",
              },
              { original: "^/(.+)\\.(json|xml)$", formatted: "/$1" },
            ],
          },
        ],
      },
    ],
    On = [
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "BigCommerce",
        technology_id: 3,
        settings: [
          {
            name: "BigCommerce default settings for all pages",
            value: [
              { type: "search_forms", payload: "form[action='/search.php']" },
              { type: "search_parameter", payload: "search_query" },
              {
                type: "dynamics",
                payload: [
                  { value: ".quick-shop-details" },
                  { value: "#QuickViewProductDetails" },
                  { value: ".QuickViewModal" },
                  { value: ".modalContainer" },
                  { value: ".ng-checkout-container" },
                  { value: ".previewCartAction" },
                  { value: "#checkout-app" },
                ],
              },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Bubble",
        technology_id: 17,
        settings: [
          {
            name: "Bubble default settings for javascript integration",
            condition: [{ type: "INTEGRATION", payload: "javascript" }],
            value: [{ type: "dynamics", payload: [{ value: ".content" }] }],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Jimdo",
        technology_id: 4,
        settings: [
          {
            name: "Jimdo default settings for all pages",
            value: [
              {
                type: "excluded_blocks",
                payload: [
                  { value: '[data-display="cms-only"]' },
                  { value: ".j-admin-links" },
                  { value: ".cc-m-status-empty" },
                ],
              },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Magento",
        technology_id: 15,
        settings: [
          {
            name: "Magento default settings for all pages",
            value: [
              { type: "excluded_blocks", payload: [{ value: ".price" }] },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Salesforce",
        technology_id: 18,
        settings: [
          {
            name: "Salesforce default settings for all pages",
            value: [
              { type: "ignoreDynamicFragments", payload: !0 },
              { type: "dynamicPushState", payload: !0 },
              {
                type: "merged_selectors_remove",
                payload: [{ value: ".themeProfileMenu" }],
              },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Shopify",
        technology_id: 2,
        proxyHosts: ["feeds.datafeedwatch.com", "feeds.adwordsrobot.com"],
        settings: [
          {
            name: "Shopify default settings for all pages",
            value: [
              {
                type: "extra_definitions",
                payload: [
                  {
                    type: 1,
                    selector: ".snize-color-swatch",
                    attribute: "data-sntooltip",
                  },
                  {
                    type: 1,
                    selector: "button[data-pf-type=ProductATC]",
                    attribute: "data-soldout",
                  },
                  {
                    type: 1,
                    selector: "button[data-pf-type=ProductATC]",
                    attribute: "data-adding",
                  },
                  {
                    type: 1,
                    selector: "button[data-pf-type=ProductATC]",
                    attribute: "data-added",
                  },
                ],
              },
              {
                type: "search_forms",
                payload:
                  "form[action='/pages/search-results'],form[action='/search']",
              },
              { type: "search_parameter", payload: "q" },
              {
                type: "cart_attributes",
                payload: ["lang", "Invoice Language"],
              },
              {
                type: "excluded_blocks",
                payload: [
                  { value: "input[type='radio']" },
                  { value: ".money" },
                  { value: ".price" },
                  { value: ".product__prices" },
                  { value: ".price-list" },
                  { value: ".cart-drawer__button-price" },
                  { value: ".sr-only" },
                  { value: "#admin-bar-iframe" },
                  { value: ".notranslate" },
                  { value: ".skiptranslate" },
                  { value: "#isp_refine_nevigation" },
                  { value: "#isp_header_subtitle" },
                  { value: ".isp_sorting_and_result_view_wrapper" },
                  { value: "#isp_results_did_you_mean > span" },
                  { value: ".isp_facet_show_hide_values" },
                  { value: "#isp_main_search_box" },
                  { value: ".snize-filter-variant-count" },
                  { value: ".snize-search-results-header a" },
                  { value: ".snize-search-results-header b" },
                  { value: ".hc-author__text" },
                  { value: ".hc-avatar__initials" },
                  { value: ".hc-rating-chart__count" },
                  { value: ".hc-rating-chart__percentage-value" },
                  { value: ".yotpo-review-date" },
                  { value: ".yotpo-user-name" },
                  { value: ".yotpo-user-letter" },
                  { value: ".yotpo .avg-score" },
                  { value: ".yotpo-mandatory-mark" },
                ],
              },
              {
                type: "dynamics",
                payload: [
                  { value: ".shopify-payment-button button" },
                  { value: "#isp_search_result_page_container" },
                  { value: ".snize-ac-results" },
                  { value: "#snize_results" },
                  { value: ".snize-recommendation" },
                  { value: ".snize-modal" },
                  { value: ".snize-search-results-header" },
                  { value: "div>span.cc-message" },
                  { value: ".hc-widget" },
                  { value: ".jdgm-rev-widg__header" },
                  { value: ".jdgm-rev__body" },
                  { value: ".jdgm-rev-title" },
                  { value: ".yotpo-main-widget" },
                  { value: "#swell-popup" },
                  { value: ".swell-tab" },
                  { value: ".yotpo-widget-override-css" },
                  { value: ".cw-row" },
                  { value: ".mini-popup-container" },
                  { value: "email-field cw-form-control" },
                  { value: "phone-field cw-form-control" },
                  { value: ".sms-policy-text" },
                  { value: ".wlo-content-holder" },
                  { value: ".wlo-wheel-holder" },
                  { value: ".yotpo-smsbump-modal__content" },
                  { value: ".cw-compliance-text" },
                  { value: "#saso-notifications" },
                  { value: ".saso-cross-sell-popup" },
                  { value: ".saso-cart-item-discount-notes" },
                  { value: ".saso-cart-item-upsell-notes" },
                  { value: ".saso-volume-discount-tiers" },
                  { value: ".opw-leading-normal" },
                  {
                    value:
                      ".opw-my-2.opw-leading-normal.opw-text-lg.opw-text-left",
                  },
                  {
                    value:
                      ".opinew-navbar.opw-flex.opw-items-center.opw-justify-between.opw-flex-wrap.opw-py-4.opw-px-6",
                  },
                  { value: ".main-content-container.opw--mx-1" },
                  {
                    value:
                      ".opw-text-center.opw-text-sm.opw-border-solid.opw-border-0.opw-mt-3",
                  },
                  { value: ".summary-card-container.opw-mx-1" },
                  { value: ".opw-reviews-container.opw-mt-3.opw--mx-1" },
                  {
                    value:
                      ".opinew-reviews-title.opw-flex.opw-items-center.opw-flex-no-shrink.opw-mr-6",
                  },
                  { value: ".opw-flex.opw-flex-row-reverse" },
                  { value: "#opinew-app-container" },
                  { value: ".gem_dynamic-content" },
                  { value: ".pp_tracking_content" },
                  { value: ".pp_all_form_div" },
                  { value: ".pp_tracking_result_title" },
                  { value: ".progress-bar-style" },
                  { value: ".pp_tracking_left" },
                  { value: ".pp_num_status_show" },
                  { value: ".pp_tracking_status_tips" },
                  { value: ".pp_page_map_div" },
                  { value: ".pp_tracking_result_parent" },
                  { value: ".pp_tracking_right" },
                  { value: ".pp_recommend_product_parent" },
                  { value: ".currency-converter-cart-note" },
                  { value: ".cbb-shipping-rates-calculator" },
                  { value: ".cbb-frequently-bought-container" },
                  { value: ".cbb-frequently-bought-discount-applied-message" },
                  { value: ".cbb-also-bought-container" },
                  { value: "#zonos" },
                  { value: ".buddha-menu-item" },
                  { value: ".R-GlobalModal" },
                  { value: ".ruk-rating-snippet-count" },
                  { value: ".R-ContentList-container" },
                  { value: ".R-ReviewsList-container" },
                  { value: ".R-SliderIndicator-group" },
                  { value: ".R-TextBody" },
                  { value: ".widgetId-reviewsio-carousel-widget" },
                  { value: ".REVIEWSIO-FloatingMinimised" },
                  { value: ".REVIEWSIO-FloatingMinimised__Container" },
                  { value: ".reviewsio-carousel-widget" },
                  { value: ".reviews-io-floating-widget" },
                  { value: ".reviews_container" },
                  {
                    value:
                      ".site-nav.style--sidebar .site-nav-container .subtitle",
                  },
                  { value: ".search-more" },
                  { value: ".variant-quantity" },
                  { value: ".lion-claimed-rewards-list" },
                  { value: ".lion-header" },
                  { value: ".lion-header__join-buttons" },
                  { value: ".lion-header__join-today" },
                  { value: ".lion-history-table" },
                  { value: ".lion-integrated-page-section__heading-text" },
                  { value: ".lion-loyalty-panel" },
                  { value: ".lion-loyalty-splash" },
                  { value: ".lion-loyalty-widget" },
                  { value: ".lion-modal__content" },
                  { value: ".lion-modal__header" },
                  { value: ".lion-referral-widget" },
                  { value: ".lion-rewards-list" },
                  { value: ".lion-rules-list" },
                  { value: ".lion-tier-overview" },
                  { value: ".ccpops-popup__content__bottom-text" },
                  { value: ".ccpops-popup__content__top-text" },
                  { value: ".ccpops-trigger__text" },
                  { value: ".ks-table-row" },
                  { value: ".klaviyo-form" },
                  { value: ".sca-fg-today-offer-title" },
                  { value: ".sca-fg-today-offer-subtitle" },
                  { value: ".sca-offer-info .sca-offer-title" },
                  { value: ".sca-fg-tooltip" },
                  { value: ".fg-section-title" },
                  { value: ".bogos-gift-items .btn-add-to-cart" },
                  { value: ".bogos-gift-items .selected-variant" },
                  { value: ".sca-hidden-gift-popup .sca-disable-text" },
                  {
                    value:
                      "#sca_fg_cart_message_items_section .content-promotion-message",
                  },
                  { value: ".sca-gift-thumbnail-title" },
                  { value: ".bogos-bundles-quantity-break-widget-title" },
                  { value: ".bogos-bundles-quantity-break-widget-description" },
                  { value: ".bogos-bundle-quantity-break-title" },
                  { value: ".bogos-bundle-quantity-break-tag" },
                  { value: ".bogos-bundle-quantity-break-label" },
                  { value: ".bogos-bundles-quantity-break-button-add" },
                  { value: ".bogos-bundles-quantity-break-total-title" },
                  { value: ".bogos-bundle-quantity-break-item-select-button" },
                  { value: ".bogos-bundles-widget-title" },
                  { value: ".bogos-bundles-widget-description" },
                  { value: ".bogos-bundles-total-title" },
                  { value: ".bogos-bundle-item-select-button" },
                  { value: ".bogos-bundles-button-add" },
                  { value: ".bogos-bundle-item-title" },
                  { value: ".bogos-slider-info-title" },
                  { value: ".bogos-slider-info-subtitle" },
                  { value: ".bogos-slider-offer-title" },
                  { value: ".bogos-gift-select-variant option:first-child" },
                  { value: ".bogos-badge-title" },
                  { value: ".bogos-offer-switch-title" },
                  { value: ".fg-gift-thumbnail-offer-title" },
                  { value: ".fg-gift-thumbnail-offer-footer-quantity" },
                  { value: ".fg-gift-thumbnail-offer-time-title" },
                  { value: "#appstle_subscription_widget1" },
                ],
              },
            ],
          },
          {
            name: "Shopify additionnal settings for javascript integration",
            condition: [{ type: "INTEGRATION", payload: "javascript" }],
            value: [
              {
                type: "dynamics",
                payload: [
                  { value: "form.cart.ajaxcart" },
                  { value: "form.cart-drawer" },
                  { value: "#cross-sell" },
                  { value: ".wheelio_holder" },
                  { value: ".mini-cart" },
                  { value: "#shopify-product-reviews" },
                  { value: "#esc-oos-form" },
                  { value: ".product__add-to-cart-button" },
                  { value: "select.product-variants>option:not([value])" },
                  { value: ".ui-autocomplete" },
                  { value: ".shopify-payment-button__button" },
                  { value: "#shopify-section-static-recently-viewed-products" },
                  { value: "#recently-viewed-products" },
                  { value: "#shopify-section-product-recommendations" },
                  { value: ".action_button.add_to_cart" },
                ],
              },
            ],
          },
          {
            name: "Mollie checkout exclusion",
            condition: [
              {
                type: "PATH_MATCH",
                payload: {
                  type: "MATCH_REGEX",
                  value: "/checkouts/([\\w]+)/forward",
                },
              },
            ],
            value: [
              { type: "dynamics", payload: [{ value: "#payment-form" }] },
            ],
          },
          {
            name: "Shopify Checkout settings",
            condition: [
              {
                type: "PATH_MATCH",
                payload: {
                  type: "MATCH_REGEX",
                  value:
                    "^/(d+/checkouts|checkouts/[a-z]{1,2})/(?:w{2}-)?w{32}",
                },
              },
            ],
            value: [{ type: "shopifyCheckout", payload: !0 }],
          },
          {
            name: "When inside Loox Widget iframe",
            condition: [
              [
                {
                  type: "HOST_MATCH",
                  payload: { type: "IS_EXACTLY", value: "loox.io" },
                },
                { type: "IN_FRAME", payload: !0 },
              ],
            ],
            value: [{ type: "whitelist", payload: [{ value: "main-text" }] }],
          },
          {
            name: "When inside Loox Widget iframe AND proxy integration",
            condition: [
              [
                {
                  type: "HOST_MATCH",
                  payload: { type: "IS_EXACTLY", value: "loox.io" },
                },
                { type: "IN_FRAME", payload: !0 },
                { type: "INTEGRATION", payload: "proxy" },
              ],
            ],
            value: [{ type: "dynamicPushState", payload: !0 }],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Square Online",
        technology_id: 16,
        settings: [
          {
            name: "Square Online default settings for all pages",
            value: [
              {
                type: "dynamics",
                payload: [
                  { value: ".w-container" },
                  { value: ".w-wrapper" },
                  { value: ".product-header" },
                  { value: ".product-messages" },
                  { value: ".error" },
                  { value: "button" },
                ],
              },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Squarespace",
        technology_id: 5,
        proxyHosts: [],
        settings: [
          {
            name: "Squarespace default settings for all pages",
            value: [
              {
                type: "dynamics",
                payload: [
                  { value: "#sqs-cart-container" },
                  { value: "#checkout" },
                  { value: ".sqs-widgets-confirmation" },
                  { value: ".video-player" },
                  { value: ".jdgm-widget" },
                  { value: ".calendar-block" },
                  { value: ".opentable-v2-block" },
                  { value: ".blog-item-comments" },
                ],
              },
              {
                type: "excluded_blocks",
                payload: [{ value: "body.sqs-is-page-editing" }],
              },
              {
                type: "merged_selectors_remove",
                payload: [
                  { value: ".plyr__menu__container" },
                  { value: ".comment-btn-wrapper" },
                  { value: ".product-price .original-price" },
                ],
              },
              {
                type: "extra_definitions",
                payload: [
                  {
                    type: 1,
                    selector: ".variant-select-wrapper",
                    attribute: "data-text",
                  },
                ],
              },
            ],
          },
          {
            name: "Squarespace settings for proxy integration",
            condition: [{ type: "INTEGRATION", payload: "proxy" }],
            value: [
              {
                type: "dynamics",
                payload: [
                  { value: ".sqs-add-to-cart-button.cart-adding" },
                  { value: ".sqs-add-to-cart-button.cart-added" },
                ],
              },
              {
                type: "excluded_blocks",
                payload: [{ value: ".comment-body" }],
              },
            ],
          },
          {
            name: "Squarespace settings for javascript integration",
            condition: [{ type: "INTEGRATION", payload: "javascript" }],
            value: [
              {
                type: "dynamics",
                payload: [
                  { value: "[data-dynamic-strings]" },
                  { value: ".sqs-add-to-cart-button" },
                  { value: ".variant-select-wrapper" },
                ],
              },
              {
                type: "excluded_blocks",
                payload: [
                  { value: ".animation-segment-wrapper" },
                  { value: ".animation-segment-parent-hidden > *" },
                ],
              },
            ],
          },
          {
            name: "Squarespace settings for cart page",
            condition: [
              { type: "DOM_CONTAINS", payload: { selector: "#sqs-cart-root" } },
            ],
            value: [
              {
                type: "excluded_blocks",
                payload: [
                  { value: "#sqs-cart-container [class*=subtotalPrice]" },
                  { value: "#sqs-cart-container .cart-container .item-price" },
                ],
              },
              { type: "force_translation", payload: ["#sqs-cart-container"] },
            ],
          },
          {
            name: "Squarespace settings for checkout page",
            condition: [
              { type: "DOM_CONTAINS", payload: { selector: "#checkout" } },
            ],
            value: [
              {
                type: "excluded_blocks",
                payload: [
                  { value: "#checkout span.money" },
                  {
                    value:
                      "#checkout [data-test*=incomplete] [class^=PaymentCard-container]",
                  },
                  {
                    value:
                      "#checkout [data-test*=incomplete] [class^=CustomerAddress-container]",
                  },
                  {
                    value: "#checkout [aria-labelledby=payment-options-select]",
                  },
                  { value: "#checkout [class^=PaymentSection]" },
                  { value: "#checkout [class^=CustomerInfoSection-email]" },
                  { value: "#checkout [class^=GoogleResultsList]" },
                ],
              },
              { type: "force_translation", payload: ["#checkout"] },
            ],
          },
          {
            name: "Squarespace settings for order status page",
            condition: [
              {
                type: "DOM_CONTAINS",
                payload: { selector: "#order-status-page-root" },
              },
            ],
            value: [
              {
                type: "excluded_blocks",
                payload: [
                  { value: "#order-status-page-root #order-number" },
                  { value: "#order-status-page-root h2 + div > p" },
                ],
              },
              {
                type: "force_translation",
                payload: ["#order-status-page-root"],
              },
            ],
          },
          {
            name: "Disable Connect on the Squarespace site admin area",
            condition: [
              {
                type: "HOST_MATCH",
                payload: { type: "END_WITH", value: "squarespace.com" },
              },
            ],
            value: [{ type: "forceDisableConnect", payload: !0 }],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Webflow",
        technology_id: 13,
        settings: [
          {
            name: "Webflow default settings for all pages",
            value: [
              {
                type: "excluded_blocks",
                payload: [{ value: ".wg-element-wrapper" }],
              },
            ],
          },
        ],
      },
      {
        $schema: "../../schemas/technologies.schema.json",
        title: "Wix",
        technology_id: 6,
        settings: [
          {
            name: "Wix default settings for all pages",
            value: [{ type: "dynamicPushState", payload: !0 }],
          },
          {
            name: "Wix settings for javascript integration",
            condition: [{ type: "INTEGRATION", payload: "javascript" }],
            value: [
              { type: "dynamics", payload: [{ value: "#SITE_CONTAINER" }] },
            ],
          },
        ],
      },
    ];
  function Tn(e, t) {
    var n = On.find(function (e) {
      return e.technology_id === t.technology_id;
    });
    return (
      n &&
        n.settings &&
        n.settings
          .filter(function (e) {
            return Nn(e.condition, t);
          })
          .map(function (t) {
            return t.value.map(function (t) {
              !(function (e, t, n) {
                var r = e[t];
                if (void 0 === r) return void (e[t] = n);
                if (Array.isArray(r) && Array.isArray(n))
                  return void (e[t] = r.concat(n));
                if (Array.isArray(n) && "string" == typeof r)
                  return void (e[t] = n.concat([r.split(",")]));
                if ("object" == typeof r)
                  return void (e[t] = Object.assign({}, r, n));
                e[t] = n;
              })(e, t.type, t.payload);
            });
          }),
      e
    );
  }
  function Nn(e, t) {
    if (!e || 0 === e.length) return !0;
    if (!Array.isArray(e)) return !1;
    for (var n = Nt(), r = 0, a = e; r < a.length; r += 1) {
      var o = a[r];
      if (Array.isArray(o)) {
        if (
          o.every(function (e) {
            return jn(e, n, t);
          })
        )
          return !0;
      } else if (jn(o, n, t)) return !0;
    }
    return !1;
  }
  function jn(e, t, n) {
    if (!e) return !0;
    var r = e.type,
      a = e.payload;
    if (!a && "boolean" != typeof a) return !0;
    if ("URI_MATCH" === r && An(t.url, a)) return !0;
    if ("HOST_MATCH" === r && An(t.hostname, a)) return !0;
    if ("TRANSLATION_URL_MATCH" === r && An(t.url, a)) return !0;
    if ("PATH_MATCH" === r && An(t.pathname, a)) return !0;
    if ("INTEGRATION" === r) {
      var o = tt(n);
      return ("proxy" === a && o) || ("javascript" === a && !o);
    }
    if ("DOM_CONTAINS" === r) {
      var i = a.selector;
      if (ft(document, i)) return !0;
    }
    return "IN_FRAME" === r
      ? a === ("with-window-top" === vt())
      : ("object" == typeof a &&
          "selector" in a &&
          ["XML_ATTRIBUTE_VALUE", "XML_ROOT_ELEMENT_NAME"].includes(r),
        !1);
  }
  var An = function (e, t) {
    var n = t.type,
      r = t.value;
    return dn((e = e.toLocaleLowerCase()))[n](r);
  };
  function Rn() {
    var e = (function () {
      if (le.visual_editor) return new ut(Nt().url);
      var e = le.technology_name,
        t = le.injectedData;
      if (e === Ge.wix.name) return new ut(window.location.href);
      if (t && t.originalCanonicalUrl)
        try {
          return new ut(t.originalCanonicalUrl);
        } catch (e) {}
      var n = document.querySelector("link[rel='canonical'][href]");
      if (n)
        try {
          return new ut(n.href);
        } catch (e) {}
      return new ut(window.location.href);
    })();
    le.disable_remove_numeric_slugs ||
      (e.pathname = e.pathname
        .split("/")
        .filter(function (e) {
          return !e || isNaN(Number(e));
        })
        .join("/"));
    for (
      var t = 0,
        n = (function () {
          var e;
          return (e = []).concat
            .apply(
              e,
              Cn.filter(function (e) {
                return !(t = e.technology_id) || t === le.technology_id;
                var t;
              })
                .map(function (e) {
                  return e.urls;
                })
                .concat([(le.definitions && le.definitions.urls) || []])
            )
            .filter(function (e) {
              return Nn(e.condition);
            });
        })();
      t < n.length;
      t += 1
    ) {
      var r = n[t].value;
      try {
        for (var a = 0, o = r; a < o.length; a += 1) {
          var i = o[a],
            s = i.original,
            l = i.formatted,
            u = e.pathname.replace(new RegExp(s), l);
          if (u !== e.pathname) return (e.pathname = u), e.toString();
        }
      } catch (e) {
        se.warn(e, { consoleOverride: "Invalid URL regex, " + e.stack });
      }
    }
    return e.toString();
  }
  function Pn(e, t) {
    void 0 === t && (t = { search: !1, cdn: !1 });
    var n,
      r,
      a = e.l_to,
      o = e.words,
      i = le.visual_editor || t.search || le.disable_local_cache,
      s =
        !i &&
        ((n = wn[le.api_key]),
        (r = n && n === le.versions.translation) ||
          (delete bn[le.api_key],
          delete wn[le.api_key],
          delete kn[le.api_key],
          Ln()),
        r);
    if (!o || !o.length)
      return Promise.resolve({ to_words: [], from_words: [] });
    var l =
      s &&
      (function (e, t) {
        var n = [],
          r = [];
        return {
          isComplete: e.every(function (e) {
            var a = En(e.w);
            if (a && a[t]) return n.push(a[t]), r.push(pt(e.w)), !0;
          }),
          words: { to_words: n, from_words: r },
        };
      })(o, a);
    return l && l.isComplete
      ? Promise.resolve(l.words)
      : _n({
          body: Object.assign({}, e, { l_to: Vt(a, le), request_url: Rn() }),
          options: le,
          logger: se,
        }).then(function (e) {
          return (
            i ||
              o.forEach(function (t, n) {
                var r,
                  o,
                  i,
                  s,
                  l,
                  u = e.to_words[n];
                (r = t.w),
                  t.t,
                  (o = u),
                  (i = a),
                  (l = En(r))
                    ? (l[i] = o)
                    : (bn[le.api_key] || (bn[le.api_key] = {}),
                      (bn[le.api_key][r] = (((s = {})[i] = o), s))),
                  kn[le.api_key] || (kn[le.api_key] = {}),
                  kn[le.api_key][i] || (kn[le.api_key][i] = {}),
                  (kn[le.api_key][i][o] = r),
                  (wn[le.api_key] = le.versions.translation),
                  bt(Ln)();
              }),
            e
          );
        });
  }
  function In(e, t, n) {
    void 0 === n && (n = {});
    n = Object.assign({}, { title: !0, cdn: !1, search: !1 }, n);
    var r = { l_from: le.language_from, l_to: t, words: e };
    return n.title && (r.title = document.title), Pn(r, n);
  }
  function Dn(e, t) {
    if ("string" != typeof e || "function" != typeof t) return !1;
    var n = Wt();
    return n === le.language_from
      ? (t(e), !1)
      : (Pn(
          {
            l_from: Vt(n, le),
            l_to: le.language_from,
            words: [{ t: 2, w: e }],
          },
          { search: !0 }
        )
          .then(function (e) {
            return e.to_words[0].toLowerCase().trim();
          })
          .then(t),
        !0);
  }
  function Mn(e) {
    return pt(e)
      .replace(/<[^>]*>/g, "")
      .replace(/[\n\r]+/g, "");
  }
  function Wn(e) {
    if (!e) return "";
    if (e.nodeType === Node.TEXT_NODE) return Wn(e.parentElement);
    if (e.nodeType !== Node.ELEMENT_NODE) return "";
    for (var t = [], n = e; n && n.nodeType === Node.ELEMENT_NODE; ) {
      for (var r = 1, a = n.previousElementSibling; a; )
        a.tagName === n.tagName && r++, (a = a.previousElementSibling);
      var o = n.tagName.toLowerCase(),
        i = r > 1 ? o + "[" + r + "]" : o;
      t.unshift(i), (n = n.parentElement);
    }
    var s = t.length > 0 ? "/" + t.join("/") : "";
    return (e.wgXPath = s), s;
  }
  var zn = [],
    qn = new Set(),
    Un = !1,
    Fn = function (e) {
      return qn.has(Mn(e));
    },
    Hn = function (e) {
      return qn.add(Mn(e));
    };
  function Bn(e, t) {
    void 0 === e && (e = document.documentElement);
    var n = Wt();
    return P(e)
      .filter(function (e) {
        return (t || $n)(e);
      })
      .map(
        (function (e) {
          return function (t) {
            var n = t.element,
              r = t.words,
              a = t.type,
              o = t.properties,
              i = t.attrSetter;
            n.weglot || (n.weglot = { content: [] });
            var s = n.weglot,
              l = n.wgXPath || Wn(n),
              u = {},
              c = Sn(r, e);
            if ((c && ((u[e] = r), (r = c)), o)) {
              var d = s.content.find(function (e) {
                return e.html;
              });
              d
                ? Object.assign(d, {
                    original: r,
                    properties: o,
                    translations: u,
                    currentLang: void 0,
                    xpath: l,
                  })
                : s.content.push({
                    html: !0,
                    original: r,
                    type: a,
                    properties: o,
                    translations: u,
                    xpath: l,
                  });
            }
            if (i) {
              var f = s.content.find(function (e) {
                  return e.attrSetter === i;
                }),
                g = {
                  attrSetter: i,
                  original: r,
                  type: a,
                  translations: u,
                  currentLang: void 0,
                  xpath: l,
                };
              f ? Object.assign(f, g) : s.content.push(g);
            }
            return n;
          };
        })(n)
      );
  }
  function $n(e) {
    var t = e.element,
      n = e.words;
    return (
      !t.weglot ||
      !t.weglot.content ||
      !t.weglot.content.some(function (e) {
        var t,
          r = e.original,
          a = e.translations;
        return (
          r === n ||
          ((t = a),
          Object.keys(t).map(function (e) {
            return t[e];
          })).includes(pt(n))
        );
      })
    );
  }
  function Vn(e) {
    for (var t = [], n = 0, r = e; n < r.length; n += 1) {
      var a = r[n];
      -1 === zn.indexOf(a) && t.push(a);
    }
    return [].push.apply(zn, t), t;
  }
  function Gn(e, t) {
    void 0 === e && (e = zn), void 0 === t && (t = {});
    var n = le.prevent_retranslation,
      r = le.injectedData;
    void 0 === r && (r = {});
    var a = le.is_connect;
    if (n && a && !Un) {
      var o = r.translatedWordsList;
      void 0 === o && (o = []),
        o.forEach(function (e) {
          return Hn(e);
        }),
        (Un = !0);
    }
    for (var i = [], s = {}, l = 0, u = e; l < u.length; l += 1)
      for (
        var c = function () {
            var e = h[p],
              r = e.original,
              a = e.type,
              o = e.xpath;
            if (s[r]) {
              var l = i.find(function (e) {
                return e.w === r;
              });
              l &&
                l.p &&
                (l.p.find(function (e) {
                  return e === o;
                }) ||
                  l.p.push(o));
            } else
              (n && Fn(r)) ||
                ((s[r] = !0),
                i.push(
                  Object.assign(
                    {},
                    { t: a, w: r, p: [o] },
                    t.label || g
                      ? {
                          l: [t.label, g].filter(Boolean).map(function (e) {
                            return e.slice(0, 255);
                          }),
                        }
                      : {}
                  )
                ));
          },
          d = u[l],
          f = d.weglot,
          g = d.translationLabel,
          p = 0,
          h = f.content;
        p < h.length;
        p += 1
      )
        c();
    return i;
  }
  function Kn(e, t, n) {
    if (
      (void 0 === t && (t = Wt()),
      void 0 === n && (n = zn),
      e && e.to_words && e.to_words.length)
    )
      for (
        var r = e.from_words, a = e.to_words, o = 0, i = n;
        o < i.length;
        o += 1
      )
        for (var s = 0, l = i[o].weglot.content || {}; s < l.length; s += 1) {
          var u = l[s],
            c = u.original,
            d = u.translations,
            f = r.indexOf(pt(c));
          if (-1 !== f && !d[t]) {
            var g = ht(a[f]);
            le.prevent_retranslation && Hn(g), (d[t] = g);
          }
        }
    try {
      $(n, t);
    } catch (e) {
      se.error(e);
    }
  }
  function Jn(e) {
    var t = e.targetLanguage,
      n = e.currentLanguage,
      r = e.options,
      a = r.language_from,
      o = r.proxyFormat,
      i = r.api_key,
      s = r.subdirectory,
      l = r.host,
      u = r.languages;
    if (o === ke) return "https://" + ve + "/" + i + "/" + a + "/" + t + "/";
    if (s) return "https://" + l + "/" + t + "/" + me + "/";
    var c = u.find(function (e) {
      return e.custom_code === n || e.language_to === n;
    });
    return (null == c ? void 0 : c.connect_host_destination)
      ? "https://" + c.connect_host_destination.host + "/" + me + "/"
      : null;
  }
  var Xn = [];
  function Yn(e) {
    var t = e.langTo;
    void 0 === t && (t = Wt());
    var n = e.node;
    void 0 === n && (n = document.documentElement);
    var r = le.proxify_iframes,
      a = le.api_key,
      o = le.language_from;
    if (r && r.length && Array.isArray(r))
      for (var i = 0, s = dt(n, r.join(",")); i < s.length; i += 1) {
        var l = s[i],
          u = l.src;
        if (u)
          if (
            (l.weglot || (l.weglot = {}),
            u.includes(He + "/") || u.includes("/" + Be + "/"))
          )
            if (t && t !== o) {
              var c = new RegExp(a + "/" + o + "/[^/]+/");
              l.src = u.replace(c, a + "/" + o + "/" + t + "/");
            } else {
              var d = (l.weglot || {}).originalFrameSrc;
              d && (l.src = d);
            }
          else {
            if (
              (l.weglot.originalFrameSrc || (l.weglot.originalFrameSrc = u),
              t === o)
            )
              continue;
            try {
              var f = Jn({
                targetLanguage: t,
                currentLanguage: Wt(),
                options: le,
              });
              f && (l.src = u.replace(/^https?:\/\//, f));
            } catch (e) {}
          }
      }
  }
  function Zn(e) {
    void 0 === e && (e = Wt()),
      (function (e) {
        void 0 === e && (e = Wt());
        for (
          var t = { message: "Weglot.setLanguage", payload: e }, n = 0, r = Xn;
          n < r.length;
          n += 1
        ) {
          var a = r[n];
          try {
            a.postMessage(t, "*");
          } catch (e) {
            se.warn(e);
          }
        }
      })(e),
      Yn({ langTo: e });
  }
  function Qn(e) {
    if (e.data && "null" !== e.origin) {
      var t = e.data,
        n = t.message,
        r = t.payload;
      if (n) {
        if ("Weglot.iframe" === n) {
          var a = { message: "Weglot.setLanguage", payload: Wt() };
          return e.source.postMessage(a, e.origin), void Xn.push(e.source);
        }
        "Weglot.setLanguage" !== n || Ai(r);
      }
    }
  }
  var er,
    tr,
    nr,
    rr,
    ar,
    or,
    ir,
    sr,
    lr,
    ur,
    cr,
    dr,
    fr = {},
    gr = [],
    pr = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
    hr = Array.isArray;
  function _r(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function vr(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  function mr(e, t, n) {
    var r,
      a,
      o,
      i = {};
    for (o in t)
      "key" == o ? (r = t[o]) : "ref" == o ? (a = t[o]) : (i[o] = t[o]);
    if (
      (arguments.length > 2 &&
        (i.children = arguments.length > 3 ? er.call(arguments, 2) : n),
      "function" == typeof e && null != e.defaultProps)
    )
      for (o in e.defaultProps) void 0 === i[o] && (i[o] = e.defaultProps[o]);
    return yr(e, i, r, a, null);
  }
  function yr(e, t, n, r, a) {
    var o = {
      type: e,
      props: t,
      key: n,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __c: null,
      constructor: void 0,
      __v: null == a ? ++nr : a,
      __i: -1,
      __u: 0,
    };
    return null == a && null != tr.vnode && tr.vnode(o), o;
  }
  function wr(e) {
    return e.children;
  }
  function br(e, t) {
    (this.props = e), (this.context = t);
  }
  function kr(e, t) {
    if (null == t) return e.__ ? kr(e.__, e.__i + 1) : null;
    for (var n; t < e.__k.length; t++)
      if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
    return "function" == typeof e.type ? kr(e) : null;
  }
  function xr(e) {
    var t, n;
    if (null != (e = e.__) && null != e.__c) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) {
          e.__e = e.__c.base = n.__e;
          break;
        }
      return xr(e);
    }
  }
  function Sr(e) {
    ((!e.__d && (e.__d = !0) && rr.push(e) && !Er.__r++) ||
      ar != tr.debounceRendering) &&
      ((ar = tr.debounceRendering) || or)(Er);
  }
  function Er() {
    for (var e, t, n, r, a, o, i, s = 1; rr.length; )
      rr.length > s && rr.sort(ir),
        (e = rr.shift()),
        (s = rr.length),
        e.__d &&
          ((n = void 0),
          (r = void 0),
          (a = (r = (t = e).__v).__e),
          (o = []),
          (i = []),
          t.__P &&
            (((n = _r({}, r)).__v = r.__v + 1),
            tr.vnode && tr.vnode(n),
            Rr(
              t.__P,
              n,
              r,
              t.__n,
              t.__P.namespaceURI,
              32 & r.__u ? [a] : null,
              o,
              null == a ? kr(r) : a,
              !!(32 & r.__u),
              i
            ),
            (n.__v = r.__v),
            (n.__.__k[n.__i] = n),
            Ir(o, n, i),
            (r.__e = r.__ = null),
            n.__e != a && xr(n)));
    Er.__r = 0;
  }
  function Lr(e, t, n, r, a, o, i, s, l, u, c) {
    var d,
      f,
      g,
      p,
      h,
      _,
      v,
      m = (r && r.__k) || gr,
      y = t.length;
    for (
      l = (function (e, t, n, r, a) {
        var o,
          i,
          s,
          l,
          u,
          c = n.length,
          d = c,
          f = 0;
        for (e.__k = new Array(a), o = 0; o < a; o++)
          null != (i = t[o]) && "boolean" != typeof i && "function" != typeof i
            ? ((l = o + f),
              ((i = e.__k[o] =
                "string" == typeof i ||
                "number" == typeof i ||
                "bigint" == typeof i ||
                i.constructor == String
                  ? yr(null, i, null, null, null)
                  : hr(i)
                  ? yr(wr, { children: i }, null, null, null)
                  : null == i.constructor && i.__b > 0
                  ? yr(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v)
                  : i).__ = e),
              (i.__b = e.__b + 1),
              (s = null),
              -1 != (u = i.__i = Tr(i, n, l, d)) &&
                (d--, (s = n[u]) && (s.__u |= 2)),
              null == s || null == s.__v
                ? (-1 == u && (a > c ? f-- : a < c && f++),
                  "function" != typeof i.type && (i.__u |= 4))
                : u != l &&
                  (u == l - 1
                    ? f--
                    : u == l + 1
                    ? f++
                    : (u > l ? f-- : f++, (i.__u |= 4))))
            : (e.__k[o] = null);
        if (d)
          for (o = 0; o < c; o++)
            null != (s = n[o]) &&
              !(2 & s.__u) &&
              (s.__e == r && (r = kr(s)), zr(s, s));
        return r;
      })(n, t, m, l, y),
        d = 0;
      d < y;
      d++
    )
      null != (g = n.__k[d]) &&
        ((f = -1 == g.__i ? fr : m[g.__i] || fr),
        (g.__i = d),
        (_ = Rr(e, g, f, a, o, i, s, l, u, c)),
        (p = g.__e),
        g.ref &&
          f.ref != g.ref &&
          (f.ref && Wr(f.ref, null, g), c.push(g.ref, g.__c || p, g)),
        null == h && null != p && (h = p),
        (v = !!(4 & g.__u)) || f.__k === g.__k
          ? (l = Cr(g, l, e, v))
          : "function" == typeof g.type && void 0 !== _
          ? (l = _)
          : p && (l = p.nextSibling),
        (g.__u &= -7));
    return (n.__e = h), l;
  }
  function Cr(e, t, n, r) {
    var a, o;
    if ("function" == typeof e.type) {
      for (a = e.__k, o = 0; a && o < a.length; o++)
        a[o] && ((a[o].__ = e), (t = Cr(a[o], t, n, r)));
      return t;
    }
    e.__e != t &&
      (r &&
        (t && e.type && !t.parentNode && (t = kr(e)),
        n.insertBefore(e.__e, t || null)),
      (t = e.__e));
    do {
      t = t && t.nextSibling;
    } while (null != t && 8 == t.nodeType);
    return t;
  }
  function Or(e, t) {
    return (
      (t = t || []),
      null == e ||
        "boolean" == typeof e ||
        (hr(e)
          ? e.some(function (e) {
              Or(e, t);
            })
          : t.push(e)),
      t
    );
  }
  function Tr(e, t, n, r) {
    var a,
      o,
      i,
      s = e.key,
      l = e.type,
      u = t[n],
      c = null != u && !(2 & u.__u);
    if ((null === u && null == e.key) || (c && s == u.key && l == u.type))
      return n;
    if (r > (c ? 1 : 0))
      for (a = n - 1, o = n + 1; a >= 0 || o < t.length; )
        if (
          null != (u = t[(i = a >= 0 ? a-- : o++)]) &&
          !(2 & u.__u) &&
          s == u.key &&
          l == u.type
        )
          return i;
    return -1;
  }
  function Nr(e, t, n) {
    "-" == t[0]
      ? e.setProperty(t, null == n ? "" : n)
      : (e[t] =
          null == n ? "" : "number" != typeof n || pr.test(t) ? n : n + "px");
  }
  function jr(e, t, n, r, a) {
    var o, i;
    e: if ("style" == t)
      if ("string" == typeof n) e.style.cssText = n;
      else {
        if (("string" == typeof r && (e.style.cssText = r = ""), r))
          for (t in r) (n && t in n) || Nr(e.style, t, "");
        if (n) for (t in n) (r && n[t] == r[t]) || Nr(e.style, t, n[t]);
      }
    else if ("o" == t[0] && "n" == t[1])
      (o = t != (t = t.replace(sr, "$1"))),
        (i = t.toLowerCase()),
        (t =
          i in e || "onFocusOut" == t || "onFocusIn" == t
            ? i.slice(2)
            : t.slice(2)),
        e.l || (e.l = {}),
        (e.l[t + o] = n),
        n
          ? r
            ? (n.u = r.u)
            : ((n.u = lr), e.addEventListener(t, o ? cr : ur, o))
          : e.removeEventListener(t, o ? cr : ur, o);
    else {
      if ("http://www.w3.org/2000/svg" == a)
        t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (
        "width" != t &&
        "height" != t &&
        "href" != t &&
        "list" != t &&
        "form" != t &&
        "tabIndex" != t &&
        "download" != t &&
        "rowSpan" != t &&
        "colSpan" != t &&
        "role" != t &&
        "popover" != t &&
        t in e
      )
        try {
          e[t] = null == n ? "" : n;
          break e;
        } catch (e) {}
      "function" == typeof n ||
        (null == n || (!1 === n && "-" != t[4])
          ? e.removeAttribute(t)
          : e.setAttribute(t, "popover" == t && 1 == n ? "" : n));
    }
  }
  function Ar(e) {
    return function (t) {
      if (this.l) {
        var n = this.l[t.type + e];
        if (null == t.t) t.t = lr++;
        else if (t.t < n.u) return;
        return n(tr.event ? tr.event(t) : t);
      }
    };
  }
  function Rr(e, t, n, r, a, o, i, s, l, u) {
    var c,
      d,
      f,
      g,
      p,
      h,
      _,
      v,
      m,
      y,
      w,
      b,
      k,
      x,
      S,
      E,
      L,
      C = t.type;
    if (null != t.constructor) return null;
    128 & n.__u && ((l = !!(32 & n.__u)), (o = [(s = t.__e = n.__e)])),
      (c = tr.__b) && c(t);
    e: if ("function" == typeof C)
      try {
        if (
          ((v = t.props),
          (m = "prototype" in C && C.prototype.render),
          (y = (c = C.contextType) && r[c.__c]),
          (w = c ? (y ? y.props.value : c.__) : r),
          n.__c
            ? (_ = (d = t.__c = n.__c).__ = d.__E)
            : (m
                ? (t.__c = d = new C(v, w))
                : ((t.__c = d = new br(v, w)),
                  (d.constructor = C),
                  (d.render = qr)),
              y && y.sub(d),
              (d.props = v),
              d.state || (d.state = {}),
              (d.context = w),
              (d.__n = r),
              (f = d.__d = !0),
              (d.__h = []),
              (d._sb = [])),
          m && null == d.__s && (d.__s = d.state),
          m &&
            null != C.getDerivedStateFromProps &&
            (d.__s == d.state && (d.__s = _r({}, d.__s)),
            _r(d.__s, C.getDerivedStateFromProps(v, d.__s))),
          (g = d.props),
          (p = d.state),
          (d.__v = t),
          f)
        )
          m &&
            null == C.getDerivedStateFromProps &&
            null != d.componentWillMount &&
            d.componentWillMount(),
            m && null != d.componentDidMount && d.__h.push(d.componentDidMount);
        else {
          if (
            (m &&
              null == C.getDerivedStateFromProps &&
              v !== g &&
              null != d.componentWillReceiveProps &&
              d.componentWillReceiveProps(v, w),
            (!d.__e &&
              null != d.shouldComponentUpdate &&
              !1 === d.shouldComponentUpdate(v, d.__s, w)) ||
              t.__v == n.__v)
          ) {
            for (
              t.__v != n.__v &&
                ((d.props = v), (d.state = d.__s), (d.__d = !1)),
                t.__e = n.__e,
                t.__k = n.__k,
                t.__k.some(function (e) {
                  e && (e.__ = t);
                }),
                b = 0;
              b < d._sb.length;
              b++
            )
              d.__h.push(d._sb[b]);
            (d._sb = []), d.__h.length && i.push(d);
            break e;
          }
          null != d.componentWillUpdate && d.componentWillUpdate(v, d.__s, w),
            m &&
              null != d.componentDidUpdate &&
              d.__h.push(function () {
                d.componentDidUpdate(g, p, h);
              });
        }
        if (
          ((d.context = w),
          (d.props = v),
          (d.__P = e),
          (d.__e = !1),
          (k = tr.__r),
          (x = 0),
          m)
        ) {
          for (
            d.state = d.__s,
              d.__d = !1,
              k && k(t),
              c = d.render(d.props, d.state, d.context),
              S = 0;
            S < d._sb.length;
            S++
          )
            d.__h.push(d._sb[S]);
          d._sb = [];
        } else
          do {
            (d.__d = !1),
              k && k(t),
              (c = d.render(d.props, d.state, d.context)),
              (d.state = d.__s);
          } while (d.__d && ++x < 25);
        (d.state = d.__s),
          null != d.getChildContext && (r = _r(_r({}, r), d.getChildContext())),
          m &&
            !f &&
            null != d.getSnapshotBeforeUpdate &&
            (h = d.getSnapshotBeforeUpdate(g, p)),
          (E = c),
          null != c &&
            c.type === wr &&
            null == c.key &&
            (E = Dr(c.props.children)),
          (s = Lr(e, hr(E) ? E : [E], t, n, r, a, o, i, s, l, u)),
          (d.base = t.__e),
          (t.__u &= -161),
          d.__h.length && i.push(d),
          _ && (d.__E = d.__ = null);
      } catch (e) {
        if (((t.__v = null), l || null != o))
          if (e.then) {
            for (
              t.__u |= l ? 160 : 128;
              s && 8 == s.nodeType && s.nextSibling;

            )
              s = s.nextSibling;
            (o[o.indexOf(s)] = null), (t.__e = s);
          } else {
            for (L = o.length; L--; ) vr(o[L]);
            Pr(t);
          }
        else (t.__e = n.__e), (t.__k = n.__k), e.then || Pr(t);
        tr.__e(e, t, n);
      }
    else
      null == o && t.__v == n.__v
        ? ((t.__k = n.__k), (t.__e = n.__e))
        : (s = t.__e = Mr(n.__e, t, n, r, a, o, i, l, u));
    return (c = tr.diffed) && c(t), 128 & t.__u ? void 0 : s;
  }
  function Pr(e) {
    e && e.__c && (e.__c.__e = !0), e && e.__k && e.__k.forEach(Pr);
  }
  function Ir(e, t, n) {
    for (var r = 0; r < n.length; r++) Wr(n[r], n[++r], n[++r]);
    tr.__c && tr.__c(t, e),
      e.some(function (t) {
        try {
          (e = t.__h),
            (t.__h = []),
            e.some(function (e) {
              e.call(t);
            });
        } catch (e) {
          tr.__e(e, t.__v);
        }
      });
  }
  function Dr(e) {
    return "object" != typeof e || null == e || (e.__b && e.__b > 0)
      ? e
      : hr(e)
      ? e.map(Dr)
      : _r({}, e);
  }
  function Mr(e, t, n, r, a, o, i, s, l) {
    var u,
      c,
      d,
      f,
      g,
      p,
      h,
      _ = n.props,
      v = t.props,
      m = t.type;
    if (
      ("svg" == m
        ? (a = "http://www.w3.org/2000/svg")
        : "math" == m
        ? (a = "http://www.w3.org/1998/Math/MathML")
        : a || (a = "http://www.w3.org/1999/xhtml"),
      null != o)
    )
      for (u = 0; u < o.length; u++)
        if (
          (g = o[u]) &&
          "setAttribute" in g == !!m &&
          (m ? g.localName == m : 3 == g.nodeType)
        ) {
          (e = g), (o[u] = null);
          break;
        }
    if (null == e) {
      if (null == m) return document.createTextNode(v);
      (e = document.createElementNS(a, m, v.is && v)),
        s && (tr.__m && tr.__m(t, o), (s = !1)),
        (o = null);
    }
    if (null == m) _ === v || (s && e.data == v) || (e.data = v);
    else {
      if (
        ((o = o && er.call(e.childNodes)), (_ = n.props || fr), !s && null != o)
      )
        for (_ = {}, u = 0; u < e.attributes.length; u++)
          _[(g = e.attributes[u]).name] = g.value;
      for (u in _)
        if (((g = _[u]), "children" == u));
        else if ("dangerouslySetInnerHTML" == u) d = g;
        else if (!(u in v)) {
          if (
            ("value" == u && "defaultValue" in v) ||
            ("checked" == u && "defaultChecked" in v)
          )
            continue;
          jr(e, u, null, g, a);
        }
      for (u in v)
        (g = v[u]),
          "children" == u
            ? (f = g)
            : "dangerouslySetInnerHTML" == u
            ? (c = g)
            : "value" == u
            ? (p = g)
            : "checked" == u
            ? (h = g)
            : (s && "function" != typeof g) ||
              _[u] === g ||
              jr(e, u, g, _[u], a);
      if (c)
        s ||
          (d && (c.__html == d.__html || c.__html == e.innerHTML)) ||
          (e.innerHTML = c.__html),
          (t.__k = []);
      else if (
        (d && (e.innerHTML = ""),
        Lr(
          "template" == t.type ? e.content : e,
          hr(f) ? f : [f],
          t,
          n,
          r,
          "foreignObject" == m ? "http://www.w3.org/1999/xhtml" : a,
          o,
          i,
          o ? o[0] : n.__k && kr(n, 0),
          s,
          l
        ),
        null != o)
      )
        for (u = o.length; u--; ) vr(o[u]);
      s ||
        ((u = "value"),
        "progress" == m && null == p
          ? e.removeAttribute("value")
          : null != p &&
            (p !== e[u] ||
              ("progress" == m && !p) ||
              ("option" == m && p != _[u])) &&
            jr(e, u, p, _[u], a),
        (u = "checked"),
        null != h && h != e[u] && jr(e, u, h, _[u], a));
    }
    return e;
  }
  function Wr(e, t, n) {
    try {
      if ("function" == typeof e) {
        var r = "function" == typeof e.__u;
        r && e.__u(), (r && null == t) || (e.__u = e(t));
      } else e.current = t;
    } catch (e) {
      tr.__e(e, n);
    }
  }
  function zr(e, t, n) {
    var r, a;
    if (
      (tr.unmount && tr.unmount(e),
      (r = e.ref) && ((r.current && r.current != e.__e) || Wr(r, null, t)),
      null != (r = e.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount();
        } catch (e) {
          tr.__e(e, t);
        }
      r.base = r.__P = null;
    }
    if ((r = e.__k))
      for (a = 0; a < r.length; a++)
        r[a] && zr(r[a], t, n || "function" != typeof e.type);
    n || vr(e.__e), (e.__c = e.__ = e.__e = void 0);
  }
  function qr(e, t, n) {
    return this.constructor(e, n);
  }
  function Ur(e) {
    var t,
      n,
      r = "";
    if ("string" == typeof e || "number" == typeof e) r += e;
    else if ("object" == typeof e)
      if (Array.isArray(e)) {
        var a = e.length;
        for (t = 0; t < a; t++)
          e[t] && (n = Ur(e[t])) && (r && (r += " "), (r += n));
      } else for (n in e) e[n] && (r && (r += " "), (r += n));
    return r;
  }
  (er = gr.slice),
    (tr = {
      __e: function (e, t, n, r) {
        for (var a, o, i; (t = t.__); )
          if ((a = t.__c) && !a.__)
            try {
              if (
                ((o = a.constructor) &&
                  null != o.getDerivedStateFromError &&
                  (a.setState(o.getDerivedStateFromError(e)), (i = a.__d)),
                null != a.componentDidCatch &&
                  (a.componentDidCatch(e, r || {}), (i = a.__d)),
                i)
              )
                return (a.__E = a);
            } catch (t) {
              e = t;
            }
        throw e;
      },
    }),
    (nr = 0),
    (br.prototype.setState = function (e, t) {
      var n;
      (n =
        null != this.__s && this.__s != this.state
          ? this.__s
          : (this.__s = _r({}, this.state))),
        "function" == typeof e && (e = e(_r({}, n), this.props)),
        e && _r(n, e),
        null != e && this.__v && (t && this._sb.push(t), Sr(this));
    }),
    (br.prototype.forceUpdate = function (e) {
      this.__v && ((this.__e = !0), e && this.__h.push(e), Sr(this));
    }),
    (br.prototype.render = wr),
    (rr = []),
    (or =
      "function" == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout),
    (ir = function (e, t) {
      return e.__v.__b - t.__v.__b;
    }),
    (Er.__r = 0),
    (sr = /(PointerCapture)$|Capture$/i),
    (lr = 0),
    (ur = Ar(!1)),
    (cr = Ar(!0)),
    (dr = 0);
  var Fr,
    Hr,
    Br,
    $r,
    Vr = 0,
    Gr = [],
    Kr = tr,
    Jr = Kr.__b,
    Xr = Kr.__r,
    Yr = Kr.diffed,
    Zr = Kr.__c,
    Qr = Kr.unmount,
    ea = Kr.__;
  function ta(e, t) {
    Kr.__h && Kr.__h(Hr, e, Vr || t), (Vr = 0);
    var n = Hr.__H || (Hr.__H = { __: [], __h: [] });
    return e >= n.__.length && n.__.push({}), n.__[e];
  }
  function na(e) {
    return (
      (Vr = 1),
      (function (e, t, n) {
        var r = ta(Fr++, 2);
        if (
          ((r.t = e),
          !r.__c &&
            ((r.__ = [
              n ? n(t) : da(void 0, t),
              function (e) {
                var t = r.__N ? r.__N[0] : r.__[0],
                  n = r.t(t, e);
                t !== n && ((r.__N = [n, r.__[1]]), r.__c.setState({}));
              },
            ]),
            (r.__c = Hr),
            !Hr.__f))
        ) {
          var a = function (e, t, n) {
            if (!r.__c.__H) return !0;
            var a = r.__c.__H.__.filter(function (e) {
              return !!e.__c;
            });
            if (
              a.every(function (e) {
                return !e.__N;
              })
            )
              return !o || o.call(this, e, t, n);
            var i = r.__c.props !== e;
            return (
              a.forEach(function (e) {
                if (e.__N) {
                  var t = e.__[0];
                  (e.__ = e.__N), (e.__N = void 0), t !== e.__[0] && (i = !0);
                }
              }),
              (o && o.call(this, e, t, n)) || i
            );
          };
          Hr.__f = !0;
          var o = Hr.shouldComponentUpdate,
            i = Hr.componentWillUpdate;
          (Hr.componentWillUpdate = function (e, t, n) {
            if (this.__e) {
              var r = o;
              (o = void 0), a(e, t, n), (o = r);
            }
            i && i.call(this, e, t, n);
          }),
            (Hr.shouldComponentUpdate = a);
        }
        return r.__N || r.__;
      })(da, e)
    );
  }
  function ra(e, t) {
    var n = ta(Fr++, 3);
    !Kr.__s && ca(n.__H, t) && ((n.__ = e), (n.u = t), Hr.__H.__h.push(n));
  }
  function aa(e) {
    return (
      (Vr = 5),
      (function (e, t) {
        var n = ta(Fr++, 7);
        return ca(n.__H, t) && ((n.__ = e()), (n.__H = t), (n.__h = e)), n.__;
      })(function () {
        return { current: e };
      }, [])
    );
  }
  function oa() {
    for (var e; (e = Gr.shift()); )
      if (e.__P && e.__H)
        try {
          e.__H.__h.forEach(la), e.__H.__h.forEach(ua), (e.__H.__h = []);
        } catch (t) {
          (e.__H.__h = []), Kr.__e(t, e.__v);
        }
  }
  (Kr.__b = function (e) {
    (Hr = null), Jr && Jr(e);
  }),
    (Kr.__ = function (e, t) {
      e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ea && ea(e, t);
    }),
    (Kr.__r = function (e) {
      Xr && Xr(e), (Fr = 0);
      var t = (Hr = e.__c).__H;
      t &&
        (Br === Hr
          ? ((t.__h = []),
            (Hr.__h = []),
            t.__.forEach(function (e) {
              e.__N && (e.__ = e.__N), (e.u = e.__N = void 0);
            }))
          : (t.__h.forEach(la), t.__h.forEach(ua), (t.__h = []), (Fr = 0))),
        (Br = Hr);
    }),
    (Kr.diffed = function (e) {
      Yr && Yr(e);
      var t = e.__c;
      t &&
        t.__H &&
        (t.__H.__h.length &&
          ((1 !== Gr.push(t) && $r === Kr.requestAnimationFrame) ||
            (($r = Kr.requestAnimationFrame) || sa)(oa)),
        t.__H.__.forEach(function (e) {
          e.u && (e.__H = e.u), (e.u = void 0);
        })),
        (Br = Hr = null);
    }),
    (Kr.__c = function (e, t) {
      t.some(function (e) {
        try {
          e.__h.forEach(la),
            (e.__h = e.__h.filter(function (e) {
              return !e.__ || ua(e);
            }));
        } catch (n) {
          t.some(function (e) {
            e.__h && (e.__h = []);
          }),
            (t = []),
            Kr.__e(n, e.__v);
        }
      }),
        Zr && Zr(e, t);
    }),
    (Kr.unmount = function (e) {
      Qr && Qr(e);
      var t,
        n = e.__c;
      n &&
        n.__H &&
        (n.__H.__.forEach(function (e) {
          try {
            la(e);
          } catch (e) {
            t = e;
          }
        }),
        (n.__H = void 0),
        t && Kr.__e(t, n.__v));
    });
  var ia = "function" == typeof requestAnimationFrame;
  function sa(e) {
    var t,
      n = function () {
        clearTimeout(r), ia && cancelAnimationFrame(t), setTimeout(e);
      },
      r = setTimeout(n, 35);
    ia && (t = requestAnimationFrame(n));
  }
  function la(e) {
    var t = Hr,
      n = e.__c;
    "function" == typeof n && ((e.__c = void 0), n()), (Hr = t);
  }
  function ua(e) {
    var t = Hr;
    (e.__c = e.__()), (Hr = t);
  }
  function ca(e, t) {
    return (
      !e ||
      e.length !== t.length ||
      t.some(function (t, n) {
        return t !== e[n];
      })
    );
  }
  function da(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function fa(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function ga(e, t) {
    for (var n in e) if ("__source" !== n && !(n in t)) return !0;
    for (var r in t) if ("__source" !== r && e[r] !== t[r]) return !0;
    return !1;
  }
  function pa(e, t) {
    (this.props = e), (this.context = t);
  }
  ((pa.prototype = new br()).isPureReactComponent = !0),
    (pa.prototype.shouldComponentUpdate = function (e, t) {
      return ga(this.props, e) || ga(this.state, t);
    });
  var ha = tr.__b;
  tr.__b = function (e) {
    e.type && e.type.__f && e.ref && ((e.props.ref = e.ref), (e.ref = null)),
      ha && ha(e);
  };
  var _a =
    ("undefined" != typeof Symbol &&
      Symbol.for &&
      Symbol.for("react.forward_ref")) ||
    3911;
  var va = tr.__e;
  tr.__e = function (e, t, n, r) {
    if (e.then)
      for (var a, o = t; (o = o.__); )
        if ((a = o.__c) && a.__c)
          return (
            null == t.__e && ((t.__e = n.__e), (t.__k = n.__k)), a.__c(e, t)
          );
    va(e, t, n, r);
  };
  var ma = tr.unmount;
  function ya(e, t, n) {
    return (
      e &&
        (e.__c &&
          e.__c.__H &&
          (e.__c.__H.__.forEach(function (e) {
            "function" == typeof e.__c && e.__c();
          }),
          (e.__c.__H = null)),
        null != (e = fa({}, e)).__c &&
          (e.__c.__P === n && (e.__c.__P = t),
          (e.__c.__e = !0),
          (e.__c = null)),
        (e.__k =
          e.__k &&
          e.__k.map(function (e) {
            return ya(e, t, n);
          }))),
      e
    );
  }
  function wa(e, t, n) {
    return (
      e &&
        n &&
        ((e.__v = null),
        (e.__k =
          e.__k &&
          e.__k.map(function (e) {
            return wa(e, t, n);
          })),
        e.__c &&
          e.__c.__P === t &&
          (e.__e && n.appendChild(e.__e), (e.__c.__e = !0), (e.__c.__P = n))),
      e
    );
  }
  function ba() {
    (this.__u = 0), (this.o = null), (this.__b = null);
  }
  function ka(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
  }
  function xa() {
    (this.i = null), (this.l = null);
  }
  (tr.unmount = function (e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), ma && ma(e);
  }),
    ((ba.prototype = new br()).__c = function (e, t) {
      var n = t.__c,
        r = this;
      null == r.o && (r.o = []), r.o.push(n);
      var a = ka(r.__v),
        o = !1,
        i = function () {
          o || ((o = !0), (n.__R = null), a ? a(s) : s());
        };
      n.__R = i;
      var s = function () {
        if (!--r.__u) {
          if (r.state.__a) {
            var e = r.state.__a;
            r.__v.__k[0] = wa(e, e.__c.__P, e.__c.__O);
          }
          var t;
          for (r.setState({ __a: (r.__b = null) }); (t = r.o.pop()); )
            t.forceUpdate();
        }
      };
      r.__u++ || 32 & t.__u || r.setState({ __a: (r.__b = r.__v.__k[0]) }),
        e.then(i, i);
    }),
    (ba.prototype.componentWillUnmount = function () {
      this.o = [];
    }),
    (ba.prototype.render = function (e, t) {
      if (this.__b) {
        if (this.__v.__k) {
          var n = document.createElement("div"),
            r = this.__v.__k[0].__c;
          this.__v.__k[0] = ya(this.__b, n, (r.__O = r.__P));
        }
        this.__b = null;
      }
      var a = t.__a && mr(wr, null, e.fallback);
      return a && (a.__u &= -33), [mr(wr, null, t.__a ? null : e.children), a];
    });
  var Sa = function (e, t, n) {
    if (
      (++n[1] === n[0] && e.l.delete(t),
      e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.l.size))
    )
      for (n = e.i; n; ) {
        for (; n.length > 3; ) n.pop()();
        if (n[1] < n[0]) break;
        e.i = n = n[2];
      }
  };
  ((xa.prototype = new br()).__a = function (e) {
    var t = this,
      n = ka(t.__v),
      r = t.l.get(e);
    return (
      r[0]++,
      function (a) {
        var o = function () {
          t.props.revealOrder ? (r.push(a), Sa(t, e, r)) : a();
        };
        n ? n(o) : o();
      }
    );
  }),
    (xa.prototype.render = function (e) {
      (this.i = null), (this.l = new Map());
      var t = Or(e.children);
      e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
      for (var n = t.length; n--; ) this.l.set(t[n], (this.i = [1, 0, this.i]));
      return e.children;
    }),
    (xa.prototype.componentDidUpdate = xa.prototype.componentDidMount =
      function () {
        var e = this;
        this.l.forEach(function (t, n) {
          Sa(e, n, t);
        });
      });
  var Ea =
      ("undefined" != typeof Symbol &&
        Symbol.for &&
        Symbol.for("react.element")) ||
      60103,
    La =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    Ca = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
    Oa = /[A-Z0-9]/g,
    Ta = "undefined" != typeof document,
    Na = function (e) {
      return (
        "undefined" != typeof Symbol && "symbol" == typeof Symbol()
          ? /fil|che|rad/
          : /fil|che|ra/
      ).test(e);
    };
  (br.prototype.isReactComponent = {}),
    [
      "componentWillMount",
      "componentWillReceiveProps",
      "componentWillUpdate",
    ].forEach(function (e) {
      Object.defineProperty(br.prototype, e, {
        configurable: !0,
        get: function () {
          return this["UNSAFE_" + e];
        },
        set: function (t) {
          Object.defineProperty(this, e, {
            configurable: !0,
            writable: !0,
            value: t,
          });
        },
      });
    });
  var ja = tr.event;
  function Aa() {}
  function Ra() {
    return this.cancelBubble;
  }
  function Pa() {
    return this.defaultPrevented;
  }
  tr.event = function (e) {
    return (
      ja && (e = ja(e)),
      (e.persist = Aa),
      (e.isPropagationStopped = Ra),
      (e.isDefaultPrevented = Pa),
      (e.nativeEvent = e)
    );
  };
  var Ia = {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return this.class;
      },
    },
    Da = tr.vnode;
  tr.vnode = function (e) {
    "string" == typeof e.type &&
      (function (e) {
        var t = e.props,
          n = e.type,
          r = {},
          a = -1 === n.indexOf("-");
        for (var o in t) {
          var i = t[o];
          if (
            !(
              ("value" === o && "defaultValue" in t && null == i) ||
              (Ta && "children" === o && "noscript" === n) ||
              "class" === o ||
              "className" === o
            )
          ) {
            var s = o.toLowerCase();
            "defaultValue" === o && "value" in t && null == t.value
              ? (o = "value")
              : "download" === o && !0 === i
              ? (i = "")
              : "translate" === s && "no" === i
              ? (i = !1)
              : "o" === s[0] && "n" === s[1]
              ? "ondoubleclick" === s
                ? (o = "ondblclick")
                : "onchange" !== s ||
                  ("input" !== n && "textarea" !== n) ||
                  Na(t.type)
                ? "onfocus" === s
                  ? (o = "onfocusin")
                  : "onblur" === s
                  ? (o = "onfocusout")
                  : Ca.test(o) && (o = s)
                : (s = o = "oninput")
              : a && La.test(o)
              ? (o = o.replace(Oa, "-$&").toLowerCase())
              : null === i && (i = void 0),
              "oninput" === s && r[(o = s)] && (o = "oninputCapture"),
              (r[o] = i);
          }
        }
        "select" == n &&
          r.multiple &&
          Array.isArray(r.value) &&
          (r.value = Or(t.children).forEach(function (e) {
            e.props.selected = -1 != r.value.indexOf(e.props.value);
          })),
          "select" == n &&
            null != r.defaultValue &&
            (r.value = Or(t.children).forEach(function (e) {
              e.props.selected = r.multiple
                ? -1 != r.defaultValue.indexOf(e.props.value)
                : r.defaultValue == e.props.value;
            })),
          t.class && !t.className
            ? ((r.class = t.class), Object.defineProperty(r, "className", Ia))
            : ((t.className && !t.class) || (t.class && t.className)) &&
              (r.class = r.className = t.className),
          (e.props = r);
      })(e),
      (e.$$typeof = Ea),
      Da && Da(e);
  };
  var Ma = tr.__r;
  tr.__r = function (e) {
    Ma && Ma(e), e.__c;
  };
  var Wa = tr.diffed;
  tr.diffed = function (e) {
    Wa && Wa(e);
    var t = e.props,
      n = e.__e;
    null != n &&
      "textarea" === e.type &&
      "value" in t &&
      t.value !== n.value &&
      (n.value = null == t.value ? "" : t.value);
  };
  var za = (function (e) {
      function t(e) {
        var n, r;
        return (
          this.getChildContext ||
            ((n = new Set()),
            ((r = {})[t.__c] = this),
            (this.getChildContext = function () {
              return r;
            }),
            (this.componentWillUnmount = function () {
              n = null;
            }),
            (this.shouldComponentUpdate = function (e) {
              this.props.value != e.value &&
                n.forEach(function (e) {
                  (e.__e = !0), Sr(e);
                });
            }),
            (this.sub = function (e) {
              n.add(e);
              var t = e.componentWillUnmount;
              e.componentWillUnmount = function () {
                n && n.delete(e), t && t.call(e);
              };
            })),
          e.children
        );
      }
      return (
        (t.__c = "__cC" + dr++),
        (t.__ = e),
        (t.Provider =
          t.__l =
          (t.Consumer = function (e, t) {
            return e.children(t);
          }).contextType =
            t),
        t
      );
    })({}),
    qa = function (e, t) {
      return function (t) {
        var n = {},
          r = n.shouldForwardProp,
          a = n.label;
        var o = (function (e, t) {
          function n(e) {
            var n = this.props.ref,
              r = n == e.ref;
            return (
              !r && n && (n.call ? n(null) : (n.current = null)),
              t ? !t(this.props, e) || !r : ga(this.props, e)
            );
          }
          function r(t) {
            return (this.shouldComponentUpdate = n), mr(e, t);
          }
          return (
            (r.displayName = "Memo(" + (e.displayName || e.name) + ")"),
            (r.prototype.isReactComponent = !0),
            (r.__f = !0),
            (r.type = e),
            r
          );
        })(
          (function (e) {
            function t(t) {
              var n = fa({}, t);
              return delete n.ref, e(n, t.ref || null);
            }
            return (
              (t.$$typeof = _a),
              (t.render = e),
              (t.prototype.isReactComponent = t.__f = !0),
              (t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")"),
              t
            );
          })(function (n, a) {
            var o = n || {},
              i = o.children,
              s = o.as;
            void 0 === s && (s = e);
            var l = o.style;
            void 0 === l && (l = {});
            var u = (function (e, t) {
                var n = {};
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    -1 === t.indexOf(r) &&
                    (n[r] = e[r]);
                return n;
              })(o, ["children", "as", "style"]),
              c = u,
              d = (function (e) {
                var t = Hr.context[e.__c],
                  n = ta(Fr++, 9);
                return (
                  (n.c = e),
                  t
                    ? (null == n.__ && ((n.__ = !0), t.sub(Hr)), t.props.value)
                    : e.__
                );
              })(za);
            return mr(
              s,
              Object.assign(
                {},
                {
                  ref: a,
                  style: Object.assign(
                    {},
                    t(Object.assign({}, c, { theme: d })),
                    "function" == typeof l
                      ? l(Object.assign({}, c, { theme: d }))
                      : l
                  ),
                },
                r
                  ? (function (e, t) {
                      return Object.keys(e)
                        .filter(t)
                        .reduce(function (t, n) {
                          return (t[n] = e[n]), t;
                        }, {});
                    })(c, r)
                  : c
              ),
              i
            );
          })
        );
        return (o.displayName = (a || e) + "💅"), o;
      };
    },
    Ua = qa("div")(function () {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      };
    });
  function Fa(e) {
    var t = e.displayError;
    void 0 === t && (t = !0);
    var n = e.logger;
    void 0 === n && (n = function () {});
    var r = e.children,
      a = (function (e) {
        var t = ta(Fr++, 10),
          n = na();
        return (
          (t.__ = e),
          Hr.componentDidCatch ||
            (Hr.componentDidCatch = function (e, r) {
              t.__ && t.__(e, r), n[1](e);
            }),
          [
            n[0],
            function () {
              n[1](void 0);
            },
          ]
        );
      })(function (e) {
        return n(e);
      });
    return a[0] && t
      ? mr(
          Ua,
          null,
          mr(
            "p",
            null,
            "An error has occurred, we apologise for the inconvenience. ",
            mr("br", null),
            mr("br", null),
            "We have been notified and will rectify the situation as soon as possible. ",
            mr("br", null),
            mr("br", null),
            "Please try again later or contact support@weglot.com directly."
          )
        )
      : r;
  }
  var Ha = ["text_active", "text_inactive", "text_hover"],
    Ba = ["bg_active", "bg_inactive", "bg_hover"],
    $a = [
      {
        name: "default",
        editorDropdown: !0,
        editableProps: [
          "flag_type",
          "with_flags",
          "hide_selected_language",
          "is_dropdown",
          "with_name",
          "full_name",
          "invert_flags",
          "open_hover",
          "close_outside_click",
        ],
        defaultValues: {
          style: {
            with_name: !0,
            with_flags: !0,
            full_name: !0,
            is_dropdown: !0,
            invert_flags: !0,
            flag_type: "rectangle_mat",
          },
          opts: {
            hide_selected_language: !1,
            open_hover: !1,
            close_outside_click: !1,
          },
        },
      },
      {
        name: "toggle",
        editableProps: ["hide_selected_language"].concat(Ha, Ba),
        defaultValues: {
          style: { full_name: !1 },
          opts: { hide_selected_language: !1 },
          colors: {
            bg_active: "#3D46FB",
            bg_inactive: "transparent",
            bg_hover: "transparent",
            text_active: "#FFFFFF",
            text_inactive: "#000000",
            text_hover: "#000000",
          },
        },
      },
      {
        name: "bubble",
        editorDropdown: !0,
        editableProps: [
          "flag_type",
          "with_flags",
          "full_name",
          "color",
          "open_hover",
          "close_outside_click",
        ].concat(Ha),
        defaultValues: {
          style: {
            with_name: !0,
            with_flags: !0,
            full_name: !0,
            flag_type: "rectangle_mat",
          },
          opts: { open_hover: !1, close_outside_click: !0 },
          colors: {
            text_inactive: "#333333",
            text_active: "#555555",
            text_hover: "#555555",
          },
        },
      },
      {
        name: "vertical_expand",
        editorDropdown: !0,
        editableProps: [
          "with_flags",
          "full_name",
          "color",
          "open_hover",
          "close_outside_click",
        ].concat(Ha, Ba),
        defaultValues: {
          style: {
            with_name: !0,
            with_flags: !0,
            full_name: !1,
            flag_type: "square",
          },
          opts: { open_hover: !0, close_outside_click: !1 },
          colors: {
            text_active: "#000000",
            text_inactive: "#000000",
            text_hover: "#FFFFFF",
            bg_inactive: "#FFFFFF",
            bg_active: "#FFFFFF",
            bg_hover: "#3D46FB",
          },
        },
      },
      {
        name: "horizontal_expand",
        editorDropdown: !1,
        editableProps: ["open_hover", "close_outside_click"].concat(Ha, Ba),
        defaultValues: {
          style: {
            with_name: !0,
            with_flags: !1,
            full_name: !1,
            flag_type: "square",
          },
          opts: { open_hover: !0, close_outside_click: !1 },
          colors: {
            text_inactive: "#000000",
            text_active: "#FFFFFF",
            text_hover: "#FFFFFF",
            bg_inactive: "#FFFFFF",
            bg_active: "#3D46FB",
            bg_hover: "#3D46FB",
          },
        },
      },
      {
        name: "underline_edge",
        editableProps: ["full_name", "hide_selected_language"].concat(Ha),
        maxLanguages: 10,
        minLanguages: null,
        defaultValues: {
          style: { full_name: !1 },
          colors: {
            text_active: "#FA8072",
            text_inactive: "#333333",
            text_hover: "#FA8072",
          },
          opts: { hide_selected_language: !1 },
        },
      },
      {
        name: "skewed",
        editorDropdown: !0,
        editableProps: [
          "with_flags",
          "full_name",
          "open_hover",
          "close_outside_click",
          "bg_active",
          "bg_inactive",
        ].concat(Ha),
        defaultValues: {
          style: {
            with_name: !0,
            with_flags: !0,
            full_name: !1,
            flag_type: "square",
          },
          opts: { open_hover: !0, close_outside_click: !1 },
          colors: {
            text_active: "#000000",
            text_inactive: "#000000",
            text_hover: "#3D46FB",
            bg_inactive: "#FFFFFF",
            bg_active: "transparent",
            bg_hover: "#FFFFFF",
          },
        },
      },
      {
        name: "underline_full",
        maxLanguages: 10,
        minLanguages: null,
        editableProps: [
          "with_flags",
          "flag_type",
          "hide_selected_language",
        ].concat(Ha),
        defaultValues: {
          style: { full_name: !0, with_flags: !0, flag_type: "rectangle_mat" },
          opts: { hide_selected_language: !1 },
          colors: {
            text_active: "#333333",
            text_inactive: "#333333",
            text_hover: "#3D46FB",
          },
        },
      },
    ].map(function (e) {
      return Object.assign({}, e, {
        defaultValues: Object.assign({}, e.defaultValues, {
          opts: Object.assign({}, e.defaultValues.opts, {
            is_responsive: !1,
            display_device: "mobile",
            pixel_cutoff: 768,
          }),
          style: Object.assign({}, e.defaultValues.style, { size_scale: 1 }),
        }),
        editableProps: e.editableProps.concat([
          "is_responsive",
          "display_device",
          "pixel_cutoff",
          "size_scale",
        ]),
      });
    });
  function Va(e) {
    var t = (function (e) {
        return $a.find(function (t) {
          return t.name === e;
        });
      })(e),
      n = t.defaultValues;
    void 0 === n && (n = {});
    var r = n,
      a = r.style;
    void 0 === a && (a = {});
    var o = r.opts;
    void 0 === o && (o = {});
    var i = r.colors;
    return void 0 === i && (i = {}), { style: a, opts: o, colors: i };
  }
  var Ga = _({ service: "switcher-templates" }),
    Ka = {
      "fr-ca": "fr",
      "pt-br": "pt",
      nb: "no",
      gl: "es",
      tl: "fl",
      yue: "zh",
    },
    Ja = {
      af: ["Taal", "Taal gekies", "Taallys", "Taalwisselaar"],
      am: ["ቋንቋ", "ቋንቋ ተመርጧል", "የቋንቋ ዝርዝር", "የቋንቋ ማቀያየሪያ"],
      ar: ["اللغة", "اللغة المحددة", "قائمة اللغات", "مبدل اللغة"],
      az: ["Dil", "Seçilmiş dil", "Dil siyahısı", "Dil dəyişdirici"],
      ba: ["Тел", "Һайланған тел", "Телдәр исемлеге", "Тел алмаштырғыс"],
      be: ["Мова", "Абраная мова", "Спіс моў", "Пераключальнік моў"],
      bg: ["Език", "Избран език", "Списък с езици", "Превключвател на езици"],
      bn: ["ভাষা", "নির্বাচিত ভাষা", "ভাষার তালিকা", "ভাষা পরিবর্তক"],
      bs: ["Jezik", "Odabrani jezik", "Lista jezika", "Prekidač jezika"],
      ca: [
        "Idioma",
        "Idioma seleccionat",
        "Llista d'idiomes",
        "Selector d'idiomes",
      ],
      co: [
        "Lingua",
        "Lingua selezziunata",
        "Lista di lingue",
        "Cambiadoru di lingua",
      ],
      cs: ["Jazyk", "Vybraný jazyk", "Seznam jazyků", "Přepínač jazyků"],
      cy: ["Iaith", "Iaith ddewiswyd", "Rhestr ieithoedd", "Newidydd iaith"],
      da: ["Sprog", "Valgt sprog", "Sprogliste", "Sprogskifter"],
      de: ["Sprache", "Ausgewählte Sprache", "Sprachliste", "Sprachumschalter"],
      el: [
        "Γλώσσα",
        "Επιλεγμένη γλώσσα",
        "Λίστα γλωσσών",
        "Μεταγωγέας γλώσσας",
      ],
      en: [
        "Language",
        "Language selected",
        "Language list",
        "Language Switcher",
      ],
      eo: ["Lingvo", "Elektita lingvo", "Lingvolisto", "Lingvoŝaltilo"],
      es: [
        "Idioma",
        "Idioma seleccionado",
        "Lista de idiomas",
        "Selector de idioma",
      ],
      et: ["Keel", "Valitud keel", "Keelte loend", "Keele vahetur"],
      eu: [
        "Hizkuntza",
        "Aukeratutako hizkuntza",
        "Hizkuntza zerrenda",
        "Hizkuntza aldagailua",
      ],
      fa: ["زبان", "زبان انتخاب شده", "فهرست زبان‌ها", "تغییردهنده زبان"],
      fi: ["Kieli", "Valittu kieli", "Kielilista", "Kielivalitsin"],
      fj: ["Vosa", "Vosa sa mai veisau", "Tikina ni vosa", "Vakavosa"],
      fl: ["Wika", "Napiling wika", "Listahan ng wika", "Tagapili ng wika"],
      fr: [
        "Langue",
        "Langue sélectionnée",
        "Liste des langues",
        "Sélecteur de langue",
      ],
      fy: ["Taal", "Taal selektearre", "Taallist", "Taalwisseler"],
      ga: ["Teanga", "Teanga roghnaithe", "Liosta teangacha", "Athraí teanga"],
      gd: ["Cànan", "Cànan taghte", "Liosta chànanan", "Atharraichear cànan"],
      gu: ["ભાષા", "પસંદ કરેલી ભાષા", "ભાષાઓની સૂચી", "ભાષા સ્વીચર"],
      ha: [
        "Harshe",
        "Harshen da aka zaɓa",
        "Jerin harsuna",
        "Mai canza harshe",
      ],
      he: ["שפה", "שפה נבחרה", "רשימת שפות", "מחליף שפה"],
      hi: ["भाषा", "चयनित भाषा", "भाषा सूची", "भाषा स्विचर"],
      hr: ["Jezik", "Odabrani jezik", "Popis jezika", "Prekidač jezika"],
      ht: ["Lang", "Lang chwazi", "Lis lang", "Chanjè lang"],
      hu: ["Nyelv", "Kiválasztott nyelv", "Nyelvlista", "Nyelvválasztó"],
      hw: [
        "ʻŌlelo",
        "ʻŌlelo i koho ʻia",
        "Papa inoa ʻōlelo",
        "Mea hoʻololi ʻōlelo",
      ],
      hy: ["Լեզու", "Ընտրված լեզու", "Լեզուների ցանկ", "Լեզվի փոխարկիչ"],
      id: [
        "Bahasa",
        "Bahasa yang dipilih",
        "Daftar bahasa",
        "Pengganti bahasa",
      ],
      ig: [
        "Asụsụ",
        "Asụsụ ahọpụtara",
        "Ndepụta asụsụ",
        "Onye na-agbanwe asụsụ",
      ],
      is: ["Tungumál", "Valið tungumál", "Tungumálalisti", "Tungumálaskiptir"],
      it: [
        "Lingua",
        "Lingua selezionata",
        "Elenco lingue",
        "Selettore di lingua",
      ],
      ja: ["言語", "選択された言語", "言語リスト", "言語切替"],
      jv: ["Basa", "Basa sing dipilih", "Daftar basa", "Pangganti basa"],
      ka: ["ენა", "არჩეული ენა", "ენების სია", "ენის შემრჩევი"],
      kk: ["Тіл", "Таңдалған тіл", "Тілдер тізімі", "Тіл ауыстырғышы"],
      km: ["ភាសា", "ភាសាដែលបានជ្រើស", "បញ្ជីភាសា", "ឧបករណ៍ប្តូរភាសា"],
      kn: ["ಭಾಷೆ", "ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆ", "ಭಾಷೆಗಳ ಪಟ್ಟಿ", "ಭಾಷಾ ಬದಲಾಯಿಸುವಿಕೆ"],
      ko: ["언어", "선택된 언어", "언어 목록", "언어 전환기"],
      ku: ["Ziman", "Zimanê hilbijartî", "Lîsteya zimanan", "Gûherênerê ziman"],
      ky: ["Тил", "Тандалган тил", "Тилдер тизмеси", "Тил алмаштыргыч"],
      la: ["Lingua", "Lingua selecta", "Index linguarum", "Linguae commutator"],
      lb: [
        "Sprooch",
        "Ausgewielte Sprooch",
        "Sproochleischt",
        "Sproochwiessel",
      ],
      lo: ["ພາສາ", "ພາສາທີ່ເລືອກ", "ລາຍການພາສາ", "ຕົວປ່ຽນພາສາ"],
      lt: ["Kalba", "Pasirinkta kalba", "Kalbų sąrašas", "Kalbų perjungiklis"],
      lv: ["Valoda", "Izvēlētā valoda", "Valodu saraksts", "Valodu pārslēdzis"],
      lg: [
        "Lulimi",
        "Lulimi oludde",
        "Olukalala lw'ennimi",
        "Okyusindika olulimi",
      ],
      mg: ["Fiteny", "Fiteny voafidy", "Lisitry ny fiteny", "Mpanova fiteny"],
      mi: ["Reo", "Reo kua whiriwhiria", "Rārangi reo", "Kaiwhakawhiti reo"],
      mk: ["Јазик", "Избран јазик", "Список на јазици", "Префрлувач на јазици"],
      ml: ["ഭാഷ", "തിരഞ്ഞെടുത്ത ഭാഷ", "ഭാഷകളുടെ പട്ടിക", "ഭാഷ മാറ്റുന്നത്"],
      mn: ["Хэл", "Сонгосон хэл", "Хэлний жагсаалт", "Хэл солигч"],
      mr: ["भाषा", "निवडलेली भाषा", "भाषा यादी", "भाषा स्विचर"],
      ms: ["Bahasa", "Bahasa yang dipilih", "Senarai bahasa", "Penukar bahasa"],
      mt: ["Lingwa", "Lingwa magħżula", "Lista ta' lingwi", "Bidla tal-lingwa"],
      my: [
        "ဘာသာစကား",
        "ရွေးချယ်ထားသော ဘာသာစကား",
        "ဘာသာစကားစာရင်း",
        "ဘာသာစကား ပြောင်းလဲသူ",
      ],
      ne: ["भाषा", "चयन गरिएको भाषा", "भाषा सूची", "भाषा स्विचर"],
      nl: ["Taal", "Geselecteerde taal", "Taallijst", "Taalwisselaar"],
      no: ["Språk", "Valgt språk", "Språkliste", "Språkvelger"],
      ny: [
        "Chiyankhulo",
        "Chiyankhulo chosankhidwa",
        "Mndandanda wa ziyankhulo",
        "Wosintha chiyankhulo",
      ],
      pa: ["ਭਾਸ਼ਾ", "ਚੁਣੀ ਗਈ ਭਾਸ਼ਾ", "ਭਾਸ਼ਾਵਾਂ ਦੀ ਸੂਚੀ", "ਭਾਸ਼ਾ ਸਵਿਚਰ"],
      pl: ["Język", "Wybrany język", "Lista języków", "Przełącznik języka"],
      ps: ["ژبه", "غوره شوې ژبه", "د ژبو لیست", "د ژبې بدلونکی"],
      pt: [
        "Idioma",
        "Idioma selecionado",
        "Lista de idiomas",
        "Selector de idioma",
      ],
      ro: ["Limbă", "Limbă selectată", "Listă de limbi", "Selector de limbă"],
      ru: ["Язык", "Выбранный язык", "Список языков", "Переключатель языка"],
      sd: ["ٻولي", "منتخب ٻولي", "ٻولين جي فهرست", "ٻولي بدلائيندڙ"],
      si: ["භාෂාව", "තෝරාගත් භාෂාව", "භාෂා ලැයිස්තුව", "භාෂා මාරු කරන්නා"],
      sk: ["Jazyk", "Vybraný jazyk", "Zoznam jazykov", "Prepínač jazykov"],
      sl: [
        "Jezik",
        "Izbrani jezik",
        "Seznam jezikov",
        "Preklapljalnik jezikov",
      ],
      sm: ["Gagana", "Gagana ua filifilia", "Lisi o gagana", "Suiga gagana"],
      sn: [
        "Mutauro",
        "Mutauro wakasarudzwa",
        "Rondedzero yemitauro",
        "Mushanduri wemutauro",
      ],
      so: ["Afka", "Afka la doortay", "Liiska afafka", "Beddelaha afka"],
      sq: [
        "Gjuha",
        "Gjuha e zgjedhur",
        "Lista e gjuhëve",
        "Ndryshuesi i gjuhës",
      ],
      sr: ["Језик", "Изабрани језик", "Списак језика", "Прекидач језика"],
      "sr-latn": [
        "Jezik",
        "Izabrani jezik",
        "Spisak jezika",
        "Prekidač jezika",
      ],
      st: ["Puo", "Puo e khethiloeng", "Lenane la lipuo", "Mofetoli oa puo"],
      su: ["Basa", "Basa anu dipilih", "Daptar basa", "Pangganti basa"],
      sv: ["Språk", "Valt språk", "Språklista", "Språkväljare"],
      sw: [
        "Lugha",
        "Lugha iliyochaguliwa",
        "Orodha ya lugha",
        "Kibadilisha lugha",
      ],
      ta: [
        "மொழி",
        "தேர்ந்தெடுக்கப்பட்ட மொழி",
        "மொழிகளின் பட்டியல்",
        "மொழி மாற்றி",
      ],
      te: ["భాష", "ఎంచుకున్న భాష", "భాషల జాబితా", "భాష మార్పిడి"],
      tg: [
        "Забон",
        "Забони интихобшуда",
        "Рӯйхати забонҳо",
        "Табдилдиҳандаи забон",
      ],
      th: ["ภาษา", "ภาษาที่เลือก", "รายการภาษา", "ตัวเปลี่ยนภาษา"],
      to: ["Lea", "Lea filifilia", "Lisi ʻo lea", "Fetongi lea"],
      tr: ["Dil", "Seçilen dil", "Dil listesi", "Dil değiştirici"],
      tt: ["Тел", "Сайланган тел", "Телләр исемлеге", "Тел алыштыргычы"],
      "zh-tw": ["語言", "已選擇的語言", "語言列表", "語言切換器"],
      ty: ["Reo", "Reo i māʻiri", "Tāʻiraʻa reo", "Fetuaʻa reo"],
      uk: ["Мова", "Вибрана мова", "Список мов", "Перемикач мови"],
      ur: ["زبان", "منتخب زبان", "زبانوں کی فہرست", "زبان تبدیل کنندہ"],
      uz: ["Til", "Tanlangan til", "Tillar ro'yxati", "Til o'zgartirgich"],
      vi: [
        "Ngôn ngữ",
        "Ngôn ngữ đã chọn",
        "Danh sách ngôn ngữ",
        "Bộ chuyển đổi ngôn ngữ",
      ],
      xh: [
        "Ulwimi",
        "Ulwimi olukhethiweyo",
        "Uluhlu lweelwimi",
        "Uguquli lolwimi",
      ],
      yi: [
        "שפּראַך",
        "אויסגעקליבענע שפּראַך",
        "שפּראַכן רשימה",
        "שפּראַך ווייכער",
      ],
      yo: ["Èdè", "Èdè tí a yàn", "Àtòjọ èdè", "Olùyípadà èdè"],
      zh: ["语言", "已选择的语言", "语言列表", "语言切换器"],
      zu: ["Ulimi", "Ulimi olukhethiwe", "Uhlu lwezilimi", "Isiguquli solimi"],
      hmn: ["Lus", "Lus xaiv", "Npe lus", "Kev hloov lus"],
      ceb: [
        "Pinulongan",
        "Piniling pinulongan",
        "Lista sa pinulongan",
        "Mangbalhin sa pinulongan",
      ],
      or: ["ଭାଷା", "ବଚିତ ଭାଷା", "ଭାଷା ତାଲିକା", "ଭାଷା ସ୍ୱିଚ୍"],
      tk: ["Dil", "Saýlanan dil", "Diller sanawy", "Dil üýtgediji"],
      ug: ["تىل", "تاللانغان تىل", "تىللار تىزىمى", "تىل ئالماشتۇرغۇچ"],
      as: ["ভাষা", "নিৰ্বাচিত ভাষা", "ভাষাৰ তালিকা", "ভাষা পৰিৱৰ্তনকাৰী"],
      om: ["Afaan", "Afaan filatame", "Gartuu afaanota", "Jijjiira afaanii"],
      iu: ["ᐅᖃᐅᓯᖅ", "ᐅᖃᐅᓯᖅ ᐊᑕᐅᓯᖅᑕᐅᓂᖓ", "ᐅᖃᐅᓯᖅ ᑎᑎᕋᐅᓯᖅ", "ᐅᖃᐅᓯᖅ ᐊᓕᓐᓂᐊᖅᑎ"],
      ti: ["ቋንቋ", "ተመርጸሉ ቋንቋ", "ዝርዝር ቋንቋ", "ምልዕዓል ቋንቋ"],
      bm: ["Kan", "Kan sɔrɔ", "Kanw ka tɔgɔ", "Kan furakɛla"],
      bo: [
        "སྐད་ཡིག",
        "གདམ་པ་བཏབ་པའི་སྐད་ཡིག",
        "སྐད་ཡིག་གི་ཐོ་ཡིག",
        "སྐད་ཡིག་བརྗེ་སྒྱུར་བྱེད་པ",
      ],
      ak: ["Kasa", "Kasa a wɔpaw", "Kasa ahorow", "Kasa akyerɛkyerɛfo"],
      rw: [
        "Ururimi",
        "Ururimi rwatoranywe",
        "Urutonde rw'indimi",
        "Guhindura ururimi",
      ],
      kb: ["زمان", "زمانی هەڵبژێردراو", "لیستی زمانەکان", "گۆڕەری زمان"],
      fo: ["Mál", "Valt mál", "Málalisti", "Málaskiftari"],
      il: [
        "Pagsasao",
        "Napili a pagsasao",
        "Listaan ti pagsasao",
        "Agbalbaliw ti pagsasao",
      ],
      ay: ["Aru", "Aru ajllïta", "Aru yati", "Aru mayjt'ayaña"],
      dv: [
        "ބަސް",
        "ޚިޔާރު ކުރެވި ބަސް",
        "ބަސްތަކުގެ ލިސްޓު",
        "ބަސް ބަދަލުކުރުން",
      ],
      ee: ["Gbe", "Gbe si wotsɔ", "Gbe ƒe xexlẽme", "Gbe fetɔ"],
      gn: ["Ñe'ẽ", "Ñe'ẽ poravopyre", "Ñe'ẽ rysýi", "Ñe'ẽ moambueha"],
      ln: [
        "Lokótá",
        "Lokótá ya kopónama",
        "Nkásá ya malokótá",
        "Mobongoli ya lokótá",
      ],
      qu: ["Rimay", "Akllasqa rimay", "Rimaykuna lista", "Rimay tikray"],
      ts: [
        "Ririmi",
        "Ririmi ro ngeletiwa",
        "Nhongoloko ya tirimi",
        "Muxanisi wa ririmi",
      ],
      oc: [
        "Lenga",
        "Lenga seleccionada",
        "Lista de lengas",
        "Cambiador de lenga",
      ],
      mh: ["Kajin", "Kajin eo kilej", "Kajin kōj", "Kajin jukjuk"],
      chk: ["Kapen", "Kapen e kilej", "Kapen kōj", "Kapen jukjuk"],
    };
  var Xa = {
      af: { name: "Afrikaans", flag: "za", rtl: !1 },
      am: { name: "አማርኛ", flag: "et", rtl: !1 },
      ar: { name: "العربية‏", flag: "sa", rtl: !0 },
      az: { name: "Azərbaycan dili", flag: "az", rtl: !1 },
      ba: { name: "башҡорт теле", flag: "ru", rtl: !1 },
      be: { name: "Беларуская", flag: "by", rtl: !1 },
      bg: { name: "Български", flag: "bg", rtl: !1 },
      bn: { name: "বাংলা", flag: "bd", rtl: !1 },
      "pt-br": { name: "Português Brasileiro", flag: "br", rtl: !1 },
      bs: { name: "Bosanski", flag: "ba", rtl: !1 },
      ca: { name: "Català", flag: "es-ct", rtl: !1 },
      co: { name: "Corsu", flag: "fr-co", rtl: !1 },
      cs: { name: "Čeština", flag: "cz", rtl: !1 },
      cy: { name: "Cymraeg", flag: "gb-wls", rtl: !1 },
      da: { name: "Dansk", flag: "dk", rtl: !1 },
      de: { name: "Deutsch", flag: "de", rtl: !1 },
      el: { name: "Ελληνικά", flag: "gr", rtl: !1 },
      en: { name: "English", flag: "gb", rtl: !1 },
      eo: { name: "Esperanto", flag: "eo", rtl: !1 },
      es: { name: "Español", flag: "es", rtl: !1 },
      et: { name: "Eesti", flag: "ee", rtl: !1 },
      eu: { name: "Euskara", flag: "es-pv", rtl: !1 },
      fa: { name: "فارسی", flag: "ir", rtl: !0 },
      fi: { name: "Suomi", flag: "fi", rtl: !1 },
      fj: { name: "Vosa Vakaviti", flag: "fj", rtl: !1 },
      fl: { name: "Filipino", flag: "ph", rtl: !1 },
      fr: { name: "Français", flag: "fr", rtl: !1 },
      fy: { name: "frysk", flag: "nl", rtl: !1 },
      ga: { name: "Gaeilge", flag: "ie", rtl: !1 },
      gd: { name: "Gàidhlig", flag: "gb-sct", rtl: !1 },
      gl: { name: "Galego", flag: "es-ga", rtl: !1 },
      gu: { name: "ગુજરાતી", flag: "in", rtl: !1 },
      ha: { name: "هَوُسَ", flag: "ne", rtl: !1 },
      he: { name: "עברית", flag: "il", rtl: !0 },
      hi: { name: "हिंदी", flag: "in", rtl: !1 },
      hr: { name: "Hrvatski", flag: "hr", rtl: !1 },
      ht: { name: "Kreyòl ayisyen", flag: "ht", rtl: !1 },
      hu: { name: "Magyar", flag: "hu", rtl: !1 },
      hw: { name: "‘Ōlelo Hawai‘i", flag: "hw", rtl: !1 },
      hy: { name: "հայերեն", flag: "am", rtl: !1 },
      id: { name: "Bahasa Indonesia", flag: "id", rtl: !1 },
      ig: { name: "Igbo", flag: "ne", rtl: !1 },
      is: { name: "Íslenska", flag: "is", rtl: !1 },
      it: { name: "Italiano", flag: "it", rtl: !1 },
      ja: { name: "日本語", flag: "jp", rtl: !1 },
      jv: { name: "Wong Jawa", flag: "id", rtl: !1 },
      ka: { name: "ქართული", flag: "ge", rtl: !1 },
      kk: { name: "Қазақша", flag: "kz", rtl: !1 },
      km: { name: "ភាសាខ្មែរ", flag: "kh", rtl: !1 },
      kn: { name: "ಕನ್ನಡ", flag: "in", rtl: !1 },
      ko: { name: "한국어", flag: "kr", rtl: !1 },
      ku: { name: "كوردی", flag: "iq", rtl: !0 },
      ky: { name: "кыргызча", flag: "kg", rtl: !1 },
      la: { name: "Latine", flag: "it", rtl: !1 },
      lb: { name: "Lëtzebuergesch", flag: "lu", rtl: !1 },
      lo: { name: "ພາສາລາວ", flag: "la", rtl: !1 },
      lt: { name: "Lietuvių", flag: "lt", rtl: !1 },
      lv: { name: "Latviešu", flag: "lv", rtl: !1 },
      lg: { name: "Oluganda", flag: "ug", rtl: !1 },
      mg: { name: "Malagasy", flag: "mg", rtl: !1 },
      mi: { name: "te reo Māori", flag: "nz", rtl: !1 },
      mk: { name: "Македонски", flag: "mk", rtl: !1 },
      ml: { name: "മലയാളം", flag: "in", rtl: !1 },
      mn: { name: "Монгол", flag: "mn", rtl: !1 },
      mr: { name: "मराठी", flag: "in", rtl: !1 },
      ms: { name: "Bahasa Melayu", flag: "my", rtl: !1 },
      mt: { name: "Malti", flag: "mt", rtl: !1 },
      my: { name: "မြန်မာစာ", flag: "mm", rtl: !1 },
      ne: { name: "नेपाली", flag: "np", rtl: !1 },
      nl: { name: "Nederlands", flag: "nl", rtl: !1 },
      no: { name: "Norsk", flag: "no", rtl: !1 },
      ny: { name: "chiCheŵa", flag: "mw", rtl: !1 },
      pa: { name: "ਪੰਜਾਬੀ", flag: "in", rtl: !1 },
      pl: { name: "Polski", flag: "pl", rtl: !1 },
      ps: { name: "پښتو", flag: "pk", rtl: !0 },
      pt: { name: "Português", flag: "pt", rtl: !1 },
      ro: { name: "Română", flag: "ro", rtl: !1 },
      ru: { name: "Русский", flag: "ru", rtl: !1 },
      sd: { name: '"سنڌي، سندھی, सिन्धी"', flag: "pk", rtl: !1 },
      si: { name: "සිංහල", flag: "lk", rtl: !1 },
      sk: { name: "Slovenčina", flag: "sk", rtl: !1 },
      sl: { name: "Slovenščina", flag: "si", rtl: !1 },
      sm: { name: '"gagana fa\'a Samoa"', flag: "ws", rtl: !1 },
      sn: { name: "chiShona", flag: "zw", rtl: !1 },
      so: { name: "Soomaaliga", flag: "so", rtl: !1 },
      sq: { name: "Shqip", flag: "al", rtl: !1 },
      sr: { name: "Српски", flag: "rs", rtl: !1 },
      st: { name: "seSotho", flag: "ng", rtl: !1 },
      su: { name: "Sundanese", flag: "sd", rtl: !1 },
      sv: { name: "Svenska", flag: "se", rtl: !1 },
      sw: { name: "Kiswahili", flag: "ke", rtl: !1 },
      ta: { name: "தமிழ்", flag: "in", rtl: !1 },
      te: { name: "తెలుగు", flag: "in", rtl: !1 },
      tg: { name: "Тоҷикӣ", flag: "tj", rtl: !1 },
      th: { name: "ภาษาไทย", flag: "th", rtl: !1 },
      tl: { name: "Tagalog", flag: "ph", rtl: !1 },
      to: { name: "faka-Tonga", flag: "to", rtl: !1 },
      tr: { name: "Türkçe", flag: "tr", rtl: !1 },
      tt: { name: "Tatar", flag: "tr", rtl: !1 },
      "zh-tw": { name: "中文 (繁體)", flag: "tw", rtl: !1 },
      ty: { name: '"te reo Tahiti, te reo Māʼohi"', flag: "pf", rtl: !1 },
      uk: { name: "Українська", flag: "ua", rtl: !1 },
      ur: { name: "اردو", flag: "pk", rtl: !0 },
      uz: { name: '"O\'zbek"', flag: "uz", rtl: !1 },
      vi: { name: "Tiếng Việt", flag: "vn", rtl: !1 },
      xh: { name: "isiXhosa", flag: "za", rtl: !1 },
      yi: { name: "ייִדיש", flag: "il", rtl: !1 },
      yo: { name: "Yorùbá", flag: "ng", rtl: !1 },
      zh: { name: "中文 (简体)", flag: "cn", rtl: !1 },
      zu: { name: "isiZulu", flag: "za", rtl: !1 },
      hmn: { name: "Hmoob", flag: "hmn", rtl: !1 },
      ceb: { name: "Sugbuanon", flag: "ph", rtl: !1 },
      or: { name: "ଓଡ଼ିଆ", flag: "in", rtl: !1 },
      tk: { name: "Türkmen", flag: "tr", rtl: !1 },
      ug: { name: "ئۇيغۇر", flag: "uig", rtl: !0 },
      "fr-ca": { name: "Français (Canada)", flag: "ca", rtl: !1 },
      as: { name: "অসমীয়া", flag: "in", rtl: !1 },
      "sr-latn": { name: "Srpski", flag: "rs", rtl: !1 },
      om: { name: "Afaan Oromoo", flag: "et", rtl: !1 },
      iu: { name: "ᐃᓄᒃᑎᑐᑦ", flag: "ca", rtl: !1 },
      ti: { name: "ቲግሪንያ", flag: "er", rtl: !1 },
      bm: { name: "Bamanankan", flag: "ml", rtl: !1 },
      bo: { name: "བོད་ཡིག", flag: "cn", rtl: !1 },
      ak: { name: "Baoulé", flag: "gh", rtl: !1 },
      rw: { name: "Kinyarwanda", flag: "rw", rtl: !1 },
      kb: { name: "سۆرانی", flag: "iq", rtl: !0 },
      fo: { name: "Føroyskt", flag: "fo", rtl: !1 },
      il: { name: "Ilokano", flag: "ph", rtl: !1 },
      ay: { name: "Aymara", flag: "bo", rtl: !1 },
      dv: { name: "ދިވެހި", flag: "mv", rtl: !0 },
      ee: { name: "Eʋegbe", flag: "gh", rtl: !1 },
      gn: { name: '"Avañe\'ẽ"', flag: "py", rtl: !1 },
      ln: { name: "Lingála", flag: "cd", rtl: !1 },
      qu: { name: "Runa Simi", flag: "pe", rtl: !1 },
      ts: { name: "Xitsonga", flag: "za", rtl: !1 },
      oc: { name: "Occitan", flag: "fr", rtl: !1 },
      nb: { name: "Norsk Bokmål", flag: "no", rtl: !1 },
      yue: { name: "粵語", flag: "hk", rtl: !1 },
      mh: { name: "Kajin M̧ajeļ", flag: "mh", rtl: !1 },
      chk: { name: "Chuuk", flag: "fm", rtl: !1 },
    },
    Ya = [
      { previous: "cb", new: "ceb" },
      { previous: "hm", new: "hmn" },
      { previous: "sa", new: "sr-latn" },
    ];
  function Za(e) {
    if (!e || !e.toLowerCase) return "Unknown";
    var t = Ya.find(function (t) {
      return t.previous === e;
    });
    t && (e = t.new);
    var n = e.toLowerCase(),
      r = le.languages.find(function (e) {
        var t = e.language_to,
          r = e.custom_code;
        return t === n || (r ? r.toLowerCase() === n : void 0);
      });
    return r && r.custom_local_name
      ? r.custom_local_name
      : r && r.custom_name
      ? r.custom_name
      : n === le.language_from && le.language_from_custom_name
      ? le.language_from_custom_name
      : Xa[n]
      ? Xa[n].name
      : "Unknown";
  }
  function Qa(e, t) {
    var n = Ya.find(function (t) {
      return t.previous === e;
    });
    return n && (e = n.new), t[e] ? t[e].flag : "";
  }
  function eo(e) {
    return (function (e, t, n) {
      if (!e || !e.toLowerCase) return "";
      if (t.language_from === e) return t.language_from_custom_flag || Qa(e, n);
      var r = e.toLowerCase(),
        a = t.languages.find(function (e) {
          var t = e.language_to,
            n = e.custom_code;
          return t === r || (n && n.toLowerCase() === r);
        });
      return a ? a.custom_flag || Qa(a.language_to, n) : "";
    })(e, le, Xa);
  }
  function to() {
    if (
      "WordPress" === le.technology_name &&
      le.injectedData &&
      !le.is_connect
    ) {
      var e = le.injectedData.current_language,
        t = le.languages.find(function (t) {
          return t.language_to === e;
        });
      return (t && t.custom_code) || e;
    }
    return (!le.switcher_editor && !le.visual_editor) ||
      (window.Weglot && window.Weglot.initialized)
      ? window.Weglot.getCurrentLang()
      : le.language_from;
  }
  function no(e, t, n) {
    return t < e ? e : t > n ? n : t;
  }
  function ro(e, t) {
    return t && 1 !== t ? Math.round(e * t * 100) / 100 : e;
  }
  var ao = 13,
    oo = 27,
    io = 38,
    so = 40,
    lo = 32;
  var uo = ["none", "shiny", "square", "circle", "rectangle_mat"];
  function co(e) {
    return e
      ? e.getBoundingClientRect()
      : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };
  }
  function fo() {
    var e = to(),
      t = Ja[e] || Ja[Ka[e]] || Ja.en;
    return {
      language: t[0],
      languageSelected: t[1],
      languageList: t[2],
      languageSwitcher: t[3],
    };
  }
  function go(e, t) {
    var n = window.innerWidth > 0 ? window.innerWidth : screen.width,
      r = t || 768;
    return "mobile" === e ? n <= r : n > r;
  }
  function po(e, t, n) {
    var r = na(!1),
      a = r[0],
      o = r[1],
      i = e.style;
    void 0 === i && (i = {});
    var s = e.colors;
    return (
      void 0 === s && (s = {}),
      ra(function () {
        var e = i.size_scale;
        if (e && 1 !== e) {
          var r,
            a,
            l,
            u =
              ((r = t({ style: i, colors: s })),
              (a = n),
              (l = r
                .map(function (e) {
                  var t = e.selector,
                    n = e.declarations;
                  return [
                    "aside.country-selector.weglot_switcher." + a + t + " {",
                    Object.keys(n)
                      .map(function (e) {
                        return (
                          "\t" +
                          e
                            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
                            .toLowerCase() +
                          ": " +
                          n[e] +
                          ";"
                        );
                      })
                      .join("\n"),
                    "}",
                  ].join("\n");
                })
                .join("\n\n")),
              !le.custom_css || le.switcher_gallery
                ? l
                : l + "\n\n" + le.custom_css);
          !(function (e, t) {
            if (e) {
              var n = document.querySelector("style#weglot-switcher-" + t);
              if (n) n.textContent = e;
              else if (document.head) {
                var r = document.createElement("style");
                (r.id = "weglot-switcher-" + t),
                  (r.textContent = e),
                  document.head.appendChild(r);
              }
            }
          })(u, n),
            o(!0);
        }
      }, []),
      a
    );
  }
  function ho(e) {
    var t = e.close_outside_click;
    void 0 === t && (t = !1);
    var n = e.open_hover;
    void 0 === n && (n = !1);
    var r = (function () {
        var e = na(to()),
          t = e[0],
          n = e[1];
        return (
          ra(function () {
            le.is_connect ||
              "WordPress" === le.technology_name ||
              le.switcher_editor ||
              le.visual_editor ||
              window.Weglot.on("languageChanged", function (e) {
                n(e);
              });
          }, []),
          [t, n]
        );
      })(),
      a = r[0],
      o = r[1],
      i = na(!1),
      s = i[0],
      l = i[1],
      u = (function (e) {
        var t = aa(null);
        return (
          ra(
            function () {
              if (e)
                return (
                  document.addEventListener("mousedown", n),
                  function () {
                    document.removeEventListener("mousedown", n);
                  }
                );
              function n(n) {
                t.current && !t.current.contains(n.target) && e();
              }
            },
            [t]
          ),
          t
        );
      })(t && !n && x),
      c = aa(null),
      d = gn().filter(function (e) {
        return e !== a;
      }),
      g = na(null),
      p = g[0],
      h = g[1],
      _ = na(!1),
      v = _[0],
      m = _[1],
      y = na(!1),
      w = y[0],
      b = y[1];
    function k() {
      var e = co(u.current),
        t = e.bottom;
      void 0 === t && (t = 0);
      var n = e.left;
      void 0 === n && (n = 0),
        b(t > window.innerHeight / 2),
        m(n > window.innerWidth / 2),
        l(!0);
    }
    function x() {
      l(!1), h(null);
    }
    function S() {
      return s ? x() : k();
    }
    function E(e) {
      var t;
      o(e),
        (t = e),
        "WordPress" === le.technology_name && le.injectedData && !le.is_connect
          ? Yt(t, function (e) {
              f(window.location.hostname)
                ? window.dispatchEvent(
                    new CustomEvent("veLanguageChangeUrl", {
                      detail: { targetUrl: e },
                    })
                  )
                : window.location.replace(e);
            })
          : window.Weglot.switchTo(t),
        l(!1);
    }
    return (
      ra(
        function () {
          p && c.current.scrollIntoView({ block: "center" });
        },
        [p]
      ),
      {
        open: s,
        opensUpward: w,
        opensLeftward: v,
        language: a,
        otherLanguages: d,
        focusedLanguage: p,
        switcherContainerRef: u,
        focusedLanguageRef: c,
        handleMouseEnter: function () {
          n && k();
        },
        handleMouseLeave: function () {
          n && x();
        },
        handleKeyDown: function (e) {
          return e.keyCode === lo || e.keyCode === ao
            ? (e.preventDefault(), p && E(p), S())
            : e.keyCode === so || e.keyCode === io
            ? (e.preventDefault(),
              void (function (e) {
                var t = e === so ? "down" : "up",
                  n = d.slice(-1).pop(),
                  r = d[0],
                  a = co(u.current),
                  o = a.bottom;
                void 0 === o && (o = 0);
                var i = o > window.innerHeight / 2;
                if (!p || !s) {
                  return (
                    h("down" === t ? r : n),
                    void (
                      !s &&
                      (("up" === t && i) || ("down" === t && !i)) &&
                      k()
                    )
                  );
                }
                if (
                  (!i && "up" === t && p === r) ||
                  (i && "down" === t && p === n)
                )
                  return void S();
                var l = "up" === t ? -1 : 1,
                  c = d.indexOf(p) + l;
                if (c === d.length || -1 === c) return;
                h(d[c]);
              })(e.keyCode))
            : void (e.keyCode === oo && s && (e.preventDefault(), S()));
        },
        switchLanguage: E,
        toggleOpen: S,
      }
    );
  }
  var _o = qa("div")(function () {
      return { display: "flex", justifyContent: "center" };
    }),
    vo = qa("a")(function () {
      return {
        padding: 0,
        height: "auto",
        zIndex: 2,
        display: "block",
        textDecoration: "none",
      };
    }),
    mo = function (e) {
      var t = e.style,
        n = t && !t.full_name && !t.with_flags && !t.with_name;
      if (
        !(
          1 === le.category &&
          5 !== le.technology_id &&
          2 !== le.technology_id &&
          "WordPress" !== le.technology_name &&
          !n &&
          !le.hide_switcher_watermark
        )
      )
        return null;
      var r =
        le.switcher_editor || le.visual_editor
          ? void 0
          : "https://www.weglot.com/?utm_source=free_switcher";
      return mr(
        _o,
        { className: "wg-switcher-watermark" },
        mr(
          vo,
          { href: r, rel: "noreferrer", target: "_blank" },
          "by ",
          mr("strong", null, "Weglot")
        )
      );
    },
    yo = {
      rectangle_mat: { width: 30, height: 20 },
      shiny: { width: 30, height: 20 },
      circle: { width: 24, height: 24 },
      square: { width: 24, height: 24 },
    },
    wo = function (e) {
      var t = e.language,
        n = e.flagType;
      void 0 === n && (n = "circle");
      var r = e.size_scale,
        a = eo(t),
        o = yo[n] || {},
        i = o.width,
        s = o.height;
      if (a)
        return mr("img", {
          src:
            a.indexOf("http") > -1
              ? a
              : "https://cdn.weglot.com/flags/" + n + "/" + a + ".svg",
          width: ro(i, r),
          height: ro(s, r),
          className: "wg-flag",
          role: "presentation",
          alt: "",
        });
    },
    bo = function (e) {
      var t = e.styleOpts,
        n = e.language,
        r = e.onClick,
        a = e.legacyFlags,
        o = e.open;
      void 0 === o && (o = !1);
      var i = e.url,
        s = e.focusedLanguage,
        l = e.isSelected;
      void 0 === l && (l = !1);
      var u = e.focusRef;
      void 0 === u && (u = null);
      var c = t.with_name;
      void 0 === c && (c = !0);
      var d = t.full_name;
      void 0 === d && (d = !0);
      var f = t.with_flags,
        g = t.size_scale,
        p = t.flag_type,
        h = fo(),
        _ = !!s && n === s,
        v = d ? Za(n) : n.toUpperCase(),
        m = l ? "div" : "li",
        y = uo.indexOf(p || "rectangle_mat"),
        w = f ? " wg-flags" + (a ? " flag-" + y + " legacy" : "") : "",
        b = _ && !l ? " focus" : "",
        k = l ? " wgcurrent" : "";
      return mr(
        m,
        Object.assign(
          {},
          {
            "data-l": n,
            onClick: function (e) {
              return (function (e, t) {
                e.preventDefault(), r(t);
              })(e, n);
            },
            tabIndex: 0,
            className: "wg-li " + n + k + w + b,
          },
          l
            ? {
                role: "combobox",
                "aria-activedescendant": s ? "weglot-language-" + s : "",
                "aria-label": h.languageSwitcher,
                "aria-expanded": o,
                "aria-controls": "weglot-listbox",
              }
            : { role: "option", id: "wg-" + n }
        ),
        mr(
          "a",
          Object.assign(
            {},
            l && { target: "_self" },
            { href: i },
            !c && { "aria-label": v },
            _ && !l && { ref: u },
            { id: "weglot-language-" + n, lang: n, tabIndex: -1 }
          ),
          f && !a && mr(wo, { language: n, flagType: p, size_scale: g }),
          c && v
        )
      );
    };
  function ko(e) {
    var t = e.style.size_scale,
      n = function (e) {
        return ro(e, t);
      };
    return [
      {
        selector: ".wg-drop ul",
        declarations: { top: n(38) + "px", bottom: "auto" },
      },
      {
        selector: " .wg-switcher-watermark a",
        declarations: { fontSize: n(14) + "px", color: "black" },
      },
      {
        selector: " .wg-switcher-watermark a:hover",
        declarations: { color: "#0077b3" },
      },
      {
        selector: ".wg-drop.weg-openup ul",
        declarations: { bottom: n(38) + "px", top: "auto" },
      },
      { selector: " a", declarations: { fontSize: n(13) + "px" } },
      {
        selector: ".wg-drop a img.wg-flag",
        declarations: { height: n(30) + "px" },
      },
      {
        selector: ".wg-drop .wg-li.wgcurrent",
        declarations: {
          height: n(38) + "px",
          display: "flex",
          alignItems: "center",
        },
      },
      { selector: ".wg-drop a", declarations: { height: n(38) + "px" } },
      {
        selector: " .wgcurrent:after",
        declarations: { height: n(38) + "px", backgroundSize: n(9) + "px" },
      },
      {
        selector: ".wg-drop .wgcurrent a",
        declarations: {
          paddingRight: no(22, n(40), 40) + "px",
          paddingLeft: no(5, n(10), 10) + "px",
        },
      },
    ];
  }
  var xo,
    So,
    Eo,
    Lo = "default",
    Co = (function (e, t) {
      return function (n) {
        var r = n || {},
          a = r.style;
        void 0 === a && (a = {});
        var o = r.opts;
        void 0 === o && (o = {});
        var i = r.colors;
        void 0 === i && (i = {});
        var s = Va(t),
          l = s.style,
          u = s.opts,
          c = s.colors,
          d = document.createElement("div");
        !(function (e, t) {
          var n, r, a;
          t == document && (t = document.documentElement),
            tr.__ && tr.__(e, t),
            (n = t.__k),
            (r = []),
            (a = []),
            Rr(
              t,
              (e = t.__k = mr(wr, null, [e])),
              n || fr,
              fr,
              t.namespaceURI,
              n ? null : t.firstChild ? er.call(t.childNodes) : null,
              r,
              n ? n.__e : t.firstChild,
              !1,
              a
            ),
            Ir(r, e, a);
        })(
          mr(
            Fa,
            { logger: Ga.error, displayError: !1 },
            mr(e, {
              style: Object.assign({}, l, a),
              opts: Object.assign({}, u, o),
              colors: Object.assign({}, c, i),
            })
          ),
          d
        ),
          d.classList.add("weglot-container"),
          window.Weglot || (window.Weglot = {}),
          window.Weglot.switcherId || (window.Weglot.switcherId = 1);
        var f = String(window.Weglot.switcherId++);
        return (
          d.setAttribute("data-switcher-id", f),
          (d.id = "weglot-switcher-" + f),
          d
        );
      };
    })(function (e) {
      var t = e.style,
        n = e.opts,
        r = ho(n),
        a = r.open,
        o = r.opensUpward,
        i = r.opensLeftward,
        s = r.language,
        l = r.focusedLanguage,
        u = r.switcherContainerRef,
        c = r.focusedLanguageRef,
        d = r.handleMouseEnter,
        f = r.handleMouseLeave,
        g = r.handleKeyDown,
        p = r.switchLanguage,
        h = r.toggleOpen,
        _ = (function () {
          var e = gn(),
            t = na(
              e.reduce(function (e, t) {
                var n;
                return Object.assign({}, e, (((n = {})[t] = ""), n));
              }, {})
            ),
            n = t[0],
            r = t[1];
          return (
            ra(function () {
              Promise.all(
                e.map(function (e) {
                  return new Promise(function (t) {
                    return Yt(e, function (n) {
                      return t({ l: e, url: n });
                    });
                  });
                })
              ).then(function (e) {
                return r(
                  e.reduce(function (e, t) {
                    var n,
                      r = t.l,
                      a = t.url;
                    return Object.assign({}, e, (((n = {})[r] = a), n));
                  }, {})
                );
              });
            }, []),
            n
          );
        })(),
        v = (function (e) {
          var t = e.is_responsive,
            n = e.display_device,
            r = e.pixel_cutoff,
            a = na(!t || go(n, r)),
            o = a[0],
            i = a[1],
            s = function () {
              return i(go(n, r));
            };
          return (
            ra(
              function () {
                if (t)
                  return (
                    window.addEventListener("resize", s),
                    function () {
                      window.removeEventListener("resize", s);
                    }
                  );
              },
              [t, n, r]
            ),
            o
          );
        })(n);
      po({ style: t }, ko, Lo);
      var m = aa(null),
        y = na(0),
        w = y[0],
        b = y[1];
      ra(
        function () {
          m && a && b(m.current.offsetWidth);
        },
        [a, m]
      );
      var k = t.is_dropdown,
        x = t.invert_flags,
        S = fo(),
        E = k || x,
        L = !k && n.hide_selected_language,
        C = gn().filter(function (e) {
          return (!E && !L) || e !== s;
        }),
        O =
          /background-position/i.test(le.custom_css) &&
          !le.languages.some(function (e) {
            return e.custom_flag;
          }),
        T = (function () {
          for (
            var e, t, n = arguments, r = 0, a = "", o = arguments.length;
            r < o;
            r++
          )
            (e = n[r]) && (t = Ur(e)) && (a && (a += " "), (a += t));
          return a;
        })({
          open: a,
          closed: !a,
          "wg-drop": k,
          "wg-list": !k,
          "weg-openup": o && a,
          "weg-openleft": i && a,
        });
      return v
        ? mr(
            "aside",
            {
              ref: u,
              "data-wg-notranslate": !0,
              style: a &&
                u &&
                u.current &&
                u.current.offsetWidth < w && { width: w },
              onKeyDown: g,
              onMouseEnter: d,
              onMouseLeave: f,
              className: "weglot_switcher country-selector " + Lo + " " + T,
              "aria-label": S.languageSelected + ": " + Za(s),
            },
            E &&
              !L &&
              mr(bo, {
                styleOpts: t,
                open: a,
                focusedLanguage: l,
                language: s,
                isSelected: !0,
                onClick: h,
                legacyFlags: O,
                url: "#",
              }),
            mr(
              "ul",
              {
                ref: m,
                role: "listbox",
                id: "weglot-listbox",
                "aria-label": S.languageList,
                style: !a && t.is_dropdown && { display: "none" },
              },
              C.map(function (e) {
                return mr(bo, {
                  language: e,
                  url: e === s ? "#" : _[e],
                  onClick: p,
                  isSelected: e === s,
                  focusedLanguage: l,
                  key: "wg-" + e,
                  focusRef: c,
                  styleOpts: t,
                  legacyFlags: O,
                });
              }),
              mr(mo, { style: t })
            )
          )
        : mr(wr, null);
    }, Lo);
  var Oo = [];
  function To() {
    if (le.hide_switcher) return !1;
    if (xo) return !0;
    if (window.Weglot && window.Weglot.switchers)
      for (
        var e = 0, t = Object.keys(window.Weglot.switchers);
        e < t.length;
        e += 1
      ) {
        var n = t[e];
        if (window.Weglot.switchers[n].ready) return !0;
      }
    return !1;
  }
  function No(e, t) {
    if ((void 0 === t && (t = document.documentElement), e && !e.ready)) {
      var n = e.style || le.button_style,
        r = e.location;
      void 0 === r && (r = {});
      var a = (function (e, t) {
          void 0 === e && (e = {});
          var n = e.target,
            r = e.sibling;
          if (!n) return { defaultPosition: !0 };
          var a = dt(t, n);
          if (!a.length)
            return {
              error: yt(n)
                ? "The provided target is not on this page."
                : "The provided target is not a valid CSS selector.",
            };
          var o = dt(t, r);
          if (!r || !o.length) return { targetNode: a[0], siblingNode: null };
          var i = Array.from(a),
            s = Array.from(o),
            l = null,
            u = s.find(function (e) {
              return (
                (l = i.find(function (t) {
                  return e.parentNode === t;
                })),
                !!l
              );
            });
          return u && l
            ? { targetNode: l, siblingNode: u }
            : {
                error:
                  "The provided sibling selector does not belong to target element.",
              };
        })(r, t),
        o = a.error,
        i = a.targetNode,
        l = a.siblingNode,
        u = a.defaultPosition;
      if (!o) {
        var c = Co(Object.assign({}, e, { style: n }));
        if (((c.weglotSwitcher = e), Oo.push(c), u))
          return (
            c.classList.add("wg-default"),
            document.body.appendChild(c),
            (e.ready = !0),
            c
          );
        c.setAttribute("data-switcher-style-opt", JSON.stringify(n)),
          i.insertBefore(c, l),
          (e.ready = !0);
        for (
          var d = 0, f = t.querySelectorAll(".weglot-container:empty");
          d < f.length;
          d += 1
        ) {
          s(f[d]);
        }
        return c;
      }
      se.warn(o, { sendToDatadog: !1 });
    }
  }
  function jo() {
    Oo.forEach(function (e) {
      return e.parentNode && e.parentNode.removeChild(e);
    }),
      Oo.splice(0),
      Eo && (clearTimeout(Eo), (Eo = null)),
      (function () {
        for (
          var e = window.Weglot.switchers || {}, t = 0, n = Object.keys(e);
          t < n.length;
          t += 1
        ) {
          e[n[t]].removeSwitchers();
        }
      })(),
      (xo = null),
      (So = null),
      (le.button_style.ready = !1),
      le.switchers.map(function (e) {
        return (e.ready = !1);
      });
  }
  function Ao() {
    xo || st("switchersReady", Wt()),
      (xo = !0),
      clearTimeout(Eo),
      So && So.parentNode.removeChild(So);
  }
  function Ro(e) {
    if (
      (void 0 === e && (e = document),
      !(
        gn().length < 2 ||
        le.hide_switcher ||
        le.visual_editor ||
        le.switcher_editor
      ))
    ) {
      var t = e.isConnected ? e : document;
      zi(t) && Ao();
      var n = t.querySelectorAll(
        "#weglot_here:not(.weglot-container),.weglot_here:not(.weglot-container)"
      );
      if (n.length) {
        for (var r = 0, a = n; r < a.length; r += 1) {
          var o = a[r],
            i = Co({ style: le.button_style });
          i.classList.add("weglot_here"), o.parentNode.insertBefore(i, o), s(o);
        }
        Ao();
      }
      for (
        var l = function () {
            var e = c[u];
            if (!e.default) {
              var n = e.template;
              n && "default" !== n.name
                ? n.name &&
                  (function (e, t) {
                    var n = e.name,
                      r = e.hash,
                      a = e.integrity;
                    if (!n) return Promise.resolve(!1);
                    if (
                      (function (e, t) {
                        try {
                          return e.querySelector(t);
                        } catch (e) {
                          return null;
                        }
                      })(
                        document.documentElement,
                        "script#weglot-switcher-" + n
                      )
                    )
                      return Promise.resolve(!1);
                    var o = t.switcher_editor,
                      i = t.visual_editor,
                      s = t.use_template_integrity;
                    return new Promise(function (e, l) {
                      var u =
                          !(null == t ? void 0 : t.switcher_editor) && r
                            ? n + "." + r
                            : n,
                        c =
                          document.getElementsByTagName("head")[0] ||
                          document.documentElement,
                        d = document.createElement("script");
                      (d.type = "text/javascript"),
                        (d.src =
                          "https://cdn.weglot.com/switchers/" + u + ".min.js"),
                        (d.id = "weglot-switcher-" + n),
                        s &&
                          !o &&
                          !i &&
                          a &&
                          ((d.integrity = a), (d.crossOrigin = "anonymous")),
                        (d.onload = function () {
                          return e(!0);
                        }),
                        (d.onerror = function () {
                          return l(new Error("Failed to load template: " + n));
                        }),
                        c.insertBefore(d, c.firstChild),
                        o || i || e(!0);
                    });
                  })(n, le)
                    .then(function (e) {
                      if (!e) {
                        var r =
                          window.Weglot.switchers &&
                          window.Weglot.switchers[n.name];
                        r && r.addSwitchers(t);
                      }
                      Ao();
                    })
                    .catch(function () {
                      Ao();
                    })
                : No(e, t) && Ao();
            }
          },
          u = 0,
          c = le.switchers;
        u < c.length;
        u += 1
      )
        l();
      if (!xo && !So) {
        var d = le.switchers.find(function (e) {
          return e.default;
        }) || { style: le.button_style };
        Eo = setTimeout(function () {
          (So = No(d)), st("switchersReady", Wt());
        });
      }
    }
  }
  it(
    "onCurrentLocationChanged",
    function () {
      jo(), Ro();
    },
    !0
  );
  var Po = 0;
  function Io() {
    var e = ["name", "value"];
    le.translate_event.forEach(function (t) {
      for (
        var n = dt(document.body, t.selector),
          r = function () {
            var n = o[a];
            if (n.alreadyListeningEventInput)
              return (
                !n.alreadyListeningEventInput.isConnected &&
                  Po < 10 &&
                  (Po++,
                  n.parentNode.insertBefore(
                    n.alreadyListeningEventInput,
                    n.nextSibling
                  )),
                {}
              );
            var r = n.cloneNode(!0);
            if (!r) return {};
            (r.name = ""),
              (n.alreadyListeningEventInput = r),
              n.parentNode.insertBefore(r, n.nextSibling),
              (n.style.display = "none"),
              new MutationObserver(function (t) {
                for (var a = 0, o = t; a < o.length; a += 1) {
                  var i = o[a],
                    s = n.getAttribute(i.attributeName);
                  e.includes(i.attributeName) &&
                    r.setAttribute(i.attributeName, s);
                }
              }).observe(n, { attributes: !0 });
            var i = bt(function (e) {
              13 === e.keyCode && e.target.form
                ? e.target.form.dispatchEvent(new Event("submit"))
                : Dn(e.target.value, function (e) {
                    Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      "value"
                    ).set.call(n, e);
                    var r =
                        t.eventName ||
                        n.getAttribute("data-wg-translate-event"),
                      a = document.createEvent("HTMLEvents");
                    a.initEvent("focus", !0, !1),
                      n.dispatchEvent(a),
                      a.initEvent(r, !0, !1),
                      n.dispatchEvent(a);
                  });
            }, 400);
            r.addEventListener("keydown", i);
          },
          a = 0,
          o = n;
        a < o.length;
        a += 1
      ) {
        var i = r();
        if (i) return i.v;
      }
    });
  }
  try {
    var Do = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (e) {
      var t = Do.call(this, e);
      return Mo([this]), t;
    };
  } catch (mr) {}
  function Mo(e) {
    if (le.translate_shadow_roots && e)
      for (var t = 0, n = e; t < n.length; t += 1) {
        var r = n[t];
        if (r.shadowRoot && !r.shadowRoot.wgTranslated) {
          (r.shadowRoot.wgTranslated = !0), Go(r.shadowRoot);
          var a = Bn(r.shadowRoot);
          a.length &&
            (Vn(a),
            Yo(
              a.filter(function (e) {
                return Ko(e);
              })
            ));
        }
      }
  }
  var Wo,
    zo = null,
    qo = [],
    Uo = [Fe, "class", "id"],
    Fo = [],
    Ho = [];
  function Bo(e, t) {
    Wo && clearTimeout(Wo);
    for (var n = 0, r = t; n < r.length; n += 1) {
      var a = r[n];
      1 === a.nodeType && qo.push(a);
    }
    qo.length &&
      (Wo = setTimeout(function () {
        Ro(e),
          Io(),
          le.is_connect &&
            (function (e) {
              if (Wt() === le.language_from) return;
              for (var t = 0, n = e; t < n.length; t += 1) {
                var r = n[t],
                  a = Array.from(dt(r, "a[href]"));
                "A" === r.tagName && r.href && a.push(r);
                for (
                  var o = function () {
                      var e = s[i],
                        t = e.getAttribute("href");
                      if (
                        t &&
                        "#" !== t &&
                        !t.startsWith("blob:") &&
                        !E(e) &&
                        !e.hasAttribute("hreflang") &&
                        (!le.subdirectory ||
                          /^\/(?:[^/]|$)/.test(t) ||
                          t.includes("//" + le.host)) &&
                        (le.subdirectory || t.includes("//" + le.host))
                      ) {
                        var n = t.split("//" + le.host)[1];
                        void 0 === n && (n = "/"),
                          fn(void 0, n) ||
                            $t(function (n) {
                              var r = Xt(Wt(), n, t);
                              r !== t && e.setAttribute("href", r);
                            });
                      }
                    },
                    i = 0,
                    s = a;
                  i < s.length;
                  i += 1
                )
                  o();
              }
            })(qo),
          le.proxify_iframes &&
            le.proxify_iframes.length &&
            qo.forEach(function (e) {
              return Yn({ node: e });
            }),
          Mo(qo),
          Tt("onDynamicDetected"),
          (qo = []);
      }, 100));
  }
  function $o(e, t) {
    var n = le.dynamics,
      r = Ko;
    t !== document && !l(t)
      ? (r = function () {
          return !0;
        })
      : n && 0 !== n.length
      ? le.disable_dynamics_on_browser_translation &&
        document.documentElement &&
        document.documentElement.lang &&
        !document.documentElement.lang
          .toLowerCase()
          .includes(Wt().toLowerCase()) &&
        (r = function () {
          return !1;
        })
      : (r = function () {
          return !1;
        });
    try {
      if (fn()) return;
      if (
        ((e = (function (e, t) {
          var n = [],
            r = e.filter(function (e) {
              var r = e.addedNodes,
                a = e.type,
                o = e.target;
              F(o),
                "attributes" === a &&
                  (zi(o),
                  (function (e) {
                    "IMG" === e.nodeName &&
                      e.srcset &&
                      e.dataset.wgtranslated &&
                      (e.setAttribute("wgsrcset", e.srcset), (e.srcset = ""));
                  })(o));
              var i = (function (e) {
                do {
                  if (e.weglot && e.weglot.isSet) return e;
                  e = e.parentElement || e.parentNode;
                } while (e);
              })(o);
              return i
                ? (n.push(i), !1)
                : r && r.length
                ? (setTimeout(function () {
                    return Bo(o, r);
                  }),
                  !zo || !o || !gt(o, zo))
                : !Uo.includes(e.attributeName) &&
                  t(o) &&
                  ("characterData" === a || "attributes" === a);
            });
          if (n.length)
            for (var a = 0, o = n; a < o.length; a += 1) {
              o[a].weglot.isSet = !1;
            }
          return r;
        })(e, r)),
        !n || 0 === n.length)
      )
        return;
      if (e.length)
        try {
          !(function (e, t, n) {
            void 0 === n && (n = !0);
            for (
              var r = [],
                a = function (e) {
                  var n = e.outerHTML || e.textContent;
                  if (e.wgSetHTML !== n && Jo(e)) {
                    for (
                      var a = Bn(e, function (e) {
                          var n = e.element;
                          return (
                            !(function (e) {
                              if (e.weglot && e.weglot.dynamic > 20) {
                                if (e.wgBypassDynamicLimit) return !1;
                                if (le.dangerously_bypass_dynamic_limit) {
                                  var t = e.closest ? e : e.parentNode;
                                  if (
                                    gt(t, le.dangerously_bypass_dynamic_limit)
                                  )
                                    return (e.wgBypassDynamicLimit = !0), !1;
                                }
                                return !0;
                              }
                              return !1;
                            })(n) && t(n)
                          );
                        }),
                        o = 0,
                        i = a;
                      o < i.length;
                      o += 1
                    ) {
                      var s = i[o];
                      (le.ignoreDynamicFragments &&
                        !document.body.contains(s)) ||
                        (s.weglot.dynamic || (s.weglot.dynamic = 0),
                        s.weglot.dynamic++,
                        r.push(s));
                    }
                    return null;
                  }
                },
                o = [],
                i = 0,
                s = e;
              i < s.length;
              i += 1
            ) {
              var l = s[i],
                u = l.type,
                c = l.target,
                d = l.addedNodes;
              switch (u) {
                case "attributes":
                case "characterData":
                  if (o.includes(c)) break;
                  o.push(c), a(c);
                  break;
                case "childList":
                  var f = d.length > 1 ? c : d[0];
                  if (o.includes(f)) break;
                  if ((a(f), o.push(f), !n)) break;
                  for (var g = 0, p = d; g < p.length; g += 1) {
                    var h = p[g],
                      _ = [];
                    "IFRAME" === h.tagName
                      ? (_ = [h])
                      : h.querySelectorAll &&
                        (_ = h.querySelectorAll("iframe"));
                    for (var v = 0; v < _.length; v++) {
                      var m = _[v];
                      t(m) &&
                        kt(m) &&
                        !E(m) &&
                        (a(m.contentWindow.document),
                        Go(m.contentWindow.document));
                    }
                  }
              }
            }
            r.length && (Vn(r), Yo(r));
          })(e, r);
        } catch (e) {
          se.warn(e);
        }
    } catch (e) {
      se.warn(e, { consoleOverride: "Error in MutationObserver" });
    }
  }
  var Vo = !1;
  function Go(e) {
    var t = e !== document ? e : e.body || e,
      n = new MutationObserver(function (t) {
        var n;
        if (Vo) $o(t, e);
        else {
          var r = Fo.find(function (t) {
            return t.observedDocument === e;
          });
          r
            ? (n = r.mutations).push.apply(n, t)
            : Fo.push({ observedDocument: e, mutations: [].concat(t) });
        }
      });
    n.observe(t, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      attributes: !0,
    }),
      Ho.push(n);
  }
  function Ko(e) {
    if (!le.dynamics || 0 === le.dynamics.length || !e) return !1;
    if (!e.closest) return Ko(e.parentNode);
    var t = !!gt(
      e,
      le.dynamics
        .map(function (e) {
          return e.value;
        })
        .join(", ")
    );
    return !t && e.getRootNode && e.getRootNode().host
      ? Ko(e.getRootNode().host)
      : t;
  }
  function Jo(e) {
    var t = le.dynamics
      .concat(le.excluded_blocks)
      .map(function (e) {
        return e.value;
      })
      .join(",");
    return e.getRootNode && e.getRootNode() && e.getRootNode().host
      ? Jo(e.getRootNode().host)
      : (e.closest || (e = e.parentNode), gt(e, t) || O(e, t) || ft(e, t));
  }
  var Xo = { times: [], timeout: null, nodes: [] };
  function Yo(e) {
    void 0 === e && (e = []), clearTimeout(Xo.timeout);
    var t = function (e) {
        if ((e && !e.closest && (e = e.parentNode), !e)) return "unknown";
        for (var n = 0, r = le.dynamics; n < r.length; n += 1) {
          var a = r[n];
          if (gt(e, a.value)) return a.value;
        }
        return e.getRootNode && e.getRootNode() && e.getRootNode().host
          ? t(e.getRootNode().host)
          : "unknown";
      },
      n = Wt();
    if (n !== le.language_from) {
      if (
        ((Xo.times = Xo.times.filter(function (e) {
          return e > Date.now() - 1e3;
        })),
        Xo.times.length && (Xo.timeout || Xo.times.length >= 10))
      )
        return (
          (Xo.nodes = Xo.nodes.concat(e)),
          void (Xo.timeout = setTimeout(function () {
            return Yo();
          }, 1e3))
        );
      e.forEach(function (e) {
        e.translationLabel = "dynamic-selector: " + t(e);
      }),
        (Xo.timeout = null),
        Xo.times.push(Date.now());
      var r = Xo.nodes.concat(e);
      return (
        (Xo.nodes = []),
        In(Gn(r, { label: "Dynamic" }), n, {
          title: !1,
          cdn: !0,
          nodes: r,
        }).then(function (e) {
          return Kn(e, n, r);
        })
      );
    }
  }
  function Zo() {
    s(a(Ue));
  }
  function Qo() {
    s(a("wg_progress"));
  }
  var ei = !1;
  function ti(e) {
    window.postMessage({ name: de, data: e, target: _e }, "*");
  }
  it("languageChanged", function (e) {
    ei && ti({ type: pe, payload: e });
  });
  var ni = (function () {
    var e = function (e, t) {
        return Array.prototype.slice.call(e, t);
      },
      t = null;
    "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
      ? (t = self)
      : "undefined" != typeof global
      ? (t = global)
      : window && (t = window);
    var n = t,
      r = t.document,
      a = ["load", "loadend", "loadstart"],
      o = ["progress", "abort", "error", "timeout"],
      i = function (e) {
        return ["returnValue", "totalSize", "position"].includes(e);
      },
      s = function (e, t) {
        for (var n in e)
          if (!i(n)) {
            var r = e[n];
            try {
              t[n] = r;
            } catch (e) {}
          }
        return t;
      },
      l = function (e, t, n) {
        for (
          var r = function (e) {
              return function (r) {
                var a = {};
                for (var o in r)
                  if (!i(o)) {
                    var s = r[o];
                    a[o] = s === t ? n : s;
                  }
                return n.dispatchEvent(e, a);
              };
            },
            a = 0,
            o = Array.from(e);
          a < o.length;
          a += 1
        ) {
          var s = o[a];
          n._has(s) && (t["on" + s] = r(s));
        }
      },
      u = function (e) {
        if (r && null != r.createEventObject) {
          var t = r.createEventObject();
          return (t.type = e), t;
        }
        try {
          return new Event(e);
        } catch (t) {
          return { type: e };
        }
      },
      c = function (t) {
        var n = {},
          r = function (e) {
            return n[e] || [];
          },
          a = {
            addEventListener: function (e, t, a) {
              (n[e] = r(e)),
                n[e].indexOf(t) >= 0 ||
                  ((a = void 0 === a ? n[e].length : a), n[e].splice(a, 0, t));
            },
            removeEventListener: function (e, t) {
              if (void 0 !== e) {
                void 0 === t && (n[e] = []);
                var a = r(e).indexOf(t);
                -1 !== a && r(e).splice(a, 1);
              } else n = {};
            },
            dispatchEvent: function () {
              var n = e(arguments),
                o = n.shift();
              t ||
                ((n[0] = s(n[0], u(o))),
                Object.defineProperty(n[0], "target", {
                  writable: !1,
                  value: this,
                }));
              var i = a["on" + o];
              i && i.apply(a, n);
              for (var l = r(o).concat(r("*")), c = 0; c < l.length; c++)
                l[c].apply(a, n);
            },
            _has: function (e) {
              return !(!n[e] && !a["on" + e]);
            },
          };
        return (
          t &&
            ((a.listeners = function (t) {
              return e(r(t));
            }),
            (a.on = a.addEventListener),
            (a.off = a.removeEventListener),
            (a.fire = a.dispatchEvent),
            (a.once = function (e, t) {
              var n = function () {
                return a.off(e, n), t.apply(null, arguments);
              };
              return a.on(e, n);
            }),
            (a.destroy = function () {
              return (n = {});
            })),
          a
        );
      },
      d = function (e, t) {
        switch (typeof e) {
          case "object":
            return (
              (n = e),
              Object.entries(n)
                .map(function (e) {
                  var t = e[0],
                    n = e[1];
                  return t.toLowerCase() + ": " + n;
                })
                .join("\r\n")
            );
          case "string":
            return (function (e, t) {
              null == t && (t = {});
              for (var n = 0, r = e.split("\r\n"); n < r.length; n += 1) {
                var a = r[n];
                if (/([^:]+):\s*(.+)/.test(a)) {
                  var o = null != RegExp.$1 ? RegExp.$1.toLowerCase() : void 0,
                    i = RegExp.$2;
                  null == t[o] && (t[o] = i);
                }
              }
              return t;
            })(e, t);
        }
        var n;
        return [];
      },
      f = c(!0),
      g = function (e) {
        return void 0 === e ? null : e;
      },
      p = n.XMLHttpRequest,
      h = function () {
        var e,
          t,
          n,
          r = new p(),
          i = {},
          u = null,
          h = 0,
          _ = function () {
            if (
              ((n.status = u || r.status),
              -1 !== u && (n.statusText = r.statusText),
              -1 !== u)
            );
            else {
              var e = d(r.getAllResponseHeaders());
              for (var t in e) {
                var a = e[t];
                if (!n.headers[t]) {
                  var o = t.toLowerCase();
                  n.headers[o] = a;
                }
              }
            }
          },
          v = function () {
            (b.status = n.status), (b.statusText = n.statusText);
          },
          m = function () {
            e || b.dispatchEvent("load", {}),
              b.dispatchEvent("loadend", {}),
              e && (b.readyState = 0);
          },
          y = function (e) {
            for (; e > h && h < 4; )
              (b.readyState = ++h),
                1 === h && b.dispatchEvent("loadstart", {}),
                2 === h && v(),
                4 === h &&
                  (v(),
                  "text" in n && (b.responseText = n.text),
                  "xml" in n && (b.responseXML = n.xml),
                  "data" in n && (b.response = n.data),
                  "finalUrl" in n && (b.responseURL = n.finalUrl)),
                b.dispatchEvent("readystatechange", {}),
                4 === h && (!1 === i.async ? m() : setTimeout(m, 0));
          },
          w = function (e) {
            if (4 === e) {
              var t = f.listeners("after"),
                r = function () {
                  if (t.length > 0) {
                    var e = t.shift();
                    2 === e.length
                      ? (e(i, n), r())
                      : 3 === e.length && i.async
                      ? e(i, n, r)
                      : r();
                  } else y(4);
                };
              r();
            } else y(e);
          },
          b = c();
        (i.xhr = b),
          (r.onreadystatechange = function () {
            try {
              2 === r.readyState && _();
            } catch (e) {}
            4 === r.readyState &&
              ((t = !1),
              _(),
              (function () {
                if (r.responseType && "text" !== r.responseType)
                  "document" === r.responseType
                    ? ((n.xml = r.responseXML), (n.data = r.responseXML))
                    : (n.data = r.response);
                else {
                  (n.text = r.responseText), (n.data = r.responseText);
                  try {
                    n.xml = r.responseXML;
                  } catch (e) {}
                }
                "responseURL" in r && (n.finalUrl = r.responseURL);
              })()),
              w(r.readyState);
          });
        var k = function () {
          e = !0;
        };
        b.addEventListener("error", k),
          b.addEventListener("timeout", k),
          b.addEventListener("abort", k),
          b.addEventListener("progress", function () {
            h < 3
              ? w(3)
              : r.readyState <= 3 && b.dispatchEvent("readystatechange", {});
          }),
          "withCredentials" in r && (b.withCredentials = !1),
          (b.status = 0);
        for (var x = 0, S = Array.from(o.concat(a)); x < S.length; x += 1) {
          var E = S[x];
          b["on" + E] = null;
        }
        if (
          ((b.open = function (r, a, o, s, l) {
            (h = 0),
              (e = !1),
              (t = !1),
              (i.headers = {}),
              (i.headerNames = {}),
              (i.status = 0),
              (i.method = r),
              (i.url = a),
              (i.async = !1 !== o),
              (i.user = s),
              (i.pass = l),
              ((n = {}).headers = {}),
              w(1);
          }),
          (b.send = function (e) {
            for (
              var u, c, d = 0, g = ["type", "timeout", "withCredentials"];
              d < g.length;
              d += 1
            )
              (c = "type" === (u = g[d]) ? "responseType" : u) in b &&
                (i[u] = b[c]);
            i.body = e;
            var p = f.listeners("before"),
              h = function () {
                if (!p.length)
                  return (function () {
                    for (
                      var e = 0,
                        n =
                          (l(o, r, b),
                          b.upload && l(o.concat(a), r.upload, b.upload),
                          (t = !0),
                          r.open(i.method, i.url, i.async, i.user, i.pass),
                          ["type", "timeout", "withCredentials"]);
                      e < n.length;
                      e += 1
                    )
                      (c = "type" === (u = n[e]) ? "responseType" : u),
                        u in i && (r[c] = i[u]);
                    for (var s in i.headers) {
                      var d = i.headers[s];
                      s && r.setRequestHeader(s, d);
                    }
                    r.send(i.body);
                  })();
                var e = function (e) {
                  if (
                    "object" == typeof e &&
                    ("number" == typeof e.status || "number" == typeof n.status)
                  )
                    return (
                      s(e, n),
                      "data" in e || (e.data = e.response || e.text),
                      void w(4)
                    );
                  h();
                };
                (e.head = function (e) {
                  s(e, n), w(2);
                }),
                  (e.progress = function (e) {
                    s(e, n), w(3);
                  });
                var d = p.shift();
                1 === d.length
                  ? e(d(i))
                  : 2 === d.length && i.async
                  ? d(i, e)
                  : e();
              };
            h();
          }),
          (b.abort = function () {
            (u = -1), t ? r.abort() : b.dispatchEvent("abort", {});
          }),
          (b.setRequestHeader = function (e, t) {
            var n = null != e ? e.toLowerCase() : void 0,
              r = (i.headerNames[n] = i.headerNames[n] || e);
            i.headers[r] && (t = i.headers[r] + ", " + t), (i.headers[r] = t);
          }),
          (b.getResponseHeader = function (e) {
            return g(n.headers[e ? e.toLowerCase() : void 0]);
          }),
          (b.getAllResponseHeaders = function () {
            return g(d(n.headers));
          }),
          r.overrideMimeType &&
            (b.overrideMimeType = function () {
              r.overrideMimeType.apply(r, arguments);
            }),
          r.upload)
        ) {
          var L = c();
          (b.upload = L), (i.upload = L);
        }
        return (
          (b.UNSENT = 0),
          (b.OPENED = 1),
          (b.HEADERS_RECEIVED = 2),
          (b.LOADING = 3),
          (b.DONE = 4),
          (b.response = ""),
          (b.responseText = ""),
          (b.responseXML = null),
          (b.readyState = 0),
          (b.statusText = ""),
          b
        );
      };
    (h.UNSENT = 0),
      (h.OPENED = 1),
      (h.HEADERS_RECEIVED = 2),
      (h.LOADING = 3),
      (h.DONE = 4);
    var _ = {
      patch: function () {
        p && (n.XMLHttpRequest = h);
      },
      unpatch: function () {
        p && (n.XMLHttpRequest = p);
      },
      Native: p,
      Xhook: h,
    };
    var v = n.fetch;
    function m(e) {
      return e instanceof Headers
        ? y([].concat(e.entries()))
        : Array.isArray(e)
        ? y(e)
        : e;
    }
    function y(e) {
      return e.reduce(function (e, t) {
        var n = t[0],
          r = t[1];
        return (e[n] = r), e;
      }, {});
    }
    var w = function (e, t) {
        void 0 === t && (t = { headers: {} });
        var n = Object.assign(Object.assign({}, t), { isFetch: !0 });
        if (e instanceof Request) {
          var r = (function (e) {
              var t = {};
              return (
                [
                  "method",
                  "headers",
                  "body",
                  "mode",
                  "credentials",
                  "cache",
                  "redirect",
                  "referrer",
                  "referrerPolicy",
                  "integrity",
                  "keepalive",
                  "signal",
                  "url",
                ].forEach(function (n) {
                  return (t[n] = e[n]);
                }),
                t
              );
            })(e),
            a = Object.assign(Object.assign({}, m(r.headers)), m(n.headers));
          n = Object.assign(Object.assign(Object.assign({}, r), t), {
            headers: a,
            acceptedRequest: !0,
          });
        } else n.url = e;
        var o = f.listeners("before"),
          i = f.listeners("after");
        return new Promise(function (t, r) {
          var a = this,
            s = t,
            l = function (e) {
              if (!i.length) return s(e);
              var t = i.shift();
              return 2 === t.length
                ? (t(n, e), l(e))
                : 3 === t.length
                ? t(n, e, l)
                : l(e);
            },
            u = function (e) {
              if (void 0 !== e) {
                var n = new Response(e.body || e.text, e);
                return t(n), void l(n);
              }
              c();
            },
            c = function () {
              if (o.length) {
                var e = o.shift();
                return 1 === e.length
                  ? u(e(n))
                  : 2 === e.length
                  ? e(n, u)
                  : void 0;
              }
              d();
            },
            d = function () {
              return (function (e, t, n, r) {
                return new (n || (n = Promise))(function (t, a) {
                  function o(e) {
                    try {
                      s(r.next(e));
                    } catch (e) {
                      a(e);
                    }
                  }
                  function i(e) {
                    try {
                      s(r.throw(e));
                    } catch (e) {
                      a(e);
                    }
                  }
                  function s(e) {
                    var r;
                    e.done
                      ? t(e.value)
                      : ((r = e.value),
                        r instanceof n
                          ? r
                          : new n(function (e) {
                              e(r);
                            })).then(o, i);
                  }
                  s((r = r.apply(e, [])).next());
                });
              })(a, 0, void 0, function* () {
                var t = n.url,
                  a = (function (e, t) {
                    var n = {};
                    for (var r in e)
                      Object.prototype.hasOwnProperty.call(e, r) &&
                        t.indexOf(r) < 0 &&
                        (n[r] = e[r]);
                    if (
                      null != e &&
                      "function" == typeof Object.getOwnPropertySymbols
                    ) {
                      var a = 0;
                      for (
                        r = Object.getOwnPropertySymbols(e);
                        a < r.length;
                        a++
                      )
                        t.indexOf(r[a]) < 0 &&
                          Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                          (n[r[a]] = e[r[a]]);
                    }
                    return n;
                  })(n, ["url", "isFetch", "acceptedRequest"]);
                return (
                  e instanceof Request &&
                    a.body instanceof ReadableStream &&
                    (a.body = yield new Response(a.body).text()),
                  v(t, a)
                    .then(function (e) {
                      return l(e);
                    })
                    .catch(function (e) {
                      return (s = r), l(e), r(e);
                    })
                );
              });
            };
          c();
        });
      },
      b = {
        patch: function () {
          v && (n.fetch = w);
        },
        unpatch: function () {
          v && (n.fetch = v);
        },
        Native: v,
        Xhook: w,
      },
      k = f;
    return (
      (k.EventEmitter = c),
      (k.before = function (e, t) {
        if (e.length < 1 || e.length > 2) throw "invalid hook";
        return k.on("before", e, t);
      }),
      (k.after = function (e, t) {
        if (e.length < 2 || e.length > 3) throw "invalid hook";
        return k.on("after", e, t);
      }),
      (k.enable = function () {
        _.patch(), b.patch();
      }),
      (k.disable = function () {
        _.unpatch(), b.unpatch();
      }),
      (k.XMLHttpRequest = _.Native),
      (k.fetch = b.Native),
      (k.headers = d),
      k
    );
  })();
  function ri(e, t) {
    return (
      !(!t || "*" === t) &&
      new RegExp("^" + t.replace(/\?/g, ".").replace(/\*/g, ".*") + "$").test(e)
    );
  }
  function ai(e, t) {
    if (e)
      try {
        return new URL(e.trim(), (null == t ? void 0 : t.trim()) || void 0);
      } catch (e) {
        return;
      }
  }
  var oi = function (e) {
    var t = e.options,
      n = e.slugs,
      r = e.language,
      a = e.location;
    (this.options = t),
      (this.slugs = n),
      (this.language = r),
      (this.location = a);
  };
  function ii(e, t) {
    var n = le.xhr_hooks,
      r = le.language_from,
      a = Wt();
    if (r === a || fn()) t();
    else {
      var o = e.url,
        i = n.filter(si).find(function (e) {
          return ri(o, e.url_wildcard);
        });
      if (i)
        return (function (e, t, n) {
          var r = t.target_source,
            a = t.target_key,
            o = t.action,
            i = {
              url_query: function (t, n) {
                return (
                  void 0 === n && (n = e.url),
                  {
                    word: new ut(
                      n,
                      "https://" + window.location.hostname
                    ).searchParams.get(t),
                    setter: function (r) {
                      var a = new ut(n, "https://" + window.location.hostname);
                      a.searchParams.set(t, r);
                      var o = a.toString();
                      return n === e.url && (e.url = o), o;
                    },
                  }
                );
              },
              url: function (t, n) {
                void 0 === n && (n = e.url);
                var r = new RegExp(t),
                  a = n.match(r),
                  o = a && a[1];
                if (!o) return {};
                var i = !1,
                  s = o;
                try {
                  (s = decodeURIComponent(o)) !== o && (i = !0);
                } catch (e) {}
                return {
                  word: s,
                  setter: function (t) {
                    var r = i ? encodeURIComponent(t) : t,
                      a = n.replace(o, r);
                    return n === e.url && (e.url = a), a;
                  },
                };
              },
              url_encoded_form_payload: function (t, n) {
                void 0 === n && (n = e.body);
                var r = new ut("https://unused.com?" + n).searchParams;
                return {
                  word: r.get(t),
                  setter: function (a) {
                    r.set(t, a);
                    var o = r.toString();
                    return n === e.body && (e.body = o), o;
                  },
                };
              },
              form_data_payload: function (t, n) {
                return (
                  void 0 === n && (n = e.body),
                  {
                    word: n.get(t),
                    setter: function (r) {
                      n.set(t, r);
                      var a = n;
                      return n === e.body && (e.body = a), a;
                    },
                  }
                );
              },
              json_payload: function (t, n) {
                return (
                  void 0 === n && (n = e.body),
                  {
                    word: JSON.parse(n)[t],
                    setter: function (r) {
                      var a,
                        o = JSON.stringify(
                          Object.assign(
                            {},
                            JSON.parse(n),
                            (((a = {})[t] = r), a)
                          )
                        );
                      return n === e.body && (e.body = o), o;
                    },
                  }
                );
              },
            };
          return (function t(r, a, s) {
            void 0 === s && (s = void 0);
            var l = r[0],
              u = r.slice(1),
              c = a[0],
              d = a.slice(1);
            if ("proxify" === o)
              return (
                (e.url = new oi({
                  options: le,
                  language: n,
                  slugs: {},
                  location: window.location.href,
                }).proxify(e.url)),
                Promise.resolve(e.url)
              );
            if (!i[c] || r.length !== a.length) return Promise.resolve(s);
            var f = i[c](l, s),
              g = f.word,
              p = f.setter;
            return g
              ? u.length && d.length
                ? t(u, d, g).then(p)
                : "reverse_handle_path" === o
                ? new Promise(function (t) {
                    return $t(function (r) {
                      var a = new oi({
                        options: le,
                        language: n,
                        slugs: r,
                      }).handle(g);
                      e.url === c && (e.url = a), t(p(a));
                    });
                  })
                : "reverse_translate" === o
                ? new Promise(function (e) {
                    return Dn(g, function (t) {
                      return e(p(t));
                    });
                  })
                : Promise.resolve(s)
              : Promise.resolve(s);
          })(Array.isArray(a) ? a : [a], Array.isArray(r) ? r : [r]);
        })(e, i, a).then(function () {
          t();
        });
      t();
    }
  }
  function si(e) {
    if (!e) return !1;
    var t = e.url_wildcard,
      n = e.action,
      r = e.target_source,
      a = e.target_key;
    return (
      !!t &&
      ("proxify" === n
        ? (Array.isArray(r) && r.includes("url")) || "url" === r
        : !!["reverse_translate", "reverse_handle_path"].some(function (e) {
            return e === n;
          }) &&
          r &&
          a)
    );
  }
  (oi.prototype.handle = function (e) {
    if (!this.options.is_connect) return e;
    var t = "/" === e.slice(0, 1) && "//" !== e.slice(0, 2),
      n = ai(e, "https://unused.com");
    if (!n) return e;
    var r = n.host,
      a = n.pathname;
    return t || this.isValidHost(r)
      ? ((n.pathname = this.handlePath(a)),
        (n.host = this.handleHost(r)),
        t ? "" + n.pathname + n.search + n.hash : n.toString())
      : e;
  }),
    (oi.prototype.isValidHost = function (e) {
      var t;
      return (
        e === this.options.host ||
        (null === (t = this.options.languages) || void 0 === t
          ? void 0
          : t.some(function (t) {
              var n;
              return (
                (null === (n = t.connect_host_destination) || void 0 === n
                  ? void 0
                  : n.host) === e
              );
            }))
      );
    }),
    (oi.prototype.proxify = function (e) {
      var t = ai(this.location),
        n = "/" === e.slice(0, 1),
        r = n && "//" !== e.slice(0, 2);
      if (r && !t) return e;
      if (!n && !ai(e)) return e;
      var a = (r ? "" + t.hostname + e : e).replace(/^(https?:)?\/\//, ""),
        o = Jn({
          targetLanguage: this.language,
          currentLanguage: this.language,
          options: this.options,
        });
      return o ? "" + o + a : e;
    }),
    (oi.prototype.handlePath = function (e) {
      var t = this.convertSlugs(e);
      return this.options.subdirectory
        ? new Rt({ pathname: t, options: this.options }).convertLocale(
            this.options.language_from,
            t
          )
        : t;
    }),
    (oi.prototype.handleHost = function (e) {
      if (this.options.subdirectory) return e;
      var t = this.options.languages.find(function (t) {
        var n;
        return (
          (null === (n = t.connect_host_destination) || void 0 === n
            ? void 0
            : n.host) === e
        );
      });
      return (t && this.options.host) || e;
    }),
    (oi.prototype.convertSlugs = function (e) {
      var t;
      if (
        !this.language ||
        !(null === (t = this.slugs) || void 0 === t ? void 0 : t[this.language])
      )
        return e;
      var n = this.slugs[this.language].translated;
      return (
        void 0 === n && (n = {}),
        e
          .split("/")
          .map(function (e) {
            return n[e] ? encodeURI(n[e]) : e;
          })
          .join("/")
      );
    });
  var li = [
    { codes: ["no"], pattern: /^(nn|nb)(-[a-z]+)?$/i },
    { codes: ["zh"], pattern: /^zh(-hans(-\w{2})?)?(-(cn|sg))?$/i },
    { codes: ["tw", "zh-TW"], pattern: /^zh-(hant)?-?(tw|hk|mo)?$/i },
    { codes: ["br"], pattern: /^pt-br$/i },
    { codes: ["fl"], pattern: /^fil$/i },
  ];
  function ui(e) {
    void 0 === e && (e = gn());
    for (var t = {}, n = {}, r = 0, a = e; r < a.length; r += 1) {
      var o = a[r],
        i = o.toLowerCase(),
        s = i.substring(0, 2);
      t[s] || (t[s] = []), t[s].push(i), (n[i] = o);
    }
    for (
      var l = 0, u = navigator.languages || [navigator.language];
      l < u.length;
      l += 1
    ) {
      var c = u[l],
        d = c.toLowerCase(),
        f = d.substring(0, 2);
      if (n[d]) return n[d];
      for (var g = 0, p = li; g < p.length; g += 1) {
        var h = p[g],
          _ = h.codes,
          v = h.pattern,
          m = _.find(function (t) {
            return e.includes(t);
          });
        if (m && v.test(c)) return m;
      }
      if (t[f]) {
        if ("zh" === f) continue;
        var y = t[f].indexOf(f);
        return y >= 0 ? n[t[f][y]] : n[t[f].shift()];
      }
    }
  }
  function ci() {
    if (window.location.search.indexOf("no_redirect=true") > -1) di(Wt());
    else if (
      !(
        !le.auto_switch ||
        (le.subdirectory && le.injectedData) ||
        Lt("cookie").getItem("WG_CHOOSE_ORIGINAL") ||
        mt() ||
        le.visual_editor
      )
    ) {
      var e = ui();
      return e && !fn(e)
        ? e
        : le.auto_switch_fallback && !fn(le.auto_switch_fallback)
        ? le.auto_switch_fallback
        : void 0;
    }
  }
  function di(e) {
    if (e === le.language_from) {
      var t = new Date();
      t.setTime(t.getTime() + 2592e6),
        Lt("cookie").setItem("WG_CHOOSE_ORIGINAL", "1", {
          expires: t.toUTCString(),
        });
    } else Lt("cookie").removeItem("WG_CHOOSE_ORIGINAL");
  }
  var fi = !1;
  function gi(e) {
    var t = le.service_worker;
    t &&
      t.enabled &&
      "serviceWorker" in navigator &&
      navigator.serviceWorker
        .getRegistration()
        .then(function (e) {
          if (!e)
            return navigator.serviceWorker.register(
              t.path_override || "/wg-sw.js"
            );
        })
        .then(function () {
          return navigator.serviceWorker.ready;
        })
        .then(function () {
          return new Promise(function (e) {
            if (navigator.serviceWorker.controller) e();
            else {
              var t = function () {
                navigator.serviceWorker.controller &&
                  (navigator.serviceWorker.removeEventListener(
                    "controllerchange",
                    t
                  ),
                  e());
              };
              navigator.serviceWorker.addEventListener("controllerchange", t),
                setTimeout(function () {
                  navigator.serviceWorker.controller &&
                    (navigator.serviceWorker.removeEventListener(
                      "controllerchange",
                      t
                    ),
                    e());
                }, 1e3);
            }
          });
        })
        .then(function () {
          (fi = !0),
            $t(function (t) {
              pi({ type: ye, data: { slugs: t, language: e, options: le } });
            });
        })
        .catch(function (e) {
          se.error(e);
        });
  }
  function pi(e) {
    var t;
    null === (t = navigator.serviceWorker.controller) ||
      void 0 === t ||
      t.postMessage({ name: "weglot-sw", payload: e });
  }
  it("languageChanged", function (e) {
    fi && pi({ type: we, data: e });
  });
  var hi = function (e) {
    var t = e.body,
      n = e.apiPayload,
      r = e.actions,
      a = e.parentParser,
      o = e.language,
      i = e.source,
      s = e.headers,
      l = e.slugs,
      u = e.options,
      c = e.requestUrl,
      d = e.logger;
    (this.contentString = ""),
      (this.bodyBuffer = null),
      (this.type = ""),
      (this.logger = d),
      (this.linkSetters = []),
      this.extractBody(t),
      (this.apiPayload = n),
      (this.actions = r),
      (this.needsSerialization = !1),
      (this.afterSetters = []),
      (this.language = o),
      (this.source = i),
      (this.headers = s),
      (this.slugs = l),
      (this.requestUrl = c),
      (this.options = u),
      a && (this.parentParser = a);
  };
  function _i(e) {
    if (!e || "" === e) return [];
    for (var t = [], n = "", r = !1, a = "", o = 0; o < e.length; o++) {
      var i = e[o];
      "[" === i
        ? (n && (t.push(n), (n = "")), (r = !0), (a = ""))
        : "]" === i
        ? r && (t.push("[" + a + "]"), (r = !1), (a = ""))
        : "." !== i || r
        ? r
          ? (a += i)
          : (n += i)
        : n && (t.push(n), (n = ""));
    }
    return n && t.push(n), t;
  }
  function vi(e, t) {
    if (!e || !t) return [];
    var n = [],
      r = _i(t),
      a = 0;
    return (
      r.length > 0 && "$" === r[0] && (a = 1),
      (function e(t, a, o) {
        if (o >= r.length) n.push({ value: t, path: a });
        else {
          var i = r[o];
          if (".." === i) o + 1 < r.length && e(t, a, o + 1);
          else if ("*" === i)
            Array.isArray(t)
              ? t.forEach(function (t, n) {
                  e(t, a + "[" + n + "]", o + 1);
                })
              : "object" == typeof t &&
                null !== t &&
                Object.keys(t).forEach(function (n) {
                  e(t[n], a + "." + n, o + 1);
                });
          else if (i.startsWith("[") && i.endsWith("]")) {
            var s = i.slice(1, -1);
            if (Array.isArray(t))
              if ("*" === s)
                t.forEach(function (t, n) {
                  e(t, a + "[" + n + "]", o + 1);
                });
              else {
                var l = parseInt(s, 10);
                !isNaN(l) &&
                  l >= 0 &&
                  l < t.length &&
                  e(t[l], a + "[" + l + "]", o + 1);
              }
          } else
            "object" == typeof t &&
              null !== t &&
              i in t &&
              e(t[i], a + "." + i, o + 1);
        }
      })(e, "", a),
      n
    );
  }
  (hi.prototype.setNeedsSerialization = function () {
    (this.needsSerialization = !0),
      this.parentParser && this.parentParser.setNeedsSerialization();
  }),
    (hi.prototype.addToAfterSetters = function (e) {
      this.afterSetters.push(e);
    }),
    (hi.prototype.addToApiPayload = function (e) {
      this.parentParser
        ? this.parentParser.addToApiPayload(e)
        : this.apiPayload.push(e);
    }),
    (hi.prototype.onSlugsReady = function (e) {
      this.parentParser
        ? this.parentParser.onSlugsReady(e)
        : this.linkSetters.push(e);
    }),
    (hi.prototype.setSlugsReady = function (e) {
      (this.slugs = e),
        this.linkSetters.forEach(function (e) {
          return e();
        });
    }),
    (hi.prototype.parse = function () {
      try {
        this._parse();
      } catch (e) {
        throw (
          (this.logger.error({
            message: "Parser " + this.type + " failed during parsing",
            error: e instanceof Error ? e.message : String(e),
            content: this.contentString.substring(0, 100),
            actions: this.actions,
          }),
          e)
        );
      }
    }),
    (hi.prototype.extractBody = function (e) {
      try {
        this._extractBody(e);
      } catch (t) {
        throw (
          (this.logger.error({
            message: "Parser " + this.type + " failed during reading of body",
            data: {
              error: t instanceof Error ? t.message : String(t),
              body: e,
            },
          }),
          t)
        );
      }
    }),
    (hi.prototype.set = function (e, t) {
      try {
        this._set(e, t), this.setNeedsSerialization();
      } catch (n) {
        throw (
          (this.logger.error({
            message:
              "Parser " + this.type + " failed during setting: " + e + ", " + t,
            data: {
              error: n instanceof Error ? n.message : String(n),
              key: e,
              value: t,
            },
          }),
          n)
        );
      }
    }),
    (hi.prototype.serialize = function () {
      this.afterSetters.map(function (e) {
        return e();
      });
      try {
        return this._serialize();
      } catch (e) {
        throw (
          (this.logger.error({
            message: "Parser " + this.type + " failed during serialization",
            data: { error: e instanceof Error ? e.message : String(e) },
          }),
          e)
        );
      }
    }),
    (hi.prototype._extractBody = function (e) {
      if ("string" == typeof e)
        return (this.contentString = e), void (this.bodyBuffer = null);
      var t = new TextDecoder();
      this.contentString = t.decode(e);
    }),
    (hi.prototype._parse = function () {
      throw new Error("Parser not implemented.");
    }),
    (hi.prototype._set = function (e, t) {
      throw new Error("Parser not yet implemented.");
    }),
    (hi.prototype._serialize = function () {
      throw new Error("Parser not implemented.");
    }),
    (hi.prototype.applyAction = function (e, t, n) {
      var r = this;
      if (t && "string" == typeof t)
        switch (n.action_type) {
          case "parse_child":
            var a = n.child_parser,
              o = n.child_actions;
            if (!a || !o) return;
            var i = new (xi(a))({
              body: t,
              apiPayload: this.apiPayload,
              actions: o,
              parentParser: this,
              language: this.language,
              source: this.source,
              headers: this.headers,
              slugs: this.slugs,
              requestUrl: this.requestUrl,
              logger: this.logger,
              options: this.options,
            });
            i.parse(),
              this.addToAfterSetters(function () {
                return r.set(e, i.serialize());
              });
            break;
          case "reverse_translate":
            this.addToApiPayload({
              word: t,
              type: 0,
              setter: function (t) {
                r.set(e, t);
              },
            });
            break;
          case "reverse_handle_link":
            var s = function () {
              var n = new oi({
                options: r.options,
                language: r.language,
                slugs: r.slugs,
                location: r.requestUrl,
              }).handle(t);
              r.set(e, n);
            };
            if (this.slugs) return void s();
            this.onSlugsReady(s);
            break;
          case "proxify_link":
            var l = new oi({
              options: this.options,
              language: this.language,
              slugs: {},
              location: this.requestUrl,
            }).proxify(t);
            this.set(e, l);
            break;
          default:
            return n;
        }
    });
  var mi = (function (e) {
      function t() {
        e.apply(this, arguments), (this.type = "json");
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype._parse = function () {
          this.parsed = JSON.parse(this.contentString);
          for (var e = 0, t = this.actions; e < t.length; e += 1)
            for (
              var n = t[e], r = n.key, a = 0, o = vi(this.parsed, r);
              a < o.length;
              a += 1
            ) {
              var i = o[a],
                s = i.value,
                l = i.path;
              this.applyAction(l, s, n);
            }
        }),
        (t.prototype._set = function (e, t) {
          var n = (function (e, t, n) {
            if (!e || !t) return { success: !1, newValue: e };
            var r = _i(t);
            if (0 === r.length) return { success: !1, newValue: e };
            var a = 0;
            if ((r.length > 0 && "$" === r[0] && (a = 1), a >= r.length))
              return { success: !1, newValue: e };
            var o = JSON.parse(JSON.stringify(e)),
              i = (function e(t, a) {
                if (a >= r.length - 1) {
                  var o = r[a];
                  if (!o.startsWith("[") || !o.endsWith("]"))
                    return (t[o] = n), !0;
                  var i = o.slice(1, -1),
                    s = parseInt(i, 10);
                  return !(isNaN(s) || !Array.isArray(t) || ((t[s] = n), 0));
                }
                var l = r[a];
                if (!l.startsWith("[") || !l.endsWith("]")) {
                  if (!t[l]) {
                    var u = r[a + 1];
                    u && u.startsWith("[") && u.endsWith("]")
                      ? (t[l] = [])
                      : (t[l] = {});
                  }
                  return e(t[l], a + 1);
                }
                var c = l.slice(1, -1),
                  d = parseInt(c, 10);
                if (!isNaN(d) && Array.isArray(t)) {
                  if (!t[d]) {
                    var f = r[a + 1];
                    f && f.startsWith("[") && f.endsWith("]")
                      ? (t[d] = [])
                      : (t[d] = {});
                  }
                  return e(t[d], a + 1);
                }
                return !1;
              })(o, a);
            return { success: i, newValue: o };
          })(this.parsed, e, t);
          n.success && (this.parsed = n.newValue);
        }),
        (t.prototype._serialize = function () {
          return JSON.stringify(this.parsed);
        }),
        t
      );
    })(hi),
    yi = (function (e) {
      function t() {
        e.apply(this, arguments), (this.type = "url_query");
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype._parse = function () {
          this.parsed = new URL(this.contentString);
          for (var e = 0, t = this.actions; e < t.length; e += 1) {
            var n = t[e],
              r = this.parsed.searchParams.get(n.key);
            r && this.applyAction(n.key, r, n);
          }
        }),
        (t.prototype._set = function (e, t) {
          this.parsed.searchParams.set(e, t);
        }),
        (t.prototype._serialize = function () {
          return this.parsed.toString();
        }),
        t
      );
    })(hi),
    wi = (function (e) {
      function t() {
        e.apply(this, arguments), (this.type = "form_urlencoded");
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype._set = function (e, t) {
          this.parsed.set(e, t);
        }),
        (t.prototype._parse = function () {
          this.parsed = new URLSearchParams(this.contentString);
          for (var e = 0, t = this.actions; e < t.length; e += 1) {
            var n = t[e],
              r = this.parsed.get(n.key);
            this.applyAction(n.key, r, n);
          }
        }),
        (t.prototype._serialize = function () {
          return this.parsed.toString();
        }),
        t
      );
    })(hi),
    bi = (function (e) {
      function t() {
        e.apply(this, arguments),
          (this.type = "form_multipart"),
          (this.parsedParts = []),
          (this.boundary = "");
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype._parse = function () {
          var e = this;
          if (this.formData) this.parseFormData();
          else {
            var t = (this.headers.get("Content-Type") || "").match(
              /boundary=(.+)$/
            );
            if (!t) throw new Error("Header boundary not found in body");
            this.boundary = t[1];
            for (
              var n = new Uint8Array(this.bodyBuffer),
                r = new TextEncoder(),
                a = new TextDecoder(),
                o = "--" + this.boundary,
                i = r.encode(o),
                s = this.findBoundaries(n, i),
                l = [],
                u = 0;
              u < s.length - 1;
              u++
            ) {
              var c = s[u] + i.length;
              13 === n[c] && 10 === n[c + 1] && (c += 2);
              var d = s[u + 1];
              13 === n[d - 2] && 10 === n[d - 1] && (d -= 2),
                l.push(n.subarray(c, d));
            }
            for (
              var f = function () {
                  var t = p[g],
                    n = e.extractField(t, a),
                    r = n.fieldName,
                    o = n.fieldValue,
                    i = n.headersBytes,
                    s = n.bodyBytes;
                  if (!r)
                    throw new Error("Error parsing form data: Stop parsing.");
                  e.parsedParts.push({
                    name: r,
                    value: o,
                    headers: i,
                    bodyBytes: s,
                  });
                  var l = e.actions.find(function (e) {
                    return e.key === r;
                  });
                  l && e.applyAction(r, o, l);
                },
                g = 0,
                p = l;
              g < p.length;
              g += 1
            )
              f();
          }
        }),
        (t.prototype.extractField = function (e, t) {
          for (var n = -1, r = 0; r < e.length - 3; r++)
            if (
              13 === e[r] &&
              10 === e[r + 1] &&
              13 === e[r + 2] &&
              10 === e[r + 3]
            ) {
              n = r;
              break;
            }
          if (-1 === n)
            return {
              fieldName: null,
              fieldValue: null,
              headersBytes: new Uint8Array(0),
              bodyBytes: new Uint8Array(0),
            };
          var a = e.subarray(0, n),
            o = e.subarray(n + 4),
            i = t
              .decode(a)
              .split("\r\n")
              .find(function (e) {
                return e.toLowerCase().startsWith("content-disposition");
              }),
            s = null;
          return (
            i && (s = i.match(/name="([^"]+)"/)),
            s
              ? {
                  fieldName: s[1],
                  fieldValue: t.decode(o),
                  headersBytes: a,
                  bodyBytes: o,
                }
              : {
                  fieldName: null,
                  fieldValue: null,
                  headersBytes: a,
                  bodyBytes: o,
                }
          );
        }),
        (t.prototype._set = function (e, t) {
          if (this.formData) this.formData.set(e, t);
          else {
            var n = this.parsedParts.find(function (t) {
              return t.name === e;
            });
            n && (n.value = t);
          }
        }),
        (t.prototype._serialize = function () {
          if (this.formData) return this.formData;
          var e = new TextEncoder(),
            t = new TextDecoder(),
            n = [];
          n.push(e.encode("--" + this.boundary + "\r\n"));
          for (var r = 0; r < this.parsedParts.length; r++) {
            var a = this.parsedParts[r];
            r > 0 && n.push(e.encode("\r\n--" + this.boundary + "\r\n")),
              n.push(a.headers),
              n.push(e.encode("\r\n\r\n")),
              n.push(e.encode(a.value));
          }
          n.push(e.encode("\r\n--" + this.boundary + "--\r\n"));
          for (
            var o = n.reduce(function (e, t) {
                return e + t.length;
              }, 0),
              i = new Uint8Array(o),
              s = 0,
              l = 0,
              u = n;
            l < u.length;
            l += 1
          ) {
            var c = u[l];
            i.set(c, s), (s += c.length);
          }
          return t.decode(i);
        }),
        (t.prototype.findBoundaries = function (e, t) {
          for (var n = [], r = this.computeLPS(t), a = 0, o = 0; a < e.length; )
            e[a] === t[o]
              ? (a++, ++o === t.length && (n.push(a - o), (o = r[o - 1])))
              : 0 !== o
              ? (o = r[o - 1])
              : a++;
          return n;
        }),
        (t.prototype.parseFormData = function () {
          for (var e = 0, t = this.actions; e < t.length; e += 1) {
            var n = t[e],
              r = n.key,
              a = this.formData.get(r);
            a && "string" == typeof a && this.applyAction(r, a, n);
          }
        }),
        (t.prototype.computeLPS = function (e) {
          for (
            var t = new Array(e.length).fill(0), n = 0, r = 1;
            r < e.length;

          )
            e[r] === e[n]
              ? (n++, (t[r] = n), r++)
              : 0 !== n
              ? (n = t[n - 1])
              : ((t[r] = 0), r++);
          return t;
        }),
        (t.prototype._extractBody = function (e) {
          if ("string" == typeof e)
            throw new Error(
              "FormDataMultiParser does not support string bodies"
            );
          (this.contentString = ""),
            e instanceof FormData ? (this.formData = e) : (this.bodyBuffer = e);
        }),
        t
      );
    })(hi),
    ki = (function (e) {
      function t() {
        e.apply(this, arguments),
          (this.type = "regex"),
          (this.urlDecodedPhrases = []);
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype._serialize = function () {
          return this.contentString;
        }),
        (t.prototype._set = function (e, t) {
          this.urlDecodedPhrases.includes(e) && (t = encodeURIComponent(t)),
            (this.contentString = this.contentString.replace(e, t));
        }),
        (t.prototype.safeUrlDecode = function (e) {
          try {
            var t = decodeURIComponent(e);
            return t !== e ? (this.urlDecodedPhrases.push(e), t) : e;
          } catch (t) {
            return e;
          }
        }),
        (t.prototype._parse = function () {
          for (var e = 0, t = this.actions; e < t.length; e += 1) {
            var n = t[e],
              r = new RegExp(n.key, "g").exec(this.contentString);
            if (r && r[1]) {
              var a = r[1];
              if ("url" !== this.source || this.parentParser)
                this.applyAction(a, a, n);
              else {
                var o = this.safeUrlDecode(a);
                this.applyAction(a, o, n);
              }
            }
          }
        }),
        t
      );
    })(hi);
  function xi(e) {
    switch (e) {
      case "json":
        return mi;
      case "url_query":
        return yi;
      case "regex":
        return ki;
      case "form_multipart":
        return bi;
      case "form_urlencoded":
        return wi;
      default:
        throw new Error("Unknown parser type provided: " + e);
    }
  }
  function Si(e) {
    var t = e.payload,
      n = e.originalUrl,
      r = e.language,
      a = e.logger,
      o = e.options;
    if (0 === t.length) return Promise.resolve();
    if (r === o.language_from)
      return (
        t.forEach(function (e) {
          return e.setter(e.word);
        }),
        Promise.resolve()
      );
    var i = t.map(function (e) {
      return e.word;
    });
    return _n({
      body: {
        l_from: Vt(r, o),
        request_url: n,
        l_to: o.language_from,
        words: i.map(function (e) {
          return { t: 2, w: e };
        }),
      },
      options: o,
      logger: a,
    }).then(function (e) {
      e.to_words
        .map(function (e) {
          return e.toLowerCase().trim();
        })
        .forEach(function (e, n) {
          t[n].setter(e);
        });
    });
  }
  function Ei(e) {
    var t,
      n,
      r = e.hook,
      a = e.language,
      o = e.url,
      i = e.body,
      s = [],
      l = new Promise(function (e) {
        $t(e);
      });
    if (r.body && ("string" == typeof i || i instanceof FormData)) {
      var u = xi(r.body.parser);
      (t = new u({
        body: i,
        apiPayload: s,
        actions: r.body.actions,
        language: a,
        options: le,
        slugs: void 0,
        requestUrl: o,
        parentParser: void 0,
        source: "body",
        headers: new Headers(),
        logger: se,
      })).parse();
    }
    if (r.url && "string" == typeof o) {
      var c = xi(r.url.parser);
      (n = new c({
        body: o,
        requestUrl: o,
        apiPayload: s,
        actions: r.url.actions,
        language: a,
        options: le,
        slugs: void 0,
        parentParser: void 0,
        source: "url",
        headers: new Headers(),
        logger: se,
      })).parse();
    }
    return Promise.all([
      Si({ payload: s, originalUrl: o, language: a, options: le, logger: se }),
      l,
    ]).then(function (e) {
      e[0];
      var r = e[1];
      return (
        null == n || n.setSlugsReady(r),
        null == t || t.setSlugsReady(r),
        {
          url: (null == n ? void 0 : n.needsSerialization)
            ? n.serialize()
            : void 0,
          body: (null == t ? void 0 : t.needsSerialization)
            ? t.serialize()
            : void 0,
        }
      );
    });
  }
  function Li(e, t) {
    var n = e.matchingHook,
      r = e.language,
      a = e.url,
      o = e.body,
      i = t.input,
      s = t.init,
      l = t.originalFetch,
      u = t.sendRequest;
    return (function (e, t) {
      var n = e.matchingHook,
        r = e.language,
        a = e.url,
        o = e.body,
        i = t.input,
        s = t.init;
      return Ei({ hook: n, language: r, url: a, body: o }).then(function (e) {
        if (e.url || e.body) {
          var t = s ? Object.assign({}, s) : void 0;
          if (i instanceof Request) {
            var n = i,
              r = e.url || i.url,
              a = void 0 !== e.body ? e.body : o;
            return (
              t && delete t.body,
              e.body
                ? {
                    newInput: new Request(r, new Request(n, { body: a })),
                    newInit: t,
                  }
                : { newInput: new Request(r, n), newInit: t }
            );
          }
          if ((e.body && t && (t.body = e.body), !e.url))
            return { newInput: i, newInit: t };
          if ("string" == typeof i) return { newInput: e.url, newInit: t };
          if (i instanceof URL) {
            var l = ai(e.url);
            if (!l) return;
            return { newInput: l, newInit: t };
          }
        }
      });
    })({ matchingHook: n, language: r, url: a, body: o }, { input: i, init: s })
      .then(function (e) {
        if (!e) return u();
        var t = e.newInput,
          n = e.newInit;
        return s ? l(t, n) : l(t);
      })
      .catch(function (e) {
        return se.error(e, { sendToDatadog: !1 }), u();
      });
  }
  function Ci() {
    var e = le.network_overrides,
      t = le.is_connect;
    !e ||
      (t && fn()) ||
      (e.hooks &&
        e.hooks.length &&
        (e.xhr &&
          (function (e) {
            var t = window.XMLHttpRequest;
            window.XMLHttpRequest = new Proxy(t, {
              construct: function (t, n) {
                var r = Reflect.construct(t, n),
                  a = r.open.bind(r),
                  o = r.setRequestHeader.bind(r);
                (r._wg_headers = {}),
                  (r.open = function (e, t, n, o, i) {
                    return (
                      (r._wg_method = e),
                      (r._wg_url = "string" == typeof t ? t : t.toString()),
                      (r._wg_async = !1 !== n),
                      (r._wg_user = o),
                      (r._wg_password = i),
                      (r._wg_headers = {}),
                      a(e, t, n, o, i)
                    );
                  }),
                  (r.setRequestHeader = function (e, t) {
                    var n = e.toLowerCase();
                    return (
                      r._wg_headers[n] || (r._wg_headers[n] = []),
                      r._wg_headers[n].push(t),
                      o.call(r, e, t)
                    );
                  });
                var i = r.send.bind(r);
                return (
                  (r.send = function (t) {
                    var n,
                      s = function () {
                        i.call(r, t);
                      },
                      l = r._wg_url;
                    if (!l) return s();
                    var u = Wt();
                    if (le.language_from === u || fn()) return s();
                    var c =
                      null === (n = e.hooks) || void 0 === n
                        ? void 0
                        : n.find(function (e) {
                            return ri(l, e.url_match);
                          });
                    if (!c) return s();
                    Ei({ hook: c, language: u, url: l, body: t })
                      .then(function (e) {
                        e.url &&
                          ((r._wg_url = e.url),
                          a.call(
                            r,
                            r._wg_method || "GET",
                            e.url,
                            r._wg_async,
                            r._wg_user,
                            r._wg_password
                          ),
                          Object.entries(r._wg_headers).forEach(function (e) {
                            var t = e[0];
                            e[1].forEach(function (e) {
                              o.call(r, t, e);
                            });
                          }));
                        var n = void 0 !== e.body ? e.body : t;
                        i.call(r, n);
                      })
                      .catch(function (e) {
                        se.error(e), s();
                      });
                  }),
                  r
                );
              },
            });
          })(e),
        e.fetch &&
          (function (e) {
            var t = window.fetch;
            window.fetch = function (n, r) {
              var a,
                o = arguments,
                i = function () {
                  return o.length > 1 ? t(n, r) : t(n);
                };
              try {
                var s =
                  "string" == typeof n
                    ? n
                    : n instanceof URL
                    ? n.toString()
                    : n.url;
                if (!s) return i();
                var l = Wt();
                if (le.language_from === l || fn()) return i();
                var u =
                  null === (a = e.hooks) || void 0 === a
                    ? void 0
                    : a.find(function (e) {
                        return ri(s, e.url_match);
                      });
                if (!u) return i();
                if (
                  (null == r ? void 0 : r.body) ||
                  !(n instanceof Request) ||
                  !n.body
                )
                  return Li(
                    {
                      matchingHook: u,
                      language: l,
                      url: s,
                      body: null == r ? void 0 : r.body,
                    },
                    { input: n, init: r, originalFetch: t, sendRequest: i }
                  );
                var c = n.clone(),
                  d = u.body;
                return (
                  d && "form_multipart" === d.parser
                    ? c.formData()
                    : d
                    ? c.text()
                    : new Promise(function (e) {
                        return e(void 0);
                      })
                ).then(function (e) {
                  return Li(
                    { matchingHook: u, language: l, url: s, body: e },
                    { input: n, init: r, originalFetch: t, sendRequest: i }
                  );
                });
              } catch (e) {
                return i();
              }
            };
          })(e)));
  }
  it("switchersReady", function () {
    !(function () {
      if (window.parent === window) return;
      Ni(window.parent, { name: Oi, type: "ASK_PARENT_SWITCHERS" });
    })(),
      Ti();
  });
  var Oi = "weglot-switchers";
  function Ti(e) {
    for (var t = 0, n = dt(document.body, "iframe"); t < n.length; t += 1) {
      Ni(n[t].contentWindow, {
        name: Oi,
        type: "ALERT_CHILD_SWITCHERS",
        payload: e || To(),
      });
    }
  }
  function Ni(e, t) {
    e && e.postMessage(t, "*");
  }
  function ji(e, t, n) {
    if (n || !e || window.top !== window || !Di(e)) {
      var r = [];
      try {
        Vn((r = Bn()));
      } catch (e) {
        se.warn(e);
      }
      var a,
        o,
        i = fn();
      if (
        (e && t && !i && hn(e),
        !le.is_connect || le.dynamicPushState || (!i && e !== le.language_from)
          ? (function (e) {
              void 0 === e && (e = !0);
              var t = le.excluded_blocks,
                n = le.is_connect;
              if ((Vo = e))
                if (
                  ((zo =
                    t &&
                    t.length &&
                    t
                      .map(function (e) {
                        return e.value;
                      })
                      .join(",")),
                  n && Fo.length > 0)
                )
                  for (
                    var r = function () {
                        var e = o[a],
                          t = e.mutations,
                          n = e.observedDocument,
                          r = function () {
                            var e = t.splice(0, 100);
                            e.length > 0 && ($o(e, n), setTimeout(r, 0));
                          };
                        r();
                      },
                      a = 0,
                      o = Fo;
                    a < o.length;
                    a += 1
                  )
                    r();
                else Fo = [];
            })()
          : (function () {
              if (0 !== Ho.length) {
                for (var e = 0, t = Ho; e < t.length; e += 1) t[e].disconnect();
                Fo = [];
              }
            })(),
        (a = le.xhr_hooks),
        (o = le.is_connect),
        !(a && Array.isArray(a) && a.some(si)) ||
          (o && fn()) ||
          (ni.enable(), ni.before(ii)),
        Ci(),
        gi(e),
        window.addEventListener("message", function (e) {
          if (e.data) {
            var t = e.data,
              n = t.name,
              r = t.target,
              a = t.data;
            n === de &&
              r === he &&
              "library" === r &&
              ((ei = !0), a.type === fe && ti({ type: ge, payload: Wt() }));
          }
        }),
        window.addEventListener("message", function (e) {
          if (e.data) {
            var t = e.data,
              n = t.type,
              r = t.name,
              a = t.payload;
            if ("weglot-switchers" === r)
              switch (n) {
                case "ASK_PARENT_SWITCHERS":
                  Ti();
                  break;
                case "ALERT_CHILD_SWITCHERS":
                  if (!a) return;
                  jo(), Ti(!0);
              }
          }
        }),
        n || i)
      )
        Ri(e);
      else if (
        (le.is_connect && !i && Tt("onConnectPageLoad", e),
        le.force_translation)
      ) {
        for (var l = [], u = 0, c = r; u < c.length; u += 1) {
          var d = c[u],
            f = d.closest ? d : d.parentNode;
          gt(f, le.force_translation) && l.push(d);
        }
        Yo(l);
      }
      (i && !i.language_button_displayed && i.allExcluded) || Ro(),
        i ||
          (le.remove_unused_link_hooks &&
            (function () {
              var e = gn(),
                t = le.languages
                  .map(function (e) {
                    return e.custom_code || e.language_to;
                  })
                  .filter(function (t) {
                    return !e.includes(t);
                  });
              1 === e.length && t.push(le.language_from);
              for (
                var n = t
                    .map(function (e) {
                      return Wi(e);
                    })
                    .join(","),
                  r = dt(document, n),
                  a = 0,
                  o = r;
                a < o.length;
                a += 1
              ) {
                s(o[a]);
              }
            })(),
          Mo(
            dt(
              document,
              le.dynamics
                .map(function (e) {
                  return e.value;
                })
                .join(",")
            )
          ),
          Io(),
          (function () {
            window.addEventListener("message", Qn, !1);
            var e = le.translate_iframes;
            if (e)
              for (var t = 0, n = dt(document.body, e); t < n.length; t += 1) {
                var r = n[t];
                r.contentWindow && Xn.push(r.contentWindow);
              }
            Yn({}),
              Ot("onPageLanguageSet", Zn),
              "with-window-top" === vt() &&
                window.top &&
                window.top.postMessage({ message: "Weglot.iframe" }, "*");
          })(),
          ["alert", "confirm", "prompt"].forEach(function (e) {
            var t = window[e];
            window[e] = function () {
              var n = arguments;
              if ("string" == typeof arguments[0]) {
                var r = Wt();
                if (le.language_from === r) return t.apply(window, arguments);
                var a = [{ t: 2, w: arguments[0] }];
                return (
                  "prompt" === e &&
                    "string" == typeof arguments[1] &&
                    a.push({ t: 2, w: arguments[1] }),
                  In(a, r, { title: !1, cdn: !0 })
                    .then(function (r) {
                      return (
                        (n[0] = r.to_words[0]),
                        "prompt" === e &&
                          "string" == typeof n[1] &&
                          (n[1] = r.to_words[1]),
                        t.apply(window, n)
                      );
                    })
                    .catch(function () {
                      return t.apply(window, n);
                    })
                );
              }
            };
          })),
        st("initialized", e);
    }
  }
  function Ai(e) {
    var t = Wt();
    e !== t &&
      (le.visual_editor
        ? Yt(e, function (n) {
            if ("#" === n) return Ri(e, t);
            window.dispatchEvent(
              new CustomEvent("veLanguageChangeUrl", {
                detail: { targetUrl: n },
              })
            );
          })
        : Ri(e, t));
  }
  function Ri(e, t) {
    if (!gn().includes(e))
      return (
        Zo(),
        void se.warn(e + " isn't a language you have added", {
          sendToDatadog: !1,
        })
      );
    (le.auto_switch || le.geo_auto_switch) && di(e);
    var n = fn();
    if ((le.is_connect || n || hn(e), !Di(e))) {
      if (
        (le.loading_bar &&
          (function () {
            try {
              var e = document.createElement("div");
              (e.className = "wg-progress"),
                (e.id = "wg_progress"),
                (e.innerHTML =
                  '<div class="wg-progress-bar" role="progressbar" aria-label="Page is loading"></div>'),
                document.body.appendChild(e);
            } catch (e) {}
          })(),
        (function (e) {
          var t = _t("lang");
          if (t && t !== e) {
            var n = window.location.search.replace("lang=" + t, "lang=" + e);
            try {
              window.history.replaceState(
                null,
                "",
                window.location.pathname + n
              );
            } catch (e) {}
          }
          At = e;
        })(e),
        fn())
      )
        return Zo(), void Qo();
      if (e === le.language_from)
        return (
          Tt("onPageLanguageSet", e),
          Pi(e),
          void st("languageChanged", e, t || "")
        );
      Ii(e, t), Tt("onPageLanguageSet", e);
    }
  }
  function Pi(e) {
    Kn(null, e),
      Zo(),
      document.documentElement.setAttribute("lang", e),
      le.loading_bar && Qo();
  }
  function Ii(e, t) {
    In(Gn(), e)
      .then(function (n) {
        Zo(),
          Kn(n, e),
          document.documentElement.setAttribute("lang", e),
          st("languageChanged", e, t || ""),
          le.loading_bar && Qo();
      })
      .catch(function (e) {
        throw (le.loading_bar && Qo(), Zo(), Lt().removeItem(qe), e);
      });
  }
  function Di(e) {
    return (
      !((!le.is_connect && "WordPress" !== le.technology_name) || Wt() === e) &&
      (!le.host ||
      (le.previewHash && window.location.hostname.includes(ze)) ||
      (function () {
        if (le.subdirectory) return [le.host].concat(d);
        return le.languages
          .map(function (e) {
            return (
              e.connect_host_destination && e.connect_host_destination.host
            );
          })
          .concat([le.host].concat(d));
      })().includes(window.location.hostname)
        ? (Yt(e, function (e) {
            return window.location.replace(e);
          }),
          !0)
        : (vt() ||
            se.warn(
              '"' +
                window.location.hostname +
                '" is not configured with Weglot. Please contact support@weglot.com',
              { sendToDatadog: !1 }
            ),
          !1))
    );
  }
  it(
    "initialized",
    function () {
      if (!le.visual_editor && !le.switcher_editor) {
        var e = le.translate_forms;
        void 0 === e && (e = []),
          e.forEach(function (e) {
            for (
              var t = e.selector,
                n = e.parameter,
                r = function () {
                  var e = o[a];
                  e.addEventListener("submit", function (t) {
                    t.preventDefault();
                    var r = t.target.elements[n].value;
                    Dn(r, function (t) {
                      ie.set({ name: "wg-search-form", value: r, options: le }),
                        (e.elements[n].value = t),
                        e.submit();
                    });
                  });
                  var t = void 0;
                  -1 !== window.location.search.indexOf(n + "=") &&
                    e.elements &&
                    e.elements[n] &&
                    (t = ie.get("wg-search-form")) &&
                    (e.elements[n].value = t);
                },
                a = 0,
                o = dt(document, t);
              a < o.length;
              a += 1
            )
              r();
          }),
          ie.erase({ name: "wg-search-form", options: le });
      }
    },
    !0
  ),
    it(
      "onCurrentLocationChanged",
      function () {
        var e = Wt();
        if (e !== le.language_from) {
          if (fn(e, Nt().pathname))
            return (
              Lt().setItem("weglot_excluded", "true"), void Pi(le.language_from)
            );
          Lt().getItem("weglot_excluded") &&
            (Lt().removeItem("weglot_excluded"), Ii(e));
        }
      },
      !0
    );
  var Mi = [];
  function Wi(e) {
    var t = le.linkHooksConfig && le.linkHooksConfig.buildAdditionalSelectors;
    return [
      "a[href='#Weglot-" + e + "']",
      "a[href*='change-language.weglot.com/" + e + "']",
    ]
      .concat(t ? t(e) : [])
      .join(",");
  }
  function zi(e) {
    void 0 === e && (e = document);
    var t =
      (le.linkHooksConfig && le.linkHooksConfig.additionalCheckSelectors) || [];
    if (
      0 !==
      dt(
        e,
        ['a[href^="#Weglot-"]', 'a[href*="change-language.weglot.com/"]']
          .concat(t)
          .join(",")
      ).length
    ) {
      for (var n = !1, r = 0, a = gn(); r < a.length; r += 1) {
        var o = a[r],
          i = dt(e, Wi(o));
        if (0 !== i.length) {
          n = !0;
          for (var s = 0, l = i; s < l.length; s += 1) {
            Ui(o, l[s]);
          }
        }
      }
      return (
        it(
          "languageChanged",
          function (e) {
            return qi(e);
          },
          !0
        ),
        it("initialized", function () {
          var e = Wt();
          e !== le.language_from && qi(e);
        }),
        n
      );
    }
  }
  function qi(e) {
    Mi.forEach(function (t) {
      var n = t.language,
        r = t.links,
        a = n === e,
        o = a ? "add" : "remove",
        i = a ? "onLinkActive" : "offLinkActive";
      r.forEach(function (e) {
        e.classList[o]("weglot-link--active"),
          le.linkHooksConfig &&
            le.linkHooksConfig[i] &&
            le.linkHooksConfig[i](e);
      });
    });
  }
  function Ui(e, t) {
    var n = Mi.find(function (t) {
      return t.language === e;
    });
    (n && -1 !== n.links.indexOf(t)) ||
      (n ||
        ((n = {
          language: e,
          links: [],
          onLinkClick: function (t) {
            t.preventDefault(), Ai(e);
          },
        }),
        Mi.push(n)),
      t.setAttribute(Fe, ""),
      t.classList.add("weglot-link", "weglot-link-" + e),
      e === Wt() &&
        (t.classList.add("weglot-link--active"),
        le.linkHooksConfig &&
          le.linkHooksConfig.onLinkActive &&
          le.linkHooksConfig.onLinkActive(t)),
      Yt(e, function (e) {
        return t.setAttribute("href", e);
      }),
      t.addEventListener("click", n.onLinkClick),
      n.links.push(t));
  }
  var Fi = {};
  (Fi[Ge.shopify.id] = function () {
    return (
      Ot("onWeglotSetup", function () {
        !1 !== le.original_shopify_checkout &&
          le.is_connect &&
          !le.subdirectory &&
          le.language_from === Wt() &&
          en();
      }),
      it(
        "initialized",
        function () {
          var e = Lt("cookie").getItem("wg_checkout_redirect");
          e &&
            (Lt("cookie").removeItem("wg_checkout_redirect"),
            Lt("cookie").setItem("wg_checkout_language", e),
            tn(e)),
            window.langify &&
              se.log("%c Please, uninstall langify to properly use Weglot", {
                sendToDatadog: !1,
              }),
            !window.Shopify ||
              mt() ||
              !le.order_tag ||
              (le.is_connect && le.language_from !== Wt()) ||
              sn(),
            nn();
          var t,
            n = document.querySelectorAll("[data-wg-only-display]");
          n.length && zt(n),
            le.customer_tag && an(),
            document.getElementsByClassName("shopify-payment-button").length &&
              ((t = window.fetch),
              (window.fetch = function () {
                if ("/wallets/checkouts.json" === arguments[0])
                  try {
                    var e = JSON.parse(arguments[1].body),
                      n = rn(Wt());
                    (e.checkout.attributes = {}),
                      le.cart_attributes &&
                        le.cart_attributes.forEach(function (t) {
                          return (e.checkout.attributes[t] = n);
                        }),
                      (arguments[1].body = JSON.stringify(e));
                  } catch (e) {}
                return t.apply(window, arguments);
              }));
        },
        !0
      ),
      Ot("onConnectPageLoad", function (e) {
        return ln(e);
      }),
      Ot("onPageLanguageSet", function (e) {
        return ln(e);
      }),
      Ot("onDynamicDetected", function () {
        nn(Wt());
      }),
      Ot("startWhen", function () {
        return (
          a("admin-bar-iframe") ||
          a("preview-bar-iframe") ||
          le.private_mode ||
          (function () {
            for (var e = 0, t = document.scripts; e < t.length; e += 1)
              if (-1 !== t[e].src.indexOf("preview_bar_injector")) return !0;
            return !1;
          })()
        );
      }),
      {}
    );
  }),
    (Fi[Ge.bigcommerce.id] = function () {
      return (
        Ot("onPageLanguageSet", function (e) {
          !(function (e) {
            for (
              var t = 0,
                n = document.querySelectorAll(
                  '[href*="/checkout.php"],[href*="/cart.php"]'
                );
              t < n.length;
              t += 1
            ) {
              var r = n[t];
              r.setAttribute("href", wt(r.getAttribute("href"), "lang", e));
            }
          })(e);
        }),
        {}
      );
    }),
    (Fi[Ge.squarespace.id] = function () {
      if (
        (it("initialized", function () {
          try {
            var e = window.ExtensionScriptsSDK;
            if (!e) return;
            e["1.0"].page.events.dispatchScriptLoadEvent("Weglot");
          } catch (e) {}
        }),
        !le.is_connect)
      )
        try {
          document
            .querySelectorAll(".animation-segment-wrapper")
            .forEach(function (e) {
              e.parentNode.dataset.dynamicStrings = e.textContent;
            }),
            document
              .querySelectorAll(".animation-segment-parent-hidden")
              .forEach(function (e) {
                e.dataset.dynamicStrings = "";
              });
        } catch (e) {}
      return {};
    }),
    (Fi[Ge.wix.id] = function () {
      var e = {};
      if (
        (window.wixBiSession &&
          "bolt" !== window.wixBiSession.renderType &&
          !le.visual_editor &&
          (document.addEventListener("DOMContentLoaded", function () {
            new MutationObserver(function (e) {
              for (var t = 0; t < e.length; t++) {
                "SUCCESS" ===
                  e[t].target.getAttribute("data-santa-render-status") &&
                  (this.disconnect(), st("start"));
              }
            }).observe(document.getElementById("SITE_CONTAINER"), {
              attributes: !0,
              attributeFilter: ["data-santa-render-status"],
            });
          }),
          (e.delayStart = !0),
          (e.wait_transition = !1)),
        window.wixBiSession && "bolt" === window.wixBiSession.renderType)
      ) {
        var t = 0,
          n = setInterval(function () {
            ((document.body && window.sssr) || 40 === t) &&
              (st("start"), clearInterval(n)),
              t++;
          }, 100);
        (e.delayStart = !0), (e.wait_transition = !1);
      }
      return e;
    }),
    (Fi[Ge.webflow.id] = function () {
      return (
        it("switchersReady", function () {
          var e = document.querySelector(".weglot-container");
          e && e.classList.add("weglot-container--left");
        }),
        {
          forceDisableConnect:
            window.Webflow &&
            window.Webflow.env &&
            !!window.Webflow.env("editor"),
          linkHooksConfig: {
            additionalCheckSelectors: [".weglot-switcher-component a[lang]"],
            buildAdditionalSelectors: function (e) {
              return ['.weglot-switcher-component a[lang="' + e + '"]'];
            },
            onLinkActive: function (e) {
              if (e) {
                e.classList.add("w--current"),
                  e.setAttribute("aria-current", "lang");
                var t = e.closest(".weglot-switcher-component.w-dropdown");
                if (t) {
                  var n = t.querySelector(".w-dropdown-toggle");
                  if (n) {
                    var r = n.querySelector("div"),
                      a = n.querySelector("img"),
                      o = r && r.textContent,
                      i = n.getAttribute("lang"),
                      s = e.querySelector("div"),
                      l = e.querySelector("img");
                    if (a && l) {
                      var u = a.src,
                        c = a.srcset;
                      (a.src = l.src),
                        (a.srcset = l.srcset),
                        (l.src = u),
                        (l.srcset = c);
                    }
                    if (r && s)
                      (r.textContent = s.textContent), (s.textContent = o);
                    else {
                      var d = n.textContent;
                      (n.textContent = e.textContent), (e.textContent = d);
                    }
                    !(function (e, t) {
                      var n = Mi.find(function (t) {
                        return t.language === e;
                      });
                      if (n) {
                        var r = n.links.indexOf(t);
                        -1 !== r &&
                          (n.links.splice(r, 1),
                          t.removeEventListener("click", n.onLinkClick));
                      }
                    })(e.getAttribute("lang"), e),
                      Ui(i, e),
                      n.setAttribute("lang", e.getAttribute("lang")),
                      e.setAttribute("lang", i);
                  }
                }
              }
            },
            offLinkActive: function (e) {
              e.classList.remove("w--current"),
                e.removeAttribute("aria-current");
            },
          },
        }
      );
    });
  var Hi = [
    "excluded_blocks",
    "excluded_blocks_remove",
    "dynamics",
    "excluded_paths",
    "dangerously_force_dynamic",
    "extra_definitions",
    "translate_event",
    "whitelist",
  ];
  function Bi(e) {
    if (!e.technology_id) {
      var t = e.technology_name,
        n = t && Ge[t];
      n && ((e.technology_id = n.id), (e.technology_name = n.name));
    }
    var r,
      a = (r = e).technology_id
        ? Tn(Fi[r.technology_id] ? Fi[r.technology_id]() : {}, r)
        : {},
      o = Object.assign({}, Je, a),
      i = {};
    return (
      Hi.forEach(function (t) {
        var n, r;
        o[t] &&
          e[t] &&
          (i[t] =
            ((n = e[t]),
            (r = o[t])
              ? Array.isArray(n)
                ? [].concat(n, r)
                : "object" == typeof n
                ? Object.assign({}, n, r)
                : (n = n
                    .split(",")
                    .filter(function (e) {
                      return e;
                    })
                    .join(",")) &&
                  n.length > 0 &&
                  n !== r
                ? (n += "," + r)
                : (n = r)
              : n));
      }),
      Object.assign({}, o, e, i)
    );
  }
  function $i(e) {
    if (e.deleted_at)
      throw {
        wgErrMsg: "Cannot load Weglot because the project has been deleted",
      };
    var t = Bi(e);
    et(e) && (t.subdirectory = !0);
    var n = (function (e) {
      if (!e.includes(ze)) return null;
      var t = e.split(".")[0];
      return t.includes("-") ? t.split("-").reverse()[0] : t;
    })(window.location.hostname);
    if (
      (n &&
        ((t.previewHash = n),
        (t.is_dns_set = !0),
        (t.subdirectory = window.location.hostname.startsWith("subdir-"))),
      (t.is_connect = t.subdirectory || tt(e)),
      f(window.location.hostname) &&
        (window.location.hostname.includes("switchers") &&
          (t.switcher_editor = !0),
        (t.visual_editor = !0)),
      (t.private_mode = !!(function () {
        -1 !== location.search.indexOf("weglot-private=0") &&
          Lt().removeItem("wg-private-mode");
        var e =
          document.getElementById("admin-bar-iframe") ||
          document.getElementById("preview-bar-iframe") ||
          -1 !== location.search.indexOf("weglot-private=1") ||
          f(window.location.hostname) ||
          "1" === Lt("cookie").getItem("wg-private-mode");
        return e && Lt("cookie").setItem("wg-private-mode", "1"), e;
      })()),
      (t.custom_css =
        t.custom_css || (t.button_style && t.button_style.custom_css) || ""),
      t.switchers && t.switchers.length
        ? (t.switchers = t.switchers.map(function (e) {
            var t = e.button_style,
              n = (function (e, t) {
                var n = {};
                for (var r in e)
                  Object.prototype.hasOwnProperty.call(e, r) &&
                    -1 === t.indexOf(r) &&
                    (n[r] = e[r]);
                return n;
              })(e, ["button_style"]),
              r = n;
            return Object.assign({}, r, { style: r.style || t });
          }))
        : (t.switchers = [
            {
              style: t.button_style || {},
              location: { target: "", sibling: "" },
              default: !0,
            },
          ]),
      t.api_key.length < 36 && (t.translation_engine = 1),
      t.dangerously_force_dynamic &&
        (t.dynamics = t.dynamics.concat(
          (t.dangerously_force_dynamic || "").split(",").map(function (e) {
            return { value: e.trim() };
          })
        )),
      t.dynamic &&
        ((t.dynamics = t.dynamics.concat(
          t.dynamic.split(",").map(function (e) {
            return { value: e.trim() };
          })
        )),
        delete t.dynamic),
      t.dynamics_remove &&
        (t.dynamics = t.dynamics.filter(function (e) {
          return !t.dynamics_remove.includes(e.value);
        })),
      t.excluded_blocks_remove &&
        (t.excluded_blocks = t.excluded_blocks.filter(function (e) {
          return !t.excluded_blocks_remove.includes(e.value);
        })),
      (t.excluded_blocks = t.excluded_blocks.filter(function (e) {
        return yt(e.value);
      })),
      (t.dynamics = t.dynamics.filter(function (e) {
        return yt(e.value);
      })),
      t.forceDisableConnect && (t.is_connect = !1),
      (t.is_tld = !1),
      t.is_connect && !t.previewHash)
    ) {
      var r = t.host.split("www.").pop();
      t.is_tld = t.languages.some(function (e) {
        if (e.connect_host_destination && e.connect_host_destination.host)
          return !!r && -1 === e.connect_host_destination.host.indexOf(r);
      });
    }
    return (
      t.prevent_retranslation ||
        (t.prevent_retranslation = t.dynamics.some(function (e) {
          return "body" === e.value;
        })),
      t.is_connect &&
      !t.disable_internal_proxy &&
      window.location.hostname !== ve
        ? (t.proxyFormat = be)
        : (t.proxyFormat = ke),
      t
    );
  }
  function Vi(e, t) {
    return ["visual-editor", "switcher-editor"].includes(e)
      ? "https://api.weglot.com/projects/settings?api_key=" + t
      : "https://cdn.weglot.com/projects-settings/" + t + ".json";
  }
  function Gi(e, t) {
    switch (e) {
      case "library":
        var n = o();
        if (n && n.settings) {
          var r = n.settings,
            a = (function (e, t) {
              var n = {};
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) &&
                  -1 === t.indexOf(r) &&
                  (n[r] = e[r]);
              return n;
            })(n, ["settings"]),
            i = a;
          return (r.injectedData = i), Promise.resolve(r);
        }
        return fetch(Vi(e, t)).then(function (e) {
          return e.json();
        });
      case "switcher-editor":
      case "visual-editor":
        return fetch(Vi(e, t)).then(function (e) {
          return e.json();
        });
      default:
        throw new Error("Unknown service: " + e);
    }
  }
  function Ki(e, t) {
    return Gi(e, t).then(function (e) {
      return Le(e);
    });
  }
  function Ji(e) {
    var t = nt(e);
    if (!t.api_key) throw Error("You have to provide at least a key");
    var n,
      r = t.api_key.split("wg_").pop();
    if (!r)
      throw new Error("Cannot fetch Weglot options. Is your key correct?");
    return ((n = r), Ki("library", n))
      .then(function (e) {
        var n = $i(ce(e, t));
        return ue(n), xt(n), n;
      })
      .catch(function (e) {
        se.error(e, {
          consoleOverride:
            (e && "wgErrMsg" in e ? e.wgErrMsg : void 0) ||
            "Cannot fetch Weglot options. Is your key correct?",
          sendToDatadog: !1,
        });
      });
  }
  var Xi,
    Yi,
    Zi,
    Qi = {
      "Node.prototype.contains": document.contains,
      "Element.prototype.cloneNode":
        "document" in self && "cloneNode" in document.documentElement,
      "location.origin": "location" in self && "origin" in self.location,
      MutationObserver: "MutationObserver" in self,
      Promise: "Promise" in self && "resolve" in Promise,
      "Element.prototype.matches":
        "document" in self && "matches" in document.documentElement,
      "Element.prototype.closest":
        "document" in self && "closest" in document.documentElement,
      "Element.prototype.classList":
        "document" in self &&
        "classList" in document.documentElement &&
        (function () {
          var e = document.createElement("div");
          if (
            !(
              e.classList &&
              e.classList.add &&
              e.classList.remove &&
              e.classList.contains &&
              e.classList.toggle
            )
          )
            return !1;
          var t = !0;
          e.classList.add("add1", "add2"),
            (t =
              t &&
              e.className.indexOf("add1") >= 0 &&
              e.className.indexOf("add2") >= 0),
            (e.className = "remove1 remove2 remove3"),
            e.classList.remove("remove1", "remove3"),
            (t =
              t &&
              -1 === e.className.indexOf("remove1") &&
              e.className.indexOf("remove2") >= 0 &&
              -1 === e.className.indexOf("remove3"));
          try {
            e.remove();
          } catch (t) {
            e = null;
          }
          return t;
        })(),
      "String.prototype.includes": "includes" in String.prototype,
      fetch: "fetch" in self,
      "Array.prototype.find": "find" in Array.prototype,
      "Array.prototype.findIndex": "findIndex" in Array.prototype,
      "Object.assign": "assign" in Object,
      "Array.prototype.includes": "includes" in Array.prototype,
      URL: (function (e) {
        try {
          var t = new e.URL("http://weglot.com");
          if ("href" in t && "searchParams" in t) {
            var n = new URL("http://weglot.com");
            if (
              ((n.search = "a=1&b=2"),
              "http://weglot.com/?a=1&b=2" === n.href &&
                ((n.search = ""), "http://weglot.com/" === n.href))
            ) {
              var r = new e.URLSearchParams("a=1"),
                a = new e.URLSearchParams(r);
              if ("a=1" === String(a)) return !0;
            }
          }
          return !1;
        } catch (e) {
          return !1;
        }
      })(self),
    },
    es = !1;
  function ts() {
    (es = !0), st("polyfillReady");
  }
  function ns() {
    return es;
  }
  function rs(e) {
    var t = le.api_key,
      n = le.pageview_sample_rate,
      r = "https://api.weglot.com/pageviews?api_key=" + t;
    if (!(n && Math.random() > n)) {
      var a = JSON.stringify({
        url: e || Nt().url,
        language: Wt(),
        browser_language: navigator.language,
      });
      if (navigator.sendBeacon)
        try {
          return void navigator.sendBeacon(r, a);
        } catch (e) {}
      try {
        fetch(r, { method: "POST", body: a });
      } catch (e) {}
    }
  }
  !(function (e) {
    window.Prototype &&
      (delete Object.prototype.toJSON, delete Array.prototype.toJSON);
    var t = Object.keys(Qi).filter(function (e) {
      return !Qi[e];
    });
    if (t.length) {
      !(function (e, t, n) {
        var r = !1;
        function a() {
          r ||
            ((r = !0),
            setTimeout(function () {
              return t(n);
            }, 20));
        }
        var o =
            document.getElementsByTagName("head")[0] ||
            document.documentElement,
          i = document.createElement("script");
        (i.type = "text/javascript"),
          (i.src = e),
          i.addEventListener
            ? (i.addEventListener("load", a, !1),
              i.addEventListener("error", a, !1))
            : i.readyState && (i.onreadystatechange = a),
          o.insertBefore(i, o.firstChild);
      })(
        "https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&callback=Weglot.polyReady&features=" +
          t.join(","),
        function () {}
      );
    } else e();
  })(ts);
  var as = !1;
  function os() {
    window.addEventListener("message", ls, !1);
    var e = document.createElement("meta");
    (e.name = "google"),
      (e.content = "notranslate"),
      document.head && document.head.appendChild(e),
      document.documentElement &&
        -1 === ["cms.e.jimdo.com", He].indexOf(window.location.host) &&
        -1 === window.location.pathname.indexOf("/" + Be + "/") &&
        document.documentElement.setAttribute("translate", "no");
    var t = document.head.querySelector("link[href*=weglot_shopify]");
    t && document.head.removeChild(t);
  }
  function is() {
    if (le.api_key) {
      it(
        "initialized",
        function () {
          le.page_views_enabled &&
            (le.is_connect
              ? Yt(le.language_from, function (e) {
                  return rs(e);
                })
              : rs());
        },
        !0
      );
      try {
        re(document, le);
      } catch (e) {
        se.error(e);
      }
      if ((Tt("onWeglotSetup"), !cs.initialized || window.Turbolinks)) {
        (Yi = (function () {
          var e = gn();
          if (le.is_connect) {
            var t =
              document.documentElement.dataset.wgTranslated ||
              (le.subdirectory ? Dt() : It());
            if (t !== le.language_from) return t;
            if (le.technology_name === Ge.shopify.name) {
              if (ie.get("wg_checkout_redirect")) return le.language_from;
              var n = ie.get("wg_checkout_language");
              if (n && !le.shopifyCheckout && !vt() && e.includes(n))
                return (
                  ie.erase({ name: "wg_checkout_language", options: le }), n
                );
            }
            var r = ci();
            return t === le.language_from && r && e.includes(r)
              ? r
              : le.language_from;
          }
          var a = _t("lang");
          if (a && e.includes(a)) return (as = !0), a;
          if (le.language_to && e.includes(le.language_to))
            return le.language_to;
          if (le.technology_name === Ge.wordpress.name) {
            var o = Mt();
            if (o === le.language_from) {
              var i = ci();
              if (i && e.includes(i)) return (as = !0), i;
            }
            return o || le.language_from;
          }
          var s = pn();
          if (s && e.includes(s)) return s;
          var l = ci();
          if (l && e.includes(l)) return (as = !0), l;
          return le.language_from;
        })()),
          Wt();
        var e = le.injectedData && le.injectedData.partial_translation,
          t = fn();
        if (
          ((Zi =
            Yi &&
            Yi !== le.language_from &&
            (document.documentElement.dataset.wgTranslated !== Yi || e) &&
            !t &&
            !document.documentElement.dataset.wgExcludedUrl &&
            !le.switcher_editor) &&
          le.wait_transition &&
          !e
            ? i(
                "@keyframes wg{from{color:transparent;}to{color:transparent;}}body *{color:transparent!important;animation:1s linear infinite wg!important;}",
                Ue
              )
            : Zo(),
          le.delayStart)
        )
          return it(
            "start",
            function () {
              return ss();
            },
            !0
          );
        ae(ss);
      }
    }
  }
  function ss() {
    if (
      !document.querySelector("#has-script-tags") ||
      (document.querySelector("#has-script-tags") &&
        (document.head.innerHTML.indexOf("weglot_script_tag") > 0 ||
          document.documentElement.innerHTML.indexOf("weglot_script_tag") > 0))
    )
      try {
        ji(Yi, as, Zi);
      } catch (e) {
        Zo(),
          se.error(e, {
            consoleOverride: "There has been an error initializing, " + e.stack,
          });
      }
    else Zo();
    (Xi = !1), (cs.initialized = !0);
  }
  function ls(e) {
    if (e.data)
      try {
        var t = JSON.parse(e.data);
        switch (t.message) {
          case "Weglot.detect":
            e.source.postMessage(
              JSON.stringify({
                message: "Weglot.ready",
                data: { initialized: cs.initialized, options: le },
              }),
              e.origin
            );
            break;
          case "Weglot.switchTo":
            Ai(t.language);
        }
      } catch (e) {}
  }
  function us(e) {
    try {
      for (
        var t = null,
          n = 0,
          r = [
            /cdn\.weglot\.(?:com|us|dev)\/weglot\.min\.js\?([^#]+)/,
            /cdn\.weglot\.(?:com|us|dev)\/weglot_squarespace-[0-9.]+\.+min\.js\?([^#]+)/,
          ];
        n < r.length;
        n += 1
      ) {
        if ((t = r[n].exec(e))) break;
      }
      if (!t) return null;
      var a = t[1]
        .split("&")
        .map(function (e) {
          var t = e.split("="),
            n = t[0],
            r = t[1];
          try {
            return [n, decodeURIComponent(r)];
          } catch (e) {
            return [n, r];
          }
        })
        .reduce(
          function (e, t) {
            var n,
              r = t[0],
              a = t[1];
            return Object.assign(
              {},
              e,
              (((n = {})[r] = "true" === a || ("false" !== a && a)), n)
            );
          },
          { api_key: "" }
        );
      return a.api_key ? a : null;
    } catch (e) {
      se.warn(e);
    }
  }
  var cs = window.Weglot || {
    initialized: !1,
    options: le,
    dynamic: "",
    switchTo: Ai,
    setup: function (e) {
      os(),
        Xi ||
          ((Xi = !0),
          ot(ns(), "polyfillReady", function () {
            Ji(e)
              .then(function () {
                return is();
              })
              .catch(function () {
                se.warn(
                  "Your setup is deprecated, please save settings in your dashboard to hide this message.",
                  { sendToDatadog: !1 }
                );
                var t = e.api_key;
                (e.translation_engine = t && t.length >= 36 ? 2 : 1),
                  (function (e) {
                    try {
                      var t = [
                        "api_key",
                        "originalLanguage",
                        "destinationLanguages",
                      ];
                      if (
                        !e ||
                        "object" != typeof e ||
                        !t.every(function (t) {
                          return t in e;
                        })
                      )
                        throw {
                          wgErrMsg:
                            "You have to provide at least: " + t.join(", "),
                        };
                      var n = $i(nt(e));
                      return ue(n), n;
                    } catch (e) {
                      throw new Error(
                        (e && "object" == typeof e && "wgErrMsg" in e
                          ? e.wgErrMsg
                          : void 0) || "Error while reading Weglot options"
                      );
                    }
                  })(e),
                  is();
              });
          }));
    },
    initialize: function (e) {
      os(),
        Xi ||
          ((Xi = !0),
          ot(ns(), "polyfillReady", function () {
            Ji(e).then(function () {
              return is();
            });
          }));
    },
    on: function (e, t) {
      return it(e, t, !1);
    },
    off: function (e, t) {
      var n,
        r = !1,
        a = function (t) {
          return at[t].name === e && !at[t].internal;
        };
      n =
        "function" == typeof t
          ? function (e) {
              return a(e) && at[e].callback === t;
            }
          : function (e) {
              return a(e);
            };
      for (var o = at.length - 1; o >= 0; o--)
        n(o) && (at.splice(o, 1), (r = !0));
      return r;
    },
    getStoredLang: pn,
    getLanguageName: Za,
    getCurrentLang: Wt,
    polyReady: ts,
    getCache: function () {
      return bn[le.api_key] || {};
    },
    addNodes: function (e) {
      var t = Bn(e);
      return Vn(t), Yo(t);
    },
    search: Dn,
    translate: function (e, t) {
      void 0 === e && (e = {});
      var n = e.words,
        r = e.languageTo;
      if (
        (void 0 === r && (r = Wt()),
        !Array.isArray(n) || "object" != typeof n[0])
      ) {
        var a = "Weglot.translate: 1st arg must be an array of objects";
        return (
          se.error(a, { sendToDatadog: !1 }), t && t(null, a), Promise.reject()
        );
      }
      return r === le.language_from
        ? (t &&
            t(
              n.map(function (e) {
                return e.w;
              })
            ),
          Promise.resolve(
            n.map(function (e) {
              return e.w;
            })
          ))
        : new Promise(function (e, a) {
            In(n, r, { title: !1, cdn: !0 })
              .then(function (n) {
                if (!n || !n.to_words) throw n;
                t && t(n.to_words), e(n.to_words);
              })
              .catch(function (e) {
                a(e), t && t(null, e);
              });
          });
    },
    getBestAvailableLanguage: ui,
    getAvailableLanguages: gn,
  };
  return (
    ot(ns(), "polyfillReady", function () {
      Go(document);
      for (
        var e = 0,
          t = [document.currentScript]
            .concat(Array.from(document.scripts))
            .filter(Boolean);
        e < t.length;
        e += 1
      ) {
        var n = t[e],
          r = n.src || (n.getAttribute && n.getAttribute("data-src"));
        if (r) {
          var a = us(r);
          if (a) return void cs.initialize(a);
        }
      }
    }),
    cs
  );
})();
