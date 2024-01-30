<script setup lang="ts">
const { formatURI } = useHelpers();
interface Props {
  node: ProductCategory;
}

const { node } = defineProps<Props>();
  
</script>

<template>

   <NuxtLink  v-if="node"
   :to="`/product-category/${formatURI(node.slug)}`"
   class="flex justify-start items-center max-sm:text-xs text-base hover:text-black  border bg-sky-600 text-white  rounded-full px-2 py-1   hover:bg-amber-500 shadow-lg  ">
  <Icon name="ion:arrow-forward-outline" class="mx-1"></Icon> <span class="truncate">{{ node.name }}</span> 
  </NuxtLink>
  
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>
