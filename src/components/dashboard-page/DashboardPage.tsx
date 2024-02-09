'use client'
import CardPlaceholder from "./CardPlaceholder";

const DashboardPage = ({ dashboardCards, setModalData, session }: any) => {
  return (
    <>
      <CardPlaceholder
        key={1}
        cardNumber={1}
        dashboardCards={dashboardCards}
        setModalData={setModalData}
        session = {session}
      />

      <CardPlaceholder
        key={2}
        cardNumber={2}
        dashboardCards={dashboardCards}
        setModalData={setModalData}
        session = {session}
      />
      <CardPlaceholder
        key={3}
        cardNumber={3}
        dashboardCards={dashboardCards}
        setModalData={setModalData}
        session = {session}
      />
      <CardPlaceholder
        key={4}
        cardNumber={4}
        dashboardCards={dashboardCards}
        setModalData={setModalData}
        session = {session}
      />
    </>
  )
}

export default DashboardPage