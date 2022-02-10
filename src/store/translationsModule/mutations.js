export function SET_TRANSLATE(state, value) {
  state.translations = value.data.map((items) => {
    if (items.key.startsWith('i')) {
      items.key = items.key.replace(/i/, "q")
    } else {
      items.key = `q${items.key}`
    }
    if (items.key.includes('::')) {
      if (items.key.includes("cms")) {
        items.key = items.key.replace(/cms/, "layout")
      }
    }
    const qbase = items.key.includes('::') ? items.key.split('::')[0] : items.key.split('.')[0]
    const name = items.key.includes('::') ? items.key.split('::')[1] : items.key.split('.')[1]
    const isImage = name.includes("external image url") ? items.value : ''
    return {
      en: {
        [qbase]: {
          [name]: {
            title: items.en ? items.en.value : items.value,
            image: isImage
          }
        }
      },
      es: {
        [qbase]: {
          [name]: {
            title: items.es ? items.es.value : items.value,
            image: isImage
          }
        }
      },
    }
  })
}
