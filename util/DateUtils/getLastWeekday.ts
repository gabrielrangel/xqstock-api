export function getLastWeekday(today = new Date()): Date {
  today.setHours(0, 0, 0, 0);

  const day = today.getDay();

  if ([0, 6].some((d) => day === d)) {
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return getLastWeekday(yesterday);
  }

  return today;
}

export default getLastWeekday;
