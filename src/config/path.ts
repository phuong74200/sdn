import { User } from "../model/user";

interface Path {
  path: string;
  title: string;
  className: string;
}

export const paths: Path[] = [
  {
    path: "/players",
    title: "Players",
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
  },
  {
    path: "/nations",
    title: "Nations",
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
  },
  {
    path: "/account",
    title: "Account",
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
  },
  {
    path: "/profile",
    title: "Profile",
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ml-auto",
  },
  {
    path: "/account/logout",
    title: "Logout",
    className:
      "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium",
  },
];

export const hightlight =
  "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";

export const hightlightPath = (path: string, paths: Path[]) => {
  return paths.map((p) => {
    if (p.path === path) {
      return { ...p, className: p.className + " " + hightlight };
    }
    return p;
  });
};

export const getPaths = (user: User) => {
  const path = paths.map((p) => {
    if (p.path === "/profile") {
      return { ...p, title: `Profile (${user.username})` };
    }
    return p;
  });
  if (user.isAdmin) {
    return path;
  }
  return path.filter((p) => p.path !== "/account");
};
