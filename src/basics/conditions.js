/**
 * JavaScript is different from Rust or Java, the typing system is fully dynamic.
 * This means 2 important things :
 * - You cannot specify variable types, function parameter types or return
 *   types, so there are no guarantees that the type you expect will be provided
 * - The JavaScript engine will try to match types dynamically, so you can do things like
 *   comparing numbers and strings, but internally JS always does type conversion, which
 *   can lead to unexpected behaviors
 */

/**
 * @param {number} n
 * @return {boolean} true if n is bigger than 2
 */
export function isBiggerThan2(n) {
  // Write your code here
}

/**
 * @param {number} n
 * @param {number} m
 * @return {boolean} true if n is a multiple of m
 */
export function isMult(n, m) {
  // Write your code here
}
