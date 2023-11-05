import * as React from "react";

import { SiteNav, SiteFooter } from "components";
import styles from "./admin.module.css";

const AdminLayout = ({ children, className, ...rest }) => {
  return (
    <div>
      <SiteNav />
      <div
        {...rest}
        className={`${styles.container}${className ? ` ${className}` : ``}`}
        style={{ paddingTop: `var(--navHeight)` }}
      >
        {children}
      </div>
      <SiteFooter />
    </div>
  );
};

export default AdminLayout;
