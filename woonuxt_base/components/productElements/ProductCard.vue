<script setup>
const { formatURI } = useHelpers();
const route = useRoute();
const props = defineProps({
  node: { type: Object, default: null },
  index: { type: Number, default: 1 },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 1.125);

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query.filter);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed(() => props.node?.image?.sourceUrl);

const colorVariableImage = computed(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes.nodes.some((attribute) => paColor.value.some((color) => attribute.value.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage && activeColorImage.length) {
      return activeColorImage[0].image?.sourceUrl;
    }
  }
  return null;
});
</script>

<template>
  <div class="relative product-card">
    <NuxtLink :to="`/product/${formatURI(node.slug)}`" :title="node.name">
      <SaleBadge :node="node" class="absolute top-2 right-2" />
      <div v-if="node.stock_status == 'outofstock'" class="flex justify-center bg-red-500 text-white rounded-lg my-1">Out of Stock</div>
      <img
        v-if="colorVariableImage"
        :src="colorVariableImage"
        :alt="node.image?.altText ?? node.name"
        :title="node.image?.title || node.name"
        :loading="index <= 3 ? 'eager' : 'lazy'" />
      <NuxtImg
        :width="imgWidth"
        :height="imgHeight"
        :src="mainImage || node.images[0]?.src || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
        :alt="node.image?.altText || node.name"
        :title="node.image?.title || node.name"
        :loading="index <= 3 ? 'eager' : 'lazy'"
        fit="outside"
        format="webp"
        densities="x1 x2" />
    </NuxtLink>
    <div class="p-2">
    
      <NuxtLink :to="`/product/${formatURI(node.slug)}`" :title="node.name">
        <h2 class="mb-2 font-light leading-tight">{{ node.name }}</h2>
      </NuxtLink>
      <ProductPrice class="text-sm" :sale-price="node.sale_price" :regular-price="node.regular_price+'  DA'" />
    </div>
  </div>
</template>

<style lang="postcss">
.product-card img {
  @apply rounded-lg object-top object-cover w-full;
  aspect-ratio: 1/1.125;
}
.product-card:hover {
  h2 {
    @apply text-primary;
  }
}
</style>
