// API配置文件
const config = {
    // 开发环境
    development: {
        baseUrl: 'http://192.168.162.173:8080'
    },
    // 生产环境
    production: {
        baseUrl: 'http://192.168.162.173:8080'
    }
}

// 根据环境返回对应的配置
export default config[process.env.NODE_ENV || 'development'] 