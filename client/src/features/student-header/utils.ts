export function getNameInitials(name: string) {
  const names = name.split(' ');
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
}
