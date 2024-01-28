export const getProductsStore = defineStore('getProducts', () => {
    let newProducts = ref()
    let topProducts = ref()
    let categories = ref()
    let isLoading = ref({topProducts: true, categories : true, newProducts : true})
    async function getProductsData() {
        if (!topProducts.value) {
         
            const { data: getTopProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'popularity' }, });
            topProducts.value = toRaw(getTopProducts.value)
            isLoading.value.topProducts = false
            
        }
      //  console.log('else')
    //    console.log(topProducts)
        if (!categories.value) {
            const { data: getCategories } = await useFetch('https://gama.soluve.cloud/categories', { params: { 'per_page': 6 }, })
            categories.value = getCategories.value
            isLoading.value.categories = false
        }
     //   console.log('else')
        if (!newProducts.value) {
            const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'date' } });
            newProducts.value = getNewProducts.value
            isLoading.value.newProducts = false
        } 
        
      //  console.log('else')
    }

    return { newProducts, getProductsData, topProducts, categories, isLoading }
})