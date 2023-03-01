import { useState } from "react"

const TABS = {
  ONGOING: "Ongoing",
  COMPLETED: "Completed"
}

const useProducts = () => {
  const [activeTab, setActiveTab] = useState(TABS?.ONGOING)

  const handleChangeTab = (tab) => setActiveTab(tab);

  return { activeTab, onChangeTab: handleChangeTab, TABS }
}

export default useProducts;
