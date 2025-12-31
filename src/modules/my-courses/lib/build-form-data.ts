// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildCourseFormData(data: any) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    // 🖼 File
    if (value instanceof File) {
      formData.append(key, value)
      return
    }

    // 📂 FileList
    if (value instanceof FileList) {
      formData.append(key, value[0])
      return
    }

    // 📦 Arrays / Objects
    if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
      return
    }

    // 🔤 Primitives
    formData.append(key, String(value))
  })

  return formData
}
