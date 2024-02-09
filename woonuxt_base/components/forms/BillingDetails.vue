<script setup>
import commune from '@/static/Commune_Of_Algeria.json'
const { allowedCountries } = await GqlGetStates({ country: 'IE' });
const { updateShippingLocation } = useCheckout();
const userData = commune;
const props = defineProps({
  modelValue: { type: Object, required: true },
  sameAsShippingAddress: { type: Boolean, default: true },
});

const billing = toRef(props, 'modelValue');
let cities = ref([])
let zipcode = ref([])
function validatePhoneNumber() {
  if (billing.value.phone) {
    billing.value.phone = billing.value.phone.replace(/\D/g, '').slice(0, 10);
  }
}
watch(billing, validatePhoneNumber(), props)
async function getVille() {
  setTimeout(async () => {
    // Simulated data retrieval

    cities.value = await userData.filter(user => user.wilaya_id === billing.value.state);
    // zipcode.value = await  userData.filter(user => user.name === billing.value.city)
    //billing.value.postcode = zipcode.value[0].post_code

  }, 1000);



}

</script>

<template>
  <div class="grid w-full gap-4 lg:grid-cols-2">
    <div class="w-full">
      <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
      <input v-model="billing.firstName" placeholder="John" type="text" required />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
      <input v-model="billing.lastName" placeholder="Doe" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address1">{{ $t('messages.billing.address1') }}</label>
      <input v-model="billing.address1" placeholder="O'Connell Street" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address2">{{ $t('messages.billing.address2') }}</label>
      <input v-model="billing.address2" placeholder="Dublin 1" type="text" />
    </div>

    <div class="w-full">
      <label for="city">{{ $t('messages.billing.city') }}</label>
      <select v-if="cities"  v-model="billing.city">
        <option v-for="city in cities" :key="city" :value="city.name" type="text" placeholder="State" >
          {{ state.name }}
        </option>
      </select>
      <input v-else v-model="billing.city" type="text" placeholder="State" />
    </div>

    <div class="w-full">
      <label for="country">WILAYA</label>
      <LazyStateSelect v-model="billing.state" :default-value="billing.state" :country-code="billing.country"
        @change="updateShippingLocation" @input="getVille()" />
    </div>

    <div class="w-full">
      <label for="country">{{ $t('messages.billing.country') }}</label>
      <LazyCountrySelect v-model="billing.country" :default-value="billing.country" :allowed-countries="allowedCountries"
        @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="zip">ZIP ({{ $t('messages.general.optional') }})</label>
      <input v-model="billing.postcode" placeholder="D01 1234" type="text" />
    </div>

    <div class="w-full col-span-full">
      <label for="phone">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input v-model="billing.phone" @input="validatePhoneNumber" placeholder="+353871234567" type="tel" />
      <p v-if="billing.phone?.length !== 10" class="text-red-500">Phone number must be 10 digits long.</p>
    </div>
  </div>
</template>
