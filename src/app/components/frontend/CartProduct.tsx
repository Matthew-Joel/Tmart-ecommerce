import { removeFromCart } from "@/app/redux/features/cartSlice"
import { useAppDispatch } from "@/app/redux/hooks"
import { RxCross1 } from "react-icons/rx"

interface propsType {
    key:string
    id:string
    img:string
    title:string
    price:number
    quantity:number           
}
const CartProduct: React.FC<propsType> = ({
    id,
    img,
    title,
    price,
    quantity,
}) => {
    const dispatch = useAppDispatch();
  return (
   <div className="flex justify-between items-center">
    <div className="flex items-center gap-4">
        <img src={img} alt={title} className="h-[80px]" />
        <div className="space-y-2">
            <h3 className="font-medium">{title}</h3>
            <p className="text-gray-600 text-[14px]">
                {quantity} x ${price}.00
            </p>
        </div>
    </div>

    <RxCross1
    className="cursor-pointer"
    onClick={() => dispatch(removeFromCart(id))}
    />
   </div>
  )
}

export default CartProduct