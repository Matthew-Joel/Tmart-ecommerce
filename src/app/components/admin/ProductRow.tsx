import { IProduct } from "@/app/Admin/dashboard/page";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { setProduct } from "@/app/redux/features/productSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();
  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = async () => {
    try {
      dispatch(setLoading(true));
      const payload = { fileKey: product.fileKey };

      console.log('Deleting file with payload:', payload);

      const deleteFileResponse = await axios({
        method: 'DELETE',
        url: '/api/uploadthing',
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Delete file response:', deleteFileResponse.data);

      const deleteProductResponse = await axios.delete(`/api/delete_product/${product._id}`);
      console.log('Delete product response:', deleteProductResponse.data);

      makeToast("Product deleted successfully");
      setUpdateTable((prevState) => !prevState);
    } catch (err:any) {
      console.error('Error deleting product:', err);

      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        console.error('Request data:', err.request);
      } else {
        console.error('Error message:', err.message);
      }

      makeToast("Failed to delete product");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>
        <div>$ {product.price}</div>
      </td>
      <td>
        <Image
          src={product.imgSrc}
          width={40}
          height={40}
          alt="product_image"
        />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
