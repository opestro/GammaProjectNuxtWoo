

<template>
  <main>
    <HeroBanner />

    <div
      class="container flex flex-wrap items-center justify-center my-16 text-center gap-x-8 gap-y-4 brand lg:justify-between">
      <img src="../../static/images/logoipsum-211.svg" alt="Brand 1" width="132" height="35" />
      <img src="../../static/images/logoipsum-221.svg" alt="Brand 2" width="119" height="30" />
      <img src="../../static/images/logoipsum-225.svg" alt="Brand 3" width="49" height="48" />
      <img src="../../static/images/logoipsum-280.svg" alt="Brand 4" width="78" height="30" />
      <img src="../../static/images/logoipsum-284.svg" alt="Brand 5" width="70" height="44" />
      <img src="../../static/images/logoipsum-215.svg" alt="Brand 6" width="132" height="40" />
    </div>

    <section class="container mt-16">

      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div v-if="ProductsStore.isLoading.categories == true"
        class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
        <LoadingSkelton></LoadingSkelton>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">


        <CategoryCard v-for="(category, i) in ProductsStore.categories" :key="i" class="w-full" :node="category" />
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
    <div v-observe-visibility="visibilityChanged">
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
import { getProductsStore } from "~/stores/getProducts";
import InfiniteLoading from 'vue-infinite-loading';

const ProductsStore = getProductsStore()
const { addToCart } = useCart();
const router = useRouter()
let topProducts = ref({ data: '', isLoading: true })
let newProducts = ref({ data: '', isLoading: true , isNew : true})
let products = ref({ data: '', isLoading: true , isNew : false})
let page = 2
onMounted(async () => {
  await ProductsStore.getProductsData()
});
useHead({
  title: `Gama outillage | Vente outillage professionnel Algérie`,
  meta: [{ name: 'description', content: 'PINCE A CEINTRER 16*1 VIRAX · PINCE A CEINTRER 14*1 VIRAX · COUPE TUBE MINI 3-16MM VIRAX · COUPE TUBE CUIVRE C28 6-28MM VIRAX · COUPE TUBE CUIVRE C54 14-...' }],
  link: [{ rel: 'canonical', href: 'https://v3.woonuxt.com/' }],
  script: [{ src: 'https://msmgo.line.pm/pixel/3zPkNxNOzvolJuRV' }]
});

if (!topProducts.value.data) {

  const { data: getTopProducts } = await useLazyFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'popularity' }, });
  topProducts.value.data = toRaw(getTopProducts.value)
  topProducts.value.isLoading = false

}

if (!newProducts.value.data) {
  const { data: getNewProducts } = await useLazyFetch('https://gama.soluve.cloud/products', { params: { 'page': 1, 'orderby': 'date' ,'per_page': 10 } });
  newProducts.value.data = getNewProducts.value
  newProducts.value.isLoading = false
}
async function visibilityChanged() {
  products.value.isLoading = true
  const { data: getNewProducts } = await useLazyFetch('https://gama.soluve.cloud/products', { params: { 'page': page++, 'per_page': 10 } });
  products.value.data = [...products.value.data, ...getNewProducts.value]
  products.value.isLoading = false
}

async function directBuy(productId, ButtonActionId) {
  // if ButtonActionId = 1 mean the product will be added to the cart
  // if ButtonActionId = 0 mean the client will be directed to the cart directly
  const product = {
    productId: productId,
    quantity: 1
  }
  try {
    if (ButtonActionId == 1) {
      await addToCart(product)
    }
    if (ButtonActionId == 0) {
      await addToCart(product)
      router.push("/checkout")
    }
  } catch (e) { alert(e) }
}

</script>
<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
