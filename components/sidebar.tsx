import Image from "next/image";
import Link from "next/link";

import SidebarItem from "@/components/sidebar-item";

const navItems = [
  { name: "Home", href: "/app", icon: "home" },
  { name: "Enhance", href: "/app/enhance", icon: "wandSparkles" },
  { name: "Deblur", href: "/app/deblur", icon: "droplet" },
  { name: "Merge", href: "/app/merge", icon: "merge" },
  { name: "Find", href: "/app/find", icon: "squareDashedMousePointer" },
  { name: "Group", href: "/app/group", icon: "images" },
];

export default function Sidebar() {
  return (
    <nav
      className="flex small:block fixed bottom-0 right-0 left-0 sm:static sm:min-h-screen sm:w-16 lg:hover:w-56 lg:overflow-x-hidden p-2 border-t sm:border-r border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-black transition-all duration-500 ease-in-out motion-reduce:transition-none group/nav"
      aria-label="Main Navigation"
    >
      <section className="flex flex-col w-full">
        <Link
          href="/app"
          className="hidden sm:block my-8"
          aria-label="Pixolve Home"
        >
          <Image
            src="/icon-purple.png"
            alt="Pixolve"
            width="28"
            height="28"
            className="mx-[9.5px]"
          />
        </Link>
        <ul className="cursor-pointer flex justify-around sm:flex-col gap-2">
          {navItems.map((item) => (
            <SidebarItem key={item.name} href={item.href} icon={item.icon}>
              {item.name}
            </SidebarItem>
          ))}
        </ul>
      </section>
    </nav>
  );
}
