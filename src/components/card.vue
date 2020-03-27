<template>
  <div>
    
    <el-form-item label="商品标题">
      <el-input v-model="data.title" placeholder="商品标题"></el-input>
    </el-form-item>
    <el-form-item label="描述信息">
      <el-input v-model="data.desc" placeholder="描述信息"></el-input>
    </el-form-item>
    <el-form-item label="商品价格">
      <el-input v-model="data.price" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="商品图片">
      <el-input v-model="data.thumb" placeholder="图片地址"></el-input>
    </el-form-item>
    <el-form-item label="商品数量">
      <el-input v-model="data.num" placeholder="数量" @blur="changeShopCar()" @keyup.enter.native="$event.target.blur" ></el-input>
    </el-form-item>
    <el-form-item label="商品标签">
      <el-input v-model="data.tag" placeholder="标签"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-card",
  props: ["data"],
  data(){
    return{
      username:'',
    }
  },
  // 失去焦点代码
//  
  // created(){
  //   //   加载页面时获取购物车本地数据
  //     this.getShopCar()
  // },
  methods:{
    // setName(){
      
    // },
    //获取本地商品数量
    // getShopCar(){
    //   console.log(this.data)
    //       this.data.num=localStorage.getItem('shopNum')
    //   },
    // //失去焦点事件
    changeShopCar(){
      // 当数量发生变化，将数量保存到本地存储中，在商品导航组件中获取本地存储的数据赋值给购物车的info属性，更新页面
      //问题，当出现多个商品卡片，数量会共享，购物车也不会增加
      //每次进行本地存储，添加唯一的id值，购物车数量为和
      //当页面被删除或者刷新，移除本地数据
      //Vuex更改方法
      this.$store.dispatch('changeNumAsync',{num:this.data.num})
      // 兄弟组件传值
      //  this.$emit('blur',this.data.num);
      //  console.log(this.data.num)
    }
  }
};
</script>