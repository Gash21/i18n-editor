// @ts-nocheck
/**
 * @param objects Object                 The object to flatten
 * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
 **/
export function flattenObject(
  objects: any,
  prefix: any = false,
  result: any = null
) {
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (
    prefix &&
    typeof objects === "object" &&
    objects !== null &&
    Object.keys(objects).length === 0
  ) {
    result[prefix] = Array.isArray(objects) ? [] : {};
    return result;
  }

  prefix = prefix ? prefix + "." : "";

  for (const i in objects) {
    if (Object.prototype.hasOwnProperty.call(objects, i)) {
      // Only recurse on true objects and arrays, ignore custom classes like dates
      if (
        typeof objects[i] === "object" &&
        (Array.isArray(objects[i]) ||
          Object.prototype.toString.call(objects[i]) === "[object Object]") &&
        objects[i] !== null
      ) {
        // Recursion on deeper objects
        flattenObject(objects[i], prefix + i, result);
      } else {
        result[prefix + i] = objects[i];
      }
    }
  }
  return result;
}

/**
 * Bonus function to unflatten an object
 *
 * @param objects Object     The object to unflatten
 */
// export function unflattenObject(objects) {
//   const result = {};
//   for (const i in objects) {
//     if (Object.prototype.hasOwnProperty.call(objects, i)) {
//       const keys = i.match(/(?:^\.+)?(?:\.{2,}|[^.])+(?:\.+$)?/g); // Just a complicated regex to only match a single dot in the middle of the string
//       console.log(keys);
//       keys?.reduce((r, e, j) => {
//         return (
//           r[e] ||
//           (r[e] = isNaN(Number(keys[j + 1]))
//             ? keys.length - 1 === j
//               ? objects[i]
//               : {}
//             : [])
//         );
//       }, result);
//     }
//   }
//   return result;
// }

export function unflattenObject(obj: any): any {
  const result = {};
  for (const key of Object.keys(obj)) {
    let ref = result;
    const parts = key.split(".").map((part) => part.replace(/…/g, ""));
    const len = parts.length;
    for (let i = 0; i < len - 1; i++) {
      const part = parts[i];
      if (!ref.hasOwnProperty(part)) {
        ref[part] = {};
      }
      ref = ref[part];
    }
    ref[parts[len - 1]] = obj[key];
  }
  console.log(JSON.stringify(result, null, 2));
  return result;
}
