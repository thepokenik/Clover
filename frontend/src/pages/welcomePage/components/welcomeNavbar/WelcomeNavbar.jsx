import * as React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/pages/components/Icon";
import logo from "@/pages/components/assets/PTCC.png";

export function WelcomeNavbar() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="mr-4 hidden md:flex">
			<Link to="/" className="mr-6 flex items-center space-x-2">
				<Icon src={logo} alt="logo" />
				<span className="hidden font-bold sm:inline-block text-secondary-foreground">
					Clover
				</span>
			</Link>
			<nav className="flex items-center gap-6 text-sm">
				<Link
					to="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
					)}
				>
					Docs
				</Link>
				<Link
					to="https://github.com/Clover-Organization/Clover"
					target="__blank"
					className={cn(
						"hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
					)}
				>
					GitHub
				</Link>
			</nav>
		</div>
	);
}
