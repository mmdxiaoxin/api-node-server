/**
 * 从对象中过滤指定的键
 * @param {Object} obj
 * @param {Array<string>} keysToRemove
 * @returns {{[p: string]: unknown}}
 */
function filterOutKeys(obj, keysToRemove) {
    // 使用 Object.entries() 和 Array.prototype.filter() 创建新对象
    const filteredEntries = Object.entries(obj).filter(([key, value]) => !keysToRemove.includes(key));
    // 将过滤后的 entries 转换回对象
    return Object.fromEntries(filteredEntries);
}

module.exports = {
    filterOutKeys
}
