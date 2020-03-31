<template>
  <div class="kuandai">
    <template v-if="showEl1">
          <div style="margin-top: 20px" class="choseTab" >
            <span class="choseTab_title">{{item.label1+':'}}</span>
            <ul class="clearFix">
              <li v-for="(el,index) in item.dateContent" :key="index" @click="clikeItem($event)"><p>{{el.text}}</p></li>
            </ul>
          </div>
      </template>
      <template v-if="showEl2">
        <div style="margin-top: 20px" class="choseTab2">
          <span class="choseTab_title">{{item.label2+':'}}</span>
          <ul class="clearFix">
            <li v-for="(el1,index1) in item.dateText" :key="index1" @click="clikeItem($event)"><p>{{el1.text}}</p></li>
          </ul>
        </div>
    </template>
    <template v-if="showEl3">
        <div style="margin-top: 20px" class="choseTab3">
          <span class="choseTab_title">{{item.label3+':'}}</span>
          <ul class="clearFix">
            <li v-for="(el2,index2) in item.dateTv" :key="index2" @click="clikeItem($event)"><p>{{el2.text}}</p></li>
          </ul>
        </div>
    </template>
    <template v-if="showEl4">
        <div style="margin-top: 20px" class="choseTab">
          <span class="choseTab_title">{{item.label4+':'}}</span>
          <ul class="clearFix">
            <li v-for="(el3,index3) in item.dateCard" :key="index3" @click="clikeItem($event)"><p>{{el3.text}}</p></li>
          </ul>
        </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "van-options",
  props: ["item"],
     data() {
      return {
        radio:"",
        radio1:"",
        radio3:1
      }
    },
    computed:{
      showEl1(){
       if(this.item.form.indexOf(0)>-1){
          return true
       }
      },
      showEl2(){
        if(this.item.form.indexOf(1)>-1){
           return true
        }
      },
      showEl3(){
       if(this.item.form.indexOf(2)>-1){
          return true
       }
      },
      showEl4(){
        if(this.item.form.indexOf(3)>-1){
           return true
        }
      }
    },
    methods:{
      clikeItem(e){
        let thisDom=e.currentTarget;
       $(thisDom).click(function(){
          $(this).find('p').addClass('active');
          $(this).siblings().find('p').removeClass('active');
       })
      }
    }
};

</script>

<style scoped>
h5{
  text-align: left;
  margin: 20px 0;
}
.van-radio-group{
  margin-top: 5px;
  font-size: 16px;
  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
.choseTab ul li{
  float: left;
  width: 25%;
}
.choseTab3 ul li{
  float: left;
  width: 50%;
}
.choseTab ul li p,
.choseTab2 ul li p,
.choseTab3 ul li p{
  width:85%;
  background-color: red;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  background-color: #FFFFFF;
  border: 1px solid #EEEEEE;
}
.active{
  border: 2px solid #409EFF!important;
}
.choseTab_title{
  text-align: left;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
}
</style>
