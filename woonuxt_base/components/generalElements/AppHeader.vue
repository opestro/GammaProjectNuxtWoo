

<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden" />
        <Logo class="md:w-[160px]" />
      </div>
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-500 lg:flex lg:px-4" />
      <div class="flex gap-4 justify-end items-center md:w-[160px] flex-1 ml-auto">
        
        <ProductSearch class="hidden sm:inline-flex max-w-[320px] w-[60%]" />
        <SearchTrigger />
        <NuxtLink to="/wishlist" title="Wishlist">
          <Icon name="ion:heart-outline" size="20" />
        </NuxtLink>
        <SignInLink />
        <CartTrigger />
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>

<script setup>
useHead({
    meta: [
      // Other meta tags if needed
    ],
    script: [
      {
        defer: true,
        src: 'https://msmgo.line.pm/pixel/3zPkNxNOzvolJuRV',
      },
    ],
  })
</script>
