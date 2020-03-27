<template>
  <div class="modular-design">
    <el-container>
      <el-aside :width="leftWidth">
        <div class="fields-list">
          <div v-for="(field, index) in fields" :key="index">
            <div v-if="!field.disabled">
              <div class="field-title">{{field.title}}</div>
              <draggable
                tag="ul"
                :list="field.list"
                :group="{ name: 'form', pull: 'clone', put: false }"
                ghost-class="ghost"
                :sort="false"
              >
                <li class="field-label" v-for="(item, index) in field.list" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </draggable>
            </div>
            <div v-else>
              <div class="field-title">
                {{field.title}}
                <span class="danger">（开发中）</span>
              </div>
              <ul>
                <li class="field-label-disabled" v-for="(item, index) in field.list" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 中间主布局 -->
      <el-container class="widget-container" direction="vertical">
        <el-header class="widget-container-header">
          <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="handleAvueDoc">Avue文档</el-button> -->
          <!-- <el-button type="text" size="medium" icon="el-icon-upload2" @click="importJsonVisible = true">导入JSON</el-button> -->
          <!-- <el-button type="text" size="medium" icon="el-icon-download" @click="handleGenerateJson">生成JSON</el-button> -->
          <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
          <el-button class="danger" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
        </el-header>

        <el-main><!--  :style="{background: widgetModular.column.length == 0 ? `url(${widgetEmpty}) no-repeat 50%`: ''}" -->
          <div class="phone-header">
              <span class="leftspan"></span>
              <span class="rightspan"></span>
          </div>
          <widget-modular
            ref="widgetModular"
            :data="widgetModular"
            :select.sync="widgetModularSelect"
          ></widget-modular>
          <div class="phone-footer">
              <span></span>
          </div>
        </el-main>
      </el-container>
      <!-- 右侧配置 -->
      <el-aside class="widget-config-container" :width="asideRightWidth">
        <el-tabs v-model="configTab" stretch>
          <el-tab-pane label="内容配置区" name="widget" lazy style="padding: 0 10px;">
            <widget-config :data="widgetModularSelect"></widget-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>


      <!-- 预览区 -->
      <el-drawer
        title="预览"
        :visible.sync="previewVisible"
        size="60%"
        :before-close="handleBeforeClose"
        class="drawer-box"
      ><div class="phone-header">
              <span class="leftspan"></span>
              <span class="rightspan"></span>
          </div>
        <!--表单配置项  双向绑定-->
        <!-- <avue-form v-if="previewVisible" :option="widgetFormPreview" v-model="widgetModels" ref="form" class="preview-form" ></avue-form> -->
        <widget-modular-item v-for="(column,index) in widgetModular.column" :key="index" :item="column"></widget-modular-item>
           <div class="phone-footer">
              <span></span>
          </div>
        <div class="drawer-foot">
          <el-button size="medium" type="primary" @click="handleBeforeClose">确定</el-button>
          <el-button size="medium" type="danger" @click="handleBeforeClose">取消</el-button>
        </div>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import Draggable from "vuedraggable"; //拖拽引入
