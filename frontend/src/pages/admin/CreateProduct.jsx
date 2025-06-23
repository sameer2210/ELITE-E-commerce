import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productAction";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const SigninHandler = (product) => {
    product.id = nanoid();
    dispatch(asynccreateproduct(product));
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(SigninHandler)} className="p-5 w-full">
      <input
        {...register("image")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="url"
        placeholder="Product Image"
      />
      <input
        {...register("title")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="text"
        placeholder="Product Name"
      />
      <input
        {...register("price")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="text"
        placeholder="0.00"
      />
      <input
        {...register("category")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="text"
        placeholder="Product Category"
      />
      <textarea
        {...register("description")}
        className="w-full text-3xl border-b outline-0 p-2 mb-5"
        type="text"
        placeholder="enter description here..."
      ></textarea>
      <button className="text-white text-3xl px-5 py-3 rounded bg-teal-800">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
