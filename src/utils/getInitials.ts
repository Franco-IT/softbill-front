export const getInitials = (name: string): string => {
  const nameArray = name.split(' ')
  const initials = nameArray
    .slice(0, 3)
    .map(item => item[0])
    .join('')

  return initials.toUpperCase()
}
