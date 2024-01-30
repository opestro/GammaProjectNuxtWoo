<script setup >

const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();
const toggleSearch = ref(false)
const searchQuery = ref(getSearchQuery());
import { getProductsStore } from "~/woonuxt_base/stores/getProducts";
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
</script>

<template>
    <div>
        <div class=" ">
            <div class="flex items-center relative  bottom-2   justify-center ">
                <div class="container absolute bottom-0 flex pt-5 items-center">
                    <div class="flex-grow border-t border-gray-400"></div>
                </div>
                <div class="absolute bg-white rounded-md max-sm:invisible visible  shadow-md w-10/12 sm:w-8/12 md:w-96">
                    <div class="p-2 px-4 ">
                        <div class="flex items-center ">
                            <Icon name="ion:search-outline" size="20" class="mr-2 md:mr-2" />
                            <input v-model="searchQuery" @input="searchProducts" type="text"
                                :placeholder="$t('messages.shop.searchProducts')"
                                class="w-full py-2  pr-10 border-0 bg-white  rounded-md outline-none">
                        </div>
                        <ul v-show="searchData.showResults && searchQuery !== ''" class="mt-2 divide-y divide-gray-200 ">
                            <li v-for="result in searchData.filteredResults" :key="result"
                                class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex">
                                <NuxtLink :to="'/product/' + result.slug"
                                    @click="searchData.showResults = false, searchQuery = ''" class="flex items-center">
                                    <NuxtImg v-if="result.images[0]" :src="result.images[0]?.src"
                                        class="border mr-2 rounded-full w-14 h-14"></NuxtImg>
                                    {{ result.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                </div>
                <!-- For Desktop and up medium screens -->
                <div class="absolute max-sm:visible invisible  cursor-pointer sm:hidden" title="Cart" @click="toggleSearch = true">
                    <button class=" bg-white px-10 py-2 rounded-lg items-center flex justify-start shadow-lg"><Icon name="ion:search-outline" size="20" class="mr-1 md:mr-0 " />Search</button>
                    
                  </div>
                  <div v-show="toggleSearch" class="fixed inset-0 z-50 overflow-y-auto">
                    <div class="flex items-center justify-center min-h-screen">
                      <div @click="toggleSearch = false" class="fixed inset-0 bg-gray-500 opacity-50"></div>
                      <div class="relative bg-white rounded-md shadow-md w-11/12">
                        <!-- <div class="flex justify-end items-end m-2">
                          <button @click="toggleSearch = false"
                        class="  px-3 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none">Close</button>
                        </div> -->
              
                        <div class="p-2 px-4">
                          <div class="flex items-center ">
                            <Icon name="ion:search-outline" size="20" class="mr-2 md:mr-0" />
                            <input v-model="searchQuery" @input="searchProducts" type="text" :placeholder="$t('messages.shop.searchProducts')"
                              class="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
                          </div>
              
                          <ul v-show="searchData.showResults && searchQuery !== ''" class="mt-2 divide-y divide-gray-200 ">
              
                            <li v-for="result in searchData.filteredResults" :key="result"
                              class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex"> <NuxtLink :to="'/product/' + result.slug" @click="searchData.showResults= false , searchQuery = ''" class="flex items-center">
                                <NuxtImg v-if="result.images[0]" :src="result.images[0]?.src" class="border mr-2 rounded-full w-14 h-14"></NuxtImg>
                                {{ result.name }}
                              </NuxtLink></li>
                          </ul>
                        </div>
              
                      </div>
                    </div>
                  </div>
            </div>
        </div>
        <div class="flex justify-center flex-col items-center md:mt-8 max-sm:mt-5 sm:mt-5">
          
            <p class=" text-lg">Find your tool</p>
        </div>

    </div>
</template>
