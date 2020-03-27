<template>
  <div class="home">
        <van-sku
          v-model="show"
          :sku="sku"
          :goods="goods"
          :goods-id="goodsId"
          :quota="quota"
          :quota-used="quotaUsed"
          :hide-stock="sku.hide_stock"
          :message-config="messageConfig"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
     <!-- 左侧字段 -->
      <!-- <el-aside :width="leftWidth">
        <div class="fields-list">
          <div v-for="(field, index) in fields"
               :key="index">
            <div v-if="!field.disabled">
              <div class="field-title">{{field.title}}</div>
              <draggable tag="ul"
                         :list="field.list"
                         :group="{ name: 'form', pull: 'clone', put: false }"
                         ghost-class="ghost"
                         :sort="false">
                <li class="field-label"
                    v-for="(item, index) in field.list"
                    :key="index">
                  <a>
                    <i class="icon iconfont"
                       :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </draggable>
            </div>
            <div v-else>
              <div class="field-title">{{field.title}}
                <span class="danger">（开发中）</span>
              </div>
              <ul>
                <li class="field-label-disabled"
                    v-for="(item, index) in field.list"
                    :key="index">
                  <a>
                    <i class="icon iconfont"
                       :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-aside> -->
  </div>
</template>

<script> 
// @ is an alias to /src
import Draggable from 'vuedraggable'
import VJsonEditor from 'v-jsoneditor'
import fields from '../tooljs/fieldsConfig.js'

export default {
  // name: 'group',
  // components: {
  //   group
  // }
   data() {
    return {
      show: true,
      sku: {
        price: '1.00',
        stock_num: 227,
        none_sku: false,
        hide_stock: false,
        collection_id: 2261,
        tree: [
      {
        k: '颜色',
        k_id: '1',
        v: [
          {
            id: '30349',
            name: '天蓝色',
            imgUrl:
              'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg',
          },
          {
            id: '1215',
            name: '白色',
          },
        ],
        k_s: 's1',
        count: 2,
      },
      {
        k: '尺寸',
        k_id: '2',
        v: [
          {
            id: '1193',
            name: '1',
          },
          {
            id: '1194',
            name: '2',
          },
        ],
        k_s: 's2',
        count: 2,
      },
    ],
    list: [
      {
        id: 2259,
        price: 100,
        discount: 100,
        code: '',
        s1: '1215',
        s2: '1193',
        s3: '0',
        s4: '0',
        s5: '0',
        stock_num: 110,
        goods_id: 946755,
      },
      {
        id: 2260,
        price: 100,
        discount: 100,
        code: '',
        s1: '1215',
        s2: '1194',
        s3: '0',
        s4: '0',
        s5: '0',
        stock_num: 0,
        goods_id: 946755,
      },
      {
        id: 2257,
        price: 100,
        discount: 100,
        code: '',
        s1: '30349',
        s2: '1193',
        s3: '0',
        s4: '0',
        s5: '0',
        stock_num: 111,
        goods_id: 946755,
      },
      {
        id: 2258,
        price: 100,
        discount: 100,
        code: '',
        s1: '30349',
        s2: '1194',
        s3: '0',
        s4: '0',
        s5: '0',
        stock_num: 6,
        goods_id: 946755,
      },
    ],
    messages: [
      {
        datetime: '0',
        disable: false,
        multiple: '0',
        name: '商品留言',
        type: 'text',
        required: '1',
      },
      {
        datetime: '0',
        disable: false,
        multiple: 0,
        name: '身份证号',
        type: 'id_no',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        multiple: 0,
        name: '留言3',
        type: 'image',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        multiple: 1,
        name: '留言4',
        type: 'text',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        name: '数字',
        multiple: 0,
        type: 'tel',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        name: '邮件',
        multiple: 0,
        type: 'email',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        name: '日期',
        multiple: 0,
        type: 'date',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        name: '时间含日期',
        multiple: 0,
        type: 'time',
        required: 0,
      },
      {
        datetime: '0',
        disable: false,
        name: '时间',
        multiple: 0,
        type: 'time',
        required: 0,
      },
    ],
  },
      goods: {
  // 默认商品 sku 缩略图
  picture: 'https://img.yzcdn.cn/1.jpg'
},
      messageConfig: {
      // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
  uploadImg: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
    });
  },
  // 最大上传体积 (MB)
  uploadMaxSize: 3,
  // placeholder 配置
  placeholderMap: {
    
     
  },
  // 初始留言信息
  // 键：留言 name
  // 值：留言内容
  initialMessages: {
    留言: '留言信息'
  }
      }
    };
  }
}
</script>