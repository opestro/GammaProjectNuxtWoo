<template>
  <nav>
    <NuxtLink to="/">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink class="max-sm:hidden " to="/categories">{{ $t('messages.shop.category', 2) }}</NuxtLink>
    <div class="text-black md:hidden">{{ $t('messages.shop.category', 2) }}</div>
    <div v-for="c in categories" :key="c" class="ml-8 md:hidden">
      <nuxt-link :to="'/product-category/'+c.slug">{{c.name}}</nuxt-link>
      <div class="flex-grow border-t border-gray-400"></div>
    </div>
    <NuxtLink class="lg:hidden" to="/wishlist" :prefetch="false">Wishlist</NuxtLink>
    <NuxtLink class="lg:hidden" to="/my-account" :prefetch="false">My Account</NuxtLink>
  </nav>
</template>
<script setup>

let categories = ref()
if (!categories.value) {
            const { data: getCategories } = await useFetch('https://gama.soluve.cloud/categories', { params: { 'per_page': 17, 'page': 1, 'hide_empty': true, "parent": 0 }, })
            categories.value = toRaw(getCategories.value)
        }
//watch(categories)
</script>
