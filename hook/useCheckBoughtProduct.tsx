
import { useRouter } from 'next/navigation'
import UseProtectProduct from './useProtectProduct'
import UserAuth from './userAuth'


interface ProtectProps {
  children: any,
  productId?:string
}

const UseCheckBoughtProduct = ({ children,productId }: ProtectProps) => {
  const router = useRouter()
  const isBoughtProduct = UseProtectProduct({productId})
  if(isBoughtProduct){
    return children
  }
  // if(!isBoughtProduct){
  //   return <PageNotFound />
  // }

}

export default UseCheckBoughtProduct
