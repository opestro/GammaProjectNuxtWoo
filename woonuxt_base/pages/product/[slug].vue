<script lang="ts" setup>
const route = useRoute();
const router = useRouter()
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();
const { formatURI } = useHelpers();
const slug = route.params.slug as string;


const { data } = (await useAsyncGql('getProduct', { slug })) as { data: { value: { product: Product } } };
const product = data?.value?.product;
useHead({
  title: product?.name ?? 'Product',
  meta: [{ hid: 'description', name: 'description', content: product?.shortDescription ?? '' }],
});

const quantity = ref(1);
const activeVariation = ref(null) as Ref<Variation | null>;
const variation = ref([]) as Ref<Variation[]>;
const indexOfTypeAny = [] as number[];
const attrValues = ref();

const type = computed(() => (activeVariation.value ? activeVariation.value : product));
const selectProductInput = computed(() => ({ productId: type.value.databaseId, quantity: quantity.value })) as ComputedRef<AddToCartInput>;
const disabledAddToCart = computed(() => (!activeVariation.value && !!product.variations) || type.value.stockStatus !== 'IN_STOCK');

onMounted(() => {
  if (product.variations) indexOfTypeAny.push(...checkForVariationTypeOfAny(product));
});

const updateSelectedVariations = (variations: Attribute[]): void => {
  if (!product.variations) return;

  attrValues.value = variations.map((el) => ({ attributeName: el.name, attributeValue: el.value }));
  const cloneArray = JSON.parse(JSON.stringify(variations));
  const getActiveVariation = product.variations.nodes.filter((variation: any) => {
    // If there is any variation of type ANY set the value to ''
    if (variation.attributes) {
      indexOfTypeAny.forEach((index) => (cloneArray[index].value = ''));
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(cloneArray));
    }
  });

  activeVariation.value = getActiveVariation[0];
  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null;
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null;
  variation.value = variations;
};
//Direct Buy
async function directBuy(productData) {
  try {
    await addToCart(productData)
    router.push("/checkout")
  } catch (e) { alert(e) }


}
</script>

<template>
  <main class="container relative py-6 xl:max-w-7xl" v-if="product">
    <!-- <Breadcrumb :product="product" class="mb-6" /> -->

    <div class="flex flex-col gap-10 md:flex-row md:justify-between lg:gap-24">
      <ProductImageGallery v-if="product.image?.sourceUrl" class="relative flex-1" :first-image="product.image.sourceUrl"
        :main-image="type.image ? type.image?.sourceUrl || product.image.sourceUrl : '/images/placeholder.jpg'"
        :gallery="product.galleryImages!" :node="type" />
      <NuxtImg v-else class="relative flex-1" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />

      <div class="lg:max-w-md xl:max-w-lg md:py-2">
        <div class="flex justify-between mb-4">
          <div class="flex-1">
            <h1 class="flex flex-wrap items-center gap-2 mb-2 text-2xl font-sesmibold">
              {{ type.name }}
              <WPAdminLink :link="`/wp-admin/post.php?post=${product.databaseId}&action=edit`">Edit</WPAdminLink>
            </h1>
            <StarRating :rating="product.averageRating || 0" :count="product.reviewCount || 0" />
          </div>
          <div>
            <button class="bg-yellow-400 rounded-lg   ">
              <ProductPrice class="m-2 text-lg" :sale-price="type.salePrice" :regular-price="type.regularPrice" />
            </button>

          </div>
        </div>

        <div class="grid gap-2 my-8 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">{{ $t('messages.shop.availability') }}: </span>
            <span v-if="type.stockStatus == 'IN_STOCK'" class="text-green-600">{{ $t('messages.shop.inStock') }}</span>
            <span v-else class="text-red-600">{{ $t('messages.shop.outOfStock') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-400">{{ $t('messages.shop.sku') }}: </span>
            <span>{{ product.sku || 'N/A' }}</span>
          </div>
        </div>

        <div class="mb-8 font-light prose" v-html="product.shortDescription || product.description" />

        <hr />
        <div>

        </div>
        <form @submit.prevent="addToCart(selectProductInput)">
          <AttributeSelections v-if="product.type == 'VARIABLE' && product.attributes && product.variations"
            class="mt-4 mb-8" :attrs="product.attributes.nodes" :variations="product.variations.nodes"
            @attrs-changed="updateSelectedVariations" />

          <div
            class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-4 p-4 mt-12 bg-white md:static md:bg-transparent bg-opacity-90 md:p-0">
            <div class="w-full ">
              <!--   <button  class="rounded-lg w-full font-bold bg-gray-800 text-white text-center p-2.5  focus:outline-none m-1" :disabled="disabledAddToCart" >Achtez Direct</button> -->
              <BuyDirectButton class=" w-full m-1" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }"
                @click="directBuy(selectProductInput)"></BuyDirectButton>
              <div class="flex items-center ">
                <input v-model="quantity" type="number" min="1" aria-label="Quantity"
                  class="bg-white border rounded-lg flex text-left p-2.5  m-1 w-20 gap-4 items-center justify-center focus:outline-none" />
                <AddToCartButton class="flex-1 w-full " :disabled="disabledAddToCart"
                  :class="{ loading: isUpdatingCart }" />
              </div>
            </div>

          </div>
        </form>


        <div class="grid gap-2 my-8 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">{{ $t('messages.shop.category', 2) }}:</span>
            <div class="product-categories" v-if="product.productCategories">
              <NuxtLink v-for="category in product.productCategories.nodes" :key="category.slug"
                :to="`/product-category/${formatURI(category.slug)}`" class="hover:text-primary" :title="category.name">{{
                  category.name }}<span class="comma">, </span></NuxtLink>
            </div>
          </div>
        </div>
        <hr />
        <div class="flex flex-wrap gap-4">
          <WishlistButton :product="product" />
          <ShareButton :product="product" />
        </div>
      </div>
    </div>
    <div v-if="product.description || product.reviews" class="my-32">
      <LazyProductTabs :product="product" />
    </div>
    <div class="my-32" v-if="product.related">
      <div class="mb-4 text-xl font-semibold">{{ $t('messages.shop.youMayLike') }}</div>
      <ProductRow :products="product.related.nodes" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
    </div>
  </main>
</template>

<style scoped>
.product-categories>a:last-child .comma {
  display: none;
}

input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
