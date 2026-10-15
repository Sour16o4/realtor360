import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex h-65 items-center gap-25 bg-white pr-25 pl-26 shadow-nav">
      <Link href="/" aria-label="Realtor360 home" className="shrink-0">
        <Image src="/icons/logo.svg" alt="Realtor360" width={139} height={28} priority />
      </Link>

      <NavLinks />

      <label className="flex h-42 w-152 shrink-0 items-center justify-between rounded-10 bg-page px-10">
        <input
          type="search"
          placeholder="Search..."
          className="w-90 bg-transparent font-nav text-12 font-medium outline-none placeholder:text-subtle"
        />
        <Image src="/icons/search.svg" alt="" width={25} height={25} />
      </label>

      <UserMenu />
    </header>
  );
}
