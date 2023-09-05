/**
 * Calculate age based on birth date.
 * @param {String} dateString - Birthdate in string. 
 */
const getAge = (dateString) => {
  const now = new Date()
  const diff = now - Date.parse(dateString)

  return Math.floor(diff / 31536000000)
}

/**
 * Format date string to Indonesian locale.
 * @param {string} dateString - Date in string.
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(
    'id-ID', { dateStyle: 'long' })
}

export default {
  getAge,
  formatDate,
}