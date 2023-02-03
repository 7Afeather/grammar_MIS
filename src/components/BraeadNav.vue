<template>
  <div class="bread-box">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in breadItemArray" to="">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
export interface Props {
  breadItemArray: string[]
}

const props = withDefaults(defineProps<Props>(), {
  breadItemArray: () => ['首页']
})
</script>

<style lang="less" scoped>
.bread-box {
  user-select: none;
  cursor: default;
}
</style>
