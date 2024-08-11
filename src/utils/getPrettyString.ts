export default function(string: string): string {
   return string.replaceAll(/_/g, " ").replaceAll(/\b./g, l => l.toUpperCase());
}