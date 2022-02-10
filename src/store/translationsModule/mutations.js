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
    return {
      key: items.key,
      en: items.en ? items.en.value : 'no translation yet' ,
      es: items.es ? items.es.value : 'no hay traducción aún'
    }
  })
}
