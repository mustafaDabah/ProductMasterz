export const getContent = (contents , sectionContent) => contents.records.find(item => item.fields.Name === sectionContent).fields
