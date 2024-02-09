"use client";

const QueryDataModal = ({ modalData }: any) => {
  // convert queryData to a string
  return (
    <div>
      <h1>Modal</h1>
      <h1 className="font-bold">{ JSON.stringify(modalData.status) }</h1>
      <p>Structured Query:</p>
      <p>{ JSON.stringify(modalData) }</p>
      <p>Results:</p>
    </div>
  );
};

export default QueryDataModal;
