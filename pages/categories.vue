<script  setup>
import { getProductsStore } from "~/stores/getProducts";
const { data } = await useAsyncGql('getProductCategories');
const ProductsStore = getProductsStore()
const productCategories = data.value.productCategories?.nodes ;
const categories  = ref('')
useHead({
  title: `Categories`,
  meta: [{ name: 'description', content: 'All product categories' }],
  link: [{ rel: 'canonical', href: 'https://v3.woonuxt.com/categories' }],
});

onMounted(async () => {
  const fetchCategories = await ProductsStore.getCategoriesData()
  categories.value = fetchCategories.categories.value.data
  console.log(categories.value)

});
watch(categories)
</script>
<template>
  <main class="container">
    <div v-if="productCategories && productCategories.length" class="grid grid-cols-3 gap-4 my-6 md:grid-cols-4 lg:gap-8 xl:grid-cols-6">
      <CategoryCard v-for="(category, i) in categories" :key="i" :node="category" />
    </div>
  </main>
</template>
