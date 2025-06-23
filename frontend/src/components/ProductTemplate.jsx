import { Link } from "react-router-dom";

const ProductTemplate = ({ p }) => {
  return (
    <div
      title={p.title}
      key={p.id}
      className="w-[31%] mr-3 mb-3 shadow-md p-1 rounded"
    >
      <img className="h-[30vh] mx-auto block" src={p.image} alt="" />
      <h1 className="mt-3 text-2xl">{p.title.slice(0, 15)}...</h1>
      <p className="text-red-400">{p.price}</p>
      <p>{p.description.slice(0, 80)}...</p>
      <div className="mt-2 p-2 w-full flex justify-between items-center">
        <button>Add to Cart</button>
        <Link to={`/product-info/${p.id}`}>More Info</Link>
      </div>
    </div>
  );
};

export default ProductTemplate;
