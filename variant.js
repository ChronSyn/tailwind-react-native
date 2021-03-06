import { Platform } from "react-native";

const transformProps = ["translate", "rotate", "scale", "skew"];

function createVariantFn(styleMap) {
  const memo = {};

  return function getStylesForVariant(classNames = "", variantValue) {
    const memoKey = `${classNames}-${variantValue}`;

    if (memo[memoKey]) {
      return memo[memoKey];
    }

    const assembledStyles = {};

    let transforms = [];

    for (let cn of classNames.split(" ")) {
      if (!cn) {
        continue;
      }

      const [variant, className] = cn.split(":");

      // todo - build out all variants on initial pass
      if (!className) {
        continue;
      }

      const style = styleMap[className];

      if (transformProps.filter((t) => className.includes(t)).length > 0) {
        transforms.push(style);
        continue;
      }

      if (style && variant === variantValue) {
        Object.assign(assembledStyles, Platform.select(style));
      }
    }

    if (transforms.length > 0) {
      Object.assign(assembledStyles, { transform: transforms });
    }

    memo[memoKey] = assembledStyles;
    return assembledStyles;
  };
}

export default createVariantFn;
