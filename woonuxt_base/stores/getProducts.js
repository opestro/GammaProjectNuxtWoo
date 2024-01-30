export const getProductsStore = defineStore('getProducts', () => {
    let topProducts = ref({ data: '', isLoading: true })
    let newProducts = ref({ data: '', isLoading: true, isNew: true })
    let categories = ref({ data: '', isLoading: true })
   // let isLoading = ref({ topProducts: true, categories: true, newProducts: true })
    //let searchKey = ref()
    async function getProductsData() {
        if (!categories.value.data) {
            const { data: getCategories } = await useFetch('https://gama.soluve.cloud/categories', { params: { 'per_page': 12, 'page': 1, 'hide_empty': true, "parent": 0 }, })
            categories.value.data = toRaw(getCategories.value)
            categories.value.isLoading = false

        }
        if (!topProducts.value.data) {

            const { data: getTopProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'popularity', 'stock_status':'instock'}, });
            topProducts.value.data = getTopProducts.value
            topProducts.value.isLoading = false
            
          }
          if (!newProducts.value.data) {
            const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'date', 'per_page': 10 } });
            newProducts.value.data = getNewProducts.value
            newProducts.value.isLoading = false
            newProducts.value.isNew = false
          }
        return {categories, newProducts, topProducts}
        //  console.log('else')
    }
    async function searchingProduct(searchKey, pageNumber) {

        //   console.log('else')

        const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': pageNumber || 1, 'per_page': 5, 'search': searchKey } });
        const productsBySearch = getNewProducts.value

        return { productsBySearch }

        //  console.log('else')
    }

    return { newProducts, getProductsData, searchingProduct, topProducts, categories }
})