import VJsonEditor from "v-jsoneditor"; //json格式引入
import fields from "../tooljs/fieldsConfig.js"; //左侧菜单区域
import WidgetModular from "./WidgetModular"; //左侧菜单区域
import WidgetConfig from "./WidgetConfig"; //左侧菜单区域
// import widgetEmpty from "../assets/widget-empty.png"; //空白展示区图片
import beautifier from "csvjson-json_beautifier";
import WidgetModularItem from './WidgetModularItem';
export default {
  name: "ModularDesign",
  components: { Draggable, VJsonEditor, WidgetModular, WidgetConfig,WidgetModularItem},
  props: {
    //属性声明
    options: {
      type: Object,
      default: () => {
        return {
          column: []
        };
      }
    },
    storage: {
      type: Boolean,
      default: false
    },
    asideLeftWidth: {
      type: [String, Number],
      default: "270px"
    },
    asideRightWidth: {
      type: [String, Number],
      default: "380px"
    }
  },
  watch: {
    //监听成员
    widgetModular: {
      //监听时时数据set到本地缓存中
      handler(val) {
        if (this.storage) {
          if (val.column && val.column.length > 0)
            localStorage.setItem("avue-modular", JSON.stringify(val));
          else localStorage.removeItem("avue-modular");
        }
      },
      deep: true
    },
    beautifierOptions: {
      //json美化事件调用
      handler(val) {
        if (this.storage) {
          localStorage.setItem(
            "avue-modular-beautifier-options",
            JSON.stringify(val)
          );
        }
      },
      deep: true
    },
    options: {
      handler(val) {
        this.transAvueOptionsToFormDesigner(val).then(res => {
          this.widgetModular = { ...this.widgetModular, ...res };
        });
      },
      deep: true
    }
  },
  computed: {
    //get set
    leftWidth() {
      if (typeof this.asideLeftWidth == "string") {
        return this.asideLeftWidth;
      } else {
        return `${this.asideLeftWidth}px`;
      }
    },
    rightWidth() {
      if (typeof this.asideRightWidth == "string") {
        return this.asideRightWidth;
      } else {
        return `${this.asideRightWidth}px`;
      }
    }
  },
  data() {
    return {
      // widgetEmpty,
      fields,
      widgetModular: {
        column: [],
        labelPosition: "left",
        labelSuffix: "：",
        labelWidth: 120,
        gutter: 0,
        menuBtn: true,
        submitBtn: true,
        submitSize: "medium",
        submitText: "提交1",
        emptyBtn: true,
        emptySize: "medium",
        emptyText: "清空",
        menuPosition: "center"
      },
      widgetModularSelect: {},
      widgetFormPreview:{},
      previewVisible:false,
      configTab: "widget",
      beautifierOptions: {
        enabled: false,
        space: 2,
        quoteType: "single",
        dropQuotesOnKeys: true,
        dropQuotesOnNumbers: false
      }
    };
  },
  mounted() {
    //基本都没用到先备用着
    this.handleLoadCss();
    // this.handleLoadStorage();
    this.loadBeautifierOptions();
  },
  methods: {
    // 组件初始化时加载本地存储中的options(需开启storage),若不存在则读取用户配置的options
    handleLoadStorage() {
      if (this.storage) {
        const form = localStorage.getItem("avue-modular");
        if (form)
          this.transAvueOptionsToFormDesigner(JSON.parse(form)).then(
            data => (this.widgetModular = data)
          );
      } else
        this.transAvueOptionsToFormDesigner({
          ...this.widgetModular,
          ...this.options
        }).then(data => (this.widgetModular = data));
    },
    // 获取JSON格式化属性
    loadBeautifierOptions() {
      const bo = localStorage.getItem("avue-modular-beautifier-options");
      if (bo) this.beautifierOptions = JSON.parse(bo);
    },
    // 加载阿里iconfront
    handleLoadCss() {
      const url = "//at.alicdn.com/t/font_1254447_rwaizg76pz.css";
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      window.document.head.appendChild(link);
    },
    // 预览 - 弹窗
    handlePreview () {
      if (!this.widgetModular.column || this.widgetModular.column.length == 0) this.$message.error("没有需要展示的内容")
      else {
        this.transformToAvueOptions(this.widgetModular).then(data => {
          this.widgetFormPreview = data
          this.previewVisible = true;
          
        })
      }
    },
    // 预览 - 弹窗 - 确定
    handlePreviewSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) this.$alert(this.widgetModels).catch(() => {
        })
      })
    },
    // 预览 - 弹窗 - 关闭前
    handleBeforeClose () {
      // this.$refs.form.resetForm();
      this.previewVisible = false
    },
    // 清空
    handleClear() {
      if (
        this.widgetModular &&
        this.widgetModular.column &&
        this.widgetModular.column.length > 0
      ) {
        this.$confirm("确定要清空吗？", "警告", {
          type: "warning"
        })
          .then(() => {
            this.widgetModular = { column: [] };
            this.widgetModularSelect = {};
          })
          .catch(() => {});
      } else this.$message.error("没有需要清空的内容");
    },
    /**
     * 获取需要复制的内容
     * @return {String}
     */
    // getCopyContent () {
    //   if (this.beautifierOptions.enabled) return beautifier(this.widgetModularPreview, this.beautifierOptions)
    //   else return JSON.stringify(this.widgetModularPreview, null, 2)
    // },

    // 表单设计器配置项 转化为 Avue配置项 -点击预览和json生成的时候调用
    transformToAvueOptions(obj) {
      return new Promise((resolve, reject) => {
        try {
          const data = this.deepClone(obj);
           for (let i = 0; i < data.column.length; i++) {
            const col = data.column[i]
            if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
              const c = col.children.column;
              c.forEach(item => {
                delete item.subfield
              })
              this.transformToAvueOptions(col.children).then(res => {
                col.children = res
              })
            } else if (col.type == 'group') {
              if (!data.group) data.group = []

              const group = {
                label: col.label,
                icon: col.icon,
                prop: col.prop,
              }
              this.transformToAvueOptions(col.children).then(res => {
                group.column = res.column
                data.group.push(group)
              })
              data.column.splice(i, 1)
              i--
            } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
              if (col.dicOption == 'static') {
                delete col.dicUrl
                delete col.dicMethod
                delete col.dicQuery
              } else if (col.dicOption == 'remote') {
                delete col.dicData
                if (col.dicQuery && col.dicQuery.length > 0) {
                  const query = {}
                  col.dicQuery.forEach(q => {
                    if (q.key && q.value) query[q.key] = q.value
                  })
                  col.dicQuery = query
                } else delete col.dicQuery
              }
              delete col.dicOption
            } else if (['upload'].includes(col.type)) {
              if (col.headers && col.headers.length > 0) {
                const headers = {}
                col.headers.forEach(h => {
                  if (h.key && h.value) headers[h.key] = h.value
                })
                col.headers = headers
              }

              if (col.data && col.data.length > 0) {
                const data = {}
                col.data.forEach(h => {
                  if (h.key && h.value) data[h.key] = h.value
                })
                col.data = data
              }
            }
          }
          
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
    // Avue配置项 转化为 表单设计器配置项
    transAvueOptionsToFormDesigner(obj) {
      const data = this.deepClone(obj);
      return new Promise((resolve, reject) => {
        try {
          // if (data.column && data.column.length > 0) {
          // }
          // if (data.group && data.group.length > 0) {
          // }
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../style/indexdemo.scss";
@import "../style/draggable.scss";
</style>
