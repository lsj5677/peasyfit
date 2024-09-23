export function parseDate(dateString: string) {
  const dateParts = dateString.split(/[., ]+/);
  const month = dateParts[1].padStart(2, "0"); // 2자리로 맞추기
  const day = dateParts[2].padStart(2, "0"); // 2자리로 맞추기

  return `${month}/${day}`; // yy/mm/dd 형식으로 반환
}
