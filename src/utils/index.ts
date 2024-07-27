/**
 * 从对象中过滤指定的键
 * @param obj 要过滤的对象
 * @param keysToRemove 要移除的键数组
 * @returns 过滤后的新对象
 */
export function filterOutKeys<T extends Record<string, unknown>>(
    obj: T,
    keysToRemove: string[]
): Partial<T> {
    // 使用 Object.entries() 和 Array.prototype.filter() 创建新对象
    const filteredEntries = Object.entries(obj).filter(
        ([key]) => !keysToRemove.includes(key)
    );
    // 将过滤后的 entries 转换回对象
    return Object.fromEntries(filteredEntries) as Partial<T>;
}
