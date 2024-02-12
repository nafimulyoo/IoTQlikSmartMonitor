import QueryDataCard from "@/query/QueryDataCard";

const DashboardPage = ({ dashboardCards, openModal, session, deleteDashboardCard, setActiveTab }) => {
  const cardProps = { dashboardCards, openModal, session, deleteDashboardCard, setActiveTab };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="w-full flex flex-col">
          <div className="relative w-full overflow-hidden flex-grow">
            <QueryDataCard
              cardNumber={index + 1}
              className="overflow-auto w-full h-full"
              {...cardProps}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardPage;
