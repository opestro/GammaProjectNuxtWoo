<template>
    <div>
        <div class="  ">
            <div class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
              <LoadingSkelton v-if="topProducts.isLoading == true"></LoadingSkelton>
      
              <card  class="  rounded-xl  flex-shrink-0 relative  shadow-lg  w-60 " v-for="pds in topProducts.data" :key="pds">
                <NuxtLink :to="`/product/${pds.slug}`" :title="pds.name">
                  <div class=" items-end flex justify-end  absolute right-2 top-2">
                    <div class="text-xs border-1  bg-red-500 text-white px-4 py-1 rounded-full">Top</div>
                  </div>
                  <cardImage class="  justify-center flex ">
                    <NuxtImg format="webp" class=" max-sm:w-40 sm:w-40 md:w-60 rounded-lg " sizes="100px" quality="80" width="600" height="600" :alt="pds.name"
                      :src="pds.images[0]?.src || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                       />
                  </cardImage>
                  <cardTitle class="flex p-2 m-2 items-center">
                    <h1 class=" text-sm max-sm:text-xs truncate "> {{ pds.name }}</h1>
                  </cardTitle>
                  <!-- if you want to display Product short description
                        <cardInfo class="flex p-2 m-2">
                          <p>
                            {{pds.short_description}}
                          </p>
                        </cardInfo>
                        -->
                </NuxtLink>
                <div class="flex justify-between items-center px-2">
                  <h1 v-if="pds.stock_status == 'instock'"
                    class=" text-green-500 text-md items-center my-1  flex justify-center">
                    <Icon name="ion:cube-outline" size="20" class="mr-2 " />{{ pds.stock_status || 0 }}
                  </h1>
                  <h1 v-else class=" text-md text-red-600 items-center my-1 flex justify-center">
                    <Icon name="ion:cube-outline" size="20" class="mr-2 " />{{ pds.stock_status || 0 }}
                  </h1>
                  <h1 class=" text-md  flex justify-center"> <b>DA {{ pds.regular_price || 0 }} </b> </h1>
                </div>
                <div v-if="pds.stock_status == 'instock'" class="flex">
                  <Button class="w-full flex justify-center  items-center h-12  border-1 bg-sky-600 text-white   py-1 rounded-bl-lg "
                  @click="directBuy(pds.id, 1)">
                    <Icon name="ion:bag-add-outline" size="20" class="mr-2" />{{ $t('messages.general.add') }}
                </Button>
                <Button
                  class="w-full flex justify-center  items-center h-12  border-1 bg-amber-600 text-white  py-1 rounded-br-lg"
                  @click="directBuy(pds.id, 0)">
                  <Icon name="ion:cart-outline" size="20" class="mr-2" />{{ $t('messages.general.buy') }}
                </Button>
                </div>
                <div v-else class="flex">
                  <Button class="w-full flex justify-center  items-center h-12  border-1 bg-sky-600 text-white  rounded-bl-lg py-1 disabled:cursor-not-allowed disabled:bg-gray-400 " disabled
                  @click="directBuy(pds.id, 1)">
                  <Icon name="ion:bag-add-outline" size="20" class="mr-2" />
                </Button>
                <Button
                  class="w-full flex justify-center  items-center h-12  border-1 bg-amber-600 text-white  py-1 rounded-br-lg disabled:cursor-not-allowed disabled:bg-gray-400 " disabled
                  @click="directBuy(pds.id, 0)">
                  <Icon name="ion:cart-outline" size="20" class="mr-2" />
                </Button>
                </div>
               
      
              </card>
            </div>
          </div>
    </div>
</template>
<script setup>
const { addToCart } = useCart();
const router = useRouter();
const props = defineProps({
    topProducts: { type: Object, default: null },
});
watchEffect(props)
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