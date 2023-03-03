import { useEffect, useState } from "react"
import moment from 'moment';
import Products from "../../utils/apis/products";

const TABS = {
  ONGOING: "Ongoing",
  COMPLETED: "Completed"
}

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState(TABS?.ONGOING)

  const handleChangeTab = (tab) => setActiveTab(tab);

  useEffect(() => {
    const GetProducts = async ({ isPublished = false }) => {
      const { data, errors } = await Products.Products({ isPublished });

      if (errors) {
        setError(errors.response.data?.errors)

        return;
      }

      console.log('active: ', activeTab)
      const newProducts = data?.length && data.filter(
        ({ lastTimeAuction }) => {
          const lastBidTime = moment(lastTimeAuction).diff(
            moment(),
            'hours'
          )

          if (activeTab === TABS.COMPLETED) return true

          return lastBidTime > 0 && activeTab === TABS?.ONGOING
        }
      )

      setError(null);
      setProducts(newProducts);
    };

    GetProducts({ isPublished: !!(activeTab === TABS?.ONGOING)}); // Search Product
  }, [activeTab]);

  return {
    activeTab,
    data: products,
    error,
    onChangeTab: handleChangeTab,
    TABS
  }
}

export default useProducts;
