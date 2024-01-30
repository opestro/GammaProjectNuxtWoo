

<template>
  <main>




    <div
      class="container flex max-sm:hidden flex-wrap items-center justify-center mt-6 mb-16 md:my-24 text-center gap-x-8 gap-y-4 brand lg:justify-between ">
      <img src="../static/images/BrandLogo1.webp" alt="Brand 1" width="120"  />
      <img src="../static/images/BrandLogo2.webp" alt="Brand 2" width="120" />
      <img src="../static/images/BrandLogo3.webp" alt="Brand 3" width="120" />
      <img src="../static/images/BrandLogo4.webp" alt="Brand 4" width="120"  />
      <img src="../static/images/BrandLogo5.webp" alt="Brand 5" width="120" />
      <img src="../static/images/BrandLogo6.webp" alt="Brand 6" width="120" />
    </div>
    <MobileBanner class=" container sm:hidden my-2"></MobileBanner>
    <search-bar class=" max-sm:mb-6"></search-bar>
    
    <section class="container mt-16 max-sm:hidden ">

      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div v-if="categories.isLoading == true"
        class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <div v-for="i in categories" :key="i"
          class="   bg-sky-500  animate-pulse h-7 w-48  rounded-full    shadow-lg  ">
        </div>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <CategoryCard v-for="(category, i) in categories.data" :key="i" class="w-full" :node="category" />
      </div>
    </section>

    <!-- topProductList -->

    <div class="container relative flex pt-5 items-center">
      <span class="flex-shrink mx-4 text-2xl text-gray-950">{{ $t('messages.general.bestSellingProducts') }}</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <TopSell :topProducts="topProducts"></TopSell>

    <!-- newProductList -->
    <div class="container relative flex pt-5 items-center mt-10">
      <span class="flex-shrink mx-4 text-2xl text-gray-950">{{ $t('messages.general.NewProducts') }}</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>


    <NewProducts :newProducts="newProducts"></NewProducts>
    <NewProducts :newProducts="products"></NewProducts>
    <div v-if="newProducts.isLoading == false" v-observe-visibility="visibilityChanged">
      <!-- Your content here -->
    </div>
    <div class="container relative flex p-5 items-center">
      <div class="flex-grow border-t border-gray-400"></div>
      <span class="flex-shrink mx-4 text-lg"><button
          class=" border-1 px-3 border-gray-640000 outline-gray-400 text-gray-400 outline-1 outline text-center items-center align-middle rounded-full p-1">
          + {{ $t('messages.general.moreProducts') }}</button></span>
    </div>





    <section class="container grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="../../static/icons/box.svg" width="60" height="60" alt="Free Shipping" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Free Shipping</h3>
          <p class="text-sm">Free shipping on order over €50</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="../../static/icons/moneyback.svg" width="60" height="60" alt="Money Back" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Peace of Mind</h3>
          <p class="text-sm">30 days money back guarantee</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="../../static/icons/secure.svg" width="60" height="60" alt="Secure Payment" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">100% Payment Secure</h3>
          <p class="text-sm">Your payment are safe with us.</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="../../static/icons/support.svg" width="60" height="60" alt="Support 24/7" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Support 24/7</h3>
          <p class="text-sm">24/7 Online support</p>
        </div>
      </div>
    </section>
  </main>
</template>
<script  setup>
import { getProductsStore } from "~/woonuxt_base/stores/getProducts";
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
  const fetchData = await ProductsStore.getProductsData()
  topProducts.value = fetchData.topProducts.value
  newProducts.value = fetchData.newProducts.value
  categories.value = fetchData.categories.value

});

async function visibilityChanged() {
  const { data: getNewProducts } = await useFetch('https://gama.soluve.cloud/products', { lazy: true, params: { 'page': page++, 'per_page': 10 } });
  products.value.data = [...products.value.data, ...getNewProducts.value]
  products.value.isLoading = false
}



</script>
<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
