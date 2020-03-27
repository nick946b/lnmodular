<template>
  <div>
    
    <el-form-item label="图标1文本">
      <el-input v-model="data.dicData[0].text" placeholder="文本"></el-input>
    </el-form-item>
    <el-form-item label="图标1样式">
      <el-input v-model="data.dicData[0].icon" placeholder="样式"></el-input>
    </el-form-item>
    <el-form-item label="图标1是否显示小红点">
      <el-switch v-model="data.dicData[0].dot" placeholder="数量"></el-switch>
    </el-form-item>
    <el-form-item label="图标2文本">
      <el-input v-model="data.dicData[1].text" placeholder="描述信息"></el-input>
    </el-form-item>
    <el-form-item label="图标2样式">
      <el-input v-model="data.dicData[1].icon" placeholder="样式"></el-input>
    </el-form-item>
    <el-form-item label="图标2数量">
      <el-input v-model="data.dicData[1].info" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="图标3文本">
      <el-input v-model="data.dicData[2].text" placeholder="文本"></el-input>
    </el-form-item>
    <el-form-item label="图标3样式">
      <el-input v-model="data.dicData[2].icon" placeholder="样式"></el-input>
    </el-form-item>
    <el-form-item label="图标3数量">
      <el-input v-model="data.dicData[2].info" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="按钮1文本">
      <el-input v-model="data.dicData[3].text" placeholder="文本"></el-input>
    </el-form-item>
    <el-form-item label="按钮1样式">
      <el-input v-model="data.dicData[3].color" placeholder="样式"></el-input>
    </el-form-item>
    <el-form-item label="按钮2文本">
      <el-input v-model="data.dicData[4].text" placeholder="文本"></el-input>
    </el-form-item>
    <el-form-item label="按钮2样式">
      <el-input v-model="data.dicData[4].color" placeholder="样式"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-goods-action",
  props: ["data"],
  data(){
    return{
      
    }
  },
  
  created(){
    //   加载页面时获取购物车本地数据
      this.getShopCar()
  },
  methods:{
      getShopCar(){
          this.data.dicData[1].info=this.$store.state.num
      }
  }
};
</script>