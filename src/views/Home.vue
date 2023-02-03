<template>
  <div class="home-box">
    <div class="top-nav">
      <div class="logo-box">
        <img id="logo" src="../assets/icon.png" alt="" />
        <span class="mis-name">英语语法管理系统</span>
        <!-- 面包屑导航 -->
        <div class="bread-nav">
          <BraeadNav :breadItemArray="breadItemArray"></BraeadNav>
        </div>
      </div>
      <div>
        <el-menu
          :default-active="activeIndex"
          :ellipsis="false"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="selectHandler1"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">消息</el-menu-item>
          <el-sub-menu index="3">
            <template #title>昵称</template>
            <el-menu-item index="3-1">个人中心</el-menu-item>
            <el-menu-item index="3-2">仓库地址</el-menu-item>
            <el-menu-item index="3-3">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="main-content">
      <div class="left-nav">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          @select="selectHandler2"
        >
          <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
          <div class="virtical-align" v-for="menuitem in menuData">
            <el-sub-menu
              v-if="menuitem.hasOwnProperty('children')"
              :index="menuitem.index"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ menuitem.item }}</span>
              </template>
              <div
                class="virtical-align"
                v-for="secondClass in menuitem.children"
              >
                <el-sub-menu
                  v-if="secondClass.hasOwnProperty('children')"
                  :index="secondClass.index"
                >
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>{{ secondClass.item }}</span>
                  </template>
                  <el-menu-item
                    v-for="thirdClass in secondClass.children"
                    :index="thirdClass.index"
                  >
                    <el-icon><location /></el-icon>
                    <span>{{ thirdClass.item }}</span></el-menu-item
                  >
                </el-sub-menu>
                <el-menu-item v-else :index="secondClass.index"
                  ><el-icon><location /></el-icon>
                  <span>{{ secondClass.item }}</span></el-menu-item
                >
              </div>
            </el-sub-menu>
            <el-menu-item v-else :index="menuitem.index">
              <el-icon><location /></el-icon>
              <span>{{ menuitem.item }}</span></el-menu-item
            >
          </div>
        </el-menu>
      </div>
      <!-- 内容板块 -->
      <div class="router-module">
        <div class="tag-list">
          <NavTag
            v-for="item in tagsArrayStore.tagsArray"
            :menuItemName="item.menuName"
            :routerAddress="item.path"
          ></NavTag>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { usetagsArrayStore, useActivePathStore } from '../stores/index'

interface ObjType {
  index: string
  item: string
  routerAddress?: string
  children?: MenuDataArray
}
interface MenuDataArray {
  [index: number]: ObjType
  length: number
}
// 指定侧边导航栏的菜单项数据
const menuData = [
  { index: '1', item: '首页', routerAddress: '/home/welcome' },
  { index: '2', item: '系统描述', routerAddress: '/home/misdesc' },
  {
    index: '3',
    item: '用户信息',
    children: [
      {
        index: '3-1',
        item: '信息汇总',
        routerAddress: '/home/userinfo/infocollect'
      },
      {
        index: '3-2',
        item: '信息分析',
        routerAddress: '/home/userinfo/infoanalyse'
      }
    ]
  },
  {
    index: '4',
    item: '权限分配',
    children: [
      {
        index: '4-1',
        item: '超级管理员',
        routerAddress: '/home/power/manager'
      },
      { index: '4-2', item: '员工', routerAddress: '/home/power/employer' }
    ]
  },
  { index: '5', item: 'VIP管理', routerAddress: '/home/vipmanage' },
  {
    index: '6',
    item: '语法内容',
    children: [
      {
        index: '6-1',
        item: '内容汇总',
        children: [
          {
            index: '6-1-1',
            item: '高中',
            routerAddress: '/home/grammar/content/senior'
          },
          {
            index: '6-1-2',
            item: '初中',
            routerAddress: '/home/grammar/content/junior'
          },
          {
            index: '6-1-3',
            item: '小学',
            routerAddress: '/home/grammar/content/primary'
          }
        ]
      },
      {
        index: '6-2',
        item: '内容分析',
        children: [
          {
            index: '6-2-1',
            item: '高中',
            routerAddress: '/home/grammar/analyse/senior'
          },
          {
            index: '6-2-2',
            item: '初中',
            routerAddress: '/home/grammar/analyse/junior'
          },
          {
            index: '6-2-3',
            item: '小学',
            routerAddress: '/home/grammar/analyse/primary'
          }
        ]
      }
    ]
  },
  { index: '7', item: '书籍管理', routerAddress: '/home/bookmanage' },
  { index: '8', item: '推荐管理', routerAddress: '/home/recommendmanage' },
  {
    index: '9',
    item: '考试管理',
    children: [
      { index: '9-1', item: '真题汇总', routerAddress: '/home/examcollect' },
      { index: '9-2', item: '考点分析', routerAddress: '/home/examanalyse' }
    ]
  },
  { index: '10', item: '主题', routerAddress: '/home/theme' },
  { index: '11', item: '设置', routerAddress: '/home/settings' }
]
// 指定顶部导航菜单项数据
const topMenuData = [
  { index: '1', item: '首页', routerAddress: '/home/welcome' },
  { index: '2', item: '消息', routerAddress: '/home/message' },
  {
    index: '3',
    item: '昵称',
    children: [
      {
        index: '3-1',
        item: '个人中心',
        routerAddress: '/home/my'
      },
      {
        index: '3-2',
        item: '仓库地址',
        routerAddress: ''
      },
      {
        index: '3-3',
        item: '退出登录',
        routerAddress: ''
      }
    ]
  }
]
const activeIndex = ref('1')
const router = useRouter()
const tagsArrayStore = usetagsArrayStore()
const activePathStore = useActivePathStore()

