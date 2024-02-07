<script setup>
const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const route = useRoute();
const slug = route.params.slug;

const  fetchCategory_id = await useFetch('https://gama.soluve.cloud/categories',
 {
  params: { 'slug': slug }
})
const category_id = fetchCategory_id.data.value[0]?.id || 1
console.log(fetchCategory_id)
const  products = await useFetch('https://gama.soluve.cloud/products',
 {
  params: {'page': 1,'per_page': 20, 'stock_status': 'instock', 'orderby': 'popularity' , 'category': category_id }
})

setProducts(products.data?.value || []);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'product-category-slug') return;
    updateProductList();
  },
);

useHead({
  title: 'Products',
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div class="container flex items-start gap-16">
   <!--  <Filters :hide-categories="true" />  --> 

    <div class="w-full">
      <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
     <ProductResultCount /> 
        <OrderByDropdown class="hidden md:inline-flex" />
        <ShowFilterTrigger class="md:hidden" />
      </div>
      <ProductGrid :category="category_id" />
     <!--  <LazyNoProductsFound />  --> 
    </div>
  </div>
</template>
