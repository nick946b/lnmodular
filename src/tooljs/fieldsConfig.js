import { Button } from "vant";

export default [
  {
    title: '业务组件',
    list: [
      // {
      //   type: 'input',
      //   label: '单行文本',
      //   icon: 'icon-input',
      //   span: 24,
      //   display: true
      // } ,
      {
      types: 'van',
      type: 'card',
      icon: 'icon-input',
      label: '商品卡片',
      span:24,
      num: "2",
      price: "2.00",
      desc: '描述信息',
      tag: '标签',
      thumb: 'https://img.yzcdn.cn/vant/ipad.jpeg',
      title: '商品标题',
      dicData:[{
        secondtype: 'button',
        size:'mini',
        title:'标签1'
      },
      {
        secondtype: 'button',
        sizi:'mini',
        title:'标签2'
      },{
        secondtype: 'tag',
        type:"danger",
        text:'标签2'
      },{
        secondtype: 'tag',
        type:"danger",
        text:'标签2'
      },]
    },
    {
      types: 'van',//组件类型avue或者van
      type: 'goods-action',//组件匹配关键字
      label: '商品导航',//组件名成
      icon: 'icon-tree',//代表图标
      span: 24,//默认表单栅格24
      display: true,//是否可见
      dicOption: 'static',//字典配置远端数据获取或者本地 -- 
      dicData: [{
        secondtype: 'goods-action-icon',
            id:1,
            text: '客服',
            icon: 'chat-o',
            dot: true,//是否展示红点
          },{
            secondtype: 'goods-action-icon',
            id:2,
            text: '购物车1',
            icon: 'cart-o',
            info: "5"//消息数量
            },{
            secondtype: 'goods-action-icon',
            id:3,
            text: '店铺',
            icon: 'shop-o',
            info: '12'//消息数量
         
        },{secondtype: 'goods-action-button', 
            text: '加入购物车',
            type: 'warning',
            color: '#7EC0EE',
          },{
            secondtype: 'goods-action-button', 
            text: '立即购买',
            type: 'danger',
            color: '#1E90FF',
          
    }]
    }
  ]
  },
  
]
