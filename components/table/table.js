Component({
  properties: {
  tableThemes: {
  type: Object, // 因此处的thead是json格式，故将数据类型设置为object
  // value: '' //默认值
  },
  tableItems: {
  type: Array,
  },
  },
  data: {
  someData: {} // 暂未设置，跟其他页面的data属性和用法类似
  },
  methods: {
  customMethod: function() {
  // 暂为定义
  }
  }
  });
  
