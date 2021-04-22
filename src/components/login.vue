<template>
  <div>
    <p>这是登录组件，使用 .vue 文件定义出来的 --- {{ msg }}</p>
  </div>
</template>

<script>
// 在 ES6中，也通过 规范的形式，规定了 ES6 中如何 导入 和 导出 模块
//  ES6中导入模块，使用   import 模块名称 from '模块标识符'    import '表示路径'

// 在 ES6 中，使用 export default 和 export 向外暴露成员：
export default {
  data() {
    return {
      msg: "这是登录组件中的msg",
    };
  },
  created() {
    console.log("调用了登录子组件中的show方法");
  },
};

// 注意： export default 向外暴露的成员，可以使用任意的变量来接收
// 注意： 在一个模块中，export default 只允许向外暴露1次
// 注意： 在一个模块中，可以同时使用 export default 和 export 向外暴露成员
</script>


<!-- lang 属性：普通的 style 标签只支持 普通的css 样式，如果想要启用 scss 或 less ，需要为 style 元素，设置 lang='less' lang='scss' 属性
   scoped 属性： 开启 scoped 属性，本质上是属性选择器控制 当前组件内作用域生效
 -->
<style lang='scss' scope>
    body {
        div {
            font-style: italic;
        }
    }
</style>