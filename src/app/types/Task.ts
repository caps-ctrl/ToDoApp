export interface Task  {
    id:number
    status: "Canceled" | "Todo" | "In Progress" | "Done" | "Backlog" | undefined | "None"
    Task : string | undefined
    tag:"Praca" | "Dom" | "Studia" | "Zdrowie" | "Finanse" | undefined | "None"
}
