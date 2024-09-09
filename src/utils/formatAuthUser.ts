export const formatAuthUser = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.type,
    avatar: user.avatar || null
  }
}
