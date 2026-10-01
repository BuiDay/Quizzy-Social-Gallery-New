import UserAuth from './userAuth'

interface ProtectProps {
  children: any
}

const UserProtects = ({ children }: ProtectProps) => {
  const idAuthenticated = UserAuth()
  return idAuthenticated && children
}

export default UserProtects
