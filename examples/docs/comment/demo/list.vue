<template>
  <a-list
    class="comment-list"
    :header="`${data.length} replies`"
    item-layout="horizontal"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment :author="item.author" :avatar="item.avatar">
          <template #actions>
            <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
          </template>
          <template #content>
            <p>
              {{ item.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
              <span>{{ item.datetime.fromNow() }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(1, 'days'),
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(2, 'days'),
        },
      ],
      dayjs,
    };
  },
});
</script>