// 传递给面包屑的数据数组
let breadItemArray: [string]

interface MenuItemObj {
  index?: string
  item?: string
  routerAddress?: string
}
// 方法功能：1|获取menuData末端的子项
// 2|根据menuData的index搜索item、routerAddress
// 3|方法功能：跳转路由并添加Tag
const selectHandler = (index: string, menuData: MenuDataArray) => {
  let tempArr = []
  for (let i = 0; i < menuData.length; i++) {
    if (!menuData[i].hasOwnProperty('children')) {
      tempArr.push(menuData[i])
    } else {
      let secondClass = menuData[i].children
      for (let j = 0; j < secondClass.length; j++) {
        if (!secondClass[j].hasOwnProperty('children')) {
          tempArr.push(secondClass[j])
        } else {
          let thirdClass = secondClass[j].children
          for (let m = 0; m < thirdClass.length; m++) {
            if (!thirdClass[m].hasOwnProperty('children')) {
              tempArr.push(thirdClass[m])
            }
          }
        }
      }
    }
  }
  for (let n = 0; n < tempArr.length; n++) {
    if (tempArr[n].index == index) {
      tagsArrayStore.addTag({
        menuName: tempArr[n].item,
        path: tempArr[n].routerAddress
      })
      router.push({ path: tempArr[n].routerAddress })
      activePathStore.updatePath(tempArr[n].routerAddress)
    }
  }
}
// 方法功能：根据点击的菜单路径，获取路径中菜单项名称组成的数组
// 方法功能：递归
// 1\递归的对象：menuData，menuData.children...
// 2\递归的条件：.hasOwnProperty('children')
// 3\递归的结果：如果递归对象中存在keyPath[++init]，就push到menuPathArray
const recorsion = (
  keyPath: [],
  data: MenuDataArray,
  menuPathArray: [string?] = [],
  init: number = -1
): [string] => {
  ++init
  for (let i = 0; i < data.length; i++) {
    if (data[i].index == keyPath[init]) {
      menuPathArray.push(data[i].item)
      if (data[i].hasOwnProperty('children')) {
        recorsion(keyPath, data[i].children, menuPathArray, init)
      }
      break
    } else {
      if (i == data.length - 1) {
        break
      }
    }
  }
  return menuPathArray
}
const selectHandler1 = (key: string, keyPath: []) => {
  selectHandler(key, topMenuData)
  breadItemArray = recorsion(keyPath, topMenuData)
}
const selectHandler2 = (key: string, keyPath: []) => {
  selectHandler(key, menuData)
  breadItemArray = recorsion(keyPath, menuData)
}

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
</script>

<style lang="less" scoped>
.home-box {
  display: flex;
  flex-direction: column;
  width: 100vw;
}
.top-nav {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: antiquewhite;
  .logo-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    height: 100%;

    #logo {
      width: 50px;
      height: 50px;
    }

    .mis-name {
      margin-left: 20px;
      margin-right: 20px;
      font-weight: 600;
    }
  }
}

.main-content {
  width: 100%;
  display: flex;

  .left-nav {
    // position: absolute;
    // left: 0;
    // top: 60px;
    width: 200px;
    height: 93vh;
    background-color: antiquewhite;
  }
}

.tag-list {
  display: flex;
}
@media screen and (max-width: 1000px) {
  .bread-nav {
    display: none;
  }
}
</style>
