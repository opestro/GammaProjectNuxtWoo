<script setup>
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();
const searchQuery = ref(getSearchQuery());
import { getProductsStore } from "~/stores/getProducts";
const searchMethod = getProductsStore()
let searchData = ref({
  showResults: false,
  filteredResults: []
})
const reset = () => {
  clearSearchQuery();
  searchQuery.value = '';
};
async function searchProducts() {
  //console.log()
  const data = await searchMethod.searchingProduct(searchQuery.value)
  searchData.value = {
    showResults: true,
    filteredResults: toRaw(toRaw(data).productsBySearch)
  }

  console.log(searchData)
}

watch(getSearchQuery, (value) => {
  if (!value) reset();
});
</script>

<template>
  <form class="relative items-center flex-1 -space-x-px rounded-md shadow-sm"
    @submit.prevent="setSearchQuery(searchQuery)">
    <Icon name="ion:search-outline" size="20" class="absolute z-10 opacity-50 pointer-events-none left-2" />
    <input v-model="searchQuery" @input="searchProducts" type="text" :placeholder="$t('messages.shop.searchProducts')"
      class="z-0 inline-flex items-center w-full p-2 pl-10 text-sm text-gray-500 border border-gray-300 rounded-md shadow-inner outline-none bg-gray-50 shadow-gray-200" />
    <ul v-show="searchData.showResults && searchQuery !== ''"
      class="absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded-md shadow-md top-10">

      <li v-for="result in searchData.filteredResults" :key="result"
        class=" px-4 py-2 cursor-pointer hover:bg-gray-100">
        <NuxtLink :to="'/product/' + result.slug" @click="searchData.showResults= false , searchQuery = ''" class="flex items-center">
          <NuxtImg v-if="result.images[0]" :src="result.images[0]?.src" class="border mr-2 rounded-full w-14 h-14"></NuxtImg>
          {{ result.name }}
        </NuxtLink>
      </li>
    </ul>
    <span v-if="searchQuery"
      class="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer bg-primary bg-opacity-10 text-primary right-2"
      @click="reset">
      <span>{{ $t('messages.general.clear') }}</span>
      <Icon name="ion:close-outline" size="18" />
    </span>
  </form>
</template>
