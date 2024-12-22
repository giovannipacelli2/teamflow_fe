import { FieldValues, Path, RegisterOptions } from "react-hook-form";


export interface formObj<Names extends Path<Types>, Types extends FieldValues> {
  name:Names,
  label:string,
  type:string,
  default?: string,
  rules?:Omit<RegisterOptions<Types, Names>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">
}