import { defineStore } from 'pinia'

interface infoType {
  menuName?: string,
      path?: string
}
interface State {
  tagsArray:[infoType?]
}
export const usetagsArrayStore = defineStore('tagsArray', {
  state: ():State => {
    return {
      tagsArray:[{
        menuName: '首页',
        path: '/home/welcome'
      }]
    }
  },
  getters: {
    // tagsArray:(state)=> state.tagsArray
  },
  actions: {
    addTag(tag:infoType) {
      // 使用some方法判断数组中是否存在某个对象
      if(!this.tagsArray.some(item => item.menuName === tag.menuName&&item.path === tag.path)) this.tagsArray.push(tag)
    },
    removeTag(tag:infoType) {
      // 循环遍历对象数组，获取元素的索引
      for (let i = 0; i < this.tagsArray.length; i++) {
        if(this.tagsArray[i].menuName === tag.menuName&&this.tagsArray[i].path === tag.path) {
          this.tagsArray.splice(i, 1)
        }
      }
    },
  },
})

interface State1 {
  activePath:string
}
export const useActivePathStore = defineStore('activePath', {
  state: ():State1 => ({activePath:''}),
  getters: {
    // activePath:(state)=>{
    //   return state.activePath
    // }
  },
  actions: {
    updatePath(pathstr:string){
      this.activePath = pathstr
      window.sessionStorage.setItem('activePath',pathstr)
    }
  },
})