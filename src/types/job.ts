export interface Job {
  ID: number;
  company_name: string;
  position: string;
  status: "Applied" | "Interview" | "Accepted" | "Rejected";
}
