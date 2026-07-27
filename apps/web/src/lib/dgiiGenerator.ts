export interface VoucherItem {
  rncIssuer: string;
  issuerName: string;
  ncf: string;
  voucherDate: string;
  totalAmount: number;
  itbisAmount: number;
  category: string;
}

export function generate606Txt(rncHeader: string, periodHeader: string, vouchers: VoucherItem[]): string {
  // Line 1: Header (606|RNC|PERIODO|CANTIDAD_REGISTROS)
  const header = `606|${rncHeader}|${periodHeader}|${vouchers.length}`;
  const lines: string[] = [header];

  vouchers.forEach((v) => {
    // Format: RNC|TipoId|TipoGasto|NCF|NCFMod|FechaComp|FechaPago|MontoFact|ITBISFact
    const line = [
      v.rncIssuer,
      "1", // 1 = RNC
      "02", // 02 = Gastos por Trabajos, Suministros y Servicios
      v.ncf,
      "",
      v.voucherDate.replace(/-/g, ""),
      v.voucherDate.replace(/-/g, ""),
      v.totalAmount.toFixed(2),
      v.itbisAmount.toFixed(2),
    ].join("|");
    lines.push(line);
  });

  return lines.join("\r\n");
}

export function generate607Txt(rncHeader: string, periodHeader: string, vouchers: VoucherItem[]): string {
  const header = `607|${rncHeader}|${periodHeader}|${vouchers.length}`;
  const lines: string[] = [header];

  vouchers.forEach((v) => {
    const line = [
      v.rncIssuer,
      "1",
      v.ncf,
      "",
      v.voucherDate.replace(/-/g, ""),
      v.totalAmount.toFixed(2),
      v.itbisAmount.toFixed(2),
    ].join("|");
    lines.push(line);
  });

  return lines.join("\r\n");
}
