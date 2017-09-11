export interface UiFormatter {
  to(value: number): string;
  from(value: string): number;
}
