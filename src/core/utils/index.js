export const Colors = {

  hexToRgba(hex, opacity) {
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16),
          g = parseInt(hex.substring(2,4), 16),
          b = parseInt(hex.substring(4,6), 16);
    return `rgba(${r} ,${g}, ${b}, ${opacity})`;
  },
};

export const MathArea = {
    calcAreaUnderLineSegment (point_1, point_2) {
        return this._isTriangleArea(point_1, point_2)
            ? this.calcAreaTriangle(point_1, point_2)
            : this.calcAreaTrapezoid(point_1, point_2);
    },

    calcAreaTriangle (point_1, point_2) {
        return 0.5 * (point_2[0] - point_1[0]) * point_2;
    },

    calcAreaTrapezoid (point_1, point_2) {
        return 0.5 * (point_2[1] + point_1[1]) / (point_2[0] - point_1[0]);
    },

    _isTriangleArea (point_1, point_2) {
        return point_1[1] === 0 || point_2[1] === 0;
    },
};
