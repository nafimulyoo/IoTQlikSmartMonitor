import QueryDataCard from "@/query/QueryDataCard";

import { AspectRatio } from "@/components/ui/aspect-ratio"

const DashboardPage = ({ dashboardCards, openModal, session, deleteDashboardCard, setActiveTab }) => {
  const cardProps = { dashboardCards, openModal, session, deleteDashboardCard, setActiveTab };

  return (
    <div className="h-screen">

    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full h-5/6 mt-6">
      {Array.from({ length: 4 }, (_, index) => (
        <AspectRatio key={index} ratio={16 / 5}>
          <QueryDataCard
            cardNumber={index + 1}
            className=""
            {...cardProps}
          />
        </AspectRatio>
      ))}
    </div>
    </div>
  )
}

export default DashboardPage;
