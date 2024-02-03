<script setup lang="ts">
const { formatURI } = useHelpers();
interface Props {
  node: ProductCategory;
}

const { node } = defineProps<Props>();
const imageSrc = node.image?.src || '/images/placeholder.jpg';
console.log(node)
</script>

<template>
  <div class=" items-center ">
    <NuxtLink v-if="node" :to="`/product-category/${formatURI(node.slug)}`"
      class=" flex justify-center  border border-white bg-white hover:border-amber-500 hover:border-1  rounded-full ">
      <NuxtImg width="300px" height="300px" v-if="node.image?.src" class=" w-32 h-32 p-5" :src="imageSrc"
        :alt="node.image?.altText || node.name" :title="node.image?.title || node.name" loading="lazy" fit="inside"
        format="webp" densities="x1 x2" />
    </NuxtLink>
    <div class=" flex justify-center  ">
      <div class="text-sm font-semibold   capitalize md:text-base   truncate" >
        {{ node.name }}
      </div>
    </div>
    
    
  </div>
</template>

<style lang="postcss" scoped>
.item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  aspect-ratio: 4 / 5;
}
</style>
