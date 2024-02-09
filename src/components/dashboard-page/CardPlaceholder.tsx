import QueryDataCard from "@/query/QueryDataCard";

const CardPlaceholder = ({  dashboardCards, cardNumber, setModalData, session}: any) => {

  const cardEntry = dashboardCards.find((card: any) => card.card_id === cardNumber)

  if (cardEntry) {
      return (
        <div>
          <QueryDataCard cardEntry={cardEntry} setModalData={setModalData} session={session}/>
        </div>
      )
    } 

  else {
      return (
        <div>
          <h1>Card {cardNumber}</h1>
          <p>No query set</p>
        </div>
      )
  }
}

export default CardPlaceholder