export const defaultFields = {
  children: 'items',
  label: 'name',
  value: 'code', // 提交后端的数据
};

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

export const placements = {
    bottomLeft: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: autoAdjustOverflow,
    },
    bottomRight: {
      points: ['tr', 'br'],
      offset: [0, 4],
      overflow: autoAdjustOverflow,
    },
    topLeft: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: autoAdjustOverflow,
    },
    topRight: {
      points: ['br', 'tr'],
      offset: [0, -4],
      overflow: autoAdjustOverflow,
    },
};
