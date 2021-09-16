import { defineComponent, ref } from 'vue';

import Modal from '../modal';
import Image from '../image';
import Typography from '../typography';

import PropTypes from '../_util/vue-types';
import { errorUploadImage } from '../config-provider/error-image';

export default defineComponent({
  name: 'APreviewImage',
  props: {
    value: PropTypes.string.def(''),
    placeholder: PropTypes.string.def('查看'),
    errorImage: PropTypes.string,
  },
  emits: ['changeUpload', 'change'],
  setup(props) {
    const previewPoseterVisible = ref<boolean>(false);
    const previewPoseterImage = ref<string | undefined>('');
    const handlePoseterPreview = () => {
      previewPoseterVisible.value = true;
    };
    const handlePoseterCancel = () => {
      previewPoseterVisible.value = false;
    };

    return {
      handlePoseterPreview,
      previewPoseterVisible,
      previewPoseterImage,
      handlePoseterCancel,
      errorBackImage: props.errorImage || errorUploadImage,
    };
  },
  render() {
    return (
      <div>
        <Typography.Link href="javascript:;" onClick={this.handlePoseterPreview}>
          {this.placeholder}
        </Typography.Link>
        <Modal
          visible={this.previewPoseterVisible}
          footer={null}
          onCancel={this.handlePoseterCancel}
        >
          <Image width="100%" src={this.value} preview={false} fallback={this.errorBackImage} />
        </Modal>
      </div>
    );
  },
});
