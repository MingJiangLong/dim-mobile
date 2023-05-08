const isProd = process.env.NODE_ENV === 'production'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: isProd ? '/dim-mobile' : '',// 打包导入文件统一加前缀
  assetPrefix: isProd ? '/dim-mobile' : '',
  env: {
    imagePathPrefix: isProd ? '/dim-mobile' : ''//不可以用
  },

}

module.exports = nextConfig
