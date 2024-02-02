export const getProductsStore = defineStore('getProducts', () => {
    let topProducts = ref({ data: '', isLoading: true })
    let newProducts = ref({ data: '', isLoading: true, isNew: true })
    let categories = ref({ data: '', isLoading: true })
    // let isLoading = ref({ topProducts: true, categories: true, newProducts: true })
    //let searchKey = ref()
    async function getCategoriesData() {
        if (!categories.value.data) {
            const { data: getCategories } = await useFetch('https://gama.soluve.cloud/categories', { params: { 'per_page': 12, 'page': 1, 'hide_empty': true, "parent": 0 }, })
            categories.value.data = toRaw(getCategories.value)
            categories.value.isLoading = false
            return { categories }
        }
    }
    async function getTopProductsData() {
        if (!topProducts.value.data) {

            const { data: getTopProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'popularity', 'stock_status': 'instock', 'per_page': 6 }, });
            topProducts.value.data = getTopProducts.value
            topProducts.value.isLoading = false
            return { topProducts }
        }
    }
    async function getNewProductsData() {
        if (!newProducts.value.data) {
            const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'date', 'per_page': 5, 'stock_status': 'instock' } });
            newProducts.value.data = getNewProducts.value
            newProducts.value.isLoading = false
            newProducts.value.isNew = true
            return { newProducts }
        }

        //  console.log('else')
    }
    async function searchingProduct(searchKey, pageNumber) {

        //   console.log('else')

        const { data: getProductsByKeyword } = await useFetch('https://gama.soluve.cloud/products/search', { params: { 'page': pageNumber || 1, 'per_page': 12, 'search': searchKey } });
        let productsBySearch = getProductsByKeyword.value

    /*    if (productsBySearch.length <= 0) {
            const { data: getProductsBySku } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': pageNumber || 1, 'per_page': 12, 'sku': searchKey } });
            productsBySearch = [...productsBySearch, ...getProductsBySku.value]
        } */
        console.log(productsBySearch)
        // Sort products based on the name matching the search term
      
    /*    const searchTerms = searchKey.toLowerCase().split(' ').filter(term => term.trim() !== '');
       const filteredProducts = productsBySearch.filter(product => {
        const productName = product.name.toLowerCase();
        // Check if all search terms are included in the product name
        return searchTerms.every(term => productName.includes(term));
      });
   
        console.log(filteredProducts ) */
        // const { data: getProductsBySku } = await useFetch('https://gama.soluve.cloud/products', { params: { 'page': pageNumber || 1, 'per_page': 5, 'sku': searchKey } });
        //productsBySearch = [...productsBySearch , ...getProductsBySku.value]
        return { productsBySearch  }

        //  console.log('else')
    }

    return { newProducts, getTopProductsData, getNewProductsData, searchingProduct, getCategoriesData, topProducts, categories }
})