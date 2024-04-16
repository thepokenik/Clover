import { Link } from "react-router-dom";

const AsideNavDocs = ({ selected }) => {
    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
            <Link to={"/docs"} className={selected === 1 && `font-semibold text-primary`}>
                Introduction
            </Link>
            <Link to={"/docs/structure"} className={selected === 2 && `font-semibold text-primary`}>Structure</Link>
            <Link to={"/docs/versioning"} className={selected === 3 && `font-semibold text-primary`}>Versioning</Link>
        </nav>
    )
}

export default AsideNavDocs;