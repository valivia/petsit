interface Input {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  id: string;
}

export function getDisplayName(input: Input) {
  if (input.firstName)
    return input.firstName + (input.lastName ? ` ${input.lastName}` : '');

  if (input.name) return input.name;

  return input.id;
}
