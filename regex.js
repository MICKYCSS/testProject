// https://juejin.im/post/5965943ff265da6c30653879#comment
// 正则表达式
let reg = /\.(jpe?g|png)$/i //表示不区分大小写
// console.log(reg.test('.png'))
let reg2 = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$///媒体文件/
console.log(reg2.test('.mp4'))