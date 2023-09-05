<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { DialogTitle } from '@headlessui/vue'

import ATable from '../components/ATable.vue'
import ADialog from '../components/ADialog.vue'
import AButton from '../components/AButton.vue'
import Spinner from '../components/Spinner.vue'

import DbService from '../services/DbService'
import Util from '../utils'

// Fetched data
const trees = ref([])

// Form data
const name = ref('')
const type = ref('')
const birthDate = ref(null)
const location = ref('')
const errorMessage = ref(null)

// Flags
const loading = ref(false)
const createOpen = ref(false)
const createLoading = ref(false)

const tableHeaders = ['Nama', 'Tanggal Tanam', 'Lihat']

onMounted(() => {
  getTrees()
})

/**
 * Get trees from DB.
 */
const getTrees = () => {
  loading.value = true
  trees.value = []

  DbService.getTrees()
    .then(response => {
      trees.value = response.data
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * Create a tree in DB.
 */
const createTree = () => {
  createLoading.value = true
  errorMessage.value = null

  const tree = {
    name: name.value,
    type: type.value,
    birthDate: birthDate.value,
    location: location.value,
  }

  DbService.createTree(tree)
    .then(response => {
      createOpen.value = false

      name.value = ''
      type.value = ''
      birthDate.value = null
      location.value = ''

      getTrees()
    })
    .catch(error => {
      errorMessage.value = error.message
    })
    .finally(() => {
      createLoading.value = false
    })
}
</script>

<template>
  <div class="bg-green-50 min-h-screen px-4 sm:px-8 py-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-green-700">Daftar Pohon</h1>
      
      <AButton @click="createOpen = true">
        <PlusIcon class="h-6 w-6" />
        <span class="ml-2">Tambah</span>
      </AButton>
    </div>

    <!-- Tree list table -->
    <ATable class="mt-4">
      <template v-slot:head>
        <tr>
          <th v-for="header in tableHeaders" :key="header" scope="col"
          class="px-4 py-2 text-left text-sm font-semibold
          text-gray-900 tracking-wider">
            {{ header }}
          </th>
        </tr>
      </template>

      <template v-slot:body>
        <tr v-if="loading">
          <td colspan="3" class="py-4 text-center">
            Memuat...
          </td>
        </tr>

        <tr v-if="!loading && trees.length <= 0">
          <td colspan="3" class="py-4 text-center">
            Tidak ada pohon.
          </td>
        </tr>

        <tr v-else v-for="(tree, index) in trees" :key="tree._id"
          :class="index % 2 != 0 ? 'bg-gray-50' : ''">

          <td class="px-4 py-3 text-sm text-gray-900
            font-semibold whitespace-nowrap">
            {{ tree.name }}
          </td>

          <td class="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
            {{ Util.formatDate(tree.birthDate) }}
          </td>

          <td class="px-4 py-3">
            <router-link :to="{ name: 'tree', params: { id: tree._id } }">
              <EyeIcon class="h-6 w-6 text-green-600" />
            </router-link>
          </td>
        </tr>
      </template>
    </ATable>

    <!-- Creation dialog -->
    <ADialog :open="createOpen" @onClose="createOpen = false">
      <DialogTitle class="mb-4 text-lg text-green-700 font-semibold">
        Tambah Pohon
      </DialogTitle>

      <form @submit.prevent="createTree()" class="flex flex-col gap-4">
        <label class="block">
          <span class="text-gray-800">Nama Pohon</span>
          <input type="text" v-model="name" required
            class="block w-full border border-gray-400
            rounded-lg shadow-sm px-4 py-2 text-gray-800
            focus:border-green-600 focus:ring-green-600" />
        </label>

        <label class="block">
          <span class="text-gray-800">Jenis</span>
          <input type="text" v-model="type" required
            class="block w-full border border-gray-400
            rounded-lg shadow-sm px-4 py-2 text-gray-800
            focus:border-green-600 focus:ring-green-600" />
        </label>

        <label class="block">
          <span class="text-gray-800">Tanggal Tanam</span>
          <input type="date" v-model="birthDate" required
            class="block w-full border border-gray-400
            rounded-lg shadow-sm px-4 py-2 text-gray-800
            focus:border-green-600 focus:ring-green-600" />
        </label>

        <label class="block">
          <span class="text-gray-800">Lokasi</span>
          <textarea v-model="location" rows="2"
            class="block w-full border border-gray-400
            rounded-lg shadow-sm px-4 py-2 text-gray-800
            focus:border-green-600 focus:ring-green-600">
          </textarea>
        </label>

        <p v-if="errorMessage" class="text-red-800">
          {{ errorMessage }}
        </p>

        <div class="flex justify-end gap-2">
          <AButton type="button" color="black" @click="createOpen = false">
            Batal
          </AButton>

          <AButton type="submit" :disabled="createLoading">
            <Spinner v-if="createLoading" class="mr-2 w-6" />
            Tambah
          </AButton>
        </div>
      </form>
    </ADialog>
  </div>
</template>