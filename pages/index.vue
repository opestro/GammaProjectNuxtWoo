

<template>
  <main class="">

    <dialog id="my_modal_2" class="modal">
     
      <div class="modal-box relative">
        <form method="dialog" class="absolute right-2 top-2 rounded-xl ">
          <!-- if there is a button in form, it will close the modal -->
          <button class=" btn bg-red-600 text-white  border-0 rounded-xl" @click="isImageToShow = false"><Icon name="ion:close-outline" size="20" class="mx-2" /></button>
        </form>
        <div class="flex justify-center  " >
          <div class="carousel w-full  "   v-show="!isImageToShow" >
            <div v-for="image in productReceiver.images" :key="image" class="carousel-item w-full">
              <NuxtImg
              
              class="rounded-xl object-contain w-full "
              width="700"
              height="700"
              fit="outside"
              format="webp"
              :src="image.src"
              :alt="image.alt || image.title || image.name"
              :title="image.alt || image.title || image.name"
              fetchpriority="high" 
              />
            </div>
          </div>
        </div>
        <NuxtImg v-if="imageToShow && isImageToShow" class="rounded-xl object-contain w-full " width="700" height="700" fit="outside"
          format="webp" :src="imageToShow.src" :alt="imageToShow.name" :title="imageToShow.name" fetchpriority="high" />
        <div v-if="productReceiver" class="my-4 gallery-images">
          <NuxtImg v-for="galleryImg in productReceiver.images" :key="galleryImg" class="cursor-pointer rounded-xl border border-sky-500"
            width="110" height="140" fit="outside" format="webp" :src="galleryImg.src"
            :alt="galleryImg.alt || galleryImg.title || galleryImg.name" :title="galleryImg.name"
            @click="changeImage(galleryImg)" />
        </div>
        <div>
          <div class="flex justify-between mb-4">
            <div class="flex-1">
              <h1 class="flex flex-wrap items-center gap-2 mb-2 text-base font-sesmibold">
                {{ productReceiver.name }}
                <WPAdminLink :link="`/wp-admin/post.php?post=${productReceiver.id}&action=edit`">Edit</WPAdminLink>
              </h1>
              <StarRating :rating="productReceiver.average_rating || 0" :count="productReceiver.reviewCount || 0" />

            </div>

            <div class="  ">
              <button class="bg-yellow-400 rounded-lg   ">
                <span class="m-2 text-lg text-gray-800"
                  v-html="(productReceiver.sale_price || productReceiver.regular_price) + ' DA'"></span>
              </button>

            </div>

          </div>
          <span v-html="productReceiver.short_description" class=" text-sm  "></span>
          <div class=" flex gap-1 ">

            <button @click="directBuy(productReceiver.id)" class="btn bg-sky-500  text-white  rounded-lg w-full h-10 ">
              <span class=" m-2 text-base  flex justify-center items-center ">{{ $t('messages.general.buy') }} <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" /></span>
             
            </button>
          
            
         
        
          </div>
        </div>




      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <div class=" container flex  items-center justify-center  my-7 max-sm:hidden  text-center  w-full h-full">
      <img src="http://wp.gamaoutillage.net/wp-content/uploads/2024/02/bannerSectionHero-2.png" class="rounded-lg"
        alt="BanerHero">
      </img>
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
      <category-products-card :categoryId="category.id" @data="receiveProduct"></category-products-card>

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
const { addToCart } = useCart();
const router = useRouter();
let isLoading = ref(false)
import { getProductsStore } from "~/stores/getProducts";
useHead({
  title: `Home page`,
  meta: [{ name: 'description', content: "Vente outillage professionnel Algérie" }],
  link: [{ rel: 'canonical', href: 'https://wp.gamaoutillage.net/' }]
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
let isImageToShow = ref(false);
let imageToShow = ref('');
let productReceiver = ref('')
async function receiveProduct(data) {
 // console.log(data)
  productReceiver.value = await data
  imageToShow.value = await data.images[0]
  document.getElementById('my_modal_2').showModal()
}
/*async function visibilityChanged() {
  const { data: getNewProducts } = await useLazyFetch('https://gama.soluve.cloud/products', { params: { 'page': page++, 'per_page': 20, 'stock_status': 'instock' } });
  products.value.data = [...products.value.data, ...getNewProducts.value]
  products.value.isLoading = false
} */


function changeImage(index) {
 // console.log(index)
  imageToShow.value = index;
  isImageToShow.value = true
};

async function directBuy(productId) {
  // if ButtonActionId = 1 mean the product will be added to the cart
  // if ButtonActionId = 0 mean the client will be directed to the cart directly
  isLoading.value = true
  const product = {
    productId: productId,
    quantity: 1
  }
  try {
    
      await addToCart(product)
      router.push("/checkout")
  
  } catch (e) { alert(e) }
}

watch(productReceiver, imageToShow,isLoading)
</script>
<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
