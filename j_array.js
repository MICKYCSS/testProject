// 场景：简单的数组去重
const arr = [1,1,2,2,3,3,3,4,5,5]
// console.log('before',arr)
function filterArr1(arr){
  // 1.根据findIndex只能找到符合条件的第一个元素
  return arr.filter((item,index,self)=>{
    return self.indexOf(item) === index
  })

}
function filterArr2(arr){
  // 2.根据Set的不重复特性,将Set结构转换为数组
  return [...new Set(arr)]
}
console.log(filterArr1(arr))
// 场景：根据某个属性实现对象数组去重
const objArr = [
  {
    name:'a',
    age:11
  },
  {
    name:'a',
    age:11
  },
  {
    name:'b',
    age:12
  },
  {
    name:'c',
    age:13
  },
  {
    name:'c',
    age:13
  }
]
function filter1(arr,key){
  // 找到第一个元素之后过滤掉之后的元素——findIndex只能找到符合条件的第一个元素
  return arr.filter((item,index,self)=>{
    return self.findIndex(f=>f[key]===item[key])===index
  })
}
function filter2(arr,key){
  let map = new Map()
  arr.forEach(item=>{
    // map结构能够判断属性是否唯一，把key的值也就是item[key]作为属性
    if(!map.has(item[key])){
      map.set(item[key],item)
    }
  })
  // 返回map的values
  return [...map.values()]
}
// function filter3(arr,key){
//   let obj = {}
//   arr.reduce((prev,next)=>{
//     obj[next[key]] ? '' : obj[next[key]] = true && prev.push(next)
//     return prev
//   },[])
// }
// console.log(filter2(arr,'name'))
//
// 场景：实现数组的扁平化——递归
const arr1 = [1,2,[3,4,[5,6,[7,8]]]]
function flatten(arr){
  let result = []
  arr.forEach(f=>{
    if(Array.isArray(f)){
      result = result.concat(flatten(f))
    }else{
      result.push(f)
    }
  })
  return result
}
console.log(flatten(arr1))
// 上传
{/* <el-upload
ref="upload"
action=""
multiple
list-type="picture-card"
:http-request="uploadImages"
>
<el-button size="small" type="primary">点击上传</el-button>
</el-upload>
axios.Axios.prototype.formdata = function (url, data, cfg) {
  const config = { headers: { 'Content-Type': 'multipart/form-data' }, ...cfg }
  let formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }
  return this.post(url, formData, config)
}
async uploadImages (params) {
  const result = await axios.bi.get(GET_TOKEN_API)
  const res = result.sign
  const urlKey = this.unionid()
  this.action = res.host

  await axios.formdata(res.host, {
    OSSAccessKeyId: res.accessid,
    signature: res.signature,
    key: urlKey,
    policy: res.policy,
    success_action_status: 200,
    file: params.file
  })
  let uploadPic = {
    boxId: '',
    createdAt: '',
    flagStatus: 0,
    goldenStatus: 0,
    handleStatus: 0,
    id: 0,
    labelName: '',
    picId: this.picId,
    picUrl: `${this.action}/${urlKey}`,
    unionId: '',
    updatedAt: '',
    xmax: 0.6,
    ymax: 0.8,
    xmin: 0.2,
    ymin: 0.2,
    // isUpload: 1,
    type: 1
  }
  if (this.submitImgNum < 20) {
    this.data.push(uploadPic)
    this.$message({
      type: 'success',
      message: '图片上传成功'
    })
    this.searchImg.uploadNumber++
    this.searchImg.allNumber++
    this.submitImgNum++
    console.log(this.submitImgNum)
  } else {
    this.$message.warning('图片数量已达上限，请删除某个图片后再试')
    return false
  }
}
<MarkImage
@onview="viewBigPic(item.picUrl)"
:is-show-zoom="false"
v-bind="item"
:img-index="index"
:src="item.picUrl|notExif"
:another-class="{'green-border':!item.flagStatus}"
@mouseUp="onMouseUp($event,item)"
/>
imgDataList () {
  const filters = {
    0: f => !f.handleStatus,
    1: f => !f.flagStatus && !f.type && !f.handleStatus,
    2: f => f.flagStatus && !f.handleStatus,
    3: f => f.type
  }
  return this.data.filter(filters[this.imgStatus])
} */}
