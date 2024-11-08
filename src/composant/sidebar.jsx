import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInitials, useIsAuthenticated } from "../utils/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Euro,
  HandCoins,
  LayoutDashboard,
  Power,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { DropdownProfil } from "./dropDownProfil";
import Logo from "./logo";
import { ROUTES } from "./routes";
import { getUserIdFromToken } from "../utils/users";
import { useTheme } from "../context/ThemeContext";
import { getCurrentUser, logoutUser } from "../service/user.service";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function Sidebar() {
  const userId = getUserIdFromToken();
  const queryClient = new QueryClient();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { isAuthenticated } = useIsAuthenticated();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      sessionStorage.removeItem("token");
      queryClient.clear();
      navigate("/login");
      toast.success("Vous vous êtes déconnecté !");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const { data: userInfo, isLoading: loadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getCurrentUser(userId),
    enabled: !!userId,
  });
  if (loadingUser) {
    return null;
  }

  const initialName = getInitials(userInfo?.prenom, userInfo?.nom);

  const menu = [
    {
      id: 1,
      name: "Tableau de bord",
      link: ROUTES.DASHBOARD,
      icon: <LayoutDashboard />,
    },
    {
      id: 2,
      name: "Board dépense",
      link: ROUTES.EXPENSE,
      icon: <WalletCards />,
    },
    {
      id: 3,
      name: "Board recette",
      link: ROUTES.REVENUE,
      icon: <Euro />,
    },
    {
      id: 4,
      name: "Board investissement",
      link: ROUTES.INVESTMENT,
      icon: <HandCoins />,
    },
    {
      id: 5,
      name: "Statistiques",
      link: ROUTES.STATISTICS,
      icon: <BarChart />,
    },
  ];

  const { theme } = useTheme();
  const bgColor =
    theme === "custom"
      ? "bg-colorPrimaryCustom"
      : "bg-colorPrimaryLight dark:bg-colorPrimaryDark";

  const bgColorSecondary =
    theme === "custom"
      ? "bg-colorSecondaryCustom"
      : "bg-colorSecondaryLight dark:bg-colorSecondaryDark";

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl relative items-center h-full p-4 ${bgColor}`}
    >
      <Link
        to={ROUTES.HOME}
        className="cursor-pointer rounded-xl text-2xl group text-center h-11 w-auto overflow-hidden"
      >
        <Logo sidebar />
      </Link>

      <div className="flex flex-col justify-between gap-2">
        {menu.map(({ id, name, link, icon }) => (
          <Tooltip key={id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to={link}
                className={`my-1 p-3 rounded-xl font-thin text-gray-500 hover:text-black dark:hover:text-white overflow-hidden transition-all ${
                  activeLink.startsWith(link)
                    ? `${bgColorSecondary} text-white dark:text-black hover:text-white dark:hover:!text-black`
                    : ""
                }`}
              >
                {icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex flex-col">
        {isAuthenticated ? (
          <DropdownProfil
            btnOpen={
              <Avatar className="w-12 h-12 hover:scale-95 transition-all">
                <AvatarImage
                  className="object-cover"
                  src={`http://localhost:5001/${userInfo?.img}`}
                />
                <AvatarFallback className="bg-colorPrimaryLight dark:bg-colorSecondaryDark">
                  {initialName}
                </AvatarFallback>
              </Avatar>
            }
            handleLogout={handleLogout}
          />
        ) : (
          <Link
            to={ROUTES.LOGIN}
            className={`my-1 p-3 rounded-xl font-thin text-gray-500 hover:text-black dark:hover:text-white overflow-hidden transition-all ${
              activeLink.startsWith(ROUTES.LOGIN) ||
              activeLink.startsWith(ROUTES.SIGNUP)
                ? `${bgColorSecondary} text-black dark:text-white`
                : ""
            }`}
          >
            <Power />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
