import { resolveComponent as s, createBlock as d, openBlock as o, withCtx as c, createElementVNode as f, createElementBlock as u, createCommentVNode as p, renderSlot as x, createVNode as g, Fragment as i, renderList as m, normalizeClass as U, toDisplayString as _, mergeProps as k, createTextVNode as b, normalizeStyle as L, useCssVars as P } from "vue";
const T = (l, t) => {
  const a = l.__vccOpts || l;
  for (const [v, n] of t)
    a[v] = n;
  return a;
}, C = {
  name: "ADialogForm",
  props: {
    title: {
      type: String,
      default: "新增"
    },
    width: {
      type: String,
      default: "800px"
    },
    form: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    showConfirm: {
      type: Boolean,
      default: !0
    },
    type: {
      type: String,
      default: "col-1",
      validator: (l) => ["col-1", "col-2"].includes(l)
    },
    height: {
      type: String,
      default: "auto"
    },
    modelValue: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      dialogVisible: !1,
      localForm: {}
      // 移除了uploadFileLists相关代码
    };
  },
  computed: {
    groupedFormItems() {
      const l = [];
      let t = [];
      for (const a of this.formItems)
        a.type === "label" ? (t.length > 0 && (l.push({ type: "group", content: t }), t = []), l.push({ type: "label", content: a })) : (t.push(a), t.length === 2 && this.type === "col-2" && (l.push({ type: "group", content: t }), t = []));
      return t.length > 0 && l.push({ type: "group", content: t }), l;
    },
    bgColor() {
      return this.$store.state.settings.theme || "#4770A4";
    }
  },
  watch: {
    form: {
      deep: !0,
      handler(l) {
        this.localForm = { ...l };
      }
    }
  },
  mounted() {
    this.localForm = { ...this.form }, console.log(this.localForm), this.dialogVisible = this.modelValue;
  },
  methods: {
    handleClose() {
      this.$emit("cancel"), this.dialogVisible = !1;
    },
    handleConfirm() {
      this.$refs.formRef.validate((l) => {
        l && (this.$emit("confirm", this.localForm), this.handleClose());
      });
    },
    handleCheckboxChange(l) {
      this.localForm.qualification = l ? [l] : [];
    }
  }
}, S = () => {
  P((l) => ({
    "2c3364e4": l.defaultHeight
  }));
}, z = C.setup;
C.setup = z ? (l, t) => (S(), z(l, t)) : S;
const J = { style: { width: "100%", display: "flex", "align-items": "center" } }, Q = { style: { "font-weight": "bold" } }, W = { class: "p-[20px]" }, X = {
  key: 0,
  slot: "footer",
  "lot-scope": "footer",
  class: "dialog-footer"
};
function Y(l, t, a, v, n, h) {
  const A = s("el-input"), F = s("el-checkbox"), B = s("el-checkbox-group"), N = s("el-radio"), q = s("el-radio-group"), D = s("el-option"), K = s("el-select"), M = s("el-cascader"), O = s("el-image"), j = s("el-form-item"), E = s("el-col"), R = s("el-row"), G = s("el-form"), w = s("el-button"), H = s("el-dialog");
  return o(), d(H, {
    visible: n.dialogVisible,
    title: a.title,
    width: a.width,
    "before-close": h.handleClose,
    "close-on-click-modal": !1,
    "close-on-press-escape": !1,
    "destroy-on-close": "",
    top: "5vh",
    right: ""
  }, {
    title: c(() => [
      f("div", J, [
        f("div", {
          class: "tilte-icon",
          style: L({ backgroundColor: h.bgColor })
        }, null, 4),
        f("div", Q, _(a.title), 1)
      ])
    ]),
    default: c(() => [
      f("div", W, [
        x(l.$slots, "header", {}, void 0, !0),
        g(G, {
          ref: "formRef",
          class: "mt-[30px] p-x[20px] dialog-form",
          model: n.localForm,
          rules: a.rules,
          "label-width": "auto"
        }, {
          default: c(() => [
            (o(!0), u(i, null, m(h.groupedFormItems, (y, I) => (o(), u("div", { key: I }, [
              y.type === "label" ? (o(), u("span", {
                key: 0,
                class: U(["big-label", y.content.class || ""])
              }, _(y.content.label), 3)) : (o(), u(i, { key: 1 }, [
                g(R, null, {
                  default: c(() => [
                    (o(!0), u(i, null, m(y.content, (e) => (o(), d(E, {
                      key: e.label,
                      span: a.type === "col-1" ? 24 : 12
                    }, {
                      default: c(() => [
                        (e.isShow && e.isShow(n.localForm), o(), d(j, {
                          key: 0,
                          label: e.label,
                          prop: e.prop,
                          required: e.required
                        }, {
                          default: c(() => [
                            e.type === "input" ? (o(), d(A, k({
                              key: 0,
                              style: { "text-align": "right" },
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r,
                              modelModifiers: { trim: !0 },
                              placeholder: e.placeholder
                            }, { ref_for: !0 }, e.attr), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder"])) : p("", !0),
                            e.type === "checkboxgroup" ? (o(), d(B, {
                              key: 1,
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r,
                              disabled: e.disabled
                            }, {
                              default: c(() => [
                                (o(!0), u(i, null, m(e.checkboxes, (r, V) => (o(), d(F, {
                                  key: V,
                                  value: r.value,
                                  disabled: e.disabled,
                                  onChange: (te) => h.handleCheckboxChange(r.value)
                                }, {
                                  default: c(() => [
                                    b(_(r.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value", "disabled", "onChange"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])) : p("", !0),
                            e.type === "check" ? (o(), d(F, {
                              key: 2,
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r,
                              disabled: e.disabled
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : p("", !0),
                            e.type === "radio" ? (o(), d(q, {
                              key: 3,
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r
                            }, {
                              default: c(() => [
                                (o(!0), u(i, null, m(e.radioOptions, (r, V) => (o(), d(N, {
                                  key: V,
                                  label: r.value
                                }, {
                                  default: c(() => [
                                    b(_(r.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue"])) : p("", !0),
                            e.type === "select" ? (o(), d(K, {
                              key: 4,
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r,
                              placeholder: "请选择",
                              onChange: e.change
                            }, {
                              default: c(() => [
                                (o(!0), u(i, null, m(e.options, (r) => (o(), d(D, {
                                  key: r[e.valueKey || "value"],
                                  value: r[e.valueKey || "value"],
                                  label: r[e.labelKey || "label"]
                                }, {
                                  default: c(() => [
                                    f("span", null, _(r[e.labelKey || "label"]), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value", "label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : p("", !0),
                            e.type === "cascader" ? (o(), d(M, k({
                              key: 5,
                              modelValue: n.localForm[e.prop],
                              "onUpdate:modelValue": (r) => n.localForm[e.prop] = r,
                              style: { width: "100%" }
                            }, { ref_for: !0 }, e.attr, {
                              placeholder: e.placeholder || "请选择",
                              options: e.options,
                              props: e.props,
                              onChange: e.change
                            }), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "options", "props", "onChange"])) : p("", !0),
                            e.type === "image" ? (o(), d(O, {
                              key: 6,
                              src: n.localForm[e.prop],
                              style: { width: "100px", height: "100px" },
                              "preview-src-list": [n.localForm[e.prop]]
                            }, null, 8, ["src", "preview-src-list"])) : p("", !0),
                            e.type === "span" ? (o(), u(i, { key: 7 }, [
                              f("div", k({
                                class: e.class
                              }, { ref_for: !0 }, e.attr), _(n.localForm[e.prop]), 17),
                              e.customizeModel ? (o(), u("div", {
                                key: 0,
                                class: U(e.customizeModelClass)
                              }, _(n.localForm[e.customizeModel]), 3)) : p("", !0)
                            ], 64)) : p("", !0)
                          ]),
                          _: 2
                        }, 1032, ["label", "prop", "required"]))
                      ]),
                      _: 2
                    }, 1032, ["span"]))), 128))
                  ]),
                  _: 2
                }, 1024),
                x(l.$slots, "formItem", {}, void 0, !0)
              ], 64))
            ]))), 128))
          ]),
          _: 3
        }, 8, ["model", "rules"])
      ]),
      a.showConfirm ? (o(), u("div", X, [
        g(w, { onClick: h.handleClose }, {
          default: c(() => t[0] || (t[0] = [
            b("取 消")
          ])),
          _: 1,
          __: [0]
        }, 8, ["onClick"]),
        g(w, {
          type: "primary",
          onClick: h.handleConfirm
        }, {
          default: c(() => t[1] || (t[1] = [
            b("确 定")
          ])),
          _: 1,
          __: [1]
        }, 8, ["onClick"])
      ])) : p("", !0)
    ]),
    _: 3
  }, 8, ["visible", "title", "width", "before-close"]);
}
const Z = /* @__PURE__ */ T(C, [["render", Y], ["__scopeId", "data-v-92ec692f"]]), $ = (l) => (l.install = (t) => {
  const a = l.name || l.__name;
  t.component(a, l);
}, l), ee = $(Z), le = [ee], oe = (l) => {
  le.forEach((t) => {
    l.component(t.name, t);
  });
}, ne = {
  install: oe
};
export {
  ee as ADialogForm,
  ne as default
};
