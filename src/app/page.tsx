import Link from "next/link";

export default function Home() {
  return (
    <div>
      <span>Home</span>
      <Link href="/signin">Fazer Login</Link>
    </div>
  )
}