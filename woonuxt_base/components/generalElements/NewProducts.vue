<template>
    <div>
        <newProductList>
            <div v-if="newProducts.isLoading == true"
                class="flex   overflow-x-auto justify-start gap-2 p-2 container my-5 ">
                <LoadingSkelton></LoadingSkelton>
            </div>
            <div class=" flex justify-center items-center container">

                <div class=" ">
                    <div
                        class="grid   max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-lg:grid-cols-5 overflow-x-auto gap-y-5 gap-x-3 lg:gap-x-5    p-2   ">
                        <card class=" rounded-xl  flex-shrink-0   shadow-lg max-sm:w-50 sm:w-50 md:w-60 "
                            v-for="pds in newProducts.data" :key="pds">
                            <NuxtLink :to="`/product/${pds.slug}`" :title="pds.name">

                                <cardImage class="  justify-center flex relative ">
                                    <div v-if="newProducts.isNew == true"
                                        class=" absolute right-1 top-1 items-end flex justify-end">
                                        <div
                                            class="text-xs border-1 w-fit bg-red-500 text-white m-2 px-4 py-1 rounded-full   border border-amber-500">
                                            New</div>
                                    </div>
                                    <NuxtImg format="webp" class=" max-sm:w-40  sm:w-40 md:w-60   rounded-lg  "  sizes="100vw sm:100px md:200px" 
                                        :src="pds.images[0]?.src || 'https://gamaoutillage.net/wp-content/uploads/2024/01/1665343934977@1x_1-1.jpg'"
                                        alt="" />
                                </cardImage>
                                <div class=" p-2  items-center">
                                    <h1 class=" text-sm max-sm:text-xs truncate "> {{ pds.name }}</h1>
                                </div>

                            </NuxtLink>
                            <div class=" sm:flex-none md:flex md:justify-between items-center mx-2">
                                <h1 v-if="pds.stock_status == 'instock'"
                                    class=" text-green-500 text-md items-center my-1  flex justify-center">
                                    <Icon name="ion:cube-outline" size="20" class="mr-2 " />{{ pds.stock_status || 0 }}
                                </h1>
                                <h1 v-else class=" text-md text-red-600 items-center my-1 flex justify-center">
                                    <Icon name="ion:cube-outline" size="20" class="mr-2" />{{ pds.stock_status || 0 }}
                                </h1>
                                <h1 class="text-base  flex justify-center  items-center ">
                                    <b>{{ pds.regular_price + ' DA' || '0' + ' DA' }}</b>
                                </h1>

                            </div>
                            <Button v-if="pds.stock_status == 'instock'"
                                class="w-full flex justify-center  items-center h-12 sm:text-xs md:text-base   border-1 bg-amber-600 text-white py-1 rounded-lg rounded-tl-none rounded-tr-none"
                                @click="directBuy(pds.id, 0)">
                                <Icon name="ion:cart-outline" size="20" class="mr-2" /> <div class="text-xs md:text-base"> {{
                                    $t('messages.shop.buyDirect')
                                }}</div>
                            </Button>
                            <Button v-else
                                class="w-full flex justify-center  items-center h-12 sm:text-xs  md:text-base  border-1 bg-amber-600 text-white  py-1 rounded-lg rounded-tl-none rounded-tr-none disabled:cursor-not-allowed disabled:bg-gray-400 "
                                disabled @click="directBuy(pds.id, 0)">
                                <Icon name="ion:cart-outline" size="20" class="mr-2" /> <div class="text-xs md:text-base"> {{
                                    $t('messages.shop.buyDirect')
                                }}</div>
                            </Button>
                        </card>

                    </div>
                </div>
            </div>
            <div class=" flex justify-center items-center container">
                <div v-if="newProducts.isNew == false && newProducts.isLoading == true"
                    class="grid   max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-lg:grid-cols-5 overflow-x-auto gap-y-5 gap-x-3 lg:gap-x-5    p-2   ">
                    <card class=" w-40  md:w-60 rounded-xl  flex-shrink-0  shadow-lg  " v-for="i in i" :key="i">
                       
                            <cardTitle class="flex p-2 m-2 items-center">
                                <div class="bg-gray-200 w-full animate-pulse h-52 rounded-2xl m-2"></div>
                            </cardTitle>
                            <cardTitle class=" p-2 m-2 items-center">
                                <div class="bg-gray-200  animate-pulse h-3 w-10 rounded-2xl  m-2"></div>
                                <div class="bg-gray-200 w-11/12 animate-pulse h-3   rounded-2xl m-2"></div>
                                <div class="bg-gray-200 w-11/12 animate-pulse h-3 rounded-2xl m-2"></div>
                                <div class="bg-gray-200 w-11/12 animate-pulse h-3 rounded-2xl m-2"></div>
                            </cardTitle>
                    </card>

                </div>
            </div>

        </newProductList>
    </div>
</template>

<script setup>
const i = [1,2,3,4,5]
const props = defineProps({
    newProducts: { type: Object, default: null }
})

</script>