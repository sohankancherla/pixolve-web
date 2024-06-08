export default function Sidebar() {
  return (
    <nav className="min-h-screen w-52 border-r border-gray-200 dark:border-r-gray-800 shadow-lg dark:shadow-black">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
