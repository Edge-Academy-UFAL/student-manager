export function getNameInitials(name: string) {
  const names = name.split(' ');
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
}

export function getShorterName(fullName: string) {
  const parts = fullName.split(' ');
  return parts[0] + ' ' + parts[parts.length - 1];
}

export function translateOptionValue<L extends string, V extends string>(
  options: readonly { label: L; value: V }[],
  value: V | '',
) {
  if (!value) {
    return '';
  }
  return options.find((option) => option.value == value)?.label ?? value;
}
