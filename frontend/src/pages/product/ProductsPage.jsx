import FilterSidebar from "../../components/filters/FilterSidebar"
import ProductList from './../../components/product/ProductList';



const ProductsPage = () => {
  return (
    <div className="flex">
        <div className="w-1/4 p-4 border-r border-gray-100">
            <FilterSidebar/>
        </div>
        <div className="w-3/4 p-4">
            <ProductList/>
        </div>
      
    </div>
  )
}

export default ProductsPage



//when home in navbar click then it open this page