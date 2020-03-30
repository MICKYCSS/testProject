// 1. 假设递归函数已经写好
// 2. 寻找递推关系
// 3. 将递推关系的结构转换为递归体
// 4. 将临界条件加入到递归体中
// 场景：数组的扁平化
// 场景：实现数组的扁平化——递归
const arr1 = [1,2,[3,4,[5,6,[7,8]]]]
function flatten(arr){
  let result = []
  arr.forEach(f=>{
    if(Array.isArray(f)){
      result = result.concat(flatten(f))//将扁平化过后的数组加入结果数组中
    }else{
      // 临界值：不为数组
      result.push(f)
    }
  })
  return result
}
console.log(flatten(arr1))
// 场景：递归实现级联选择器的回显,递归函数的入参为递归对象和层级
let labels = [
  {
    name:"1",
    children:[
      {
        name:"1.1",
        children:[

        ]
      }
    ]
  },
  {
    name:"2",
    children:[
    ]
  },
  {
    name:"3",
    children:[
    ]
  }
]
function getSelect(name,treeData){
  let depth=0// 记录递归层级
  let resultArr=[]//记录返回的数组结果
  let arr=[]
  let childrenEach = (childrenData,depthN)=>{
    childrenData.forEach(f=>{
      // 获得上一次递归的层级
      depth = depthN
      arr[depthN]=f.name//获得对应层级的name
      if(f.name===name){
        resultArr = arr.slice(0,depthN+1)
      }else{
        // 找不到往下一层级继续递归
        depth++
        childrenEach(f.children,depth)
      }
    })
    //跳出递归后返回结果
    return resultArr
  }
  // 进入第一次递归
  return childrenEach(treeData,depth)

}
// console.log(getSelect('1.1',labels))
// 场景：递归实现深拷贝
// https://juejin.im/post/5bc1ae9be51d450e8b140b0c#heading-5
const testObj = {
  name:'1',
  children:[
    {
      name:'1.1',
      children:[{
        name:'1.1.1'
      }]
    }
  ]
}
function deepCopy(obj){
  /*
  方法存在的问题
  1.没有对参数做校验
  2.判断是否为对象的逻辑不够严谨
  3.没有考虑数组的兼容,target直接是为{}
*/
  let target={}
  for(let i in obj){
    if(typeof obj[i] === 'object'){
      target[i] = deepCopy(obj[i])
    }else{
      //临界点
      target[i] = obj[i]
    }
  }
  return target
}
let copyObj = deepCopy(testObj)
console.log(copyObj)
function deepCopy2(obj){
  // 判断是否为对象
  if (typeof obj !== 'object') return;
  // 区分对象和数组
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
  }
  return newObj;
}
// console.log(deepCopy2(testObj))
// 判断是否为对象
function isObject(obj){
  return Object.prototype.toString.call(obj)==='[object object]'
}
