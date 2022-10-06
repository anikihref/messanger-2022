export function scrollToBottom(element: HTMLElement | null | undefined) {
  if (!element) return

  element.scrollTo({
    top: element.scrollHeight,
  });
}
