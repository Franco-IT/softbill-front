// ** Returns initials from string
export const getInitials = (value: string) => {
  const words = value.trim().split(/\s+/)

  if (words.length != 1) return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`

  return words[0].charAt(0).toUpperCase()
}
