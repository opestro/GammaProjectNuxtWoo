export const getProductsStore = defineStore('getProducts', () => {
    let newProducts = ref()
    let topProducts = ref()
    let categories = ref()
    let isLoading = ref({ topProducts: true, categories: true, newProducts: true })
    //let searchKey = ref()
    async function getProductsData() {
     

        //  console.log('else')
    }
    async function searchingProduct(searchKey,pageNumber) {
        
        //   console.log('else')
       
            const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': pageNumber || 1,'per_page': 5, 'search': searchKey } });
          const productsBySearch = getNewProducts.value
           
        return {productsBySearch}

        //  console.log('else')
    }

    return { newProducts, getProductsData, searchingProduct, topProducts, categories, isLoading }
})