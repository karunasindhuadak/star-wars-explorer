// When Jest encounters: import "./styles.css"
// It can't parse CSS, so this mock returns an empty object instead.
// Your component gets {} which is harmless — it just means CSS classes
// aren't applied during tests (that's fine, we test behavior, not styles).

export default {};
