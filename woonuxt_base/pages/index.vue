

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
      <div  v-if="ProductsStore.isLoading.categories == true" class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
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
    <topProductList class="  ">
      <div class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
        <LoadingSkelton v-if="ProductsStore.isLoading.topProducts == true"></LoadingSkelton>
       
        <card class=" rounded-xl  flex-shrink-0   shadow-lg p-2 w-60 " v-for="pds in ProductsStore.topProducts"
          :key="pds">
          <NuxtLink :to="`/product/${pds.slug}`" :title="pds.name">
            <div class=" items-end flex justify-end">
              <div class="text-xs border-1 w-fit bg-pink-500 text-white m-2 px-4 py-1 rounded-full">Top</div>
            </div>
            <cardImage class="  justify-center flex ">
              <NuxtImg class=" max-sm:w-40 sm:w-40 md:w-60 rounded-lg " quality="60" width="600" height="600"
                :src="pds.images[0]?.src || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                alt="" />
            </cardImage>
            <cardTitle class="flex p-2 m-2 items-center">
              <h1 class=" text-sm"> {{ pds.name }}</h1>
            </cardTitle>
            <!-- if you want to display Product short description
                  <cardInfo class="flex p-2 m-2">
                    <p>
                      {{pds.short_description}}
                    </p>
                  </cardInfo>
                  -->
          </NuxtLink>
          <div class="flex justify-between items-center">
            <h1 class=" text-md pl-2  flex justify-center"> <b>{{ pds.regular_price || 0 }} DA</b> </h1>
            <Button class="w-auto   border-1 bg-blue-500 text-white text-sm m-2 px-2 py-2 rounded-lg"
              @click="directBuy(pds.id, 1)">{{
                $t('messages.shop.addToCart') }}</Button>
          </div>
          <Button class="w-full flex justify-center  items-center  border-1 bg-gray-800 text-white px-6 py-1 rounded-lg"
            @click="directBuy(pds.id, 0)">{{
              $t('messages.shop.buyDirect')
            }} </Button>

        </card>
      </div>
    </topProductList>

    <!-- newProductList -->
    <div class="container relative flex pt-5 items-center mt-10">
      <span class="flex-shrink mx-4 text-2xl text-gray-950">{{ $t('messages.general.NewProducts') }}</span>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <newProductList>
      <div  v-if="ProductsStore.isLoading.categories == true" class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
        <LoadingSkelton></LoadingSkelton>
      </div>
      <div class=" flex justify-center items-center container">
      
        <div class=" ">
          <div
            class="grid   max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-lg:grid-cols-5 overflow-x-auto gap-y-5 gap-x-3 lg:gap-x-5    p-2   ">
            <card class=" rounded-xl  flex-shrink-0   shadow-lg p-2 max-sm:w-50 sm:w-50 md:w-60 "
              v-for="pds in ProductsStore.newProducts" :key="pds">
              <NuxtLink :to="`/product/${pds.slug}`" :title="pds.name">
                <div class=" items-end flex justify-end">
                  <div class="text-xs border-1 w-fit bg-pink-500 text-white m-2 px-4 py-1 rounded-full">New</div>
                </div>
                <cardImage class="  justify-center flex ">
                  <NuxtImg class=" max-sm:w-40  sm:w-40 md:w-60   rounded-lg  " quality="60" width="600" height="600"
                    :src="pds.images[0]?.src || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                    alt="" />
                </cardImage>
                <cardTitle class=" p-2 m-2 items-center">
                  <h1 class=" text-sm max-sm:text-xs"> {{ pds.name }}</h1>
                </cardTitle>
                <!-- if you want to display Product short description
                  <cardInfo class="flex p-2 m-2">
                    <p>
                      {{pds.short_description}}
                    </p>
                  </cardInfo>
                  -->

              </NuxtLink>
              <div class="flex justify-between items-center">
                <h1 class=" text-md pl-2  flex justify-center"> <b>{{ pds.regular_price || 0 }} DA</b> </h1>
                <Button class="w-auto   border-1 bg-blue-500 text-white text-sm m-2 px-2 py-2 rounded-lg"
                  @click="directBuy(pds.id, 1)">{{
                    $t('messages.shop.addToCart') }}</Button>
              </div>
              <Button
                class="w-full flex justify-center  items-center  border-1 bg-gray-800 text-white px-6 py-1 rounded-lg"
                @click="directBuy(pds.id, 0)">{{
                  $t('messages.shop.buyDirect')
                }} </Button>
            </card>
          </div>
        </div>
      </div>
    </newProductList>
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
const ProductsStore = getProductsStore()
const { addToCart } = useCart();
const router = useRouter()
onMounted(async () => {
  await ProductsStore.getProductsData()
});
useHead({
  title: `Gama outillage | Vente outillage professionnel Algérie`,
  meta: [{ name: 'description', content: 'PINCE A CEINTRER 16*1 VIRAX · PINCE A CEINTRER 14*1 VIRAX · COUPE TUBE MINI 3-16MM VIRAX · COUPE TUBE CUIVRE C28 6-28MM VIRAX · COUPE TUBE CUIVRE C54 14-...' }],
  link: [{ rel: 'canonical', href: 'https://v3.woonuxt.com/' }],
  script: [{ src: 'https://msmgo.line.pm/pixel/3zPkNxNOzvolJuRV' }]
});
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
