import UserAuth from './userAuth'
import { RootState } from '@/redux/store'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'

interface ProtectProps {
    productId?:string
}

const UseProtectProduct = ({ productId }: ProtectProps) => {
    const products = useSelector((state: RootState) => state.auth.user?.products)

    if (products && products.includes(productId || "")) {
        return true
      } else {
        return false
    }
}

export default UseProtectProduct
