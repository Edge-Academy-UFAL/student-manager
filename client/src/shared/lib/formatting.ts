export function getShorterName(fullName: string) {
  const parts = fullName.split(' ');
  return parts[0] + ' ' + parts[parts.length - 1];
}
