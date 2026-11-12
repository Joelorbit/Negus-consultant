const routeLoaders = {
  "/courses": () => import("../pages/Course/Course"),
  "/training": () => import("../pages/Training/Training"),
  "/packages": () => import("../pages/CollegePackages/CollegePackages"),
  "/packages/courses": () => import("../pages/Packages/Packages"),
  "/sat-ielts": () => import("../pages/SatIelts/SatIelts"),
  "/scholarships": () => import("../pages/Scholarships/Scholarships"),
  "/free-tools": () => import("../pages/FreeTools/FreeTools"),
  "/about": () => import("../pages/About/AboutUs"),
};

export function preloadPublicRoute(path) {
  const load = routeLoaders[path];
  if (!load) return;

  load().catch((error) => {
    console.error(`Could not preload the ${path} page`, error);
  });
}
