<template>
  <div @click="saveActivePath">登录</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useActivePathStore } from '../stores/index'
const router = useRouter()
const activePathStore = useActivePathStore()
// 登录成功后
const saveActivePath = () => {
  activePathStore.updatePath('/home/welcome')
  router.push('/home')
}
</script>

<style lang="less" scoped></style>
