"use client";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"  
const HistoryPage = ({ history, openModal, fetchDashboardCards, session }: any) => {

  const { toast } = useToast();
  const handleAddToDashboard = async (history: any, card_id: number) => {
    console.log("saving history");
    const { data, error }: any = await supabase
      .from("Dashboard Card")
      .insert({
        username: session.username,
        card_id: card_id,
        created_at: new Date(),
        query_name: history.query_name,
        structured_query: history.structured_query,
      }); 
      toast({
        title: `${history.query_name} added to dashboard`,
        description: "You can now view this query on your dashboard",
      })
      fetchDashboardCards();
     }

  const handleViewHistory = async (structured_query: any, session: any) => {
    const newModalData = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        method : "saved",
        session,
        query_input:
        {
          type: "structured_query",
          query_input: structured_query
        }
      }),
    }).then((res) => res.json());

    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    openModal(newModalData);
    modalElement?.showModal();
  };

  return (
    <>
      <h1 className="">History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Query Name</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((history: any) => (
            <TableRow key={history.id}>
              <TableCell>{history.created_at}</TableCell>
              <TableCell>{history.query_name}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    Add to Dashboard
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverClose>
                      <Button onClick={() => handleAddToDashboard(history, 1)}>1</Button>
                      <Button onClick={() => handleAddToDashboard(history, 2)}>2</Button>
                      <Button onClick={() => handleAddToDashboard(history, 3)}>3</Button>
                      <Button onClick={() => handleAddToDashboard(history, 4)}>4</Button>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                
                <Button
                  onClick={() => {
                    handleViewHistory(history.structured_query, session);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default HistoryPage;
