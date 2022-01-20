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
        <a style="float:right;margin: 20px 0 0 32px;" href="https://www.npmjs.org/package/@fe6/water-pro" target="_blank">
          <img src="https://img.shields.io/npm/v/@fe6/water-pro.svg?style=flat-square" />
        </a>
        <a-select
          style="float:right;margin: 20px 0 0 24px;"
          key="version"
          class="version"
          size="small"
          :default-value="antdVersion"
          :get-popup-container="(trigger) => trigger.parentNode"
        >
          <a-select-option value="4.x" @click="changeVersion">4.x</a-select-option>
          <a-select-option :value="antdVersion">{{ antdVersion }}</a-select-option>
        </a-select>
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
    <div class="global-notification">
      <span> v4 版本已发布，请访问 &nbsp;&nbsp; <a href="http://water-v4.chjgo.com" target="_blank">water-v4.chjgo.com</a> &nbsp;&nbsp;查看更多详情 </span>
      <span tabindex="-1" role="img" aria-label="close" class="anticon anticon-close close-icon" style="position: absolute; top: 8px; right: 15px;">
        <svg focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
        </svg>
      </span>
    </div>
  </header>
</template>

<script>
import { ref, unref, computed, watch } from 'vue';
import { version } from '@fe6/water-pro';
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
    const antdVersion = ref(version);
    const changeVersion = () => {
      location.href = 'http://water-v4.chjgo.com';
    };
    return {
      antdVersion,
      changeVersion,
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
