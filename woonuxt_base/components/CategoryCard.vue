<script setup lang="ts">
const { formatURI } = useHelpers();
interface Props {
  node: ProductCategory;
}

const { node } = defineProps<Props>();
const imageSrc = node.image?.src || '../static/images/logoOutline.webp';
const imgD = ref('http://gamaoutillage.net/wp-content/uploads/2024/02/logoOutline.png')
console.log(node)
</script>

<template>
  <div class=" items-center ">
    <NuxtLink v-if="node" :to="`/product-category/${formatURI(node.slug)}`"
      class=" flex justify-center    bg-white border-sky-600 hover:border-amber-500 hover:border-2 border-2  rounded-full ">
      <img width="300px" height="300px" v-if="imageSrc" class=" md:w-full md:h-32 sm:h-20 max-sm:h-20  p-5" :src="node.image?.src || imgD"
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
