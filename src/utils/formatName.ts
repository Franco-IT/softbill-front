export const formatName = (name: string) => {
  const nameArray = name.split(' ')

  if (nameArray.length != 1) return `${nameArray[0]} ${nameArray[nameArray.length - 1]}`

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : nameArray[0]
}
