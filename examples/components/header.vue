<template>
  <header id="header">
    <a-row>
      <a-col class="header-left" :xxl="6" :xl="9" :lg="9" :sm="0" :xs="0">
        <router-link :to="{ path: '/' }" id="logo">
          <a-badge :offset="[0, 10]">
            <template #count>
              <span>pro</span>
            </template>
            <img :src="logo" class="header-logo" />
          </a-badge>
        </router-link>
        <a-select
          style="float:right;margin: 15px 16px 0 0;width: 200px"
          :placeholder="`搜索${selPlaceHolder}...`"
          v-model:value="searchValue"
          showSearch
          optionFilterProp="label"
          optionLabelProp="label"
          :options="filteredOptions"
          @change="filterChange"
        />
      </a-col>
      <a-col :xxl="18" :xl="15" :lg="15" :md="18" :sm="0" :xs="0">
        <span id="github-btn" class="github-btn">
          <a class="gh-btn" href="//github.com/fe6/water-pro/" target="_blank">
            <span class="gh-ico" aria-hidden="true"></span>
            <span class="gh-text">Star</span>
          </a>
        </span>
        <a style="float:right;margin: 20px 0 0 64px;" href="https://www.npmjs.org/package/@fe6/water-pro" target="_blank">
          <img src="https://img.shields.io/npm/v/@fe6/water-pro.svg?style=flat-square" />
        </a>
        <a-menu :selectedKeys="selectedKeys" mode="horizontal" class="menu-site" id="nav">
          <a-menu-item key="components">
            <router-link to="/components">组件</router-link>
          </a-menu-item>
          <a-menu-item key="utils">
            <router-link to="/utils">工具</router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </header>
</template>

<script>
import { ref, unref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { hyphenate } from '@fe6/shared';
import router from '../routers';
import allDemo from '../routers/demo';
import logo from '../assets/img/logo.png?url';
import { getPageType } from '../utils/get-page-type';

const selDefPlaceHolder = {
  components: '组件',
  utils: '工具方法',
};

const options = (type) => {
  const newOpts = [];
  const allNewDemo = allDemo[type];
  Object.keys(allNewDemo).forEach((drKey) => {
    newOpts.push({
      value: drKey,
      label: allNewDemo[drKey].subtitle,
    })
  });
  return newOpts;
}

export default {
  inject: {
    demoContext: { default: {} },
  },
  props: {
    name: String,
    searchData: Array,
  },
  data() {
    return {
      logo,
    };
  },
  setup() {
    const { currentRoute } = useRouter();
    const {
      pageTrueType,
    } = getPageType(unref(currentRoute).path);
    const selectedKeys = ref([pageTrueType]);
    const searchValue = ref(null);
    const selOpts = ref(options(pageTrueType));
    const selPlaceHolder = ref(selDefPlaceHolder[pageTrueType]);
    const filteredOptions = computed(() => selOpts.value.filter(o => searchValue.value ? !searchValue.value.includes(o.value) : o.value));
    watch(() => currentRoute.value.path, (newPagePath) => {
      const {
        pageTrueType: newPageTrueType
      } = getPageType(newPagePath);
      selectedKeys.value = [newPageTrueType];
      selPlaceHolder.value = selDefPlaceHolder[newPageTrueType];
      selOpts.value = options(newPageTrueType);
    })
    return {
      selectedKeys,
      searchValue,
      selPlaceHolder,
      filteredOptions,
      filterChange: () => {
        if (searchValue.value) {
          const newPath = hyphenate(searchValue.value);
          router.push({
            path: `${newPath || searchValue.value}-cn`
          });
          searchValue.value = null;
        }
      }
    }
  }
};
</script>
