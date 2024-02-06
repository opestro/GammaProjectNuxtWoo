

<template>
  <main>


    <div class=" container flex  items-center justify-center  my-7 max-sm:hidden  text-center  w-full h-full">
      <NuxtImg src="http://gamaoutillage.net/wp-content/uploads/2024/02/bannerSectionHero-2.png" class="rounded-lg" alt="BanerHero">
      </NuxtImg>
    </div>

    <div
      class="container flex max-sm:hidden flex-wrap items-center justify-center mt-6 mb-16 md:my-14 text-center gap-x-8 gap-y-4 brand lg:justify-between  ">

      <img src="../static/images/BrandLogo1.webp" alt="CROWN" width="150" class="border-2 bg-white rounded-lg p-2" />
      <img src="../static/images/BrandLogo2.webp" alt="WORCRAFT" width="150" class="border-2 bg-white rounded-lg p-2" />
      <img src="../static/images/BrandLogo3.webp" alt="FLUKE" width="150" class="border-2 bg-white rounded-lg p-2" />
      <img src="../static/images/BrandLogo4.webp" alt="TOPTUL" width="150" class="border-2 bg-white rounded-lg p-2" />
      <img src="../static/images/BrandLogo5.webp" alt="BOSCH" width="150" class="border-2 bg-white rounded-lg p-2" />
      <img src="../static/images/BrandLogo6.webp" alt="MAKITA" width="150" class="border-2 bg-white rounded-lg p-2" />
    </div>
    <MobileBanner class=" container sm:hidden my-2"></MobileBanner>
    <div>
      <div class="flex items-center   relative   justify-center   ">
        <div class="container absolute top-0   flex pt-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
        </div>
        <search-bar class=" mb-5  "></search-bar>
      </div>

    </div>


    <section class="container  ">

      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div v-if="categories.isLoading == true"
        class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <div v-for="i in categories" :key="i" class="   bg-sky-500  animate-pulse h-7 w-48  rounded-full    shadow-lg  ">
        </div>
      </div>
      <div class="  justify-center  my-2">
        <div
          class=" sm:flex sm:overflow-x-auto max-sm:flex max-sm:overflow-x-auto md:grid md:grid-cols-9 justify-start gap-2   container ">

          <CategoryCard v-for="(category, i) in categories.data" :key="i"
            class="md:w-full  sm:w-20 max-sm:w-20  max-sm:flex-shrink-0   sm:flex-shrink-0 " :node="category" />
        </div>
      </div>
    </section>

    <!-- topProductList -->

    <div class="container relative flex pt-5 items-center">
      <span class="flex-shrink mx-4 text-2xl text-gray-950">{{ $t('messages.general.bestSellingProducts') }}</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <TopSell :topProducts="topProducts"></TopSell>

    <div class="" v-for="category in categories.data" :key="category">
      <div class="container relative flex pt-5 items-center">
        <span class="flex-shrink mx-4 text-2xl max-sm:text-sm text-gray-950">{{ category.name }}</span>
        <div class="flex-grow border-t border-gray-400"></div>
        <nuxt-link :to="'product-category/' + category.slug"> <span
            class="flex-shrink mx-4 text-2xl max-sm:text-sm text-sky-500">{{ $t('messages.general.moreProducts') }}
            <Icon name="ion:arrow-right-c" size="20" class="mr-2 max-sm:mr-1" />
          </span></nuxt-link>

      </div>
      <category-products-card :categoryId="category.id"></category-products-card>

    </div>

    <!-- newProductList -->
    <!--  <div class="container relative flex pt-5 items-center mt-10">
      <span class="flex-shrink mx-4 text-2xl text-gray-950">{{ $t('messages.general.NewProducts') }}</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>


    <NewProducts :newProducts="newProducts"></NewProducts>
    <NewProducts v-if="newProducts.isLoading == false" :newProducts="products"></NewProducts>
    <LoadingSkelton v-if="newProducts.isLoading == false"></LoadingSkelton>
    <div v-if="newProducts.isLoading == false" v-observe-visibility="visibilityChanged"></div> 
    -->
    <div class="container relative flex p-5 items-center">
      <div class="flex-grow border-t border-gray-400"></div>
      <span class="flex-shrink mx-4 text-lg"><button
          class=" border-1 px-3 border-gray-640000 outline-gray-400 text-gray-400 outline-1 outline text-center items-center align-middle rounded-full p-1">
          + {{ $t('messages.general.moreProducts') }}</button></span>
    </div>
  </main>
</template>
<script  setup>
import { getProductsStore } from "~/stores/getProducts";
useHead({
  title: `Gama outillage | Vente outillage professionnel Algérie`,
  meta: [{ name: 'description', content: 'PINCE A CEINTRER 16*1 VIRAX · PINCE A CEINTRER 14*1 VIRAX · COUPE TUBE MINI 3-16MM VIRAX · COUPE TUBE CUIVRE C28 6-28MM VIRAX · COUPE TUBE CUIVRE C54 14-...' }],
  link: [{ rel: 'canonical', href: 'https://v3.woonuxt.com/' }]
});

const ProductsStore = getProductsStore()
//const router = useRouter()
let topProducts = ref({ data: '', isLoading: true })
let newProducts = ref({ data: '', isLoading: true, isNew: true })
let categories = ref({ data: '', isLoading: true })
let products = ref({ data: '', isLoading: true, isNew: false })
let page = 2
onMounted(async () => {
  const fetchCategories = await ProductsStore.getCategoriesData()
  categories.value = fetchCategories.categories.value
  //console.log(categories.value)
  const fetchTopProducts = await ProductsStore.getTopProductsData()
  topProducts.value = fetchTopProducts.topProducts.value
  const fetchNewProducts = await ProductsStore.getNewProductsData()
  newProducts.value = fetchNewProducts.newProducts.value

  // console.log(fetchData)

});

async function visibilityChanged() {
  const { data: getNewProducts } = await useLazyFetch('https://gama.soluve.cloud/products', { params: { 'page': page++, 'per_page': 20, 'stock_status': 'instock' } });
  products.value.data = [...products.value.data, ...getNewProducts.value]
  products.value.isLoading = false
}



</script>
<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}</style>
