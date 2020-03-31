<template>
  <div class="widget-modular-container"> 
    <el-form :label-position="data.labelPosition || 'left'" :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px' "
             :label-suffix="data.labelSuffix" :model="form" ref="widgetForm" size="small">
      <el-row :gutter="data.gutter">
        <draggable class="widget-form-list" :list="data.column" :group="{ name: 'form' }" ghost-class="ghost"  :animation="300"
                   @add="handleWidgetAdd">
          <template v-for="(column, index) in data.column">
            <div class="widget-form-group" v-if="column.type == 'group'" :key="index"
                 :class="{ active: selectWidget.prop == column.prop }"
                 @click="handleSelectWidget(index)">
              <widget-form-group :data="data" :column="column" :index="index" :select.sync="selectWidget"></widget-form-group>
            </div>
            <el-col v-else :key="index" :md="column.span || 12" :xs="24" :offset="column.offset || 0">
               <!--标题 :label="column.label" -->
              <el-row class="widget-modular-item" :prop="column.prop"
                            :class="{ active: selectWidget.prop == column.prop, 'required': column.required }"
                            @click.native="handleSelectWidget(index)">
                        <widget-modular-item :item="column"></widget-modular-item>
                        <el-button title="删除1"
                           @click.stop="handleWidgetDelete(index)"
                           class="widget-action-delete"
                           v-if="selectWidget.prop == column.prop"
                           circle
                           plain
                           size="small"
                           type="danger">
                        <i class="iconfont icon-delete"></i>
                        </el-button>
                        <el-button title="复制1" @click.stop="handleWidgetClone(index)"  class="widget-action-clone"
                                  v-if="selectWidget.prop == column.prop"
                                  circle
                                  plain
                                  size="small"
                                  type="primary">
                          <i class="iconfont icon-copy"></i>
                        </el-button> 
               </el-row>
               
            </el-col>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </div>
   
</template>

<script>
import Draggable from "vuedraggable";
import WidgetModularItem from "./WidgetModularItem"; //负责判断展示某组件逻辑
export default {
  name: "widget-modular",
  components: { Draggable, WidgetModularItem },
  props: ["data", "select"],
  data() {
    return {
      selectWidget: this.select,
      form: {}
    };
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index];
    },
    handleWidgetAdd(evt) {
      //生成新数组
      const newIndex = evt.newIndex;
      // 深拷贝数据
      const data = this.deepClone(this.data.column[newIndex]);
      // 如果
      if (!data.prop)
        data.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      // 删除icon，subfield，占位
      delete data.icon;
      delete data.subfield;
      // 为对象添加新数据
      this.$set(this.data.column, newIndex, { ...data });
      this.handleSelectWidget(newIndex);
    },
    // 删除
    handleWidgetDelete(index) {
      console.log(this.data.column.length);
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {};
        else this.handleSelectWidget(index - 1);
      } else this.handleSelectWidget(index + 1);

      this.$nextTick(() => {
        this.data.column.splice(index, 1);
      });
    },
    // 复制
    handleWidgetClone(index) {
      let cloneData = this.deepClone(this.data.column[index]);
      cloneData.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      this.data.column.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1);
      });
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val); //触发父组件update
      },
      deep: true
    }
  }
};
</script>
