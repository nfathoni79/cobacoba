<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DbService from '../services/DbService'
import Util from '../utils'

const route = useRoute()

const tree = ref(null)
const loading = ref(false)

onMounted(() => {
  getTree()
})

/**
 * Get a tree from DB.
 */
const getTree = () => {
  loading.value = true
  tree.value = null

  DbService.getTree(route.params.id)
    .then(response => {
      tree.value = response.data
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="flex items-center justify-stretch w-full h-full p-4 sm:p-8">

    <div class="grow bg-white px-4 sm:px-8 py-8 sm:py-12
      text-3xl font-bold text-yellow-900">
      <div class="text-center">
        <h1><span class="bg-yellow-300 px-4 py-1">Data Tahun 2023</span></h1>
      </div>

      <div v-if="loading" class="mt-12 text-center">
        <p>Memuat...</p>
      </div>

      <div v-else-if="!loading && !tree" class="mt-12 text-center">
        <p>Pohon tidak ditemukan</p>
      </div>

      <div v-else class="mt-12 grid grid-cols-6 gap-x-2 gap-y-6 sm:gap-y-10">
        <p class="col-span-6 sm:col-span-2 text-2xl sm:text-3xl">
          Nama:
        </p>
        <p class="-mt-6 sm:mt-0 col-span-6 sm:col-span-4">
          {{ tree?.name }}
        </p>

        <p class="col-span-6 sm:col-span-2 text-2xl sm:text-3xl">
          Jenis:
        </p>
        <p class="-mt-6 sm:mt-0 col-span-6 sm:col-span-4">
          {{ tree?.type }}
        </p>

        <p class="col-span-2 text-2xl sm:text-3xl">
          Usia:
        </p>
        <p class="col-span-4">
          {{ Util.getAge(tree?.birthDate) }} tahun
        </p>

        <p class="col-span-6 sm:col-span-2 text-2xl sm:text-3xl">
          Lokasi:
        </p>
        <p class="-mt-6 sm:mt-0 col-span-6 sm:col-span-4">
          {{ tree?.location }}
        </p>
      </div>
    </div>
  </div>
</template>