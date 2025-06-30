const state = {
  data: {},
  // listeners: [],

  // 获取数据
  get(key) {
    return this.data[key];
  },

  // 设置数据
  set(key, value) {
    this.data[key] = value;
    // this.notifyListeners();
  },

  // // 监听数据变化
  // subscribe(callback) {
  //   this.listeners.push(callback);
  //   return () => {
  //     this.listeners = this.listeners.filter(cb => cb !== callback);
  //   };
  // },

  // // 通知所有监听器
  // notifyListeners() {
  //   this.listeners.forEach(cb => cb(this.data));
  // }
};

export default state;
