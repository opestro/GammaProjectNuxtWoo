<script setup>
const props = defineProps({
  products: { type: Array, default: null },
});
</script>

<template>
  <div class="grid">
    <div  v-if="products.nodes" v-for="product in products.nodes" :key="product"  class="grid border rounded-lg m-1 shadow-sm gap-8">
      <NuxtLink :to="'/product/' + product.slug" :title="product.name">
        <SaleBadge :node="product" class="absolute  top-2 right-2" />
        <div v-if="product.stock_status == 'outofstock'" class="flex justify-center bg-red-500 text-white rounded-lg my-1">Out
          of Stock</div>
        <img v-if="colorVariableImage" :src="colorVariableImage" :alt="product.image?.altText ?? product.name"
          :title="product.image?.title || product.name"  />
        <NuxtImg  width="220"
          :src="product.image?.sourceUrl || 'https://wp.gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
          :alt="product.image?.altText || product.name" :title="product.image?.title || product.name"
          :loading="index <= 3 ? 'eager' : 'lazy'" fit="outside" format="webp" densities="x1 x2" />
  
        <div class="p-2">
          <h2 class="mb-2 font-light leading-tight">{{ product.name }}</h2>
  
          <ProductPrice class="text-sm" :sale-price="product.rawSalePrice" :regular-price="product.rawRegularPrice + '  DA'" />
        </div>
      </NuxtLink>
     
    </div>
  </div>
</template>
