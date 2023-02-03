<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usetagsArrayStore, useActivePathStore } from '../stores/index'
const router = useRouter()
const tagsArrayStore = usetagsArrayStore()
const activePathStore = useActivePathStore()
const props = defineProps(['menuItemName', 'routerAddress'])
const toRouterAddress = () => {
  router.push({ path: props.routerAddress })
  activePathStore.updatePath(props.routerAddress)
}
let show = true
const closeTag = () => {
  show = false
  // 循环遍历对象数组，获取要删除元素的索引
  for (let i = 0; i < tagsArrayStore.tagsArray.length; i++) {
    if (
      tagsArrayStore.tagsArray[i].menuName === props.menuItemName &&
      tagsArrayStore.tagsArray[i].path === props.routerAddress
    ) {
      // 如果删除的元素不是activePath对应的标签页，直接删除
      // 如果删除的是activePath对应的标签页：
      // 1、且删除的不是最后一个元素，删除后router要转到下一个标签页
      // 2、或展出的是最后一个元素，删除后router要转到前一个元素
      if (props.routerAddress == activePathStore.activePath) {
        if (i != tagsArrayStore.tagsArray.length - 1) {
          router.push({ path: tagsArrayStore.tagsArray[i + 1].path })
          activePathStore.updatePath(tagsArrayStore.tagsArray[i + 1].path)
        } else {
          router.push({ path: tagsArrayStore.tagsArray[i - 1].path })
          activePathStore.updatePath(tagsArrayStore.tagsArray[i - 1].path)
        }
      }
      tagsArrayStore.removeTag({
        menuName: props.menuItemName,
        path: props.routerAddress
      })
    }
  }
}
</script>

<template>
  <div class="tag-box" :v-show="show" @click="toRouterAddress">
    {{ menuItemName }}
    <div @click.stop="closeTag">
      <el-icon v-if="menuItemName != '首页'" size="20" color="#fff"
        ><Close
      /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.tag-box {
  background-color: #42b983;
  display: flex;
  padding: 5px 8px;
  align-items: center;
  border-radius: 5px;
  margin: 3px 0 3px 3px;
  cursor: pointer;
}
</style>
