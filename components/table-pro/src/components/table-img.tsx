import { defineComponent, PropType } from 'vue';

import useConfigInject from '../../../_util/hooks/useConfigInject';
import { default as Image } from '../../../image';

export default defineComponent({
  name: 'ATableImage',
  props: {
    imgList: {
      type: Array as PropType<string[]>,
      default: null,
    },
    size: {
      type: Number as PropType<number>,
      default: 40,
    },
    prefixCls: String,
  },
  setup(props) {
    const { prefixCls: prefixClsNew } = useConfigInject('table-pro-img', props);
    return { prefixClsNew };
  },
  render() {
    const imgNode = [];

    if (this.imgList && this.imgList.length) {
      this.imgList.forEach((img: string) => {
        imgNode.push(<Image bordered={false} width={this.size} src={img} />);
      });
    }

    return (
      <div class={this.prefixClsNew}>
        <Image.PreviewGroup>{imgNode}</Image.PreviewGroup>
      </div>
    );
  },
});
