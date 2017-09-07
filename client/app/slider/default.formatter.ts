import { UiFormatter } from "./uiformatter.interface";

export class DefaultFormatter implements UiFormatter {
  to(value: number): string {
    return String(parseFloat(parseFloat(String(value)).toFixed(2)));
  };

  from(value: string): number {
    return parseFloat(value);
  }
}
