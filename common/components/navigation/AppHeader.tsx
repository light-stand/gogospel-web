"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/shared/auth/store/useAuthStore";
import { useIsMobile } from "@/common/hooks/use-mobile";
import { Button } from "@/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import { signOut } from "@/app/auth/actions";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
};

export function AppHeader() {
  const isMobile = useIsMobile();
  const { session } = useAuthStore();
  const t = useTranslations();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const navLinks = (
    <>
      <NavLink href="/">
        <Button
          variant="link"
          className="text-sm font-medium transition-colors hover:text-indigo-500 text-muted-foreground"
        >
          {t("screen.opportunities")}
        </Button>
      </NavLink>
      <NavLink href="/missions/create">
        <Button
          variant="link"
          className="text-sm font-medium transition-colors hover:text-indigo-500 text-muted-foreground mr-auto"
        >
          {t("screen.postAJob")}
        </Button>
      </NavLink>
      {session?.user ? (
        <>
          <NavLink href="/my-profile">
            <Button
              variant="link"
              className="text-sm font-medium transition-colors hover:text-indigo-500 text-muted-foreground"
            >
              {t("screen.profile")}
            </Button>
          </NavLink>
          <Button
            variant="link"
            onClick={handleLogout}
            className="text-sm font-medium transition-colors hover:text-indigo-500 text-muted-foreground mr-auto"
          >
            {t("user.profile.options.logout")}
          </Button>
        </>
      ) : (
        <NavLink href="/auth/login">
          <Button
            variant="link"
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground mr-auto"
          >
            {t("screen.login")}
          </Button>
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-xl">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="font-extrabold">
          Go&Gospel
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 p-4">{navLinks}</div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-4">{navLinks}</nav>
        )}
      </div>
    </header>
  );
}
