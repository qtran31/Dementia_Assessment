import { CodeableConcept } from "./codeableConcept";
import { Patient } from "./patient";

export class Observation {
  
  code: CodeableConcept;
  status: string;
  subject: Patient;
  value: string;
  results: any;
}
