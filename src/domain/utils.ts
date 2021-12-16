export function matchSubstring(target: string, substring: string) {
  return target.toLocaleLowerCase().includes(substring.toLocaleLowerCase())
}

export function getRandomPhoto(index: number) {
  return `https://randomuser.me/api/portraits/women/${index}.jpg`
}
