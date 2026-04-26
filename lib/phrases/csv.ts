export type CsvRow = Record<string, string>;

export function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(field);
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((value) => value.length > 0)) {
    rows.push(row);
  }

  const [headers, ...body] = rows;
  if (!headers) return [];

  return body.map((values) =>
    headers.reduce<CsvRow>((record, header, index) => {
      record[header] = values[index] ?? "";
      return record;
    }, {}),
  );
}
