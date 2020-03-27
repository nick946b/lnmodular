<template>
<div class="modshow">
    <component
      :is="getComponent(item.type)"
      :model="form[item.prop]"
      :item="item"
      :num="item.num"
      :thumb="item.thumb"
      :price="item.price"
      :desc="item.desc"
      :title="item.title"
      :tag="item.tag"
    >
      <template v-for="(dicData,index) in item.dicData">
        <component
          :key="index"
          :is="getComponent(dicData.secondtype)"
          :text="dicData.text"
          :icon="dicData.icon"
          :dot="dicData.dot"
          :info="dicData.info"
          :type="dicData.type"
           :color="dicData.color"
        ></component>
      </template>
    </component>
    </div>
</template>

<script>
export default {
  name: "widget-modular-item",
  props: ["item"],
  data() {
    return {
      form: {}
    };
  },
  created() {
    // this.getShopCar();
  },
  methods: {
    // getShopCar() {
    //   this.data.dicData[1].info = this.$store.state.num;
    // },
    getComponent(type) {
      //封装好的component在这里调用处理并返回各个组件的编辑数据 ？事件？
     
      // let KEY_COMPONENT_NAME = 'avue-';
      let KEY_COMPONENT_NAME = "van-";
      let result = "input"; //默认是input类型
       
      //  if($(".modshow").find(".van-goods-action").length==2&&type==="goods-action"){
      //     return;
      // }

      $(".modshow").find(".van-goods-action").each(function(index,e){
         var as = $(e).parent(".modshow").parent(".widget-modular-item").parent(".el-col-md-24");
        //  console.log(as);
            // as.css("position","fixed");
            // as.css("width","400px");
            // as.css("bottom","0");   
            $(e).css("position","relative");
            // $(e).parent(".modshow").parent(".widget-modular-item").css("bottom","55px");
            // console.log( $(e).parent(".modshow").parent(".widget-modular-item").find(".widget-action-clone"));
            // $(e).parent(".modshow").parent(".widget-modular-item").find(".widget-action-clone").remove();
            
      });

      // if(type === "goods-action"){
      //  var as = $(".modshow").find(".van-goods-action").parent(".modshow")
      //   .parent(".widget-modular-item").parent(".el-col-md-24");
      //   console.log($(".modshow").find(".van-goods-action").parent(".modshow").parent(".widget-modular-item").parent(".el-col-md-24"));
      //    as.css("position","fixed");
      //    as.css("width","400px");
      //    as.css("bottom","0");
      //   return;
      // }
      if (type === "card") result = "card";
      else if (type === "goods-action") result = "goods-action";
      else if (type === "button") result = "button";
      else if (type === "goods-action") result = "goods-action";
      else if (type === "goods-action-icon") result = "goods-action-icon";
      else if (type === "goods-action-button") result = "goods-action-button";
      
      return KEY_COMPONENT_NAME + result;
    },

    getPlaceholder(item) {
      const label = item.label;
      if (
        [
          "select",
          "checkbox",
          "radio",
          "tree",
          "color",
          "dates",
          "date",
          "datetime",
          "datetimerange",
          "daterange",
          "week",
          "month",
          "year"
        ].includes(item.type)
      )
        return `请选择12212${label}`;
      else return `请输入12212${label}`;
    }
  }
};
</script>
<style lang="scss">
</style>



