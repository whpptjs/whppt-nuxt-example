<template>
  <form @submit.prevent>
    <div class="whppt-flex-end">
      <whppt-text-input v-model="editedSince" label="Edited Since" label-colour="black" class="mr-4"></whppt-text-input>
      <whppt-text-input
        v-model="publishedSince"
        label="Published Since"
        label-colour="black"
        class="mr-4"
      ></whppt-text-input>
      <fieldset style="width: 20%" class="mr-4">
        <label class="whppt-select__frequency-label">Edited By</label>
        <select v-model="editedBy" class="whppt-select__frequency-input" style="appearance: auto;"> </select>
      </fieldset>
      <fieldset style="width: 20%" class="mr-4">
        <label class="whppt-select__frequency-label">Published By</label>
        <select v-model="publishedBy" class="whppt-select__frequency-input" style="appearance: auto;"> </select>
      </fieldset>
      <whppt-text-input
        v-model="slugFilter"
        label="Filter By Slug"
        label-colour="black"
        placeholder="eg. about-us"
        class="mr-4"
      ></whppt-text-input>
      <fieldset style="width: 20%">
        <label class="whppt-select__frequency-label">Filter by Page Type</label>
        <select v-model="pageTypeFilter" class="whppt-select__frequency-input" style="appearance: auto;">
          <option v-for="(pageType, key) in pageTypes" :key="`current_${key}`" :value="pageType">
            {{ pageType }}
          </option>
        </select>
      </fieldset>
    </div>
    <table class="w-full table-fixed">
      <thead>
        <tr>
          <th class="px-4 py-2">Slug</th>
          <th class="px-4 py-2">Page Type</th>
          <th class="px-4 py-2">Last Edited</th>
          <th class="px-4 py-2">Last Published</th>
          <th class="px-4 py-2">Editable By</th>
          <th class="px-4 py-2">Currently Published</th>
          <th class="px-4 py-2">Publishable by You</th>
          <th class="px-4 py-2">Change Frequency</th>
          <th class="px-4 py-2">Priority</th>
          <!-- <th class="px-4 py-2">Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(page, index) in pages" :key="index" :class="{ 'bg-gray-300': !userHasPermission(page) }">
          <td class="border px-4 py-2">
            <div class="underline">{{ page.slug }}</div>
            <button v-if="userHasPermission(page)" class="p-2 border border-black">Edit Slug</button>
          </td>
          <td class="border px-4 py-2">
            {{ page.pageType
            }}<button v-if="userHasPermission(page)" class="p-2 border border-black">Edit Page Type</button>
          </td>
          <td class="border px-4 py-2">{{ page.updatedAt }} by {{ page.updatedBy }}</td>
          <td class="border px-4 py-2">
            {{ page.lastPublished ? `${page.lastPublished} 'by' ${page.publishedBy}` : 'Never Published' }}
          </td>
          <td class="border px-4 py-2">
            {{ formatRoles(page.editableBy) }}
          </td>
          <td class="border px-4 py-2">{{ page.published }}</td>
          <td class="border px-4 py-2">
            <div>{{ userHasPermission(page) }}</div>
            <button v-if="userHasPermission(page)" class="p-2 border border-black">
              {{ page.published ? 'Unpublish' : 'Publish' }}
            </button>
          </td>
          <td class="border px-4 py-2">{{ page.frequency }}</td>
          <td class="border px-4 py-2">{{ page.priority }}</td>
          <!-- <td class="border px-4 py-2">{{ page.published ? 'Unpublish' : 'Publish' }}</td> -->
          <!-- <td class="border px-4 py-2 flex justify-between item-center">
            <button
              v-show="!editCompetitionVisible && !showWarning"
              class="whppt-settings__tooltip whppt-redirects__icon"
              style="position: relative;"
              @click="editCompetition(competition)"
            >
              <span class="whppt-settings__tooltip-text">Edit</span>
              <w-edit></w-edit>
            </button>
            <button
              v-show="!editCompetitionVisible && !showWarning"
              class="whppt-settings__tooltip whppt-redirects__icon"
              style="position: relative;"
              @click="openWarning(competition)"
            >
              <span class="whppt-settings__tooltip-text">Delete</span>
              <w-remove></w-remove>
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { map, uniq } from 'lodash';

import WhpptTextInput from '@whppt/nuxt/components/lib/whpptComponents/WhpptTextInput.vue';

export default {
  name: 'Sitemap',
  components: { WhpptTextInput },
  data: () => ({
    pages: [
      {
        _id: '1',
        slug: 'about-us',
        pageType: 'page',
        updatedAt: 'June 16, 2020 2:42 PM',
        updatedBy: 'Administrator',
        lastPublished: 'June 8, 2020 11:32 AM',
        published: true,
        publishedBy: 'Administrator',
        editableBy: ['admin'],
        frequency: 'yearly',
        priority: '0.5',
      },
      {
        _id: '2',
        slug: 'contact-us',
        pageType: 'page',
        publishedBy: 'Editor User 1',
        updatedBy: 'Editor User 1',
        published: true,
        updatedAt: 'August 13, 2020 1:45 PM',
        lastPublished: 'July 2, 2020 3:32 PM',
        editableBy: ['admin', 'editor'],
        frequency: 'monthly',
        priority: '0.7',
      },
      {
        _id: '3',
        slug: 'news/thank-you-for-your-support-in-2019',
        pageType: 'news',
        publishedBy: 'Editor User 1',
        published: false,
        updatedBy: 'Editor User 1',
        updatedAt: 'September 1, 2020 10:27 AM',
        lastPublished: 'August 28, 2020 5:19 PM',
        editableBy: ['admin', 'editor'],
        frequency: 'daily',
        priority: '0.2',
      },
      {
        _id: '3',
        slug: 'news/thank-you-for-your-support-in-2020',
        pageType: 'news',
        published: false,
        updatedBy: 'Editor User 1',
        updatedAt: 'September 1, 2020 10:27 AM',
        editableBy: ['admin', 'editor'],
        frequency: 'daily',
        priority: '0.2',
      },
    ],
    slugFilter: '',
    pageTypeFilter: '',
    user: { role: 'editor' },
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseAPIUrl']),
    pageTypes() {
      return uniq(map(this.pages, p => p.pageType));
    },
  },
  mounted() {
    // return this.$axios.get(`${this.baseAPIUrl}/api/conciergeForm/loadConciergeForm`).then(({ data }) => {
    //   this.conciergeForm = data || { ccs: [''] };
    // });
  },
  methods: {
    formatRoles(roles) {
      return roles.join(', ');
    },
    // refine() {
    //   this.filteredPages = filter(this.pages, { pageType: this.pageTypeFilter });
    // },
    userHasPermission(page) {
      return page.editableBy.includes(this.user.role);
    },
  },
};
</script>
