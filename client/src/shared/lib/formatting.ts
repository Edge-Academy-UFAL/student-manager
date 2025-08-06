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
