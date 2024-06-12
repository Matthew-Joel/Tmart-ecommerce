import { PayloadAction,createSlice } from "@reduxjs/toolkit"
import { IProduct } from "@/app/Admin/dashboard/page"
const initialState: IProduct = {
_id:"",
imgSrc:"",
name:"",
fileKey:"",
price:"",
category:"",
}

export const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers: {
        setProduct: (state,action:PayloadAction<IProduct>) => {
            return action.payload
        }
    }
})

export const {setProduct} = productSlice.actions
export default productSlice.reducer
