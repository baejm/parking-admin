var SheetTo = {
  inject: ["getWorkbook"],
  props: {
    sheet: {
      type: [String, Number],
      default: 0
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    loadedAndSheet() {
      return this.loaded ? this.sheet : null;
    }
  },
  watch: {
    loadedAndSheet: {
      immediate: true,
      handler(sheet) {
        if (sheet !== null) {
          this.getWorkbook(this._callBack);
        }
      }
    }
  },
  mounted() {
    this._callBack = () => {
      console.warning("Missing data parsing callback");
    };
  },
  methods: {
    sheetNameFinder(workbook) {
      return Number.isInteger(this.sheet)
        ? workbook.SheetNames[this.sheet]
        : this.sheet;
    }
  }
};

var script = {
  mixins: [SheetTo],
  data() {
    return {
      collection: null
    };
  },
  created() {
    this.$socket.on("message_from_server", data => {
    });
  }, 
  mounted() {
    this._callBack = this.updateJson;
    this.load();
  },
  methods: {
    async load() {
      const {
        utils: { sheet_to_json }
      } = await import('xlsx');
      this._sheet_to_json = sheet_to_json;
      this.loaded = true;
    },
    sendMessage(c) {
      console.log(c)
      this.$socket.emit("message_from_web_client", c)
    },
    updateJson(workbook) {
      const ws = workbook.Sheets[this.sheetNameFinder(workbook)];
      this.collection = this._sheet_to_json(ws, this.options);
      this.$emit("parsed", this.collection);
     
      let temp_array = []
      let obj = {}
      for(let i = 0; i < this.collection.length; i++){
        let temp_obj = {}
        if(this.collection[i].차량번호){
          temp_obj.lp = this.collection[i].차량번호          
        }
        else{
          continue;          
        }
        if(this.collection[i].이름){
          temp_obj.name = this.collection[i].이름  
        }
        else{
          temp_obj.name = ""
        }
        if(this.collection[i].연락처){
          temp_obj.phone = this.collection[i].연락처 
        }
        else{
          temp_obj.phone = ""
        }
        if(this.collection[i].그룹){
          temp_obj.group = this.collection[i].그룹 
        }
        else{
          temp_obj.group = ""
        }
        if(this.collection[i].시작시점){
          temp_obj.period_start = this.collection[i].시작시점
        }
        else{
          temp_obj.period_start = Date.now()
        }
        if(this.collection[i].종료시점){
          temp_obj.period_end = this.collection[i].종료시점 
        }
        else{
          temp_obj.period_end = Date.now()
        }
        if(this.collection[i].분류){
          temp_obj.kind1 = this.collection[i].분류  
        }
        else{
          temp_obj.kind1 = "종일제"
        }
        if(this.collection[i].상품명){
          temp_obj.product_name = this.collection[i].상품명  
        }
        else{
          temp_obj.product_name = "월정기주차1"
        }
        if(this.collection[i].월차량요금){
          temp_obj.month_fee = this.collection[i].월차량요금
        }
        else{
          temp_obj.month_fee = ""
        }
        if(this.collection[i].무료차량유무){
          temp_obj.fee_vehicle = this.collection[i].무료차량유무 
        }
        else{
          temp_obj.fee_vehicle = "유료"
        }
        if(this.collection[i].할인감면내용){
          temp_obj.discount_reduction  = this.collection[i].할인감면내용  
        }
        else{
          temp_obj.discount_reduction = ""
        }
        if(this.collection[i].신규연장여부){
          temp_obj.new_extend  = this.collection[i].신규연장여부  
        }
        else{
          temp_obj.new_extend = "신규"
        }
        if(this.collection[i].비고){
          temp_obj.discount_contrnts  = this.collection[i].비고  
        }
        else{
          temp_obj.discount_contents = ""
        }        
        temp_array.push(temp_obj)
      }

      obj.kind = "batch_sales_list"
      obj.sales_list = temp_array
      this.sendMessage(obj) 
     // console.log(this.collection)
    }
  },
  render(h) {
    if (this.$scopedSlots.default && this.loaded) {
      return h("div", [
        this.$scopedSlots.default({
        //  collection: this.collection
        })
      ]);
    }
    return null;
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var XlsxJson = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default XlsxJson;
