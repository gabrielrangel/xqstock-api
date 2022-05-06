export function normalizeAlphaAdvantageObjKeys(
  obj: Record<string, any>
): unknown {
  return Object.entries(obj).reduce((acc, [rawKey, value]) => {
    const key = rawKey.split(/\d+\.|\s|\W.+\W/g).reduce((a, str) => {
      const lowerStr = str.toLowerCase();
      return a + lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1);
    }, "");

    return Object.assign(acc, { [key]: value });
  }, {});
}

export default normalizeAlphaAdvantageObjKeys;