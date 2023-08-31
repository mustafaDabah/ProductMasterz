export const findCategory = (categories , categoryName) => categories.records.find(item => item.fields.Name === categoryName).fields.Section
