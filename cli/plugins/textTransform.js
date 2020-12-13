function textTransform(theme) {
  const textTransform = {};

  for (let textTransformName in theme.textTransform) {
    const value = theme.textTransform[textTransformName];

    textTransform[`${textTransformName}`] = {
      default: {
        textTransform: value,
      },
    };
  }

  return textTransform;
}

module.exports = textTransform;
